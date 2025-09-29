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

          if (process.cwd().includes('scripts/terra')) {
            return;
          }

          if (
            child_process.spawnSync('yarn', ['build:ts-interface'], {
              stdio: 'inherit',
              encoding: 'utf-8',
              shell: true,
            }).status !== 0
          ) {
            throw new Error('Failed to run ts-interface-builder');
          }
        },
      },
    };
  },
};
