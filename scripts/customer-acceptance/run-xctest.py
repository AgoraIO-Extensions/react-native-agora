"""Run the hosted XCTest bundle once on one owned Simulator; no Detox."""
import argparse
import json
import os
from pathlib import Path
import plistlib
import signal
import subprocess
import uuid


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('products', type=Path)
    parser.add_argument('report', type=Path)
    parser.add_argument('--negative-control', action='store_true')
    args = parser.parse_args()
    args.report.mkdir(parents=True, exist_ok=True)
    summary = {'status': 'execution_failure', 'stages': []}
    device = None
    name = 'Agora-XCTest-' + str(uuid.uuid4())

    def interrupted(signum, frame):
        raise InterruptedError('Native test interrupted by signal ' + str(signum))

    signal.signal(signal.SIGTERM, interrupted)

    def save():
        temporary = args.report / 'native-summary.tmp'
        temporary.write_text(json.dumps(summary, indent=2))
        temporary.replace(args.report / 'native-summary.json')

    def run(stage, command, timeout):
        summary['stages'].append({'stage': stage, 'command': command, 'state': 'running'})
        save()
        with (args.report / (stage + '.log')).open('w') as output:
            process = subprocess.Popen(command, stdout=output, stderr=subprocess.STDOUT,
                                       start_new_session=True)
            try:
                code = process.wait(timeout=timeout)
            except subprocess.TimeoutExpired:
                summary['stages'][-1]['state'] = 'timeout'
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
        summary['stages'][-1].update(state='completed', exitCode=code)
        save()
        return code, (args.report / (stage + '.log')).read_text(errors='replace')

    try:
        code, output = run('runtimes', ['xcrun', 'simctl', 'list', 'runtimes', '--json'], 240)
        if code:
            raise RuntimeError('Runtime discovery failed')
        runtimes = json.loads(output)['runtimes']
        runtime = next(item for item in runtimes if item.get('isAvailable') and item['version'] == '18.5')
        summary['runtime'] = runtime
        code, output = run('create', ['xcrun', 'simctl', 'create', name,
                                     'com.apple.CoreSimulator.SimDeviceType.iPhone-16', runtime['identifier']], 90)
        if code:
            raise RuntimeError('Device creation failed')
        device = str(uuid.UUID(output.strip())).upper()
        summary['device'] = device
        save()
        runs = list(args.products.glob('*.xctestrun'))
        if len(runs) != 1:
            raise RuntimeError('Expected exactly one built .xctestrun file')
        def execute_tests(label, expected_version):
            data = plistlib.loads(runs[0].read_bytes())
            run_id = str(uuid.uuid4())
            if 'TestConfigurations' in data:
                targets = [target for configuration in data['TestConfigurations']
                           for target in configuration['TestTargets']]
            else:
                # Schemes without a Test Plan still emit format 1 on Xcode 16.4.
                targets = [target for target in data.values() if isinstance(target, dict)
                           and 'TestBundlePath' in target]
            if len(targets) != 1:
                raise RuntimeError('Expected exactly one hosted native test target')
            targets[0].setdefault('EnvironmentVariables', {}).update({
                'AGORA_TEST_RUN_ID': run_id, 'AGORA_TEST_VERSION': expected_version})
            configuration_file = args.products / ('BridgeSmoke-' + label + '.xctestrun')
            configuration_file.write_bytes(plistlib.dumps(data))
            result = args.report / ('BridgeSmoke-' + label + '.xcresult')
            code, _ = run('xctest-' + label, ['xcodebuild', 'test-without-building', '-xctestrun', str(configuration_file),
                               '-destination', 'platform=iOS Simulator,id=' + device + ',arch=arm64', '-destination-timeout', '90',
                               '-parallel-testing-enabled', 'NO',
                               '-maximum-concurrent-test-simulator-destinations', '1',
                               '-test-timeouts-enabled', 'YES',
                               '-default-test-execution-time-allowance', '90',
                               '-maximum-test-execution-time-allowance', '120',
                               '-resultBundlePath', str(result)], 600)
            result_code, output = run('test-results-' + label, ['xcrun', 'xcresulttool', 'get', 'test-results',
                                                 'summary', '--path', str(result)], 30)
            if result_code:
                raise RuntimeError('Xcode did not produce a readable test result')
            return code, json.loads(output), run_id

        code, tests, run_id = execute_tests('positive', '4.6.4.2')
        summary['xcodeExitCode'] = code
        summary['runID'] = run_id
        summary['tests'] = tests
        if code == 0 and tests.get('passedTests', 0) >= 1 and tests.get('failedTests') == 0:
            summary['status'] = 'passed'
        else:
            summary['status'] = 'test_failure' if tests.get('failedTests', 0) > 0 else 'execution_failure'
        if summary['status'] == 'passed' and args.negative_control:
            code, tests, run_id = execute_tests('negative', 'invalid-negative-control')
            confirmed = code != 0 and tests.get('failedTests', 0) >= 1 and any(
                failure.get('testIdentifierString') == 'BridgeSmokeTests/testRealReactNativeBridgeLifecycle'
                and failure.get('targetName') == 'AgoraCustomerTests'
                and all(marker in failure.get('failureText', '') for marker in
                        ['expectedVersion', '4.6.4.2', 'invalid-negative-control', 'is not equal to'])
                for failure in tests.get('testFailures', []))
            summary['negativeControl'] = {'xcodeExitCode': code, 'tests': tests,
                                          'runID': run_id, 'failureConfirmed': confirmed}
            if not confirmed:
                summary['status'] = 'negative_control_failure'
    except Exception as error:
        summary['status'] = 'execution_failure'
        summary['failure'] = str(error)
    finally:
        # Reconcile a unique create request even when its response was interrupted.
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
