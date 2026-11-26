"""Check result gates with isolated fake tools; no device or SDK is mocked as passing."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
STUB = r'''
import json, os, pathlib, sys
args = sys.argv[1:]
root = pathlib.Path(os.environ['UI_STUB_ROOT'])
case = os.environ['UI_STUB_CASE']
identifier = 'AAAAAAAA-BBBB-4CCC-8DDD-EEEEEEEEEEEE'
if pathlib.Path(sys.argv[0]).name == 'xcodebuild':
    assert args[args.index('-destination') + 1] == 'platform=iOS Simulator,id=' + identifier + ',arch=arm64'
    pathlib.Path(args[args.index('-resultBundlePath') + 1]).mkdir()
    raise SystemExit(1 if case in ('assertion', 'process-error') else 0)
if args[:3] == ['simctl', 'list', 'runtimes']:
    print(json.dumps({'runtimes': [{'isAvailable': True, 'version': '18.5', 'identifier': 'runtime'}]}))
elif args[:2] == ['simctl', 'create']:
    (root / 'owned').write_text('yes'); print(identifier)
elif args[:2] == ['simctl', 'delete']:
    if case == 'cleanup': raise SystemExit(1)
    (root / 'owned').unlink()
elif args[:3] == ['simctl', 'list', 'devices']:
    print(json.dumps({'devices': {'runtime': [{'udid': identifier, 'name': 'owned'}] if (root / 'owned').exists() else []}}))
elif args[:4] == ['xcresulttool', 'get', 'test-results', 'summary']:
    print(json.dumps({'passedTests': 0 if case == 'empty' else 2 if case in ('assertion', 'skipped') else 3,
                      'failedTests': 1 if case == 'assertion' else 0,
                      'skippedTests': 1 if case == 'skipped' else 0,
                      'testFailures': [{'testIdentifierString': 'DemoSmokeTests/testAudioPageOpens'}] if case == 'assertion' else []}))
'''


class NativeResultTests(unittest.TestCase):
    @unittest.skipUnless(os.name == 'posix', 'Fake executable tools use POSIX shebangs')
    def test_ios_rejects_empty_failed_skipped_and_unclean_runs(self):
        for case in ['passed', 'empty', 'assertion', 'skipped', 'process-error', 'cleanup']:
            with self.subTest(case=case), tempfile.TemporaryDirectory(prefix='ui-results-') as temporary:
                root = Path(temporary)
                (root / 'products').mkdir()
                (root / 'products/tests.xctestrun').write_text('prebuilt test run')
                (root / 'bin').mkdir()
                for name in ['xcrun', 'xcodebuild']:
                    tool = root / 'bin' / name
                    tool.write_text('#!' + sys.executable + '\n' + STUB)
                    tool.chmod(0o755)
                env = dict(os.environ, UI_STUB_ROOT=str(root), UI_STUB_CASE=case,
                           PATH=str(root / 'bin') + os.pathsep + os.environ['PATH'])
                result = subprocess.run([sys.executable, str(ROOT / 'scripts/run-ios-ui-tests.py'),
                                         str(root / 'products'), str(root / 'report'), '--arch', 'arm64'],
                                        env=env, capture_output=True, text=True, timeout=15)
                state = json.loads((root / 'report/summary.json').read_text())
                self.assertEqual(result.returncode, 0 if case == 'passed' else 1, result.stdout + result.stderr)
                if case != 'cleanup':
                    self.assertTrue(state['cleanupVerified'])
                    self.assertFalse((root / 'owned').exists())
                else:
                    self.assertEqual(state['status'], 'cleanup_failure')

    def test_android_requires_all_three_real_cases(self):
        names = ['homeIsVisible', 'audioPageOpens', 'videoPageOpens']
        for case in ['passed', 'empty', 'missing', 'failure', 'skipped']:
            with self.subTest(case=case), tempfile.TemporaryDirectory(prefix='android-results-') as temporary:
                root = Path(temporary)
                selected = [] if case == 'empty' else names[:2] if case == 'missing' else names
                tests = []
                for name in selected:
                    marker = '<failure message="assertion"/>' if case == 'failure' else '<skipped/>' if case == 'skipped' else ''
                    tests.append('<testcase classname="com.example.DemoSmokeTest" name="' + name + '">' + marker + '</testcase>')
                (root / 'TEST-smoke.xml').write_text('<testsuite>' + ''.join(tests) + '</testsuite>')
                result = subprocess.run([sys.executable, str(ROOT / 'scripts/verify-android-ui-tests.py'), str(root)],
                                        capture_output=True, text=True, timeout=5)
                self.assertEqual(result.returncode, 0 if case == 'passed' else 1, result.stdout + result.stderr)


if __name__ == '__main__':
    unittest.main()
