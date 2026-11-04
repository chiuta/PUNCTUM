#!/usr/bin/env python3
"""Asamblează src/ într-un singur fișier HTML: python3 build.py [ieșire]"""
import sys,glob,re
out=sys.argv[1] if len(sys.argv)>1 else 'dist/punctum.html'
tpl=open('src/template.html',encoding='utf-8').read()
css=open('src/style.css',encoding='utf-8').read()
js=''.join(open(f,encoding='utf-8').read() for f in sorted(glob.glob('src/js/*.js')))
import json,os
ALIAS={'PTX':'pts','VX':'var'}
JSON_NAMES={'COURSE'}
def cat(pat):
    return '\n'.join(open(f,encoding='utf-8').read().strip('\n') for f in sorted(glob.glob(pat)))
def jcat(pat):
    out=[]
    for f in sorted(glob.glob(pat)):
        d=json.load(open(f,encoding='utf-8'))
        out+= d if isinstance(d,list) else [d]
    return json.dumps(out,ensure_ascii=False)
def sub(m):
    n=m.group(1);base=ALIAS.get(n,n.lower())
    js_files=glob.glob(f'src/data/{base}_*.json')
    if js_files: return jcat(f'src/data/{base}_*.json')
    if glob.glob(f'src/data/{base}_*.txt'): return cat(f'src/data/{base}_*.txt')
    return '[]' if n in JSON_NAMES else ''
js=re.sub(r'/\*@@([A-Z0-9_]+)@@\*/',sub,js)
def i18n_blocks():
    out=[]
    for f in sorted(glob.glob('src/i18n/*.json')):
        lang=os.path.basename(f)[:-5]
        d=json.load(open(f,encoding='utf-8'))
        txt=json.dumps(d,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
        out.append(f'<script type="application/json" id="i18n-{lang}">{txt}</script>')
    return '\n'.join(out)
html=tpl.replace('{{CSS}}',css).replace('{{I18N}}',i18n_blocks()).replace('{{JS}}',js)
open(out,'w',encoding='utf-8').write(html)
print('built',out,len(html),'bytes')
