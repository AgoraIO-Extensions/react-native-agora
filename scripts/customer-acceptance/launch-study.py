import json
import os
from pathlib import Path
import plistlib
import shutil
import subprocess
import sys
import time

root = Path(os.environ['RUNNER_TEMP'])
app = root / 'LaunchStudy'
evidence = root / 'launch-study'
evidence.mkdir(exist_ok=True)
env = os.environ.copy()
env.update(USE_FRAMEWORKS='dynamic', RCT_NEW_ARCH_ENABLED='1',
           CP_HOME_DIR=str(root / 'launch-cocoapods'))
summary = {}
device = None
peer_device = None
permissions = '--permissions' in sys.argv
rtc = '--rtc' in sys.argv
followup = '--followup' in sys.argv or permissions or rtc

def redact(value):
    secret = os.environ.get('AGORA_APP_ID', '')
    return value.replace(secret, '[APP_ID]') if secret else value

def run(command, name, cwd=app, timeout=1200, check=True):
    print(name, flush=True)
    result = subprocess.run(command, cwd=cwd, env=env, text=True,
                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=timeout)
    (evidence / (name + '.log')).write_text(redact(result.stdout))
    if check:
        result.check_returncode()
    return result.stdout.strip()

def sim(*args, timeout=120, check=True):
    result = subprocess.run(['xcrun', 'simctl', *args], env=env, text=True,
                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=timeout)
    print('simctl ' + ' '.join(args[:3]) + ': ' + str(result.returncode), flush=True)
    if check:
        result.check_returncode()
    return result.stdout.strip()

def json_file(file):
    try:
        return json.loads(file.read_text())
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def collect(stage, launch, bundle):
    folder = evidence / stage
    processes = subprocess.run(['ps', '-axo', 'pid,ppid,state,etime,command'],
                               text=True, stdout=subprocess.PIPE, timeout=10).stdout
    (folder / 'host-processes.txt').write_text(processes)
    candidates = [launch.pid] if launch.poll() is None else []
    for line in processes.splitlines():
        if '/AgoraCustomer.app/AgoraCustomer' in line:
            candidates.append(int(line.split()[0]))
    for pid in set(candidates):
        try:
            subprocess.run(['sample', str(pid), '3', '-file', str(folder / f'process-{pid}.sample')],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=10)
        except subprocess.TimeoutExpired:
            pass
    for command, filename in [(['appinfo', device, bundle], 'appinfo.txt'),
                               (['spawn', device, 'launchctl', 'list'], 'launchctl.txt')]:
        try:
            (folder / filename).write_text(sim(*command, timeout=20, check=False))
        except subprocess.TimeoutExpired:
            (folder / filename).write_text('Command timed out')

