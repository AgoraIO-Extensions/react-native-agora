#!/usr/bin/env python3
"""Run the existing Detox suite with a bounded, task-owned iOS Simulator."""
import argparse
import dataclasses
import hashlib
import json
import os
from pathlib import Path
import plistlib
import platform
import shutil
import signal
import subprocess
import tempfile
import time
import uuid


@dataclasses.dataclass
class Result:
    code: int
    timeout: bool = False
    output: str = ''
    pid: int = 0


def stop_group(process):
    try:
        os.killpg(process.pid, signal.SIGTERM)
    except ProcessLookupError:
        pass
    try:
        process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        try:
            os.killpg(process.pid, signal.SIGKILL)
        except ProcessLookupError:
            pass
        process.wait(timeout=5)
    # A CLI can exit before its workers. This group belongs to our new session.
    try:
        os.killpg(process.pid, signal.SIGKILL)
    except ProcessLookupError:
        pass


def execute(argv, log, timeout, cwd=None):
    """Bound both process lifetime and log size; terminate its own process group."""
    with log.open('w') as stream:
        process = subprocess.Popen(argv, cwd=cwd, stdout=stream,
                                   stderr=subprocess.STDOUT, start_new_session=True)
        deadline = time.monotonic() + timeout
        expired = False
        stopped = False
        try:
            while process.poll() is None:
                if time.monotonic() >= deadline or log.stat().st_size > 32 * 1024 * 1024:
                    expired = time.monotonic() >= deadline
                    stopped = True
                    if expired:
                        try:
                            subprocess.run(['sample', str(process.pid), '3', '-file',
                                            str(log.with_suffix('.sample'))],
                                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                                           timeout=8)
                        except (OSError, subprocess.TimeoutExpired):
                            pass
                    break
                time.sleep(0.2)
        finally:
            stop_group(process)
    if log.stat().st_size > 32 * 1024 * 1024:
        stopped = True
        with log.open('r+b') as stream:
            stream.truncate(32 * 1024 * 1024)
            stream.seek(0, 2)
            stream.write(b'\n[log truncated at 32 MiB]\n')
    with log.open(errors='replace') as stream:
        output = stream.read(32 * 1024 * 1024)
    return Result((124 if expired else 125) if stopped else process.returncode, expired,
                  output, process.pid)


def read_json(path):
    try:
        return json.loads(path.read_text())
    except (OSError, ValueError):
        return None


def write_json(path, value):
    temporary = path.with_name(path.name + '.tmp')
    temporary.write_text(json.dumps(value, indent=2))
    temporary.replace(path)


def file_hash(path):
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def passed(report):
    return bool(report and report.get('success') is True and
                report.get('numPassedTests', 0) > 0 and report.get('numFailedTests') == 0)


def can_recover(report_exists, app_running, app_crashes, probe):
    # A missing test report alone is not evidence of a broken Simulator.
    return not (report_exists or app_crashes) and app_running is False and probe.timeout


CONFIG = r'''
const path = require('node:path');
const app = process.argv[1];
const base = require(path.join(app, '.detoxrc.js'));
const selected = base.configurations['ios.sim.release'];
const target = base.apps[selected.app];
const jestFile = path.resolve(app, base.testRunner.args.config);
const jest = require(jestFile);
console.log(JSON.stringify({
  binary: path.resolve(app, target.binaryPath),
  runner: base.testRunner,
  jest: {...jest, rootDir: path.resolve(path.dirname(jestFile), jest.rootDir || '.')},
}));
'''


