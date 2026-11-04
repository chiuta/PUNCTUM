#!/usr/bin/env python3
"""python3 tools/delta.py N : adaugă șirurile noi din strings_live.json la strings_ro.json (id-uri stabile) și scrie research/tr/chunk_N.tsv"""
import json,sys
live=json.load(open('research/strings_live.json',encoding='utf-8'));ro=json.load(open('research/strings_ro.json',encoding='utf-8'))
have=set(ro);add=[x for x in live if x not in have]
open(f'research/tr/chunk_{sys.argv[1]}.tsv','w',encoding='utf-8').write(''.join(f'{len(ro)+i}\t{x}\n' for i,x in enumerate(add)))
json.dump(ro+add,open('research/strings_ro.json','w',encoding='utf-8'),ensure_ascii=False)
print('noi:',len(add),'caractere:',sum(map(len,add)),'| live:',len(live),'| mort:',len(have-set(live)))
