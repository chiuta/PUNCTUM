#!/usr/bin/env python3
"""Asamblează src/ într-un singur fișier HTML: python3 build.py [ieșire]"""
import sys,glob,re
out=sys.argv[1] if len(sys.argv)>1 else 'dist/punctum.html'
tpl=open('src/template.html',encoding='utf-8').read()
css=open('src/style.css',encoding='utf-8').read()
js=''.join(open(f,encoding='utf-8').read() for f in sorted(glob.glob('src/js/*.js')))
def cat(pat):
    return '\n'.join(open(f,encoding='utf-8').read().strip('\n') for f in sorted(glob.glob(pat)))
js=js.replace('/*@@PTX@@*/',cat('src/data/pts_*.txt')).replace('/*@@VX@@*/',cat('src/data/var_*.txt'))
html=tpl.replace('{{CSS}}',css).replace('{{JS}}',js)
open(out,'w',encoding='utf-8').write(html)
print('built',out,len(html),'bytes')
