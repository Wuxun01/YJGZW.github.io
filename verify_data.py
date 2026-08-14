# -*- coding: utf-8 -*-
import csv, json, os
from collections import defaultdict

base = r'D:\工作\周报\账外数据'
files = {
    '7月31日': os.path.join(base, '7月31日账外明细.csv'),
    '8月7日':  os.path.join(base, '8月7日账外明细.csv'),
    '8月13日': os.path.join(base, '8月13日账外明细.csv'),
}

CITY_MAP = [
    '武汉','襄阳','十堰','宜昌','荆州','荆门','孝感','黄冈','黄石',
    '咸宁','恩施','随州','仙桃','天门','潜江','鄂州','神农架',
]

def get_city(builder):
    if not builder: return '其他(未归属)'
    for city in CITY_MAP:
        if city in builder:
            return city
    return '其他(未归属)'

def get_specialty(name):
    if not name: return '其他'
    n = name.lower()
    if 'ftth' in n or '宽带' in name or '光端口' in name or '接入光缆' in name or 'pon' in n or '光分路器' in name:
        return 'FTTH/宽带接入'
    if '应急' in name or '批量' in name:
        return '应急/批量工程'
    if '政企' in name or '专线' in name or '出租' in name or '电路' in name:
        return '政企专线'
    if '无线' in name or '基站' in name or 'rru' in n or '室分' in name or 'lte' in n or '5g' in n:
        return '无线网'
    if '电源' in name or '机房' in name or '蓄电池' in name or '空调' in name:
        return '电源及机房'
    if '视频' in name or '监控' in name or '天眼' in name or '雪亮' in name:
        return '视频监控'
    if '主干光缆' in name or '中继' in name or '长途' in name or '干线' in name:
        return '主干光缆'
    return '其他'

results = {}
for label, fpath in files.items():
    with open(fpath, encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    warn_total = 0; now_total = 0; notset_total = 0
    branch_data = defaultdict(lambda: [0,0,0])
    spec_data = defaultdict(lambda: [0,0,0])

    for r in rows:
        warn = int(r['疑似帐外预告警且未立项站点数'] or 0)
        now = int(r['疑似已帐外且已立项站点数'] or 0)
        notset = int(r['疑似已帐外且未立项站点数'] or 0)
        builder = r.get('建设单位','')
        eng_name = r.get('工程名称','') or ''

        warn_total += warn; now_total += now; notset_total += notset
        city = get_city(builder)
        branch_data[city][0] += warn; branch_data[city][1] += now; branch_data[city][2] += notset
        spec = get_specialty(eng_name)
        spec_data[spec][0] += warn; spec_data[spec][1] += now; spec_data[spec][2] += notset

    zhi_total = warn_total + notset_total
    results[label] = {
        'overall': {'warn': warn_total, 'now': now_total, 'notset': notset_total, 'zhi': zhi_total},
        'branches': dict(branch_data),
        'specs': dict(spec_data),
    }

# 输出全省总量
print('========== 全省总量 ==========')
for label in files:
    o = results[label]['overall']
    print(f'{label}: warn={o["warn"]} now={o["now"]} notset={o["notset"]} zhi={o["zhi"]}')

# 输出分公司数据
print()
print('========== 分公司数据 (warn/now/notset/zhi) ==========')
all_cities = set()
for label in files:
    all_cities.update(results[label]['branches'].keys())
for city in sorted(all_cities):
    parts = []
    for label in files:
        b = results[label]['branches'].get(city, [0,0,0])
        zhi = b[0]+b[2]
        parts.append(f'{label}={b[0]}/{b[1]}/{b[2]}/{zhi}')
    print(f'{city}: {"  |  ".join(parts)}')

# 输出专业数据
print()
print('========== 专业数据 (warn/now/notset/zhi) ==========')
all_specs = set()
for label in files:
    all_specs.update(results[label]['specs'].keys())
for spec in sorted(all_specs):
    parts = []
    for label in files:
        s = results[label]['specs'].get(spec, [0,0,0])
        zhi = s[0]+s[2]
        parts.append(f'{label}={s[0]}/{s[1]}/{s[2]}/{zhi}')
    print(f'{spec}: {"  |  ".join(parts)}')

# 保存JSON供后续比对
out = os.path.join(base, '.temp', 'csv_verify.json')
with open(out, 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print(f'\nJSON saved to: {out}')
