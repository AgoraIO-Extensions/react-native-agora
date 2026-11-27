"""Build real iOS consumers before/after the two imports in PR 988."""
import argparse
import json
import os
from pathlib import Path
import re
import signal
import subprocess
import tarfile

BASE = 'cea3490582c2caa329e6d432f00be11f547e205f'
PATCH = 'cd6020ac3d63067f2b4d135335768be4e5215e69'
FILES = ['ios/AgoraRtcSurfaceView.mm', 'ios/AgoraRtcSurfaceViewManager.mm']
REPO = Path(__file__).resolve().parents[1]

PROJECT = r'''
require 'logger'
require 'cocoapods'
require 'xcodeproj'
root=ARGV.fetch(0)
project=Xcodeproj::Project.new(File.join(root,'Compat.xcodeproj'))
app=project.new_target(:application,'Compat',:ios,ARGV.fetch(1,'12.4'))
app.build_configurations.each do |config|
  config.build_settings.merge!({
    'PRODUCT_BUNDLE_IDENTIFIER'=>'io.agora.pr988.compat',
    'GENERATE_INFOPLIST_FILE'=>'YES',
    'CLANG_ENABLE_MODULES'=>'YES',
    'CODE_SIGNING_ALLOWED'=>'NO',
    'TARGETED_DEVICE_FAMILY'=>'1,2'
  })
end
%w[main.m AppDelegate.m].each do |name|
  app.source_build_phase.add_file_reference(project.main_group.new_file(name))
end
project.save
scheme=Xcodeproj::XCScheme.new
scheme.add_build_target(app)
scheme.set_launch_target(app)
scheme.save_as(project.path,'Compat',true)
'''

PODFILE = '''source 'https://cdn.cocoapods.org/'
source 'https://download.agora.io/cocoapods/'
platform :ios, '12.4'
install! 'cocoapods', :deterministic_uuids => false
target 'Compat' do
  pod 'React', :path => '../node_modules/react-native/'
  pod 'React-Core', :path => '../node_modules/react-native/React'
  pod 'React-DevSupport', :path => '../node_modules/react-native/React'
'''
for name, path in {
    'ActionSheet': 'ActionSheetIOS', 'Animation': 'NativeAnimation',
    'Blob': 'Blob', 'Image': 'Image', 'Linking': 'LinkingIOS',
    'Network': 'Network', 'Settings': 'Settings', 'Text': 'Text',
    'Vibration': 'Vibration', 'WebSocket': 'WebSocket',
}.items():
    PODFILE += f"  pod 'React-RCT{name}', :path => '../node_modules/react-native/Libraries/{path}'\n"
for name in ['cxxreact', 'jsi', 'jsiexecutor', 'jsinspector']:
    PODFILE += f"  pod 'React-{name}', :path => '../node_modules/react-native/ReactCommon/{name}'\n"
PODFILE += "  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'\n"
for name in ['DoubleConversion', 'glog', 'Folly']:
    PODFILE += f"  pod '{name}', :podspec => '../node_modules/react-native/third-party-podspecs/{name}.podspec'\n"
PODFILE += "  pod 'react-native-agora', :path => '../sdk'\nend\n"