def test(stage, expected, bundle_override=None, rebuild=True, grant_privacy=False):
    global device
    folder = evidence / stage
    folder.mkdir()
    bundle = bundle_override or 'io.agora.pr990.' + stage.replace('-', '')
    binary = root / 'launch-derived/Build/Products/Release-iphonesimulator/AgoraCustomer.app'
    if rebuild:
        # RN's always-run bundling phase can change JS without invalidating an
        # incremental CodeSign task. Recreate the app product, retaining native objects.
        if binary.exists():
            shutil.rmtree(binary)
        run(['ruby', '-rxcodeproj', '-e', '''
project=Xcodeproj::Project.open(ARGV[0]); target=project.targets.find{|t|t.name=='AgoraCustomer'}
target.build_configurations.each{|config|config.build_settings['PRODUCT_BUNDLE_IDENTIFIER']=ARGV[1]}
project.save
''', str(app / 'ios/AgoraCustomer.xcodeproj'), bundle], stage + '-bundle-id')
        run(['xcodebuild', '-workspace', 'AgoraCustomer.xcworkspace', '-scheme', 'AgoraCustomer',
         '-configuration', 'Release', '-sdk', 'iphonesimulator', '-destination', 'generic/platform=iOS Simulator',
         '-derivedDataPath', str(root / 'launch-derived'), '-jobs', '2', 'build',
         'ARCHS=arm64', 'ONLY_ACTIVE_ARCH=YES', 'CODE_SIGN_IDENTITY=-'], stage + '-build', app / 'ios')
    run(['codesign', '--verify', '--deep', '--strict', str(binary)], stage + '-codesign')
    run(['otool', '-L', str(binary / 'AgoraCustomer')], stage + '-linked-libraries')
    (folder / 'frameworks.json').write_text(json.dumps(sorted(p.name for p in (binary / 'Frameworks').glob('*.framework'))))
    shutil.copy(app / 'ios/Podfile.lock', folder / 'Podfile.lock')
    if not device:
        device = sim('create', 'PR990-LaunchStudy', 'com.apple.CoreSimulator.SimDeviceType.iPhone-16',
                     'com.apple.CoreSimulator.SimRuntime.iOS-18-5', timeout=240)
        (evidence / 'device.txt').write_text(device)
        sim('boot', device)
        sim('bootstatus', device, '-b', timeout=300)
    sim('install', device, str(binary), timeout=240)
    if grant_privacy:
        sim('privacy', device, 'grant', 'camera', bundle)
        sim('privacy', device, 'grant', 'microphone', bundle)
    container = Path(sim('get_app_container', device, bundle, 'data'))
    documents = container / 'Documents'
    for name in ['native-launch-stage.json', 'customer-acceptance.json']:
        (documents / name).unlink(missing_ok=True)
    started = time.time()
    with (folder / 'launcher.log').open('w') as launcher:
        command = ['xcrun', 'simctl', 'launch', '--stdout=' + str(folder / 'app-stdout.log'),
                   '--stderr=' + str(folder / 'app-stderr.log'), device, bundle]
        child_env = env.copy()
        child_env.update(SIMCTL_CHILD_DYLD_PRINT_LIBRARIES='1', SIMCTL_CHILD_DYLD_PRINT_INITIALIZERS='1')
        launch = subprocess.Popen(command, env=child_env, stdout=launcher, stderr=subprocess.STDOUT)
        sampled = False
        while time.time() - started < 180:
            state = json_file(documents / 'customer-acceptance.json')
            if state.get(expected):
                break
            if not sampled and time.time() - started > 45:
                collect(stage, launch, bundle)
                sampled = True
            if launch.poll() not in (None, 0):
                break
            time.sleep(2)
        state = json_file(documents / 'customer-acceptance.json')
        result = {'passed': bool(state.get(expected)), 'state': state,
                  'nativeStage': json_file(documents / 'native-launch-stage.json'),
                  'launcherCode': launch.poll(), 'elapsed': time.time() - started}
        summary[stage] = result
        (evidence / 'summary.json').write_text(json.dumps(summary, indent=2))
        print(redact(json.dumps({stage: result})), flush=True)
        if not result['passed']:
            collect(stage, launch, bundle)
        if launch.poll() is None:
            launch.terminate()
            try: launch.wait(timeout=10)
            except subprocess.TimeoutExpired: launch.kill(); launch.wait()
    predicate = 'process IN {"AgoraCustomer","CoreSimulatorBridge","SpringBoard","runningboardd","launchd_sim","amfid","taskgated"}'
    try:
        logs = sim('spawn', device, 'log', 'show', '--last', '5m', '--style', 'compact', '--predicate', predicate,
                   timeout=30, check=False)
        (folder / 'system.log').write_text(redact(logs))
    except subprocess.TimeoutExpired:
        (folder / 'system.log').write_text('Log collection timed out')
    for file in documents.glob('*.json'):
        (folder / file.name).write_text(redact(file.read_text()))
    for file in (Path.home() / 'Library/Logs/DiagnosticReports').glob('AgoraCustomer*.ips'):
        if file.stat().st_mtime >= started:
            (folder / file.name).write_text(redact(file.read_text()))
    try:
        sim('terminate', device, bundle, timeout=30, check=False)
    except subprocess.TimeoutExpired:
        print('App termination timed out:', bundle, flush=True)

