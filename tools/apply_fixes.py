#!/usr/bin/env python3
"""python3 tools/apply_fixes.py research/tr/fix_*.tsv -> actualizează src/i18n/<lang>.json (format: limba<TAB>id<TAB>traducere<TAB>motiv)"""
import json,sys,glob
ro=json.load(open('research/strings_ro.json',encoding='utf-8'));cache={};n=0;bad=0
for f in sys.argv[1:] or sorted(glob.glob('research/tr/fix_*.tsv')):
    for ln in open(f,encoding='utf-8'):
        p=ln.rstrip('\n').split('\t')
        if len(p)<3 or not p[1].isdigit() or int(p[1])>=len(ro) or p[0] not in ('en','fr','it','es','pt','de','hu'):bad+=1;continue
        l=p[0]
        d=cache.setdefault(l,json.load(open(f'src/i18n/{l}.json',encoding='utf-8')))
        d[ro[int(p[1])]]=p[2].strip();n+=1
for l,d in cache.items():json.dump(d,open(f'src/i18n/{l}.json','w',encoding='utf-8'),ensure_ascii=False,separators=(',',':'))
print('aplicate',n,'ignorate',bad)
