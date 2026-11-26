"""Reject missing, failed, skipped or incomplete Android smoke results."""
import json
from pathlib import Path
import sys
import xml.etree.ElementTree as ET

root = Path(sys.argv[1])
cases = []
for file in root.rglob('TEST-*.xml'):
    cases.extend(ET.parse(file).getroot().iter('testcase'))
expected = {'homeIsVisible', 'audioPageOpens', 'videoPageOpens'}
names = {item.get('name') for item in cases}
passed = (len(cases) == 3 and names == expected and
          all(item.get('classname', '').endswith('.DemoSmokeTest') and
              not any(item.find(tag) is not None for tag in ['failure', 'error', 'skipped'])
              for item in cases))
print(json.dumps({'passed': passed, 'testCount': len(cases), 'tests': sorted(names)}))
raise SystemExit(0 if passed else 1)
