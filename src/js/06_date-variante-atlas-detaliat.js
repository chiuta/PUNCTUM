/* ================= DATE: variante (atlas detaliat) =================
 câmpuri: id¦nume¦cat¦inv(0 non-invaziv,1 minim,2 invaziv)¦risc(1-3)¦ev(m,l,w,x)¦auto(d,p,n)¦origine¦principiu¦pași(//)¦instrumente¦durată¦zone¦indicații¦dovezi¦siguranță¦practicant */
const CATN={ace:'Cu ace și înțepare',pres:'Presiune și masaj manual',cald:'Căldură și moxibustie',vid:'Vid, răzuire și percuție',tehno:'Stimulare tehnologică',micro:'Microsisteme (ureche, scalp, mână, față, talpă)',scoli:'Școli și tradiții',self:'Auto-practici',ctrl:'Controversate / fără dovezi'};
const CATC={ace:'#b5573a',pres:'#2f7d6d',cald:'#c0392b',vid:'#7b4fa3',tehno:'#1f4e79',micro:'#c99a2e',scoli:'#2e8b57',self:'#0f8b8d',ctrl:'#6c7a89'};
const EVN={m:'Dovezi moderate (unele indicații)',l:'Dovezi limitate',w:'Dovezi slabe',x:'Fără dovezi / neștiințific'};
const EVC={m:'#2f7d6d',l:'#c99a2e',w:'#b5573a',x:'#6c7a89'};
const INVN=['Non-invaziv','Minim invaziv','Invaziv (înțepare)'];
const RISKN=['','Risc redus','Risc mediu','Risc ridicat'];
const AUTN={d:'Poți face singur',p:'Parțial (basic acasă)',n:'Doar practicant'};
const VX=`/*@@VX@@*/`;
const VAR=VX.split('\n').filter(l=>l.trim()&&!l.startsWith('#')).map(l=>{const a=l.split('¦');return{id:a[0],n:a[1],cat:a[2],inv:+a[3],risc:+a[4],ev:a[5],auto:a[6],or:a[7],pr:a[8],pas:(a[9]||'').split(' // '),ins:a[10],dur:a[11],zon:a[12],ind:a[13],dov:a[14],sig:a[15],who:a[16]}});

