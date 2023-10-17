const child_process = require('child_process');

module.exports = {
  name: 'bootstrap',
  factory() {
    return {
      hooks: {
        afterAllInstalled(project, options) {
          if (
            options &&
            (options.mode === 'update-lockfile' ||
              options.mode === 'skip-build')
          ) {
            return;
          }

          if (
            child_process.spawnSync('yarn', ['patch-package'], {
              cwd: project.cwd,
              env: process.env,
              stdio: 'inherit',
              encoding: 'utf-8',
              shell: true,
            }).status !== 0
          ) {
            throw new Error('Failed to run patch-package');
          }

          if (
            child_process.spawnSync(
              'yarn',
              ['ts-interface-builder', 'src/*.ts', '-o', 'src/ti/'],
              {
                cwd: project.cwd,
                env: process.env,
                stdio: 'inherit',
                encoding: 'utf-8',
                shell: true,
              }
            ).status !== 0
          ) {
            throw new Error('Failed to run ts-interface-builder');
          }
        },
      },
    };
  },
};
