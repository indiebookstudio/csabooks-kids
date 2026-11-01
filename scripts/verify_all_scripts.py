from pathlib import Path
import re, subprocess

print('Checking all HTML files for inline JS syntax errors...')
html_files = [f for f in Path('.').rglob('*.html') if 'node_modules' not in str(f) and '.git' not in str(f)]
total_scripts = 0
errors = []

for hf in html_files:
    txt = hf.read_text(encoding='utf-8', errors='ignore')
    # match script blocks
    for m in re.finditer(r'<script([^>]*)>(.*?)</script>', txt, re.DOTALL | re.IGNORECASE):
        attrs = m.group(1)
        body = m.group(2).strip()
        if 'src=' in attrs or 'application/json' in attrs or not body:
            continue
        total_scripts += 1
        res = subprocess.run(['node', '--check'], input=body, text=True, encoding='utf-8', capture_output=True)
        if res.returncode != 0:
            errors.append((hf, res.stderr.strip()))

print(f'Checked {len(html_files)} HTML files, {total_scripts} inline script blocks.')
if errors:
    print(f'Found {len(errors)} syntax errors:')
    for f, err in errors:
        print(f'  {f}: {err}')
    exit(1)
else:
    print('ALL inline scripts syntax clean: 0 errors!')
