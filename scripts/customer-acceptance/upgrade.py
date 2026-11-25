import json
import os
from pathlib import Path
import shutil
import subprocess

root = Path(os.environ['RUNNER_TEMP'])
app = root / 'AgoraUpgrade'
evidence = root / 'upgrade-evidence'
evidence.mkdir()
os.environ['CP_HOME_DIR'] = str(root / 'upgrade-cocoapods')

def run(command, cwd, name, expected_failure=False):
    print(name, flush=True)
    with (evidence / (name + '.log')).open('w') as log:
        result = subprocess.run(command, cwd=cwd, stdout=log, stderr=subprocess.STDOUT, timeout=1200)
    if expected_failure:
        assert result.returncode != 0
        assert 'are not installed and cannot be updated' in (evidence / (name + '.log')).read_text()
    else:
        result.check_returncode()

run(['npx','--yes','@react-native-community/cli@18.0.1','init','AgoraCustomer',
     '--version','0.79.5','--directory',str(app),'--skip-install','--skip-git-init',
     '--install-pods','false'], root, '01-create-app')
run(['npm','install','--no-audit','--no-fund','react-native-agora@4.6.2'], app, '02-published-npm')
run(['pod','install','--repo-update'], app / 'ios', '03-published-pods')
shutil.copy(app / 'ios/Podfile.lock', evidence / 'before-Podfile.lock')
package = next((root / 'sdk-package').glob('*.tgz'))
run(['npm','install','--no-audit','--no-fund',str(package)], app, '04-pr-npm')
podfile = app / 'ios/Podfile'
podfile.write_text("source 'https://download.agora.io/cocoapods/'\nsource 'https://cdn.cocoapods.org/'\n\n" + podfile.read_text())
run(['pod','update','AgoraRtcEngine_Special_iOS','AgoraIrisRTC_iOS'],
    app / 'ios', '05-original-readme-command', expected_failure=True)
run(['pod','update','react-native-agora'], app / 'ios', '06-fixed-wrapper-command')
shutil.copy(app / 'ios/Podfile.lock', evidence / 'after-Podfile.lock')
shutil.copy(podfile, evidence / 'Podfile')
run(['ruby',str(Path(__file__).with_name('audit.rb')),'cocoapods',str(app),str(evidence)],
    app, '07-origin-audit')
script = '''
require 'yaml'; require 'json'
before, after = ARGV.map { |file| YAML.load_file(file) }
def pods(lock)
  lock.fetch('PODS').to_h do |pod|
    text = pod.is_a?(Hash) ? pod.keys.first : pod
    [text.split(' (').first, text]
  end
end
old, current = pods(before), pods(after)
raise 'Old SDK baseline missing' unless old['AgoraVideo_Special_iOS'] == 'AgoraVideo_Special_iOS (4.6.2.70)'
raise 'Old Iris baseline missing' unless old['AgoraIrisRTC_iOS2'] == 'AgoraIrisRTC_iOS2 (4.6.2-build.1)'
raise 'Wrong new RTC' unless current['AgoraRtcEngine_Special_iOS'] == 'AgoraRtcEngine_Special_iOS (4.6.4.2)'
raise 'Wrong new Iris' unless current['AgoraIrisRTC_iOS'] == 'AgoraIrisRTC_iOS (4.6.4.2-build.1)'
raise 'Old pod names remain' if current.key?('AgoraVideo_Special_iOS') || current.key?('AgoraIrisRTC_iOS2')
changed = (old.keys & current.keys).reject { |name| old[name] == current[name] }
raise "Unrelated versions changed: #{changed}" unless changed.empty?
puts JSON.pretty_generate({status: 'passed', removed: old.keys - current.keys, added: current.keys - old.keys, changedSharedPods: changed})
'''
result = subprocess.run(['ruby','-e',script,str(evidence / 'before-Podfile.lock'),
                         str(evidence / 'after-Podfile.lock')], check=True, text=True, stdout=subprocess.PIPE)
(evidence / 'upgrade-summary.json').write_text(result.stdout)
print(result.stdout, flush=True)
