# iOS CI test execution

The ordinary unit tests run with Jest on Windows/Linux and do not use a Simulator.
The iOS lane builds the existing Expo Demo once, then runs its unchanged Detox
suite through `run-ios-tests.py`. Demo pages, startup code and test cases are not
modified. No `build-for-testing` action is added to the Detox workflow.

```sh
python3 scripts/run-ios-tests.py \
  --app-dir examples/expo --artifacts /absolute/path/to/results
```

The guard creates an exclusively owned iPhone 16 / iOS 18.5 Simulator. It checks
boot completion and independently launches Settings before installing the product
through Detox. A per-user lock prevents overlapping invocations of this guard.
Other test launchers sharing the Mac must use the same node scheduling policy;
the lock does not isolate CoreSimulatorService from arbitrary other processes.

CI-only JSON configs select that exact UDID, one Jest worker, a 180-second Detox
setup deadline and 120-second per-test deadline. The test process has a 10-minute
outer deadline. These configs live in the result directory; the Demo's own
configuration is read without being edited. The existing built App is reused for
both attempts, and Detox's own suite retries are disabled.

Only one environment recovery is allowed. A boot/Settings timeout before product
installation qualifies. After the test command, recovery requires all of:

- no Jest result file;
- no live product process on the owned device;
- no new product crash report;
- an independent Settings launch also timing out.

Assertions, written failed results, App crashes and App hangs do not trigger an
environment retry. Missing/empty test results cannot produce a pass. This policy
is deliberately conservative: some genuine infrastructure failures will remain
failed rather than risk hiding a product regression.

Before recovery, the guard captures bounded process samples, crash reports and
`simctl diagnose` data. It deletes only its own UUIDs and verifies their removal.
It never uses `delete all`, `shutdown all` or a global service kill. If cleanup or
the second attempt fails, CI remains failed. A hard cancellation can be reconciled
from the saved UUIDs and uniquely named create requests:

```sh
python3 scripts/run-ios-tests.py --cleanup-only --artifacts /absolute/path/to/results
```

`summary.json` distinguishes `passed`, `passed_after_environment_recovery`,
`test_failure`, `infra_failure`, `configuration_failure` and cleanup/cancellation
failures. Each attempt preserves its logs, generated config, Jest JSON and Detox
artifacts. A recovered pass also emits a GitHub warning and a step-summary entry;
the original failure is retained. `AGORA_TEST_APP_ID`, when supplied by CI, is
redacted from saved text reports.

`--probe-only` checks only the Simulator lifecycle. Its success is reported as
`simulator_ready`, not a product-test pass. The dedicated Simulator Guard workflow
uses this mode to verify the real macOS path without compiling the Demo.

Run the failure/recovery policy checks locally with:

```sh
python3 -m unittest discover -s scripts -p test_ios_simulator.py -v
```