try:
    run(['npx','--yes','@react-native-community/cli@18.0.1','init','AgoraCustomer','--version','0.79.5',
         '--directory',str(app),'--skip-install','--skip-git-init','--install-pods','false'], 'init', root)
    run(['npm','install','--no-audit','--no-fund'], 'npm-control')
    shutil.copy(Path(__file__).with_name('CustomerAcceptance.m'), app / 'ios/AgoraCustomer/CustomerAcceptance.m')
    delegate = app / 'ios/AgoraCustomer/AppDelegate.swift'
    source = delegate.read_text().replace('@main', '')
    assert '-> Bool {' in source and 'return true' in source
    source = source.replace('-> Bool {', '-> Bool {\n    nativeLaunchMark("delegate.enter")', 1)
    source = source.replace('let factory = RCTReactNativeFactory(delegate: delegate)',
                            'let factory = RCTReactNativeFactory(delegate: delegate)\n    nativeLaunchMark("factory.created")')
    source = source.replace('return true', 'nativeLaunchMark("factory.started")\n    return true', 1)
    delegate.write_text(source)
    (app / 'ios/AgoraCustomer/main.swift').write_text('''import UIKit
import Foundation
func nativeLaunchMark(_ stage: String) {
  let path = URL(fileURLWithPath: NSHomeDirectory()).appendingPathComponent("Documents/native-launch-stage.json")
  let data = try! JSONSerialization.data(withJSONObject: ["stage": stage, "time": Date().timeIntervalSince1970])
  try? data.write(to: path, options: .atomic)
  NSLog("PR990_NATIVE_STAGE %@", stage)
}
nativeLaunchMark("main.enter")
UIApplicationMain(CommandLine.argc, CommandLine.unsafeArgv, nil, NSStringFromClass(AppDelegate.self))
''')
    run(['ruby','-rxcodeproj','-e', '''
project=Xcodeproj::Project.open(ARGV[0]); target=project.targets.find{|t|t.name=='AgoraCustomer'}
%w[CustomerAcceptance.m main.swift].each{|name|target.source_build_phase.add_file_reference(project.main_group.new_file('AgoraCustomer/'+name))}
project.save
''', str(app / 'ios/AgoraCustomer.xcodeproj')], 'instrument-native')
    (app / 'App.tsx').unlink()
    control = '''import React,{useEffect} from 'react';
import {NativeModules,Text,View} from 'react-native';
export default function App(){useEffect(()=>{NativeModules.CustomerAcceptance.report({jsReady:true,fabric:!!global.nativeFabricUIManager});},[]);return <View><Text>RN dynamic launch control</Text></View>;}
'''
    (app / 'App.js').write_text(control)
    if not followup:
        run(['pod','install','--repo-update'], 'pods-control', app / 'ios')
        test('rn-control', 'jsReady')
    package = next((root / 'sdk-package').glob('*.tgz'))
    run(['npm','install','--no-audit','--no-fund',str(package)], 'npm-spm')
    podfile = app / 'ios/Podfile'
    source = podfile.read_text()
    anchor = '      # :ccache_enabled => true\n    )'
    assert anchor in source
    podfile.write_text(source.replace(anchor, anchor+'\n    AgoraReactNativeSPM.post_install(installer)'))
    env['AGORA_SPM_REVISION'] = os.environ['SDK_SOURCE_REF']
    run(['pod','install','--repo-update'], 'pods-spm', app / 'ios')
    if not followup:
        test('spm-linked', 'jsReady')
    (app / 'acceptance-config.json').write_text(json.dumps({'appId':os.environ['AGORA_APP_ID']}))
    (app / 'App.js').write_text('''import React,{useEffect} from 'react';
import {NativeModules,Text,View} from 'react-native';
import config from './acceptance-config.json';
export default function App(){useEffect(()=>{const state={jsReady:true};const mark=(stage)=>{state.stage=stage;NativeModules.CustomerAcceptance.report(state);};try{mark('before.import');const sdk=require('react-native-agora');mark('after.import');const engine=sdk.createAgoraRtcEngine();mark('engine.created');state.version=engine.getVersion();mark('version.loaded');state.initializeCode=engine.initialize({appId:config.appId});mark('initialized');engine.release();state.sdkInitialized=state.initializeCode===0;mark('released');}catch(error){state.failure=error.message;mark('failed');}},[]);return <View><Text>Agora minimal initialization probe</Text></View>;}
''')
    if permissions or rtc:
        info_path = app / 'ios/AgoraCustomer/Info.plist'
        with info_path.open('rb') as stream:
            info = plistlib.load(stream)
        info['NSCameraUsageDescription'] = 'Customer SDK acceptance test'
        info['NSMicrophoneUsageDescription'] = 'Customer SDK acceptance test'
        with info_path.open('wb') as stream:
            plistlib.dump(info, stream)
        shutil.copy(Path(__file__).with_name('App.js'), app / 'App.js')
        original_bundle = 'org.reactjs.native.example.AgoraCustomer'
        test('without-privacy', 'baseReady', bundle_override=original_bundle)
        if rtc:
            if not summary['without-privacy']['passed']:
                raise RuntimeError('Cold simulator preflight failed before the peer test')
            sim('shutdown', device, timeout=90)
            peer_device = sim('clone', device, 'PR990-RTC-Receiver', timeout=240)
            runtime_evidence = evidence / 'rtc'
            runtime_evidence.mkdir()
            (runtime_evidence / 'simulators.json').write_text(json.dumps({
                'publisher': device, 'receiver': peer_device}))
            binary = root / 'launch-derived/Build/Products/Release-iphonesimulator/AgoraCustomer.app'
            run([sys.executable, str(Path(__file__).with_name('runtime.py')), str(binary),
                 str(runtime_evidence), '--arch', '1', '--mode', 'spm', '--preinstalled'],
                'rtc-runtime', timeout=900)
        else:
            sim('shutdown', device, timeout=90)
            sim('delete', device, timeout=90)
            device = sim('create', 'PR990-TCC-Control', 'com.apple.CoreSimulator.SimDeviceType.iPhone-16',
                         'com.apple.CoreSimulator.SimRuntime.iOS-18-5', timeout=240)
            (evidence / 'device.txt').write_text(device)
            sim('boot', device)
            sim('bootstatus', device, '-b', timeout=300)
            test('with-privacy', 'baseReady', bundle_override=original_bundle, rebuild=False, grant_privacy=True)
    elif not followup:
        test('spm-init', 'sdkInitialized')
    else:
        source = (app / 'App.js').read_text()
        source = source.replace("import config from './acceptance-config.json';", "import config from './acceptance-config.json';\nimport {createAgoraRtcEngine} from 'react-native-agora';")
        source = source.replace("const sdk=require('react-native-agora');", 'const sdk={createAgoraRtcEngine};')
        (app / 'App.js').write_text(source)
        test('static-import', 'sdkInitialized')
        original_bundle = 'org.reactjs.native.example.AgoraCustomer'
        test('original-bundle', 'sdkInitialized', bundle_override=original_bundle)
        shutil.copy(Path(__file__).with_name('App.js'), app / 'App.js')
        test('full-app', 'baseReady', bundle_override=original_bundle)
        sim('shutdown', device, timeout=90)
        sim('delete', device, timeout=90)
        device = sim('create', 'PR990-Prewarm-Control', 'com.apple.CoreSimulator.SimDeviceType.iPhone-16',
                     'com.apple.CoreSimulator.SimRuntime.iOS-18-5', timeout=240)
        (evidence / 'device.txt').write_text(device)
        sim('boot', device)
        sim('bootstatus', device, '-b', timeout=300)
        sim('shutdown', device, timeout=90)
        sim('boot', device)
        sim('bootstatus', device, '-b', timeout=300)
        test('prewarm-reboot', 'baseReady', bundle_override=original_bundle, rebuild=False)
finally:
    for owned_device in [device, peer_device]:
        if not owned_device:
            continue
        for action in ['shutdown','delete']:
            try: sim(action, owned_device, timeout=30, check=False)
            except subprocess.TimeoutExpired: print('Cleanup timed out:', action, flush=True)
    for file in evidence.rglob('*'):
        if file.is_file() and file.suffix in ['.log','.json','.txt','.sample','.ips']:
            file.write_text(redact(file.read_text(errors='replace')))
if not all(value['passed'] for value in summary.values()) or len(summary) != (1 if rtc else 2 if permissions else 4 if followup else 3):
    raise SystemExit(1)
