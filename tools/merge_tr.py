#!/usr/bin/env python3
"""python3 tools/merge_tr.py [lang...] -> src/i18n/<lang>.json din research/tr/out_<lang>_N.tsv"""
import json,sys,glob,os
src=json.load(open('research/strings_ro.json',encoding='utf-8'))
import os.path
LIVE=set(json.load(open('research/strings_live.json',encoding='utf-8'))) if os.path.exists('research/strings_live.json') else None
langs=sys.argv[1:] or sorted({os.path.basename(f).split('_')[1] for f in glob.glob('research/tr/out_*_*.tsv')})
os.makedirs('src/i18n',exist_ok=True)
for l in langs:
    d={};bad=0
    for f in sorted(glob.glob(f'research/tr/out_{l}_*.tsv')):
        for ln in open(f,encoding='utf-8'):
            ln=ln.rstrip('\n')
            if not ln:continue
            p=ln.split('\t')
            if len(p)<2 or not p[0].isdigit() or int(p[0])>=len(src):bad+=1;continue
            t='\t'.join(p[1:]).strip()
            if t and t!=src[int(p[0])] and (LIVE is None or src[int(p[0])] in LIVE):d[src[int(p[0])]]=t
    json.dump(d,open(f'src/i18n/{l}.json','w',encoding='utf-8'),ensure_ascii=False,separators=(',',':'))
    print(l,len(d),'/',len(src),'rău formatate:',bad)
os.system('python3 tools/apply_fixes.py')
