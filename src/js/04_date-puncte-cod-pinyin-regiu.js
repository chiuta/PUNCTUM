/* ================= DATE: puncte  cod|pinyin|regiune|localizare|acțiuni|atenție ================= */
const PTX=`/*@@PTX@@*/`;
function merOf(c){const m=c.match(/^[A-Z]{2}/);return m?m[0]:'EX'}
const PT=(()=>{const mp=new Map();PTX.split('\n').forEach(l=>{l=l.trim();if(!l||l.startsWith('#'))return;const a=l.split('|');if(a.length<5)return;mp.set(a[0],{c:a[0],p:a[1],r:a[2],l:a[3],u:a[4],w:a[5]||'',tg:a[6]||'',mn:a[7]||'',m:merOf(a[0])})});
const ord=['LU','LI','ST','SP','HT','SI','BL','KI','PC','TE','GB','LR','CV','GV','EX'];
const num=c=>{const m=c.match(/(\d+)/);return m?+m[1]:0};
return [...mp.values()].sort((x,y)=>ord.indexOf(x.m)-ord.indexOf(y.m)||num(x.c)-num(y.c)||cmp(x.c,y.c))})();

