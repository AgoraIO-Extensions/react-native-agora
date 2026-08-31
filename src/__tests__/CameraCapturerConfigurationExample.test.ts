import { readFileSync } from 'fs';
import { resolve } from 'path';

const root = resolve(__dirname, '../..');

const examples = [
  {
    name: 'Expo',
    demo: 'examples/expo/app/examples/advanced/CameraCapturerConfiguration/CameraCapturerConfiguration.tsx',
    index: 'examples/expo/app/examples/advanced/index.ts',
    join: 'examples/expo/app/examples/basic/JoinChannelVideo/JoinChannelVideo.tsx',
  },
  {
    name: 'legacy',
    demo: 'examples/legacy/src/examples/advanced/CameraCapturerConfiguration/CameraCapturerConfiguration.tsx',
    index: 'examples/legacy/src/examples/advanced/index.ts',
    join: 'examples/legacy/src/examples/basic/JoinChannelVideo/JoinChannelVideo.tsx',
  },
] as const;

const source = (path: string) => readFileSync(resolve(root, path), 'utf8');

describe.each(examples)(
  '$name CameraCapturerConfiguration example',
  (paths) => {
    const demo = source(paths.demo);
    const index = source(paths.index);
    const join = source(paths.join);

    it('is registered as a standalone advanced example', () => {
      expect(index).toContain(
        "import CameraCapturerConfiguration from './CameraCapturerConfiguration/CameraCapturerConfiguration';"
      );
      expect(index).toMatch(
        /name: 'CameraCapturerConfiguration',\s+component: CameraCapturerConfiguration/
      );
      expect(index).toContain("Platform.OS === 'android'");
    });

    it('configures the camera before preview and channel join', () => {
      expect(demo).toContain('items={enumToItems(CameraDirection)}');
      expect(demo).toContain('items={enumToItems(CameraFocalLengthType)}');
      expect(demo).toContain("title={'followEncodeDimensionRatio'}");
      expect(demo).toContain('formatWidth');

      const configureCall =
        'this.engine?.setCameraCapturerConfiguration(configuration)';
      expect(demo).toContain(configureCall);

      const configure = demo.indexOf(configureCall);
      const preview = demo.indexOf('startPreview()');
      const joinChannel = demo.indexOf('joinChannel(token');
      expect(configure).toBeGreaterThan(-1);
      expect(configure).toBeLessThan(preview);
      expect(preview).toBeLessThan(joinChannel);
    });

    it('logs the actual local video event and its enum names', () => {
      expect(demo).toContain(
        'onLocalVideoEvent(source: VideoSourceType, event: LocalVideoEventType)'
      );
      expect(demo).toContain('VideoSourceType[source]');
      expect(demo).toContain('LocalVideoEventType[event]');
    });

    it('keeps the feature-specific callback out of JoinChannelVideo', () => {
      expect(join).not.toContain('onLocalVideoEvent');
      expect(join).not.toContain('LocalVideoEventType');
    });
  }
);
