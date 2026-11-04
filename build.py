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
FILES={'MAST':'src/data/masaj_tehnici.json','MASS':'src/data/masaj_simult.json','MASC':'src/data/masaj_secv.json'}
def sub(m):
    n=m.group(1);base=ALIAS.get(n,n.lower())
    if n in FILES:
        return json.dumps(json.load(open(FILES[n],encoding='utf-8')),ensure_ascii=False) if os.path.exists(FILES[n]) else ('{}' if n=='MAST' else '[]')
    js_files=glob.glob(f'src/data/{base}_*.json')
    if js_files: return jcat(f'src/data/{base}_*.json')
    if glob.glob(f'src/data/{base}_*.txt'): return cat(f'src/data/{base}_*.txt')
    return '[]' if n in JSON_NAMES else ''
js=re.sub(r'/\*@@([A-Z0-9_]+)@@\*/',sub,js)
def i18n_blocks():
    """chei românești o singură dată + câte un tablou de traduceri pe limbă (aliniat cu cheile)"""
    files=sorted(glob.glob('src/i18n/*.json'))
    dicts={os.path.basename(f)[:-5]:json.load(open(f,encoding='utf-8')) for f in files}
    keys=sorted({k for d in dicts.values() for k in d})
    idx={k:i for i,k in enumerate(keys)}
    esc=lambda o:json.dumps(o,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
    out=[f'<script type="application/json" id="i18n-keys">{esc(keys)}</script>']
    for lang,d in dicts.items():
        out.append(f'<script type="application/json" id="i18n-{lang}">{esc([d.get(k,"") for k in keys])}</script>')
    return '\n'.join(out)
html=tpl.replace('{{CSS}}',css).replace('{{I18N}}',i18n_blocks()).replace('{{JS}}',js)
open(out,'w',encoding='utf-8').write(html)
print('built',out,len(html),'bytes')
