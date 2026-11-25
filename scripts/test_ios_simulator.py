import importlib.util
import json
import os
from pathlib import Path
import plistlib
import shutil
import signal
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch
import uuid


SPEC = importlib.util.spec_from_file_location('ios_guard', Path(__file__).with_name('run-ios-tests.py'))
guard = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = guard
SPEC.loader.exec_module(guard)


class FakeRunner:
    def __init__(self, outcomes, bad_health=False, bad_boot=False, delete_fails=False, unknown_create=False):
        self.outcomes = iter(outcomes)
        self.bad_health, self.bad_boot = bad_health, bad_boot
        self.delete_fails = delete_fails
        self.unknown_create = unknown_create
        self.devices, self.calls = set(), []
        self.names = {}

    def __call__(self, argv, log, timeout, cwd):
        self.calls.append((log.stem, argv))
        output, code, timed_out = '', 0, False
        if log.stem == 'read-config':
            output = json.dumps({'binary': str(cwd / 'Test.app'),
                                 'runner': {'args': {'$0': 'jest'}, 'jest': {'setupTimeout': 2100000}},
                                 'jest': {'rootDir': str(cwd), 'testMatch': ['<rootDir>/e2e/*.test.js']}})
        elif argv[:3] == ['xcrun', 'simctl', 'create']:
            output = str(uuid.uuid4())
            self.devices.add(output)
            self.names[output] = argv[3]
            if self.unknown_create:
                output, code, timed_out = '', 124, True
        elif argv[:3] == ['xcrun', 'simctl', 'delete']:
            if self.delete_fails:
                code = 1
            else:
                self.devices.discard(argv[3])
        elif 'list' in argv and 'devices' in argv:
            output = json.dumps({'devices': {'runtime': [
                {'udid': value, 'name': self.names[value]} for value in self.devices]}})
        elif log.stem == 'bootstatus' and self.bad_boot:
            self.bad_boot = False
            code, timed_out = 124, True
        elif log.stem == 'failure-health' and self.bad_health:
            code, timed_out = 124, True
        elif log.stem == 'tests':
            outcome = next(self.outcomes)
            if outcome in ('passed', 'assertion', 'empty'):
                report = {'success': outcome != 'assertion',
                          'numPassedTests': 3 if outcome == 'passed' else 0,
                          'numFailedTests': 3 if outcome == 'assertion' else 0}
                (log.parent / 'jest-results.json').write_text(json.dumps(report))
            code = 0 if outcome in ('passed', 'empty') else 1
            timed_out = outcome == 'hung'
        log.write_text(output)
        return guard.Result(code, timed_out, output, 12345)


class GuardTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.app = self.root / 'app'
        (self.app / 'Test.app').mkdir(parents=True)
        with (self.app / 'Test.app/Info.plist').open('wb') as stream:
            plistlib.dump({'CFBundleExecutable': 'Test'}, stream)
        (self.app / 'Test.app/Test').write_bytes(b'unchanged test executable')

    def tearDown(self):
        self.temp.cleanup()

    def run_guard(self, runner, running=False, crashes=None, probe_only=False):
        current = guard.Guard(self.app, self.root / 'artifacts', 'runtime', 'phone', runner)
        with patch.object(current, 'diagnose', return_value=(running, crashes or [])):
            code = current.run(probe_only)
        return current, code

    def test_success_uses_exact_device_and_does_not_build(self):
        runner = FakeRunner(['passed'])
        current, code = self.run_guard(runner)
        self.assertEqual(code, 0)
        self.assertEqual(current.summary['status'], 'passed')
        self.assertFalse(runner.devices)
        self.assertEqual(sum(name == 'tests' for name, _ in runner.calls), 1)
        config = json.loads((self.root / 'artifacts/attempt-1/detox.json').read_text())
        self.assertEqual(config['apps']['ci']['binaryPath'], str(self.app / 'Test.app'))
        self.assertEqual(config['testRunner']['jest']['setupTimeout'], 180000)
        self.assertEqual(config['testRunner']['args']['maxWorkers'], 1)
        self.assertIn(config['devices']['ci']['device']['id'],
                      next(argv for name, argv in runner.calls if name.startswith('delete-')))
        self.assertFalse(any('build' in argv for _, argv in runner.calls))

    def test_assertion_failure_is_not_retried_even_when_environment_is_unhealthy(self):
        current, code = self.run_guard(FakeRunner(['assertion'], bad_health=True))
        self.assertEqual(code, 1)
        self.assertEqual(current.summary['status'], 'test_failure')
        self.assertEqual(len(current.summary['attempts']), 1)

    def test_app_hang_or_crash_is_not_retried(self):
        for running, crashes in [(True, []), (False, ['Test.ips'])]:
            with self.subTest(running=running, crashes=crashes):
                folder = self.root / ('running' if running else 'crash')
                current = guard.Guard(self.app, folder, 'runtime', 'phone', FakeRunner(['hung'], bad_health=True))
                with patch.object(current, 'diagnose', return_value=(running, crashes)):
                    self.assertEqual(current.run(), 1)
                self.assertEqual(len(current.summary['attempts']), 1)

    def test_independent_system_timeout_allows_one_recovery(self):
        runner = FakeRunner(['hung', 'passed'], bad_health=True)
        current, code = self.run_guard(runner)
        self.assertEqual(code, 0)
        self.assertEqual(current.summary['status'], 'passed_after_environment_recovery')
        self.assertEqual(len(current.summary['attempts']), 2)
        self.assertFalse(runner.devices)

    def test_environment_recovery_is_bounded(self):
        current, code = self.run_guard(FakeRunner(['hung', 'hung'], bad_health=True))
        self.assertEqual(code, 1)
        self.assertEqual(current.summary['status'], 'infra_failure')
        self.assertEqual(len(current.summary['attempts']), 2)

    def test_missing_report_with_healthy_system_is_not_retried(self):
        current, code = self.run_guard(FakeRunner(['hung']))
        self.assertEqual(code, 1)
        self.assertEqual(len(current.summary['attempts']), 1)

    def test_unknown_app_process_state_is_not_recoverable(self):
        self.assertFalse(guard.can_recover(False, None, [], guard.Result(124, True)))

    def test_empty_suite_is_not_success(self):
        current, code = self.run_guard(FakeRunner(['empty']))
        self.assertEqual(code, 1)
        self.assertEqual(current.summary['status'], 'test_failure')

    def test_boot_failure_can_recover_without_running_product_tests(self):
        runner = FakeRunner([], bad_boot=True)
        current, code = self.run_guard(runner, probe_only=True)
        self.assertEqual(code, 0)
        self.assertEqual(len(current.summary['attempts']), 2)
        self.assertFalse(any(name == 'tests' for name, _ in runner.calls))

    def test_failed_cleanup_keeps_job_red_and_records_owned_device(self):
        current, code = self.run_guard(FakeRunner(['passed'], delete_fails=True))
        self.assertEqual(code, 1)
        self.assertEqual(current.summary['status'], 'cleanup_failure')
        self.assertTrue(current.summary['remainingOwnedSimulators'])

    def test_unknown_create_is_reconciled_and_cleaned_without_replaying(self):
        runner = FakeRunner([], unknown_create=True)
        current, code = self.run_guard(runner, probe_only=True)
        self.assertEqual(code, 1)
        self.assertEqual(len(current.summary['attempts']), 1)
        self.assertFalse(runner.devices)
        self.assertEqual(sum(name == 'create' for name, _ in runner.calls), 1)

    @unittest.skipUnless(os.name == 'posix', 'POSIX CI lease')
    def test_cleanup_reconciles_create_interrupted_before_uuid_was_saved(self):
        runner = FakeRunner([])
        identifier = str(uuid.uuid4())
        runner.devices.add(identifier)
        runner.names[identifier] = 'RNAgora-CI-interrupted'
        artifacts = self.root / 'artifacts'
        artifacts.mkdir()
        (artifacts / 'stages.json').write_text(json.dumps([{
            'stage': 'create', 'state': 'running',
            'argv': ['xcrun', 'simctl', 'create', runner.names[identifier]]}]))
        original = guard.Guard
        factory = lambda *args: original(*args, runner=runner)
        previous_handler = signal.getsignal(signal.SIGTERM)
        with patch.object(guard, 'Guard', side_effect=factory), patch.object(sys, 'argv', [
                'run-ios-tests.py', '--app-dir', str(self.app),
                '--artifacts', str(artifacts), '--cleanup-only']):
            self.assertEqual(guard.main(), 0)
        self.assertFalse(runner.devices)
        self.assertTrue(json.loads((artifacts / 'cleanup.json').read_text())['verified'])
        self.assertEqual(json.loads((artifacts / 'stages.json').read_text())[0]['state'], 'running')
        self.assertEqual(signal.getsignal(signal.SIGTERM), previous_handler)

    def test_changed_binary_does_not_get_retried(self):
        runner = FakeRunner(['hung'], bad_health=True)
        current = guard.Guard(self.app, self.root / 'artifacts', 'runtime', 'phone', runner)
        original = current.cleanup
        def cleanup(folder):
            result = original(folder)
            (self.app / 'Test.app/Test').write_bytes(b'changed executable')
            return result
        with patch.object(current, 'cleanup', side_effect=cleanup), patch.object(current, 'diagnose', return_value=(False, [])):
            with self.assertRaisesRegex(RuntimeError, 'changed between'):
                current.run()

    @unittest.skipUnless(shutil.which('node'), 'Node is not available')
    def test_ci_configs_resolve_with_installed_detox(self):
        app = Path(__file__).resolve().parents[1] / 'examples/expo'
        package = app / 'node_modules/detox/internals'
        if not (app / 'node_modules/detox/package.json').exists():
            self.skipTest('SDK dependencies are not installed in this job')
        data = json.loads(subprocess.check_output(['node', '-e', guard.CONFIG, str(app)], text=True))
        data['binary'] = str(self.app / 'Test.app')
        current = guard.Guard(app, self.root / 'artifacts', 'runtime', 'phone', FakeRunner([]))
        current.device = str(uuid.uuid4())
        attempt = self.root / 'config'
        attempt.mkdir()
        config = current.configs(attempt, data)
        code = """const assert=require('node:assert/strict');
const detox=require(process.argv[1]);
detox.resolveConfig({argv:{'config-path':process.argv[2],configuration:'ci'},testRunnerArgv:{},workerId:null})
.then(c=>{assert.equal(c.device.device.id,process.argv[3]);assert.equal(c.testRunner.args.maxWorkers,1);assert.equal(c.testRunner.jest.setupTimeout,180000);})
.catch(e=>{console.error(e.message);process.exitCode=1;});"""
        subprocess.run(['node', '-e', code, str(package), str(config), current.device], cwd=app, check=True, timeout=30)

    def test_secret_is_redacted_in_saved_results(self):
        with patch.dict(os.environ, {'AGORA_TEST_APP_ID': 'private-test-id'}):
            current, _ = self.run_guard(FakeRunner(['passed']))
            (current.artifacts / 'native.log').write_text('private-test-id')
            current.finish(0)
            self.assertEqual((current.artifacts / 'native.log').read_text(), '[APP_ID]')

    @unittest.skipUnless(os.name == 'posix', 'POSIX process groups')
    def test_timeout_terminates_owned_process_group(self):
        marker = self.root / 'child.pid'
        code = '''import signal,subprocess,sys,time
child=subprocess.Popen([sys.executable,'-c','import time;time.sleep(60)'])
def stop(*args):
    child.wait(timeout=3)
    raise SystemExit(0)
signal.signal(signal.SIGTERM,stop)
open(sys.argv[1],'w').write(str(child.pid))
while True:time.sleep(.1)
'''
        result = guard.execute([sys.executable, '-c', code, str(marker)], self.root / 'process.log', 1)
        self.assertTrue(result.timeout)
        self.assertEqual(result.code, 124)
        with self.assertRaises(ProcessLookupError):
            os.kill(int(marker.read_text()), 0)


if __name__ == '__main__':
    unittest.main()
