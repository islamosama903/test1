import re
import pathlib

root = pathlib.Path('src')
patterns = [r'"([^"\n]{1,80})"', r"'([^'\n]{1,80})'"]
exclude = {'en','ar','true','false','./','../','/','btn','btn-primary','btn-secondary','page','card','section','hero','badge','grid','value','css'}
for path in sorted(root.rglob('*.jsx')):
    text = path.read_text(encoding='utf-8')
    strings = []
    for pat in patterns:
        for m in re.finditer(pat, text):
            strings.append(m.group(1))
    candidates = []
    for s in strings:
        if not s or not s.strip():
            continue
        if len(s) > 80:
            continue
        if any(tok in s for tok in ['http','mailto','tel','://','data:','import ','export ','className','style=']):
            continue
        if re.fullmatch(r'[A-Za-z0-9_\- ]+', s) and len(s.split()) <= 3:
            continue
        if re.fullmatch(r'[0-9]+', s):
            continue
        if s in exclude:
            continue
        if path.name == 'InvitationPreview.jsx' and s in ['4:30 PM','5:15 PM','6:30 PM','9:00 PM','A cinematic highlight reel will appear here.', 'Wedding memory 1','Wedding memory 2','Wedding memory 3','Wedding memory 4']:
            continue
        if 't(' not in s and re.search(r'[A-Za-z]', s):
            candidates.append(s)
    if candidates:
        print(path)
        for s in sorted(set(candidates)):
            print('  ', repr(s))
