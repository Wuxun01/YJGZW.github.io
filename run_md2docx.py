# -*- coding: utf-8 -*-
import os, sys, subprocess
sys.stdout.reconfigure(encoding='utf-8')

md = os.environ['MD_IN']
js = os.environ['MD_OUT']
docx = os.environ['MD_DOCX']  # 英文路径

cmd = [sys.executable, r'C:\Users\18162\.config\TeleAgent\skills\docx\scripts\md_to_js.py',
       '--input', md, '--output', js, '--docx-output', docx,
       '--font-size', '24', '--indent', '480', '--line-spacing', '360']
r = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
print(r.stdout)
print(r.stderr)
print('exit', r.returncode)