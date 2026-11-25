const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const [appDir, packageFile, mode] = process.argv.slice(2);
if (!appDir || !packageFile || !['cocoapods', 'spm'].includes(mode)) {
  throw new Error(
    'Usage: node prepare.cjs <new-app-dir> <sdk.tgz> <cocoapods|spm>'
  );
}
if (!process.env.AGORA_APP_ID)
  throw new Error('A configured test App ID is required');
execFileSync(
  'npx',
  [
    '--yes',
    '@react-native-community/cli@18.0.1',
    'init',
    'AgoraCustomer',
    '--version',
    '0.79.5',
    '--directory',
    appDir,
    '--skip-install',
    '--skip-git-init',
    '--install-pods',
    'false',
  ],
  { stdio: 'inherit' }
);
execFileSync('npm', ['install', '--no-audit', '--no-fund', packageFile], {
  cwd: appDir,
  stdio: 'inherit',
});

// Only these dependency-manager edits come from PR #990's README.
const podfile = path.join(appDir, 'ios/Podfile');
let pod = fs.readFileSync(podfile, 'utf8');
if (mode === 'cocoapods') {
  pod =
    "source 'https://download.agora.io/cocoapods/'\nsource 'https://cdn.cocoapods.org/'\n\n" +
    pod;
} else {
  const anchor = '      # :ccache_enabled => true\n    )';
  if (!pod.includes(anchor)) throw new Error('Unexpected standard RN Podfile');
  pod = pod.replace(
    anchor,
    anchor + '\n    AgoraReactNativeSPM.post_install(installer)'
  );
}
fs.writeFileSync(podfile, pod);

// Test instrumentation is application-owned; no SDK repository patches or
// monorepo modules are made available to the customer app.
fs.rmSync(path.join(appDir, 'App.tsx'));
fs.copyFileSync(path.join(__dirname, 'App.js'), path.join(appDir, 'App.js'));
fs.copyFileSync(
  path.join(__dirname, 'CustomerAcceptance.m'),
  path.join(appDir, 'ios/AgoraCustomer/CustomerAcceptance.m')
);
fs.writeFileSync(
  path.join(appDir, 'acceptance-config.json'),
  JSON.stringify({ appId: process.env.AGORA_APP_ID })
);
execFileSync(
  'ruby',
  [
    '-rxcodeproj',
    '-e',
    `
  project = Xcodeproj::Project.open(ARGV[0])
  target = project.targets.find { |t| t.name == 'AgoraCustomer' }
  file = project.main_group.new_file('AgoraCustomer/CustomerAcceptance.m')
  target.source_build_phase.add_file_reference(file)
  project.save
`,
    path.join(appDir, 'ios/AgoraCustomer.xcodeproj'),
    path.join(appDir, 'ios/AgoraCustomer/Info.plist'),
  ],
  { stdio: 'inherit' }
);

execFileSync(
  'python3',
  [
    '-c',
    `
import plistlib,sys
file=sys.argv[1]
with open(file,'rb') as stream: info=plistlib.load(stream)
info['NSCameraUsageDescription']='Customer SDK acceptance test'
info['NSMicrophoneUsageDescription']='Customer SDK acceptance test'
with open(file,'wb') as stream: plistlib.dump(info,stream)
`,
    path.join(appDir, 'ios/AgoraCustomer/Info.plist'),
  ],
  { stdio: 'inherit' }
);

const sdk = JSON.parse(
  fs.readFileSync(
    path.join(appDir, 'node_modules/react-native-agora/package.json')
  )
);
const manifest = path.join(
  appDir,
  'node_modules/react-native-agora/Package.swift'
);
if (!fs.existsSync(manifest))
  throw new Error('Installed npm package omitted Package.swift');
const ts = require(require.resolve('typescript', { paths: [appDir] }));
const types = path.join(appDir, 'node_modules/react-native-agora', sdk.types);
const program = ts.createProgram([types], { skipLibCheck: true });
const checker = program.getTypeChecker();
const sdkExports = new Set(
  checker
    .getExportsOfModule(
      checker.getSymbolAtLocation(program.getSourceFile(types))
    )
    .map((symbol) => symbol.getName())
);
const appSource = ts.createSourceFile(
  'App.js',
  fs.readFileSync(path.join(appDir, 'App.js'), 'utf8'),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.JSX
);
appSource.forEachChild((node) => {
  if (
    !ts.isImportDeclaration(node) ||
    node.moduleSpecifier.text !== 'react-native-agora'
  )
    return;
  for (const binding of node.importClause.namedBindings.elements) {
    const name = (binding.propertyName || binding.name).text;
    if (!sdkExports.has(name)) throw new Error(`SDK does not export ${name}`);
  }
});
console.log(
  JSON.stringify({
    customerApp: appDir,
    sdkVersion: sdk.version,
    mode,
    source: 'installed npm tarball',
  })
);