MODERN_PODFILE = '''source 'https://cdn.cocoapods.org/'
source 'https://download.agora.io/cocoapods/'
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules' if ENV['COMPAT_RN'] == '0.71.19'
platform :ios, min_ios_version_supported
prepare_react_native_project!
target 'Compat' do
  config = use_native_modules!
  options = {
    :path => config[:reactNativePath],
    :hermes_enabled => true,
    :fabric_enabled => ENV['RCT_NEW_ARCH_ENABLED'] == '1',
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  }
  options[:flipper_configuration] = FlipperConfiguration.disabled if defined?(FlipperConfiguration)
  use_react_native!(**options)
  post_install do |installer|
    react_native_post_install(installer, :mac_catalyst_enabled => false)
    __apply_Xcode_12_5_M1_post_install_workaround(installer) if ENV['COMPAT_RN'] == '0.71.19'
  end
end
'''


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('work', type=Path)
    parser.add_argument('--render-only', action='store_true')
    parser.add_argument('--rn', choices=['0.60.6', '0.71.19', '0.77.1', '0.79.5'], default='0.60.6')
    parser.add_argument('--architecture', choices=['old', 'new'], default='old')
    args = parser.parse_args()
    if args.rn == '0.60.6' and args.architecture == 'new':
        parser.error('RN 0.60 has no new architecture')
    legacy = args.rn == '0.60.6'
    platform = '15.1' if args.rn in ['0.77.1', '0.79.5'] else '12.4'
    root = args.work.resolve()
    report = root / 'report'
    report.mkdir(parents=True, exist_ok=True)
    summary = {'reactNative': args.rn, 'base': BASE, 'patch': PATCH,
               'architecture': args.architecture, 'nativeDependencies': 'cocoapods',
               'toolchainCompatibility': ['-Wno-error=bitwise-instead-of-logical'] if legacy else [],
               'status': 'setup_failure', 'stages': []}

    def save():
        (report / 'summary.json').write_text(json.dumps(summary, indent=2))

    def interrupted(signum, frame):
        raise InterruptedError('Interrupted by signal ' + str(signum))

    signal.signal(signal.SIGTERM, interrupted)

    def run(name, command, cwd=root, seconds=900, env=None):
        stage = {'name': name, 'command': command, 'status': 'running'}
        summary['stages'].append(stage)
        save()
        print(name + ': starting', flush=True)
        log = report / (name + '.log')
        with log.open('w') as stream:
            process = subprocess.Popen(command, cwd=cwd, env=env, stdout=stream,
                                       stderr=subprocess.STDOUT, start_new_session=True)
            try:
                code = process.wait(timeout=seconds)
            except subprocess.TimeoutExpired:
                stage['status'] = 'timeout'
                code = 124
            finally:
                if process.poll() is None:
                    os.killpg(process.pid, signal.SIGTERM)
                    try:
                        process.wait(timeout=10)
                    except subprocess.TimeoutExpired:
                        os.killpg(process.pid, signal.SIGKILL)
                        process.wait(timeout=10)
        stage.update(status='finished' if code != 124 else 'timeout', exitCode=code)
        stage['errors'] = [line[:1000] for line in log.read_text(errors='replace').splitlines()
                           if re.search(r'fatal error:|error:|npm error|\[!\]', line)][:15]
        save()
        print(name + ': exit ' + str(code), flush=True)
        return code

    try:
        sdk = root / 'sdk'
        sdk.mkdir(exist_ok=True)
        archive = root / 'sdk.tar'
        subprocess.run(['git', 'archive', '--format=tar', '--output', str(archive), BASE,
                        'ios', 'src', 'package.json', 'react-native-agora.podspec'], cwd=REPO, check=True)
        with tarfile.open(archive) as source:
            source.extractall(sdk, filter='data')
        ios = root / 'ios'
        ios.mkdir(exist_ok=True)
        dependencies = {'react': {'0.60.6': '16.8.6', '0.71.19': '18.2.0',
                                 '0.77.1': '18.3.1', '0.79.5': '19.0.0'}[args.rn],
                        'react-native': args.rn}
        if not legacy:
            sdk_package = json.loads((sdk / 'package.json').read_text())
            dependencies['react-native-agora'] = 'file:./react-native-agora-' + sdk_package['version'] + '.tgz'
            if args.rn != '0.71.19':
                for name in ['cli', 'cli-platform-ios', 'cli-platform-android']:
                    dependencies['@react-native-community/' + name] = '15.0.1'
        (root / 'package.json').write_text(json.dumps({'name': 'pr988-ios-consumer',
            'version': '1.0.0', 'private': True, 'dependencies': dependencies}))
        (ios / 'Podfile').write_text(PODFILE if legacy else MODERN_PODFILE)
        (root / 'project.rb').write_text(PROJECT)
        (ios / 'main.m').write_text('#import <UIKit/UIKit.h>\nint main(int argc,char *argv[]) {'
            '@autoreleasepool { return UIApplicationMain(argc,argv,nil,@"AppDelegate"); }}\n')
        (ios / 'AppDelegate.m').write_text('''#import <UIKit/UIKit.h>
#import <React/RCTRootView.h>
@interface AppDelegate : UIResponder <UIApplicationDelegate>
@property(nonatomic,strong) UIWindow *window;
@end
@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)options {
  self.window=[[UIWindow alloc] initWithFrame:UIScreen.mainScreen.bounds];
  UIViewController *controller=[UIViewController new];
  controller.view=[[RCTRootView alloc] initWithBundleURL:[NSURL fileURLWithPath:@"main.jsbundle"] moduleName:@"Compat" initialProperties:nil launchOptions:options];
  self.window.rootViewController=controller;
  [self.window makeKeyAndVisible];
  return YES;
}
@end
''')
        if run('project', ['ruby', str(root / 'project.rb'), str(ios), platform], seconds=60):
            raise RuntimeError('Consumer project generation failed')
        if args.render_only:
            summary['status'] = 'rendered'
            return 0
        if not legacy and run('pack', ['npm', 'pack', '--ignore-scripts', '--pack-destination', str(root)], cwd=sdk):
            raise RuntimeError('Native SDK package preparation failed')
        if run('npm', ['npm', 'install', '--ignore-scripts', '--legacy-peer-deps',
                       '--no-audit', '--no-fund'], seconds=900):
            raise RuntimeError('RN dependency installation failed')
        if not legacy:
            installed_sdk = root / 'node_modules/react-native-agora'
            for name in FILES:
                if (installed_sdk / name).read_bytes() != (sdk / name).read_bytes():
                    raise RuntimeError('Installed SDK differs from reviewed PR base: ' + name)
            sdk = installed_sdk
        env = dict(os.environ, PLATFORM_NAME='iphonesimulator', CURRENT_ARCH='x86_64',
                   RCT_NEW_ARCH_ENABLED='1' if args.architecture == 'new' else '0',
                   COMPAT_RN=args.rn, COCOAPODS_DISABLE_STATS='true', NO_FLIPPER='1')
        if run('pods', ['pod', 'install', '--verbose'], cwd=ios, env=env):
            raise RuntimeError('CocoaPods installation failed')
        flags = ['-configuration', 'Debug', '-sdk', 'iphonesimulator',
                 'ARCHS=x86_64', 'ONLY_ACTIVE_ARCH=YES', 'CODE_SIGNING_ALLOWED=NO']
        if legacy:
            flags.append('OTHER_CPLUSPLUSFLAGS=$(inherited) -Wno-error=bitwise-instead-of-logical')
        flags.append('build')
        library = ['xcodebuild', '-project', str(ios / 'Pods/Pods.xcodeproj'),
                   '-target', 'react-native-agora', *flags]
        app = ['xcodebuild', '-workspace', str(ios / 'Compat.xcworkspace'),
               '-scheme', 'Compat', '-destination', 'generic/platform=iOS Simulator',
               '-derivedDataPath', str(root / 'derived'), *flags]
        before = ([run('sdk-before', library, env=env)] if legacy else []) + [
            run('app-before', app, env=env, seconds=1800)]
        for name in FILES:
            (sdk / name).write_bytes(subprocess.check_output(['git', 'show', PATCH + ':' + name], cwd=REPO))
        after = ([run('sdk-after', library, env=env)] if legacy else []) + [
            run('app-after', app, env=env, seconds=1800)]
        status = 'passed' if not any(before + after) else 'patch_fixed_build' if not any(after) else 'baseline_failed' if any(before) else 'regression'
        summary.update(before=before, after=after, status=status)
    except Exception as error:
        summary['failure'] = str(error)
    finally:
        save()
        print(json.dumps(summary, indent=2), flush=True)
    return 0 if summary['status'] in ['passed', 'patch_fixed_build'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
