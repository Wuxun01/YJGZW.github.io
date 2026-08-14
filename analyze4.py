# -*- coding: utf-8 -*-
"""重新汇总三期账外数据 - 使用建设单位字段直接提取地市"""
import pandas as pd, sys, json, os
sys.stdout.reconfigure(encoding='utf-8')

BASE = r"D:\工作\周报\账外数据"
FILES = ["7月31日账外明细.csv", "8月7日账外明细.csv", "8月13日账外明细.csv"]
LABELS = ["7月31日", "8月7日", "8月13日"]
COLS = ['疑似帐外预告警且未立项站点数', '疑似已帐外且已立项站点数', '疑似已帐外且未立项站点数']

# 从建设单位名称提取地市
def branch_from_builder(text):
    if not isinstance(text, str):
        return '其他'
    # 按地市关键词匹配
    cities = ['武汉','黄石','襄阳','孝感','咸宁','宜昌','鄂州','荆州','十堰','荆门','黄冈','随州','恩施','仙桃','潜江','天门']
    for c in cities:
        if c in text:
            return c
    if '神农架' in text or '林区' in text:
        return '神农架'
    # 湖北分公司、集团省电信公司 -> 其他
    return '其他'

# 专业分类（沿用原逻辑）
def specialty(name):
    s = str(name)
    if any(x in s for x in ['FTTH','光端口','光缆接入','FTTR','宽带','补盲','精投','光网','光缆线路','光分']):
        return 'FTTH/宽带接入'
    if any(x in s for x in ['政企','专线','PON','大客户','组网']):
        return '政企专线'
    if any(x in s for x in ['无线','基站','宏站','RRU','5G','OTA','室分']):
        return '无线网'
    if any(x in s for x in ['低压','油机','电源','机房','隐患整治']):
        return '电源及机房'
    if '主干' in s:
        return '主干光缆'
    if any(x in s for x in ['监控','平安','雪亮']):
        return '视频监控'
    if any(x in s for x in ['应急','批量同步','云网']):
        return '应急/批量工程'
    return '其他'

# 读取三期数据
dfs = {}
for f, label in zip(FILES, LABELS):
    p = os.path.join(BASE, f)
    df = pd.read_csv(p, encoding='utf-8-sig')
    # 用建设单位提取地市
    df['分公司'] = df['建设单位'].apply(branch_from_builder)
    df['专业'] = df['工程名称'].apply(specialty)
    # 数值列转 int
    for c in COLS:
        df[c] = pd.to_numeric(df[c], errors='coerce').fillna(0).astype(int)
    dfs[label] = df
    print(f"{label}: {len(df)} 行, 分公司={df['分公司'].nunique()}个, 专业={df['专业'].nunique()}个")

# ===== 全省汇总 =====
overall = []
for label in LABELS:
    df = dfs[label]
    w = int(df[COLS[0]].sum())
    y = int(df[COLS[1]].sum())
    n = int(df[COLS[2]].sum())
    z = w + n
    overall.append({'date': label, '告警未立项': w, '已帐外已立项': y, '已帐外未立项': n, '整改指标': z})
    print(f"{label}: 告警={w} 已立项={y} 未立项={n} 整改指标={z}")

# ===== 分公司汇总 =====
branch_data = {}
for label in LABELS:
    df = dfs[label]
    g = df.groupby('分公司')[COLS].sum().fillna(0).astype(int)
    branch_data[label] = {}
    for b in g.index:
        w = int(g.loc[b, COLS[0]])
        y = int(g.loc[b, COLS[1]])
        n = int(g.loc[b, COLS[2]])
        z = w + n
        branch_data[label][b] = {'告警未立项': w, '已帐外已立项': y, '已帐外未立项': n, '整改指标': z}

# ===== 专业汇总 =====
spec_data = {}
for label in LABELS:
    df = dfs[label]
    g = df.groupby('专业')[COLS].sum().fillna(0).astype(int)
    spec_data[label] = {}
    for s in g.index:
        w = int(g.loc[s, COLS[0]])
        y = int(g.loc[s, COLS[1]])
        n = int(g.loc[s, COLS[2]])
        z = w + n
        spec_data[label][s] = {'告警未立项': w, '已帐外已立项': y, '已帐外未立项': n, '整改指标': z}

# ===== 建设单位汇总（新维度） =====
builder_data = {}
for label in LABELS:
    df = dfs[label]
    g = df.groupby('建设单位')[COLS].sum().fillna(0).astype(int)
    builder_data[label] = {}
    for b in g.index:
        w = int(g.loc[b, COLS[0]])
        y = int(g.loc[b, COLS[1]])
        n = int(g.loc[b, COLS[2]])
        z = w + n
        builder_data[label][b] = {'告警未立项': w, '已帐外已立项': y, '已帐外未立项': n, '整改指标': z}

# ===== 分公司排名 =====
print("\n=== 分公司排名（8/7→8/13 整改指标变化） ===")
rank = []
all_branches = sorted(set(branch_data['7月31日'].keys()) | set(branch_data['8月7日'].keys()) | set(branch_data['8月13日'].keys()))
for b in all_branches:
    def get(d, k):
        return d.get(b, {}).get(k, 0)
    t0 = get(branch_data['7月31日'], '整改指标')
    t1 = get(branch_data['8月7日'], '整改指标')
    t2 = get(branch_data['8月13日'], '整改指标')
    d = t2 - t1
    rank.append((b, t0, t1, t2, d))
rank.sort(key=lambda r: r[4])
for b, t0, t1, t2, d in rank:
    flag = '降' if d < 0 else ('升' if d > 0 else '平')
    print(f"  {b}: 31={t0} 07={t1} 13={t2} 周变化={d}({flag})")

# ===== 专业排名 =====
print("\n=== 专业排名（8/7→8/13 整改指标变化） ===")
spec_rank = []
all_specs = sorted(set(spec_data['7月31日'].keys()) | set(spec_data['8月7日'].keys()) | set(spec_data['8月13日'].keys()))
for s in all_specs:
    def get(d, k):
        return d.get(s, {}).get(k, 0)
    t0 = get(spec_data['7月31日'], '整改指标')
    t1 = get(spec_data['8月7日'], '整改指标')
    t2 = get(spec_data['8月13日'], '整改指标')
    d = t2 - t1
    spec_rank.append((s, t0, t1, t2, d))
spec_rank.sort(key=lambda r: r[4])
for s, t0, t1, t2, d in spec_rank:
    print(f"  {s}: 31={t0} 07={t1} 13={t2} 周变化={d}")

# ===== 输出 JSON =====
out = {
    'dates': LABELS,
    'overall': overall,
    'branch': branch_data,
    'specialty': spec_data,
    'builder': builder_data,
}
out_path = os.path.join(BASE, '.temp', 'chart_data.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
print(f"\nJSON 已保存: {out_path}")

# ===== 建设单位汇总输出 =====
print("\n=== 建设单位（8月13日） ===")
b13 = builder_data['8月13日']
for b in sorted(b13.keys(), key=lambda k: -b13[k]['整改指标']):
    v = b13[b]
    print(f"  {b}: 告警={v['告警未立项']} 已立项={v['已帐外已立项']} 未立项={v['已帐外未立项']} 整改={v['整改指标']}")
