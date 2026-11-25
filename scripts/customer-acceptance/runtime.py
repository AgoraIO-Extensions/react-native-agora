import argparse
import json
import os
from pathlib import Path
import plistlib
import shutil
import subprocess
import time


def sim(*args, capture=False):
    print('simctl ' + ' '.join(args), flush=True)
    if 'summary' in globals():
        summary['lastSimulatorCommand'] = list(args)
        (report / 'runtime-progress.json').write_text(json.dumps(summary, indent=2))
    result = subprocess.run(["xcrun", "simctl", *args], check=True, text=True,
                            stdout=subprocess.PIPE if capture else None,
                            timeout=300 if args[0] == 'bootstatus' else 90)
    return result.stdout.strip() if capture else None


def wait_for(read, predicate, seconds, description):
    until = time.monotonic() + seconds
    last = None
    while time.monotonic() < until:
        last = read()
        if predicate(last):
            return last
        time.sleep(2)
    raise RuntimeError(f"Timed out: {description}; last state: {last}")


parser = argparse.ArgumentParser()
parser.add_argument("app")
parser.add_argument("report")
parser.add_argument("--arch", choices=["0", "1"], required=True)
parser.add_argument("--mode", required=True)
parser.add_argument("--prepare-only", action="store_true")
args = parser.parse_args()
app = Path(args.app).resolve()
report = Path(args.report).resolve()
report.mkdir(parents=True, exist_ok=True)
device_file = report / 'simulators.json'
devices = json.loads(device_file.read_text()) if device_file.exists() else {}
documents = {}
summary = {"mode": args.mode, "expectedNewArchitecture": args.arch == "1",
           "basic": "pending", "rtcVideo": "pending", "lifecycle": "pending"}
channel = f"ca_{os.environ.get('GITHUB_RUN_ID', 'local')}_{args.mode}_{args.arch}"

if args.prepare_only:
    for role in ["publisher", "receiver"]:
        device = sim("create", f"AgoraCustomer-{args.mode}-{args.arch}-{role}",
                     "com.apple.CoreSimulator.SimDeviceType.iPhone-16",
                     "com.apple.CoreSimulator.SimRuntime.iOS-18-5", capture=True)
        devices[role] = device
        device_file.write_text(json.dumps(devices))
        sim("boot", device)
        sim("bootstatus", device, "-b")
        sim("shutdown", device)
    print('Both simulators passed boot preflight without the SDK app.', flush=True)
    raise SystemExit(0)

with (app / "Info.plist").open("rb") as stream:
    bundle = plistlib.load(stream)["CFBundleIdentifier"]


def states():
    values = {}
    for role, directory in documents.items():
        file = directory / "customer-acceptance.json"
        try:
            values[role] = json.loads(file.read_text())
        except (FileNotFoundError, json.JSONDecodeError):
            values[role] = {}
    return values


try:
    for role in ["publisher", "receiver"]:
        device = devices.get(role)
        if not device:
            device = sim("create", f"AgoraCustomer-{args.mode}-{args.arch}-{role}",
                         "com.apple.CoreSimulator.SimDeviceType.iPhone-16",
                         "com.apple.CoreSimulator.SimRuntime.iOS-18-5", capture=True)
        devices[role] = device
        sim("boot", device)
        sim("bootstatus", device, "-b")
    for role, device in devices.items():
        sim("install", device, str(app))
        sim("privacy", device, "grant", "camera", bundle)
        sim("privacy", device, "grant", "microphone", bundle)
        container = Path(sim("get_app_container", device, bundle, "data", capture=True))
        documents[role] = container / "Documents"
        sim("launch", "--terminate-running-process", device, bundle,
            "-acceptanceRole", role, "-acceptanceChannel", channel)
    current = wait_for(states, lambda value: len(value) == 2 and
                       all(item.get("baseReady") for item in value.values()),
                       180, "SDK initialization in both customer apps")
    for role, value in current.items():
        if value.get("newArchitecture") != (args.arch == "1"):
            raise RuntimeError(f"Wrong runtime architecture in {role}: {value}")
        if value["checks"].get("initialize") != 0:
            raise RuntimeError(f"Initialization failed in {role}")
    summary["basic"] = "passed"
    current = wait_for(states, lambda value:
                       value.get("publisher", {}).get("joined") and
                       value.get("publisher", {}).get("pushedFrames", 0) >= 10 and
                       value.get("receiver", {}).get("joined") and
                       value.get("receiver", {}).get("surfaceMounted") and
                       value.get("receiver", {}).get("decoded", {}).get("width", 0) > 0 and
                       value.get("receiver", {}).get("rendered", {}).get("width", 0) > 0,
                       240, "two clients joined and remote synthetic video decoded/rendered")
    summary["rtcVideo"] = "passed"
    for role, device in devices.items():
        sim("io", device, "screenshot", str(report / f"{role}-video.png"))
    for directory in documents.values():
        temp = directory / "customer-command.tmp"
        temp.write_text(json.dumps({"action": "release"}))
        temp.replace(directory / "customer-command.json")
    wait_for(states, lambda value: all(item.get("released") and item.get("reinitialized")
                                     for item in value.values()),
             60, "leave, release, reinitialize and release")
    summary["lifecycle"] = "passed"
except Exception as error:
    summary["failure"] = str(error)
    raise
finally:
    summary["runtime"] = states()
    (report / "runtime-summary.json").write_text(json.dumps(summary, indent=2))
    secret = os.environ.get("AGORA_APP_ID", "")
    diagnostic = json.dumps(summary, indent=2)
    print(diagnostic.replace(secret, '[APP_ID]') if secret else diagnostic, flush=True)
    for role, directory in documents.items():
        output = report / role
        output.mkdir(exist_ok=True)
        for file in directory.glob("*.log"):
            text = file.read_text(errors="replace")
            if secret:
                text = text.replace(secret, "[APP_ID]")
            (output / file.name).write_text(text)
        device = devices[role]
        try:
            subprocess.run(["xcrun", "simctl", "io", device, "screenshot",
                            str(report / f"{role}-final.png")], check=False, timeout=20)
        except subprocess.TimeoutExpired:
            print(f'Screenshot timed out for {role}', flush=True)
    for device in devices.values():
        for action in ['shutdown', 'delete']:
            try:
                subprocess.run(["xcrun", "simctl", action, device], check=False, timeout=20)
            except subprocess.TimeoutExpired:
                print(f'Simulator cleanup timed out: {action}', flush=True)
