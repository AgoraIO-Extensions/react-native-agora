"""Execute the prebuilt Demo UI tests once with Apple's test runner."""
import argparse
import json
import os
from pathlib import Path
import platform
import signal
import subprocess
import time
import uuid


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('products', type=Path)
    parser.add_argument('report', type=Path)
    parser.add_argument('--arch', choices=['arm64', 'x86_64'], default=platform.machine())
    args = parser.parse_args()
    args.report.mkdir(parents=True, exist_ok=True)
    summary = {'status': 'execution_failure', 'stages': []}
    device = None
    name = 'Agora-UI-' + str(uuid.uuid4())

    def save():
        temporary = args.report / 'summary.tmp'
        temporary.write_text(json.dumps(summary, indent=2))
        temporary.replace(args.report / 'summary.json')

    def interrupted(signum, frame):
        raise InterruptedError('Interrupted by signal ' + str(signum))

    signal.signal(signal.SIGTERM, interrupted)

    def run(stage, command, seconds):
        started = time.monotonic()
        event = {'stage': stage, 'command': command, 'state': 'running'}
        summary['stages'].append(event)
        save()
        print(stage + ': starting', flush=True)
        log = args.report / (stage + '.log')
        with log.open('w') as stream:
            process = subprocess.Popen(command, stdout=stream, stderr=subprocess.STDOUT,
                                       start_new_session=True)
            try:
                code = process.wait(timeout=seconds)
            except subprocess.TimeoutExpired:
                event['state'] = 'timeout'
                save()
                raise RuntimeError(stage + ' timed out')
            finally:
                if process.poll() is None:
                    os.killpg(process.pid, signal.SIGTERM)
                    try:
                        process.wait(timeout=10)
                    except subprocess.TimeoutExpired:
                        os.killpg(process.pid, signal.SIGKILL)
                        process.wait(timeout=10)
                event['elapsedSeconds'] = round(time.monotonic() - started, 2)
                save()
                print(stage + ': finished after ' + str(event['elapsedSeconds']) + 's', flush=True)
        event.update(state='completed', exitCode=code)
        save()
        return code, log.read_text(errors='replace')

    try:
        code, output = run('runtimes', ['xcrun', 'simctl', 'list', 'runtimes', '--json'], 240)
        if code:
            raise RuntimeError('Runtime discovery failed')
        runtime = next((item for item in json.loads(output)['runtimes']
                        if item.get('isAvailable') and item['version'] == '18.5'), None)
        if not runtime:
            raise RuntimeError('The required iOS 18.5 runtime is unavailable')
        summary['runtime'] = {key: runtime.get(key) for key in ['identifier', 'version', 'buildversion']}
        code, output = run('create', ['xcrun', 'simctl', 'create', name,
                                     'com.apple.CoreSimulator.SimDeviceType.iPhone-16', runtime['identifier']], 90)
        if code:
            raise RuntimeError('Device creation failed')
        device = str(uuid.UUID(output.strip())).upper()
        summary['device'] = device
        runs = list(args.products.glob('*.xctestrun'))
        if len(runs) != 1:
            raise RuntimeError('Expected exactly one built .xctestrun file')
        result = args.report / (name + '.xcresult')
        code, _ = run('xctest', ['xcodebuild', 'test-without-building', '-xctestrun', str(runs[0]),
                               '-destination', 'platform=iOS Simulator,id=' + device + ',arch=' + args.arch,
                               '-destination-timeout', '90', '-parallel-testing-enabled', 'NO',
                               '-maximum-concurrent-test-simulator-destinations', '1',
                               '-test-timeouts-enabled', 'YES',
                               '-default-test-execution-time-allowance', '120',
                               '-maximum-test-execution-time-allowance', '180',
                               '-resultBundlePath', str(result)], 1200)
        result_code, output = run('test-results', ['xcrun', 'xcresulttool', 'get', 'test-results',
                                                 'summary', '--path', str(result)], 30)
        if result_code:
            raise RuntimeError('Xcode did not produce a readable test result')
        tests = json.loads(output)
        summary.update(xcodeExitCode=code, tests=tests)
        if code == 0 and tests.get('passedTests') == 3 and tests.get('failedTests') == 0 and tests.get('skippedTests') == 0:
            summary['status'] = 'passed'
        elif any(item.get('testIdentifierString', '').startswith('DemoSmokeTests/')
                 for item in tests.get('testFailures', [])):
            summary['status'] = 'test_failure'
    except Exception as error:
        summary['failure'] = str(error)
    finally:
        if not device and any(item['stage'] == 'create' for item in summary['stages']):
            try:
                code, output = run('reconcile', ['xcrun', 'simctl', 'list', 'devices', '--json'], 60)
                candidates = [item['udid'] for values in json.loads(output)['devices'].values()
                              for item in values if item['name'] == name]
                if code == 0 and len(candidates) == 1:
                    device = str(uuid.UUID(candidates[0])).upper()
            except Exception as error:
                summary['cleanupFailure'] = str(error)
        if device:
            try:
                run('shutdown', ['xcrun', 'simctl', 'shutdown', device], 30)
                run('delete', ['xcrun', 'simctl', 'delete', device], 30)
                code, output = run('verify-cleanup', ['xcrun', 'simctl', 'list', 'devices', '--json'], 60)
                remaining = [str(uuid.UUID(item['udid'])).upper()
                             for values in json.loads(output)['devices'].values() for item in values]
                if code or device in remaining:
                    raise RuntimeError('Owned Simulator removal could not be verified')
                summary['cleanupVerified'] = True
            except Exception as error:
                summary['cleanupFailure'] = str(error)
        if summary.get('cleanupFailure'):
            summary['status'] = 'cleanup_failure'
        save()
        print(json.dumps(summary, indent=2), flush=True)
    return 0 if summary['status'] == 'passed' else 1


if __name__ == '__main__':
    raise SystemExit(main())
