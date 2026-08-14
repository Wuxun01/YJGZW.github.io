# -*- coding: utf-8 -*-
"""逐项比对 HTML看板数据 vs CSV源数据(analyze4.py输出)"""
import json, re, os, sys
sys.stdout.reconfigure(encoding='utf-8')

base = r'D:\工作\周报\账外数据'

# 1. 读取原始分析脚本输出的JSON
with open(os.path.join(base, '.temp', 'chart_data.json'), encoding='utf-8') as f:
    csv_data = json.load(f)

# 2. 读取HTML文件，提取JS中的数据
html_path = os.path.join(base, '账外工程整改数据看板.html')
with open(html_path, encoding='utf-8') as f:
    html = f.read()

errors = []
ok_count = 0

# ===== 比对 OVERALL =====
print('===== 全省总量 OVERALL =====')
# 提取 OVERALL 数组
m = re.search(r'const OVERALL\s*=\s*\[(.*?)\];', html, re.S)
overall_js = []
for line in m.group(1).split('\n'):
    mm = re.search(r"date:'([^']+)',\s*warn:(\d+),\s*now:(\d+),\s*notset:(\d+),\s*zhi:(\d+)", line)
    if mm:
        overall_js.append({
            'date': mm.group(1),
            'warn': int(mm.group(2)),
            'now': int(mm.group(3)),
            'notset': int(mm.group(4)),
            'zhi': int(mm.group(5))
        })

for i, label in enumerate(['7月31日','8月7日','8月13日']):
    csv_o = csv_data['overall'][i]
    js_o = overall_js[i]
    for key, ck in [('warn','告警未立项'),('now','已帐外已立项'),('notset','已帐外未立项'),('zhi','整改指标')]:
        cv = csv_o[ck]
        jv = js_o[key]
        if cv == jv:
            ok_count += 1
        else:
            errors.append(f'OVERALL {label} {key}: CSV={cv} HTML={jv}')
            print(f'  [MISMATCH] {label} {key}: CSV={cv} HTML={jv}')
print(f'  OK: {ok_count} fields matched')

# ===== 比对 BRANCHES =====
print('\n===== 分公司 BRANCHES =====')
m = re.search(r'const BRANCHES\s*=\s*\[(.*?)\];', html, re.S)
branch_js = {}
for line in m.group(1).split('\n'):
    mm = re.search(r"\{name:'([^']+)',\s*d:\[\[([\d,]+)\],\[([\d,]+)\],\[([\d,]+)\]\]\}", line)
    if mm:
        name = mm.group(1)
        d0 = [int(x) for x in mm.group(2).split(',')]
        d1 = [int(x) for x in mm.group(3).split(',')]
        d2 = [int(x) for x in mm.group(4).split(',')]
        branch_js[name] = [d0, d1, d2]

branch_ok = 0; branch_err = 0
csv_branch = csv_data['branch']
# 名称映射：HTML中 "其他(未归属)" 对应 CSV中的 "其他"
name_map = {'其他(未归属)': '其他'}

for js_name, js_data in branch_js.items():
    csv_name = name_map.get(js_name, js_name)
    for di, label in enumerate(['7月31日','8月7日','8月13日']):
        cb = csv_branch.get(label, {}).get(csv_name)
        if cb is None:
            errors.append(f'BRANCH {js_name} {label}: CSV中无此分公司')
            print(f'  [MISSING] {js_name} {label}: CSV中无此分公司')
            branch_err += 1
            continue
        # js_data[di] = [warn, now, notset]
        for idx, ck in enumerate(['告警未立项','已帐外已立项','已帐外未立项']):
            cv = cb[ck]
            jv = js_data[di][idx]
            if cv == jv:
                branch_ok += 1
            else:
                errors.append(f'BRANCH {js_name} {label} {ck}: CSV={cv} HTML={jv}')
                print(f'  [MISMATCH] {js_name} {label} {ck}: CSV={cv} HTML={jv}')
                branch_err += 1

print(f'  OK: {branch_ok} fields, ERRORS: {branch_err}')

# 检查是否有CSV中有但HTML中无的分公司
for label in ['7月31日','8月7日','8月13日']:
    for csv_name in csv_branch.get(label, {}):
        js_name = csv_name if csv_name != '其他' else '其他(未归属)'
        if js_name not in branch_js:
            errors.append(f'BRANCH {csv_name} 在CSV中存在但HTML中缺失')
            print(f'  [MISSING in HTML] {csv_name}')

# ===== 比对 SPEC =====
print('\n===== 专业 SPEC =====')
m = re.search(r'const SPEC\s*=\s*\[(.*?)\];', html, re.S)
spec_js = {}
for line in m.group(1).split('\n'):
    mm = re.search(r"\{name:'([^']+)',\s*d:\[\[([\d,]+)\],\[([\d,]+)\],\[([\d,]+)\]\]\}", line)
    if mm:
        name = mm.group(1)
        d0 = [int(x) for x in mm.group(2).split(',')]
        d1 = [int(x) for x in mm.group(3).split(',')]
        d2 = [int(x) for x in mm.group(4).split(',')]
        spec_js[name] = [d0, d1, d2]

spec_ok = 0; spec_err = 0
csv_spec = csv_data['specialty']

for js_name, js_data in spec_js.items():
    for di, label in enumerate(['7月31日','8月7日','8月13日']):
        cs = csv_spec.get(label, {}).get(js_name)
        if cs is None:
            errors.append(f'SPEC {js_name} {label}: CSV中无此专业')
            print(f'  [MISSING] {js_name} {label}: CSV中无此专业')
            spec_err += 1
            continue
        for idx, ck in enumerate(['告警未立项','已帐外已立项','已帐外未立项']):
            cv = cs[ck]
            jv = js_data[di][idx]
            if cv == jv:
                spec_ok += 1
            else:
                errors.append(f'SPEC {js_name} {label} {ck}: CSV={cv} HTML={jv}')
                print(f'  [MISMATCH] {js_name} {label} {ck}: CSV={cv} HTML={jv}')
                spec_err += 1

# 检查是否有CSV中有但HTML中无的专业
for label in ['7月31日','8月7日','8月13日']:
    for csv_name in csv_spec.get(label, {}):
        if csv_name not in spec_js:
            # 视频监控全为0，可以跳过
            cs = csv_spec[label][csv_name]
            if cs['告警未立项']==0 and cs['已帐外已立项']==0 and cs['已帐外未立项']==0:
                continue
            errors.append(f'SPEC {csv_name} 在CSV中存在但HTML中缺失')
            print(f'  [MISSING in HTML] {csv_name} {label}')

print(f'  OK: {spec_ok} fields, ERRORS: {spec_err}')

# ===== 汇总 =====
print('\n========== 验证汇总 ==========')
total_ok = ok_count + branch_ok + spec_ok
total_err = len(errors)
print(f'总比对字段数: {total_ok + total_err}')
print(f'匹配: {total_ok}')
print(f'不匹配: {total_err}')
if total_err == 0:
    print('\n✅ 全部数据验证通过！HTML看板数据与CSV源数据完全一致。')
else:
    print(f'\n❌ 发现 {total_err} 处不一致：')
    for e in errors:
        print(f'  - {e}')
