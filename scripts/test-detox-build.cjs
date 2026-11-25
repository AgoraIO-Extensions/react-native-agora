const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'detox-build-'));
try {
  fs.mkdirSync(path.join(fixture, 'android'));
  const gradle = path.join(fixture, 'android/gradlew');
  for (const code of [37, 0]) {
    fs.writeFileSync(gradle, `#!/bin/sh\nexit ${code}\n`, { mode: 0o755 });
    for (const example of ['expo', 'legacy']) {
      const config = require(`../examples/${example}/.detoxrc.js`);
      for (const mode of ['debug', 'release']) {
        const result = spawnSync(
          'sh',
          ['-c', config.apps[`android.${mode}`].build],
          {
            cwd: fixture,
            encoding: 'utf8',
          }
        );
        assert.equal(
          result.status,
          code,
          `${example}/${mode}: Gradle status was masked`
        );
      }
    }
  }
  console.log(
    'Detox Android commands preserve Gradle success and failure status.'
  );
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}