class Guard:
    def __init__(self, app, artifacts, runtime, device_type, runner=execute):
        self.app, self.artifacts = app, artifacts
        self.runtime, self.device_type, self.execute = runtime, device_type, runner
        self.device = None
        self.owned = set()
        self.events = read_json(artifacts / 'stages.json') or []
        self.summary = {'attempts': [], 'status': 'configuration_failure'}
        self.artifacts.mkdir(parents=True, exist_ok=True)

    def command(self, folder, name, argv, timeout):
        started = time.monotonic()
        event = {'stage': name, 'argv': argv, 'state': 'running'}
        self.events.append(event)
        write_json(self.artifacts / 'stages.json', self.events)
        result = self.execute(argv, folder / (name + '.log'), timeout, self.app)
        event.update(state='completed', pid=result.pid, code=result.code, timeout=result.timeout,
                     seconds=round(time.monotonic() - started, 3))
        write_json(self.artifacts / 'stages.json', self.events)
        print(f'{name}: exit={result.code} timeout={result.timeout}', flush=True)
        return result

    def sim(self, folder, name, *args, timeout=30):
        return self.command(folder, name, ['xcrun', 'simctl', *args], timeout)

    def prepare(self, folder, attempt):
        # The first simctl call may mount/scan runtimes. Keep it read-only so a
        # slow service startup cannot leave an uncertain device creation.
        listed = self.sim(folder, 'runtimes', 'list', 'runtimes', '--json', timeout=240)
        if listed.code:
            attempt['failure'] = 'Runtime discovery failed before device creation'
            return False, listed.timeout
        runtime = next((value for value in json.loads(listed.output).get('runtimes', [])
                        if value['identifier'] == self.runtime and value.get('isAvailable')), None)
        if runtime is None:
            attempt['failure'] = 'Requested Simulator runtime is not available'
            return False, False
        attempt['runtime'] = {key: runtime.get(key)
                              for key in ('identifier', 'version', 'buildversion')}
        name = f'RNAgora-CI-{uuid.uuid4()}'
        result = self.sim(folder, 'create', 'create', name, self.device_type,
                          self.runtime, timeout=120)
        if result.code:
            # A timed-out create can have succeeded. Reconcile by its unique name.
            devices = self.sim(folder, 'reconcile-create', 'list', 'devices', '--json')
            if not devices.code:
                for group in json.loads(devices.output).get('devices', {}).values():
                    self.owned.update(d['udid'] for d in group if d['name'] == name)
            attempt['failure'] = 'Simulator creation failed'
            return False, False
        self.device = str(uuid.UUID(result.output.strip()))
        self.owned.add(self.device)
        write_json(self.artifacts / 'owned-simulators.json', sorted(self.owned))
        for stage, args, timeout in [
            ('boot', ['boot', self.device], 60),
            ('bootstatus', ['bootstatus', self.device, '-b'], 240),
            ('health', ['launch', '--terminate-running-process', self.device,
                        'com.apple.Preferences'], 45),
        ]:
            result = self.sim(folder, stage, *args, timeout=timeout)
            if result.code:
                attempt['failure'] = f'{stage} failed before product installation'
                return False, result.timeout
        closed = self.sim(folder, 'close-health-app', 'terminate', self.device,
                          'com.apple.Preferences', timeout=15)
        if closed.timeout:
            attempt['failure'] = 'Health App termination timed out before product installation'
            return False, True
        return True, False

    def diagnose(self, folder, started, executable):
        processes = self.command(folder, 'processes',
                                 ['ps', '-ww', '-axo', 'pid,ppid,state,etime,command'], 10)
        app_pids = []
        for line in processes.output.splitlines():
            if (self.device and self.device.lower() in line.lower() and
                    f'.app/{executable}' in line):
                app_pids.append(int(line.split()[0]))
        for pid in app_pids:
            self.command(folder, f'app-{pid}', ['sample', str(pid), '3', '-file',
                         str(folder / f'app-{pid}.sample')], 8)
        crashes = []
        for source in (Path.home() / 'Library/Logs/DiagnosticReports').glob(executable + '*'):
            if source.suffix in ('.ips', '.crash') and source.stat().st_mtime >= started:
                shutil.copy2(source, folder / source.name)
                crashes.append(source.name)
        if self.device:
            self.sim(folder, 'diagnose', 'diagnose', '-b', '--timeout=30',
                     '--udid=' + self.device, '--output=' + str(folder / 'diagnostics'),
                     timeout=45)
        return (bool(app_pids) if processes.code == 0 else None), crashes

    def cleanup(self, folder):
        ok = True
        for device in list(self.owned):
            self.sim(folder, 'shutdown-' + device, 'shutdown', device, timeout=20)
            deleted = self.sim(folder, 'delete-' + device, 'delete', device, timeout=20)
            if deleted.code:
                ok = False
                continue
            listed = self.sim(folder, 'verify-delete-' + device,
                              'list', 'devices', '--json', timeout=20)
            if listed.code or device.lower() in listed.output.lower():
                ok = False
            else:
                self.owned.remove(device)
        self.device = None
        write_json(self.artifacts / 'owned-simulators.json', sorted(self.owned))
        return ok

    def configs(self, folder, config):
        jest_path = folder / 'jest.json'
        jest_path.write_text(json.dumps({**config['jest'], 'maxWorkers': 1,
                                        'testTimeout': 120000}))
        runner = config['runner']
        args = {**runner['args'], 'config': str(jest_path), 'maxWorkers': 1,
                'json': True, 'outputFile': str(folder / 'jest-results.json')}
        detox = {
            'testRunner': {**runner, 'args': args,
                           'jest': {**runner.get('jest', {}), 'setupTimeout': 180000,
                                    'teardownTimeout': 30000}},
            'apps': {'ci': {'type': 'ios.app', 'binaryPath': config['binary']}},
            'devices': {'ci': {'type': 'ios.simulator', 'device': {'id': self.device},
                               'headless': True}},
            'configurations': {'ci': {'device': 'ci', 'app': 'ci'}},
        }
        path = folder / 'detox.json'
        path.write_text(json.dumps(detox, indent=2))
        return path

    def run(self, probe_only=False):
        self.summary['environment'] = {
            'machine': platform.machine(), 'platform': platform.platform(),
            'developerDir': os.environ.get('DEVELOPER_DIR'),
            'runtime': self.runtime, 'deviceType': self.device_type,
        }
        framework = Path('/Library/Developer/PrivateFrameworks/CoreSimulator.framework/Resources/Info.plist')
        if framework.exists():
            with framework.open('rb') as stream:
                version = plistlib.load(stream)
                self.summary['environment']['coreSimulator'] = {
                    key: version.get(key) for key in ('CFBundleVersion', 'CFBundleShortVersionString')}
        toolchain = self.command(self.artifacts, 'xcode-version', ['xcodebuild', '-version'], 30)
        self.summary['environment']['xcode'] = toolchain.output.strip()
        if toolchain.code:
            return self.finish(1)
        config = None
        executable = '__no_product_app__'
        if not probe_only:
            loaded = self.command(self.artifacts, 'read-config',
                                  ['node', '-e', CONFIG, str(self.app)], 30)
            if loaded.code:
                return self.finish(1)
            config = json.loads(loaded.output)
            binary = Path(config['binary'])
            with (binary / 'Info.plist').open('rb') as stream:
                executable = plistlib.load(stream)['CFBundleExecutable']
            digest = file_hash(binary / executable)
            self.summary.update(binaryPath=str(binary), binarySha256=digest)
            signed = self.command(self.artifacts, 'verify-signature',
                                  ['codesign', '--verify', '--deep', '--strict', str(binary)], 120)
            if signed.code:
                return self.finish(1)
        for number in (1, 2):
            folder = self.artifacts / f'attempt-{number}'
            folder.mkdir()
            attempt = {'number': number, 'status': 'infra_failure'}
            self.summary['attempts'].append(attempt)
            started = time.time()
            retry = False
            try:
                ready, retry = self.prepare(folder, attempt)
                if ready and probe_only:
                    attempt['status'] = 'simulator_ready'
                elif ready:
                    if file_hash(Path(config['binary']) / executable) != digest:
                        raise RuntimeError('Built App changed between test attempts')
                    path = self.configs(folder, config)
                    tested = self.command(folder, 'tests', [
                        'yarn', 'detox', 'test', '--config-path', str(path),
                        '--configuration', 'ci', '--retries', '0', '--maxWorkers', '1',
                        '--record-logs', 'all', '--take-screenshots', 'failing',
                        '--artifacts-location', str(folder / 'detox-artifacts')], 600)
                    report_path = folder / 'jest-results.json'
                    report = read_json(report_path)
                    attempt['tests'] = report
                    if tested.code == 0 and not tested.timeout and passed(report):
                        attempt['status'] = 'passed'
                    else:
                        running, crashes = self.diagnose(folder, started, executable)
                        attempt.update(appRunning=running, appCrashes=crashes)
                        probe = Result(1)
                        if not (report_path.exists() or running or crashes):
                            probe = self.sim(folder, 'failure-health', 'launch',
                                             '--terminate-running-process', self.device,
                                             'com.apple.Preferences', timeout=30)
                        retry = can_recover(report_path.exists(), running, crashes, probe)
                        attempt['status'] = 'infra_failure' if retry else 'test_failure'
                        attempt['failure'] = 'Test command or test report failed'
                else:
                    self.diagnose(folder, started, executable)
            finally:
                clean = self.cleanup(folder)
                attempt['cleanupVerified'] = clean
            if not clean:
                self.summary['status'] = 'cleanup_failure'
                return self.finish(1)
            if attempt['status'] in ('passed', 'simulator_ready'):
                self.summary['status'] = attempt['status']
                if number == 2:
                    self.summary['status'] += '_after_environment_recovery'
                if number == 2:
                    print('::warning::Simulator environment recovered on the second attempt', flush=True)
                return self.finish(0)
            if not retry or number == 2:
                self.summary['status'] = attempt['status']
                return self.finish(1)
        return self.finish(1)

    def finish(self, code):
        self.summary['remainingOwnedSimulators'] = sorted(self.owned)
        write_json(self.artifacts / 'summary.json', self.summary)
        secret = os.environ.get('AGORA_TEST_APP_ID')
        for path in self.artifacts.rglob('*'):
            if path.is_file() and path.suffix in ('.json', '.log', '.txt', '.sample', '.ips', '.crash'):
                if path.stat().st_size <= 32 * 1024 * 1024 and secret:
                    path.write_text(path.read_text(errors='replace').replace(secret, '[APP_ID]'))
        print(json.dumps({'status': self.summary['status'], 'attempts': len(self.summary['attempts'])}), flush=True)
        summary_file = os.environ.get('GITHUB_STEP_SUMMARY')
        if summary_file:
            with open(summary_file, 'a') as stream:
                stream.write(f"iOS test status: **{self.summary['status']}**\n\n")
                for attempt in self.summary['attempts']:
                    stream.write(f"- Attempt {attempt['number']}: {attempt['status']}; cleanup verified: {attempt.get('cleanupVerified', False)}\n")
        return code


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--app-dir', type=Path, default=Path('examples/expo'))
    parser.add_argument('--artifacts', type=Path, required=True)
    parser.add_argument('--runtime', default='com.apple.CoreSimulator.SimRuntime.iOS-18-5')
    parser.add_argument('--device-type', default='com.apple.CoreSimulator.SimDeviceType.iPhone-16')
    parser.add_argument('--probe-only', action='store_true', help='Check Simulator lifecycle; do not run product tests')
    parser.add_argument('--cleanup-only', action='store_true', help='Clean up IDs recorded by this task')
    args = parser.parse_args()
    import fcntl
    # CoreSimulator is shared by processes of the same macOS user.
    with (Path(tempfile.gettempdir()) / 'ios-simulator-tests.lock').open('w') as lease:
        try:
            fcntl.flock(lease, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            parser.exit(75, 'Another Simulator test guard owns this user session\n')
        guard = Guard(args.app_dir.resolve(), args.artifacts.resolve(), args.runtime, args.device_type)
        def interrupted(*_):
            raise KeyboardInterrupt
        previous_handler = signal.signal(signal.SIGTERM, interrupted)
        try:
            if args.cleanup_only:
                saved = read_json(guard.artifacts / 'owned-simulators.json') or []
                guard.owned.update(str(uuid.UUID(value)) for value in saved)
                requested = {event['argv'][3] for event in guard.events
                             if event['stage'] == 'create' and len(event.get('argv', [])) > 3}
                if not guard.owned and not requested:
                    return 0
                listed = guard.sim(guard.artifacts, 'cleanup-ownership', 'list', 'devices', '--json')
                if listed.code:
                    return 1
                devices = {device['udid'].lower(): device['name']
                           for group in json.loads(listed.output).get('devices', {}).values()
                           for device in group}
                guard.owned.update(value for value, name in devices.items() if name in requested)
                if any(value in devices and not devices[value].startswith('RNAgora-CI-')
                       for value in guard.owned):
                    parser.error('Recorded ID belongs to another Simulator')
                guard.owned.intersection_update(devices)
                verified = guard.cleanup(guard.artifacts)
                write_json(guard.artifacts / 'cleanup.json', {
                    'verified': verified, 'remaining': sorted(guard.owned)})
                return 0 if verified else 1
            return guard.run(args.probe_only)
        except (Exception, KeyboardInterrupt) as error:
            guard.summary['failure'] = str(error)
            guard.summary['status'] = 'cancelled' if isinstance(error, KeyboardInterrupt) else 'guard_failure'
            guard.cleanup(guard.artifacts)
            return guard.finish(1)
        finally:
            signal.signal(signal.SIGTERM, previous_handler)


if __name__ == '__main__':
    raise SystemExit(main())
