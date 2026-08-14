# -*- coding: utf-8 -*-
import pandas as pd, sys, json
sys.stdout.reconfigure(encoding='utf-8')

BASE = r"D:\工作\周报\账外数据"
FILES = ["7月31日账外明细.csv", "8月7日账外明细.csv", "8月13日账外明细.csv"]

MAP = {
    '武汉':'武汉','武昌':'武汉','汉口':'武汉','汉阳':'武汉','青山':'武汉','洪山':'武汉','江夏':'武汉','黄陂':'武汉','新洲':'武汉','蔡甸':'武汉','东西湖':'武汉','沌口':'武汉','汉南':'武汉','江岸':'武汉','江汉':'武汉','硚口':'武汉','武东':'武汉','武钢':'武汉','沙湖':'武汉','民权路':'武汉','白玉山':'武汉','喻家山':'武汉','华中科技':'武汉','奥特莱斯':'武汉',
    '孝感':'孝感','安陆':'孝感','应城':'孝感','云梦':'孝感','大悟':'孝感','汉川':'孝感','孝昌':'孝感','双峰':'孝感','孝南':'孝感',
    '襄阳':'襄阳','谷城':'襄阳','保康':'襄阳','南漳':'襄阳','宜城':'襄阳','老河口':'襄阳','枣阳':'襄阳','襄州':'襄阳','襄城':'襄阳','樊城':'襄阳',
    '咸宁':'咸宁','赤壁':'咸宁','崇阳':'咸宁','通山':'咸宁','通城':'咸宁','嘉鱼':'咸宁','温泉':'咸宁','咸安':'咸宁','新城':'咸宁','官埠':'咸宁','汀泗':'咸宁','咸宁安苑':'咸宁',
    '宜昌':'宜昌','当阳':'宜昌','宜都':'宜昌','枝江':'宜昌','长阳':'宜昌','五峰':'宜昌','秭归':'宜昌','兴山':'宜昌','远安':'宜昌','夷陵':'宜昌','西陵':'宜昌','伍家':'宜昌','点军':'宜昌','猇亭':'宜昌','高新':'宜昌','三峡':'宜昌','流水镇':'宜昌','土门':'宜昌',
    '荆州':'荆州','公安':'荆州','监利':'荆州','江陵':'荆州','石首':'荆州','洪湖':'荆州','松滋':'荆州','沙市':'荆州',
    '黄石':'黄石','大冶':'黄石','阳新':'黄石','下陆':'黄石','铁山':'黄石','西塞':'黄石','团城山':'黄石',
    '鄂州':'鄂州','华容':'鄂州','梁子湖':'鄂州',
    '黄冈':'黄冈','黄梅':'黄冈','红安':'黄冈','麻城':'黄冈','武穴':'黄冈','蕲春':'黄冈','浠水':'黄冈','罗田':'黄冈','英山':'黄冈','团风':'黄冈','龙感湖':'黄冈',
    '随州':'随州','广水':'随州','随县':'随州','曾都':'随州',
    '恩施':'恩施','利川':'恩施','巴东':'恩施','建始':'恩施','咸丰':'恩施','宣恩':'恩施','来凤':'恩施','鹤峰':'恩施','茶店子':'恩施','溪丘湾':'恩施','绿葱坡':'恩施','东壤口':'恩施','官渡口':'恩施','金果坪':'恩施','巫峡口':'恩施',
    '荆门':'荆门','京山':'荆门','钟祥':'荆门','沙洋':'荆门','掇刀':'荆门','东宝':'荆门',
    '十堰':'十堰','郧阳':'十堰','丹江口':'十堰','竹山':'十堰','竹溪':'十堰','房县':'十堰','郧西':'十堰','茅箭':'十堰','张湾':'十堰','五堰':'十堰','汉江师范学院':'十堰','国药东风':'十堰',
    '仙桃':'仙桃','潜江':'潜江','天门':'天门',
}

def branch(row):
    text = ""
    if isinstance(row.get('建设单位'), str):
        text = row['建设单位']
    for kw in ['武汉','黄石','襄阳','孝感','咸宁','宜昌','鄂州','荆州','十堰','荆门','黄冈','随州','恩施','仙桃','潜江','天门']:
        if kw in text:
            return kw
    s = str(row.get('工程名称',''))
    for k, v in MAP.items():
        if k in s:
            return v
    st = str(row.get('站点名称',''))
    for k, v in MAP.items():
        if k in st:
            return v
    return '其他'

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

cols = ['疑似帐外预告警且未立项站点数','疑似已帐外且已立项站点数','疑似已帐外且未立项站点数']
CN = ['告警未立项','已帐外已立项','已帐外未立项']

dates = ['7月31日','8月7日','8月13日']
data = {}
for f, dt in zip(FILES, dates):
    df = pd.read_csv(f, encoding='utf-8-sig')
    df['分公司'] = df.apply(branch, axis=1)
    df['专业'] = df['工程名称'].apply(specialty)
    data[dt] = df

# 重新计算列（列名较长，直接用原名）
cols_full = ['疑似帐外预告警且未立项站点数','疑似已帐外且已立项站点数','疑似已帐外且未立项站点数']
out = {'dates': dates, 'branch': {}, 'specialty': {}, 'overall': []}
for dt in dates:
    df = data[dt]
    tw = df[cols_full[0]].fillna(0).astype(int).sum()
    ty = df[cols_full[1]].fillna(0).astype(int).sum()
    tn = df[cols_full[2]].fillna(0).astype(int).sum()
    out['overall'].append({'date': dt, '告警未立项': int(tw), '已帐外已立项': int(ty), '已帐外未立项': int(tn), '整改指标': int(tw+tn)})
    # 分公司
    g2 = df.groupby('分公司')[cols_full].sum().fillna(0).astype(int)
    out['branch'][dt] = {}
    for b, row in g2.iterrows():
        out['branch'][dt][b] = {'告警未立项': int(row[cols_full[0]]), '已帐外已立项': int(row[cols_full[1]]), '已帐外未立项': int(row[cols_full[2]]), '整改指标': int(row[cols_full[0]]+row[cols_full[2]])}
    # 专业
    g3 = df.groupby('专业')[cols_full].sum().fillna(0).astype(int)
    out['specialty'][dt] = {}
    for sp, row in g3.iterrows():
        out['specialty'][dt][sp] = {'告警未立项': int(row[cols_full[0]]), '已帐外已立项': int(row[cols_full[1]]), '已帐外未立项': int(row[cols_full[2]]), '整改指标': int(row[cols_full[0]]+row[cols_full[2]])}

with open(r"D:\工作\周报\账外数据\.temp\chart_data.json", 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print('saved')