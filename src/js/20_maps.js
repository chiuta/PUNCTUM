/* ================= HĂRȚI SVG INTERACTIVE (20_maps.js) =================
   Hărți schematice: corp față/spate, mână (palmă/dos), picior (talpă/dos), ureche.
   Poziționare prin WAYPOINTS: fiecare cale = [[x,y,n?],...]; al treilea element fixează ("pin") punctul n;
   punctele dintre două pinuri se distribuie proporțional cu lungimea căii. */
const MAPUI={
 ro:{title:'Hărți',warn:'Hartă schematică, nu la scară: verifică mereu localizarea după descrierea anatomică și măsurarea în cun.',
  all:'Toate',front:'Corp față',back:'Corp spate',handP:'Mână: palmă',handD:'Mână: dos',footS:'Picior: talpă',footD:'Picior: dos',ear:'Ureche',
  search:'Caută cod',sph:'ex. ST36',zin:'Mărește',zout:'Micșorează',reset:'Resetează',refl:'Zone de reflexologie',toList:'→ în lista de puncte',
  nopos:'Acest punct nu are încă poziție pe hărți.',nomatch:'Niciun punct cu acest cod.',found:'găsite',hint:'Atinge un punct pentru detalii. Etichetele apar la mărire, la trecerea cursorului sau la focalizare.',
  pick:'Alege un punct pe hartă.',merf:'Filtru meridian',views:'Vedere',bil:'Se arată o singură parte; punctele sunt bilaterale (în afară de CV și GV).',
  yin:'linie continuă = Yin',yang:'linie întreruptă = Yang',earNote:'Ureche dreaptă, poziții schematice (Nogier / hartă chineză); diferă între școli.',
  zone:'Zonă',zl:['Cap, sinusuri','Ochi, urechi','Torace','Digestiv, rinichi','Pelvis, sciatic','Coloană','Umăr, braț, șold'],
  reflNote:'Zone de reflexologie (corespondențe pretinse, fără dovezi de eficacitate).',earArea:'Zona',side:'Dreapta',mapAria:'Hartă SVG interactivă',
  a:{hx:'helix',ah:'antihelix',sc:'scafă',tf:'fosă triunghiulară',cy:'cymba',cv:'cavum conchae',tg:'tragus',at:'antitragus',lb:'lob',cr:'rădăcina helixului',nt:'incizură intertragică'}},
 en:{title:'Maps',warn:'Schematic map, not to scale: always verify the location with the anatomical description and cun measurement.',
  all:'All',front:'Body front',back:'Body back',handP:'Hand: palm',handD:'Hand: back',footS:'Foot: sole',footD:'Foot: top',ear:'Ear',
  search:'Search code',sph:'e.g. ST36',zin:'Zoom in',zout:'Zoom out',reset:'Reset',refl:'Reflexology zones',toList:'→ to the points list',
  nopos:'This point has no map position yet.',nomatch:'No point with this code.',found:'found',hint:'Tap a point for details. Labels appear on zoom, on hover or on focus.',
  pick:'Pick a point on the map.',merf:'Meridian filter',views:'View',bil:'Only one side is shown; points are bilateral (except CV and GV).',
  yin:'solid line = Yin',yang:'dashed line = Yang',earNote:'Right ear, schematic positions (Nogier / Chinese chart); schools differ.',
  zone:'Zone',zl:['Head, sinuses','Eyes, ears','Chest','Digestive, kidney','Pelvis, sciatic','Spine','Shoulder, arm, hip'],
  reflNote:'Reflexology zones (claimed correspondences, no proof of efficacy).',earArea:'Area',side:'Right',mapAria:'Interactive SVG map',
  a:{hx:'helix',ah:'antihelix',sc:'scapha',tf:'triangular fossa',cy:'cymba conchae',cv:'cavum conchae',tg:'tragus',at:'antitragus',lb:'lobe',cr:'helix root',nt:'intertragic notch'}}
};
function mu(k){const l=(typeof S!=='undefined'&&S.lang)||'ro';return (MAPUI[l]&&MAPUI[l][k])||MAPUI.ro[k]||MAPUI.en[k]||k}

/* ---------- geometrie ---------- */
const fx=n=>Math.round(n*10)/10;
function smp(p,closed){const n=p.length,g=i=>closed?p[((i%n)+n)%n]:p[Math.max(0,Math.min(n-1,i))];
 let d='M'+fx(p[0][0])+' '+fx(p[0][1]);const m=closed?n:n-1;
 for(let i=0;i<m;i++){const a=g(i-1),b=g(i),c=g(i+1),e=g(i+2);
  d+='C'+fx(b[0]+(c[0]-a[0])/6)+' '+fx(b[1]+(c[1]-a[1])/6)+' '+fx(c[0]-(e[0]-b[0])/6)+' '+fx(c[1]-(e[1]-b[1])/6)+' '+fx(c[0])+' '+fx(c[1])}
 return d+(closed?'Z':'')}
/* membru: puncte [x,y,semi-lățime] */
function limb(p,cap){const L=[],R=[];
 p.forEach((q,i)=>{const a=p[Math.max(0,i-1)],b=p[Math.min(p.length-1,i+1)];let tx=b[0]-a[0],ty=b[1]-a[1];const l=Math.hypot(tx,ty)||1;tx/=l;ty/=l;
  L.push([q[0]-ty*q[2],q[1]+tx*q[2]]);R.push([q[0]+ty*q[2],q[1]-tx*q[2]])});
 const e=p[p.length-1],s=p[0],c=cap==null?.6:cap,n=p.length;
 const tg=(a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;return [dx/l,dy/l]};
 const t1=tg(p[n-2],e),t0=tg(p[1],s);
 const te=[e[0]+t1[0]*e[2]*c,e[1]+t1[1]*e[2]*c],ts=[s[0]+t0[0]*s[2]*c,s[1]+t0[1]*s[2]*c];
 return smp([...L,te,...R.reverse(),ts],true)}
function limbAt(p,y,k){let i=0;while(i<p.length-2&&y>p[i+1][1])i++;const a=p[i],b=p[i+1],t=Math.max(0,Math.min(1,(y-a[1])/((b[1]-a[1])||1)));
 return [fx(a[0]+(b[0]-a[0])*t+k*(a[2]+(b[2]-a[2])*t)),y]}
const mir=(p,w)=>p.map(q=>[w-q[0],q[1],q[2]]);

/* ---------- siluete corp (viewBox 320x680) ---------- */
const ARM=[[222,136,17],[230,200,15],[243,262,12.5],[251,310,11],[257,358,8.5],[261,382,11.5],[266,432,8.5]];
const THB=[[268,386,5.5],[277,402,5],[283,418,4]];
const LEG=[[188,330,25],[188,400,23],[186,478,16],[185,540,17.5],[183,606,9.5],[183,616,9]];
const FOOT=[[184,612,10],[188,634,13],[193,654,12]];
const A=(y,k,n)=>[...limbAt(ARM,y,k),n];
const G=(y,k,n)=>[...limbAt(LEG,y,k),n];
function bodyShapes(back){
 const hr=[[0,12],[14,15],[25,28],[29,48],[28,62],[23,76],[14,86],[0,90]];
 const head=smp([...hr.map(q=>[160+q[0],q[1]]),...hr.slice(1,-1).reverse().map(q=>[160-q[0],q[1]])],true);
 const th=[[13,98],[20,111],[42,119],[62,128],[66,138],[58,162],[52,190],[46,226],[44,260],[47,298],[54,332],[50,356],[0,364]];
 const torso=smp([...th.map(q=>[160+q[0],q[1]]),...th.slice(1,-1).reverse().map(q=>[160-q[0],q[1]])],true);
 const parts=[head,torso,'M148 80h24v34h-24z',limb(ARM),limb(THB,.8),limb(mir(ARM,320)),limb(mir(THB,320),.8),limb(LEG),limb(mir(LEG,320)),limb(FOOT),limb(mir(FOOT,320))];
 return parts.map(d=>`<path d="${d}"/>`).join('')+'<ellipse cx="191" cy="52" rx="5" ry="9"/><ellipse cx="129" cy="52" rx="5" ry="9"/>'}
function bodyDeco(back){
 const s='fill="none" stroke="var(--mut)" stroke-width="1" opacity=".55" stroke-linecap="round"';
 if(!back)return `<g ${s}><ellipse cx="172" cy="44" rx="6" ry="2.6"/><ellipse cx="148" cy="44" rx="6" ry="2.6"/><path d="M166 36q6-3 17 0M154 36q-6-3-17 0M160 46v10q-3 3-1 4h4q2-1-1-4M149 70q11 5 22 0"/><circle cx="190" cy="190" r="2"/><circle cx="130" cy="190" r="2"/><circle cx="160" cy="272" r="2"/><ellipse cx="187" cy="474" rx="9" ry="11"/><ellipse cx="133" cy="474" rx="9" ry="11"/><path d="M148 114q12 10 24 0M146 330q14 14 28 0"/></g>`;
 return `<g ${s}><path d="M160 98V340" stroke-dasharray="2 4"/><path d="M168 122q26 8 38 40M152 122q-26 8-38 40M170 118l30 24M150 118l-30 24"/><path d="M118 352q42 22 84 0M160 340v18"/><ellipse cx="187" cy="478" rx="9" ry="8"/></g>`}

/* ---------- date: căi + pinuri (corp) ---------- */
const FRONT_PATHS=[
 ['LU',[[205,148,1],[208,138,2],A(212,.35,3),A(262,.4,5),A(348,.55,7),A(361,.5,9),[268,392,10],[283,419,11]]],
 ['LI',[A(426,.5,1),A(388,.9,4),A(360,.9,5),A(262,.9,11),A(200,.9),[229,138,15],[207,125,16],[173,101,18],[166,70,19],[167,60,20]]],
 ['ST',[[173,51,1],[173,57,2],[170,64,3],[167,71,4],[175,80,5],[181,72,6],[186,56,7],[178,25,8]]],
 ['ST',[[172,98,9],[190,113,12],[190,123,13],[190,190,17],[190,203,18],[175,219,19],[175,272,25],[175,316,30],G(342,.35,31),G(392,.35,32),G(425,.4,34),G(486,.45,35),G(512,.4,36),G(556,.4,37),G(550,.55),G(610,.1,41),[190,624,42],[192,636,43],[196,646,44],[200,652,45]]],
 ['SP',[[183,652,1],[181,644,2],[180,634,3],[181,624,4],G(612,-.8,5),G(588,-.82,6),G(516,-.8,9),G(449,-.55,10),G(409,-.5,11),[182,325,12],[190,307,13],[190,283,14],[190,272,15],[190,246,16],[205,200,17],[205,186,18],[205,172,19],[205,158,20],[216,205,21]]],
 ['HT',[[214,148,1],A(262,-.75,3),A(341,-.7,4),A(358,-.65,7),A(392,-.2,8),A(428,-.7,9)]],
 ['PC',[[197,190,1],A(218,0,2),A(262,-.1,3),A(342,0,6),A(358,0,7),A(392,0,8),A(432,0,9)]],
 ['KI',[[187,651,1],[182,634,2],G(606,-.85,3),G(588,-.85,7),G(560,-.85,9),G(498,-.85,10),G(420,-.9),G(372,-.9),[164,316,11],[164,281,15],[164,272,16],[164,255,17],[164,219,21],[175,203,22],[175,148,26],[175,132,27]]],
 ['LR',[[186,652,1],[189,646,2],[190,632,3],G(612,-.6,4),G(516,-.62,7),G(488,-.7,8),G(400,-.6,10),G(360,-.6,11),[168,340,12]]],
 ['LR',[[213,266,13],[190,215,14]]],
 ['GB',[[184,46,1],[189,60,2],[187,36,3],[182,24,4],[190,44,8]]],
 ['GB',[[172,28,14],[172,21,15]]],['GB',[[180,15,13]]],
 ['GB',[[219,176,22],[212,181,23],[190,228,24],[213,266,25],[216,274,26],[202,300,27],[196,311,28],[211,322,29],[214,336,30],G(405,.85,31),G(430,.88,32),G(470,.9,33),G(512,.88,34),G(563,.85,35),G(575,.84,37),G(590,.82,39),[197,618,40],[192,638,41],[191,643,42],[192,648,43],[194,653,44]]],
 ['TE',[[187,52,21],[188,40,22],[183,37,23]]],
 ['SI',[[177,58,18],[190,56,19]]],
 ['BL',[[165,44,1],[166,34,2],[167,24,3]]],
 ['BL',[[198,653,67]]],
 ['CV',[[160,316,2],[160,307,3],[160,298,4],[160,290,5],[160,285,6],[160,280,7],[160,272,8],[160,264,9],[160,255,10],[160,246,11],[160,237,12],[160,228,13],[160,220,14],[160,211,15],[160,205,16],[160,190,17],[160,176,18],[160,162,19],[160,148,20],[160,128,21],[160,114,22],[160,98,23],[160,74,24]]],
 ['GV',[[160,18,23],[160,22,24]]],['GV',[[160,57,25],[160,64,26],[160,69,27],[160,74,28]]]
];
const FRONT_XP={'EX-HN3':[[160,38]],'EX-HN5':[[186,30]],'EX-UE11':[[283,420],A(430,.5),A(434,0),A(433,-.3),A(428,-.62)]};
const FRONT_OV={};
const BACK_PATHS=[
 ['GV',[[160,16,20],[160,38,19],[160,50,18],[160,60,17],[160,70,16],[160,82,15],[160,112,14],[160,121,13],[160,143,12],[160,165,11],[160,177,10],[160,188,9],[160,211,8],[160,222,7],[160,234,6],[160,258,5],[160,268,4],[160,290,3],[160,334,2],[160,343,1]]],
 ['BL',[[167,20,7],[169,62,9],[168,84,10],[170,120,11],[170,188,17],[170,211,18],[170,245,21],[170,290,25],[170,300,26],[170,332,30]]],
 ['BL',[[165,310,31],[164,332,34],[163,344,35],G(361,.2,36),G(424,.2,37),G(468,.4,38),G(487,.4,39),G(487,0,40),G(505,0,55),G(530,0,56),G(555,0,57),G(606,.75,60),[187,642,61]]],
 ['BL',[[180,131,41],[180,188,46],[180,211,47],[180,268,52],[177,318,53],[175,332,54]]],
 ['SI',[A(428,-.6,1),A(404,-.88,2),A(392,-.9,3),A(372,-.88,4),A(358,-.85,5),A(346,-.6,6),A(312,-.55,7),A(262,-.6,8),[217,165,9],[224,148,10],[196,160,11],[200,140,12],[188,141,13],[181,122,14],[174,112,15],[177,97,16],[183,84,17]]],
 ['TE',[A(430,-.3,1),A(395,-.2,3),A(358,0,4),A(342,0,5),A(334,0,6),A(326,0,8),A(302,0,9),A(258,0,10),A(190,0,13),[224,145,14],[190,127,15],[178,90,16],[183,67,17],[186,56,18],[186,46,19],[188,39,20]]],
 ['LI',[A(358,.9,5),A(280,.85,10),A(262,.9,11),A(220,.9,13),A(180,.88,14),[229,138,15],[207,125,16]]],
 ['GB',[[185,38,8],[183,50,9],[180,59,10],[177,66,11],[180,73,12]]],
 ['GB',[[175,15,16],[178,22,17],[178,31,18],[172,60,19],[172,82,20],[194,121,21]]],
 ['GB',[[203,337,30]]]
];
const BACK_XP={'EX':[[178,76]],'EX-HN1':[[160,10],[152,19],[168,19],[160,27]],'EX-B1':[[164,117]],'EX-B2':[[164,124],[164,154],[164,188],[164,222],[164,258],[164,279],[164,300]]};

/* ---------- date: mână ---------- */
const FA=[[150,345,24],[150,520,28],[150,640,32]];
const H=(y,k,n)=>[...limbAt(FA,y,k),n];
const HAND_FING=[[178,40,215],[155,22,215],[131,38,222],[109,92,235]];
function handInner(){
 const fl=HAND_FING.map(f=>{const x=f[0],t=f[1],b=f[2];return limb([[x,b,10.5],[x,(b+t)/2,10],[x,t+9,9.5],[x,t+2,6]],.6)});
 return [limb(FA),limb([[150,350,32],[150,330,42],[150,260,44],[150,215,42]]),...fl,limb([[190,312,20],[222,272,17],[246,228,14.5],[258,194,12]],.7)].map(d=>`<path d="${d}"/>`).join('')}
const HANDP_PATHS=[
 ['LU',[H(618,.45,5),H(506,.5,6),H(383,.6,7),H(352,.55,9),[206,290,10],[238,250],[256,205],[258,190,11]]],
 ['PC',[H(618,-.1,3),H(391,0,6),H(347,0,7),[150,262,8],[155,26,9]]],
 ['HT',[H(618,-.75,3),H(380,-.7,4),H(347,-.65,7),[122,265,8],[116,97,9]]],
 ['LI',[[186,48,1],[188,205,2],[190,226,3],[207,284,4]]],
 ['SI',[[101,98,1],[101,228,2],[108,246,3],[108,285,4],H(352,-.9,5)]],
 ['TE',[[124,46,1]]]
];
const HANDD_PATHS=[
 ['LI',[[186,48,1],[188,205,2],[190,226,3],[207,284,4],H(352,.9,5),H(560,.4,10),H(622,.4,11)]],
 ['TE',[[124,46,1],[125,214,2],[136,258,3],H(352,.1,4),H(391,0,5),H(414,0,6),H(437,0,8),H(515,0,9),[150,632,10]]],
 ['SI',[[101,98,1],[101,228,2],[106,248,3],[108,285,4],H(352,-.9,5),H(366,-.85,6),H(458,-.8,7),H(628,-.75,8)]],
 ['LU',[[258,190,11]]]
];
const HAND_TIPS=[[257,195],[178,46],[155,28],[131,44],[109,98]];
const HANDP_XP={'EX-UE11':HAND_TIPS};
const HANDD_XP={'EX-UE11':HAND_TIPS,'EX-UE9':[[200,262],[166,215],[143,218],[121,226]]};
/* ---------- date: picior ---------- */
const LD=(y,k,n)=>[...limbAt([[150,0,36],[150,120,31],[150,260,22],[150,310,21]],y,k),n];
const FOOTD_TOES=[[122,584,17,26],[146,594,12,22],[166,592,11.5,20],[183,586,10.5,18],[197,574,9.5,16]];
function footDInner(){
 return [limb([[150,0,36],[150,120,31],[150,260,22],[150,310,21]]),limb([[150,300,23],[150,360,32],[150,450,40],[152,520,43],[154,570,40]])].map(d=>`<path d="${d}"/>`).join('')+FOOTD_TOES.map(t=>`<ellipse cx="${t[0]}" cy="${t[1]}" rx="${t[2]}" ry="${t[3]}"/>`).join('')}
const FOOTD_PATHS=[
 ['ST',[LD(56,.3,36),LD(169,.3,37),[150,302,41],[150,380,42],[149,470,43],[153,552,44],[154,606,45]]],
 ['GB',[LD(10,.85,34),LD(181,.8,36),LD(218,.8,37),LD(256,.8,39),[168,322,40],[177,510,41],[180,530,42],[184,556,43],[186,580,44]]],
 ['LR',[[136,606,1],[137,556,2],[140,505,3],[139,310,4],LD(215,-.78,5),LD(15,-.85,7)]],
 ['SP',[[108,604,1],[107,552,2],[106,498,3],[110,448,4],[121,318,5],LD(256,-.9,6),LD(200,-.9,7),LD(60,-.9,8),LD(6,-.9,9)]],
 ['KI',[[116,372,2],[123,304,3],LD(247,-.7,7),LD(205,-.65,9),LD(8,-.6,10)]],
 ['BL',[[184,296,60],[181,330,62],[188,392,63],[193,436,64],[194,486,65],[195,528,66],[201,574,67]]]
];
const FOOTD_OV={ST40:LD(150,.5),GB35:LD(181,.95),KI4:[118,318],KI5:[130,326],KI6:[121,331],BL61:[188,338]};
const FOOTD_XP={'EX-LE10':[[134,590],[156,595],[174,590],[190,580]]};
const SOLE_TOES=[[190,64,22,34],[152,56,13,27],[126,66,12.5,24],[102,78,11.5,21],[80,96,10.5,18]];
const SOLE_BODY='M212 115C216 150 216 190 205 240C196 275 188 300 186 340C185 370 190 400 165 413C140 422 108 418 90 400C72 380 68 340 66 300C62 250 55 190 55 140C56 110 66 92 90 88C130 82 180 84 212 100Z';
function soleInner(){return `<path d="${SOLE_BODY}"/>`+SOLE_TOES.map(t=>`<ellipse cx="${t[0]}" cy="${t[1]}" rx="${t[2]}" ry="${t[3]}"/>`).join('')}
const FOOTS_PATHS=[];
const FOOTS_XP={KI1:[[132,185]]};
/* ---------- date: ureche (zone, nu puncte PT) ---------- */
const EAR=[
 ['Shenmen','Shenmen',118,88,'tf'],['Punctul Zero','Point Zero',160,130,'cr'],['Simpatic','Sympathetic',142,103,'ah'],
 ['Rinichi','Kidney',118,114,'cy'],['Ficat','Liver',100,152,'cv'],['Stomac','Stomach',136,134,'cr'],['Intestin subțire','Small intestine',142,116,'cy'],
 ['Intestin gros','Large intestine',152,146,'cv'],['Inimă','Heart',130,178,'cv'],['Plămân','Lung',108,194,'cv'],['Endocrin','Endocrine',150,222,'nt'],
 ['Apex (vârful urechii)','Ear apex',104,20,'hx'],['Nas extern','External nose',170,162,'tg'],['Suprarenală','Adrenal',172,184,'tg'],
 ['Subcortex','Subcortex',139,252,'at'],['Frunte','Forehead',123,246,'at'],['Occiput','Occiput',141,238,'at'],
 ['Coloană cervicală','Cervical spine',90,226,'ah'],['Coloană toracică','Thoracic spine',85,186,'ah'],['Coloană lombară','Lumbar spine',88,150,'ah'],
 ['Gleznă','Ankle',108,58,'ah'],['Genunchi','Knee',102,76,'ah'],['Șold','Hip',97,100,'ah'],
 ['Deget','Finger',62,72,'sc'],['Cot','Elbow',56,118,'sc'],['Umăr','Shoulder',56,162,'sc'],
 ['Alergie','Allergy',47,100,'hx'],['Dinte','Tooth',98,266,'lb'],['Maxilar','Jaw',120,266,'lb'],['Ochi','Eye',118,290,'lb'],['Amigdală','Tonsil',130,304,'lb'],['Obraz','Cheek',104,300,'lb']
];
function earShapes(){
 const f='fill="var(--soft)" stroke="var(--mut)" stroke-width="1.6" stroke-linejoin="round"',l='fill="none" stroke="var(--mut)" stroke-width="1.6" stroke-linecap="round"';
 return `<path ${f} d="${smp([[120,12],[80,22],[50,60],[40,120],[46,190],[62,250],[85,300],[110,325],[140,318],[158,285],[165,260],[172,225],[178,190],[178,150],[170,100],[160,60],[145,28]],true)}"/>
 <path ${l} stroke-width="1.2" d="M118 28C86 38 62 70 54 125C52 175 68 245 95 285"/>
 <path ${l} d="M100 235C88 200 85 160 95 125C92 95 100 70 120 50M95 125C115 112 135 102 158 94M176 130L122 133"/>
 <ellipse cx="170" cy="177" rx="10" ry="22" ${f}/><ellipse cx="136" cy="248" rx="17" ry="9" transform="rotate(-18 136 248)" ${f}/>
 <path ${l} stroke-dasharray="3 4" opacity=".7" d="M96 306q22 14 50 0"/>
 <g font-size="9" fill="var(--mut)" opacity=".7" style="pointer-events:none"><text x="64" y="40">${esc(mu('a').hx)}</text><text x="66" y="192">${esc(mu('a').sc)}</text><text x="124" y="64">${esc(mu('a').tf)}</text><text x="130" y="205">${esc(mu('a').cv)}</text><text x="150" y="112">${esc(mu('a').cy)}</text><text x="100" y="314">${esc(mu('a').lb)}</text></g>`}

/* ---------- decor mână/picior, siluete, zone reflexologie ---------- */
function sil(inner,tf){return `<g${tf?` transform="${tf}"`:''}><g fill="var(--mut)" stroke="var(--mut)" stroke-width="3" stroke-linejoin="round">${inner}</g><g fill="var(--soft)" stroke="none">${inner}</g></g>`}
const ZC=['#d9534f','#e8a33d','#7cb342','#26a69a','#5c6bc0','#ab47bc','#8d6e63'];
function handDeco(dors){const s='fill="none" stroke="var(--mut)" stroke-width="1" opacity=".5" stroke-linecap="round"';
 return dors?`<g ${s}>${HAND_FING.map(f=>`<path d="M${f[0]-5} ${f[1]+14}q5-8 10 0"/>`).join('')}<path d="M258 196q4-6 8 0" transform="translate(-4 4)"/></g>`
 :`<g ${s}><path d="M112 250q38 8 76-6M110 280q40 6 78-14M150 262q-10 40 40 70"/></g>`}
const SOLE_STRIPS=[[[213,125],[214,180],[205,240],[190,290],[187,340],[190,390]],[[58,125],[60,200],[63,260],[70,330],[88,395]]];
const SOLE_BANDS=[[0,112],[112,150],[150,225],[225,325],[325,430]];
const HAND_STRIPS=[[[188,215],[190,260],[196,300],[188,345]],[[110,235],[108,290],[116,345]]];
const HAND_BANDS=[[0,150],[150,225],[225,275],[275,320],[320,360]];
function reflSvg(kind){
 const sole=kind==='sole',bands=sole?SOLE_BANDS:HAND_BANDS,st=sole?SOLE_STRIPS:HAND_STRIPS,inner=sole?soleInner():handInner().split('</path>').join('');
 const clip=sole?soleInner():handInner(),W=sole?260:300;
 let o=`<clipPath id="rzc">${clip}</clipPath><g clip-path="url(#rzc)">`;
 const lab=mu('zl'),R=(typeof REF!=='undefined')?REF:[];
 bands.forEach((b,i)=>{o+=`<g class="zn" data-z="${i}" tabindex="0" role="button" aria-label="${esc((R[i]||[''])[0]+' – '+lab[i])}"><rect x="0" y="${b[0]}" width="${W}" height="${b[1]-b[0]}" fill="${ZC[i]}" opacity=".38"/></g>`});
 st.forEach((p,j)=>{const i=5+j;o+=`<g class="zn" data-z="${i}" tabindex="0" role="button" aria-label="${esc((R[i]||[''])[0]+' – '+lab[i])}"><path d="M${p.map(q=>q.join(' ')).join('L')}" fill="none" stroke="${ZC[i]}" stroke-width="17" stroke-linejoin="round" opacity=".5"/></g>`});
 o+='</g><g style="pointer-events:none" font-size="10" fill="var(--ink)" text-anchor="middle">';
 const cx=sole?130:150,ys=sole?[62,131,190,275,372]:[85,190,252,300,338];
 ys.forEach((y,i)=>{o+=`<text x="${cx}" y="${y}" style="paint-order:stroke;stroke:var(--card);stroke-width:3px">${esc(lab[i])}</text>`});
 return o+'</g>'}

/* ---------- registrul de vederi ---------- */
const VW={
 front:{vb:[320,680],paths:FRONT_PATHS,xp:FRONT_XP,ov:FRONT_OV,svg:()=>sil(bodyShapes())+bodyDeco(false),body:1},
 back:{vb:[320,680],paths:BACK_PATHS,xp:BACK_XP,ov:{},svg:()=>sil(bodyShapes())+bodyDeco(true),body:1},
 handP:{vb:[300,660],paths:HANDP_PATHS,xp:HANDP_XP,ov:{},refl:'hand',svg:()=>sil(handInner())+handDeco(false)},
 handD:{vb:[300,660],paths:HANDD_PATHS,xp:HANDD_XP,ov:{},mx:300,svg:()=>sil(handInner(),'translate(300 0) scale(-1 1)')+`<g transform="translate(300 0) scale(-1 1)">${handDeco(true)}</g>`},
 footS:{vb:[260,430],paths:FOOTS_PATHS,xp:FOOTS_XP,ov:{},refl:'sole',svg:()=>sil(soleInner())},
 footD:{vb:[300,640],sx:1.45,paths:FOOTD_PATHS,xp:FOOTD_XP,ov:FOOTD_OV,svg:()=>{const t='translate(150 0) scale(1.45 1) translate(-150 0)';return sil(footDInner(),t)+`<g transform="${t}" fill="none" stroke="var(--mut)" stroke-width="1" opacity=".55"><ellipse cx="124" cy="306" rx="7" ry="9"/><ellipse cx="177" cy="314" rx="7" ry="9"/></g>`}},
 ear:{vb:[240,340],paths:[],xp:{},ov:{},ear:1,svg:earShapes}
};
const VORD=['front','back','handP','handD','footS','footD','ear'];
const KEYPTS=new Set('LI4 LI11 LU9 PC6 HT7 ST36 SP6 KI1 LR3 GB20 GB34 BL40 BL60 GV20 CV12 CV17 CV6 CV4 ST25 GV14 GB21 LU7 TE5 BL23 LI15 ST40 ST44 KI3 SI3 TE3 BL67 GB41 ST45'.split(' '));
const M={view:'front',mer:'',refl:false,sel:'',zone:-1,ear:-1,z:1,x:0,y:0,hl:[]};
let PTMAP=null;
function ptBy(c){if(!PTMAP||PTMAP.size!==PT.length){PTMAP=new Map(PT.map(p=>[p.c,p]))}return PTMAP.get(c)}
function compPos(k){const v=VW[k];if(v.pos)return v;v.pos={};v.lines=[];
 const sx=v.sx||1,X=x=>150+(x-150)*sx,put=(c,x,y)=>{(v.pos[c]=v.pos[c]||[]).push([fx(v.mx?v.mx-x:X(x)),y])};
 v.paths.forEach(pp=>{const m=pp[0],w=pp[1],Ls=[0];
  for(let i=1;i<w.length;i++)Ls[i]=Ls[i-1]+Math.hypot(w[i][0]-w[i-1][0],w[i][1]-w[i-1][1]);
  if(w.length>1)v.lines.push({m,d:'M'+w.map(a=>fx(v.mx?v.mx-a[0]:X(a[0]))+' '+a[1]).join('L')});
  const at=s=>{let i=1;while(i<w.length-1&&Ls[i]<s)i++;const a=w[i-1],b=w[i],d=(Ls[i]-Ls[i-1])||1,t=Math.max(0,Math.min(1,(s-Ls[i-1])/d));return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]};
  const pins=[];w.forEach((a,i)=>{if(a[2]!=null)pins.push({n:a[2],s:Ls[i],x:a[0],y:a[1]})});
  pins.forEach((a,j)=>{put(m+a.n,a.x,a.y);const b=pins[j+1];if(!b)return;const dn=b.n-a.n,sg=dn>0?1:-1;
   for(let n=a.n+sg;n!==b.n;n+=sg){const q=at(a.s+(b.s-a.s)*(n-a.n)/dn);put(m+n,q[0],q[1])}})});
 Object.keys(v.ov||{}).forEach(c=>{v.pos[c]=[];put(c,v.ov[c][0],v.ov[c][1])});
 Object.keys(v.xp||{}).forEach(c=>{v.pos[c]=[];v.xp[c].forEach(q=>put(c,q[0],q[1]))});
 return v}
function mpViewOf(c){if(VW[M.view].ear)return null;if(compPos(M.view).pos[c])return M.view;for(const k of VORD){if(VW[k].ear)continue;if(compPos(k).pos[c])return k}return null}
function mpCount(){let n=0;VORD.forEach(k=>{if(VW[k].ear)return;const v=compPos(k);Object.keys(v.pos).forEach(c=>{if(ptBy(c))n+=v.pos[c].length})});return n}

/* ---------- vizualizare ---------- */
const MPCSS=`<style>
.mp .mpt{display:flex;gap:.3rem;overflow-x:auto;padding:.1rem 0 .4rem;margin:.2rem 0 .3rem}
.mp .mpt button,.mp .mpc button.chip{white-space:nowrap;border:1px solid var(--line);background:var(--card);color:var(--ink);padding:.42rem .8rem;border-radius:999px;font-size:.88rem;cursor:pointer;min-height:36px}
.mp .mpt button[aria-selected=true],.mp .mpc button.chip.on{background:var(--acc);color:#fff;border-color:var(--acc)}
.mp .mpg{display:grid;gap:.8rem;grid-template-areas:"ctrl" "fig" "info"}
.mp .mpc{grid-area:ctrl}.mp .mpf{grid-area:fig;position:relative;padding:.5rem}.mp .mpi{grid-area:info;min-width:0}
@media(min-width:900px){.mp .mpg{grid-template-columns:minmax(320px,480px) 1fr;grid-template-areas:"fig ctrl" "fig info";align-items:start}.mp .mpf{position:sticky;top:7.5rem}}
.mp form{display:flex;gap:.4rem;align-items:center;flex-wrap:wrap}
.mp form input{flex:1;min-width:120px;padding:.5rem .7rem;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);font-size:1rem}
.mp .chips{display:flex;flex-wrap:wrap;gap:.3rem;margin:.55rem 0}
.mp .chip i{display:inline-block;width:.65rem;height:.65rem;border-radius:50%;margin-right:.3rem;vertical-align:-1px}
.mp .mpz{position:absolute;right:.5rem;top:.5rem;display:flex;flex-direction:column;gap:.3rem;z-index:2}
.mp .mpz button{width:38px;height:38px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:1.15rem;cursor:pointer;box-shadow:var(--sh)}
.mp svg{display:block;width:100%;height:auto;max-height:82vh;margin:auto;user-select:none;-webkit-user-select:none}
.mp .p{cursor:pointer;outline:none}.mp .hit{fill:transparent;stroke:none}
.mp .dot{stroke:var(--card);stroke-width:1.2;r:var(--dr,3.6px)}.mp .hit{r:var(--hr,9px)}
.mp .p.k .dot{stroke:var(--gold);stroke-width:1.6}
.mp .lb{display:none;font-size:var(--lf,9px);fill:var(--ink);paint-order:stroke;stroke:var(--card);stroke-width:3px;stroke-linejoin:round;pointer-events:none;transform:translate(var(--lo,5px),calc(var(--lo,5px)*-1))}
.mp svg.zl .lb,.mp .p:hover .lb,.mp .p:focus .lb,.mp .p.sel .lb,.mp .p.hl .lb{display:block}
.mp .p:focus-visible .dot,.mp .p:hover .dot{stroke:var(--ink);stroke-width:2}
.mp .p.sel .dot{stroke:var(--ink);stroke-width:2.6}.mp .p.hl .dot{stroke:var(--acc2);stroke-width:2.4}
.mp .ring{fill:none;stroke:var(--acc2);stroke-width:1.6;r:calc(var(--dr,3.6px)*2.2);animation:mpp 1.4s ease-out infinite}
@keyframes mpp{0%{opacity:1}100%{opacity:.15}}
.mp .ml{fill:none;stroke-width:var(--lw,2px);stroke-linecap:round;stroke-linejoin:round;opacity:.7;pointer-events:none}
.mp .zn{cursor:pointer;outline:none}.mp .zn:hover *,.mp .zn:focus-visible *{opacity:.75!important}.mp .zn.on *{opacity:.8!important;stroke:var(--ink)}
.mp .ep .dot{fill:var(--acc2)}
.mp .stat{min-height:1.3rem;margin:.2rem 0}
.mp .ezl{display:flex;flex-wrap:wrap;gap:.3rem;margin:.5rem 0}.mp .ezl button{border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:8px;padding:.25rem .5rem;font-size:.82rem;cursor:pointer}
.mp .lgd{display:flex;flex-wrap:wrap;gap:.5rem 1rem;font-size:.82rem;color:var(--mut);margin:.3rem 0}
.mp .lgd svg{width:26px;height:8px;vertical-align:middle;margin-right:.3rem;display:inline-block}
@media(prefers-reduced-motion:reduce){.mp .ring{animation:none}}
</style>`;
function vMaps(){
 const tabs=VORD.map(k=>`<button role="tab" type="button" data-v="${k}" aria-selected="${k===M.view}">${esc(mu(k))}</button>`).join('');
 const chips=`<button type="button" class="chip${M.mer?'':' on'}" data-m="">${esc(mu('all'))}</button>`+MER.map(m=>`<button type="button" class="chip${M.mer===m.c?' on':''}" data-m="${m.c}" title="${esc(m.n)}" aria-label="${esc(m.c+' '+m.n)}"><i style="background:${MCOL[m.c]}"></i>${m.c}</button>`).join('');
 return `${MPCSS}<h1>${esc(mu('title'))}</h1>${warnBox(esc(mu('warn')))}
 <div class="mp"><div class="mpt" role="tablist" aria-label="${esc(mu('views'))}">${tabs}</div>
 <div class="mpg"><div class="mpc">
  <form id="mpForm" autocomplete="off"><label for="mpQ" class="mut">${esc(mu('search'))}</label><input id="mpQ" type="search" placeholder="${esc(mu('sph'))}" maxlength="12"><button class="b" type="submit">OK</button></form>
  <div class="stat mut" id="mpStat" aria-live="polite"></div>
  <div class="chips" id="mpChips" role="group" aria-label="${esc(mu('merf'))}">${chips}</div>
  <label id="mpRL" style="display:none"><input type="checkbox" id="mpR"> ${esc(mu('refl'))}</label>
  <div class="lgd" id="mpLg"><span><svg viewBox="0 0 26 8"><path d="M0 4H26" stroke="var(--ink)" stroke-width="2"/></svg>${esc(mu('yin'))}</span><span><svg viewBox="0 0 26 8"><path d="M0 4H26" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 3"/></svg>${esc(mu('yang'))}</span></div>
  <p class="mut" id="mpNote" style="font-size:.85rem;margin:.3rem 0">${esc(mu('hint'))}</p>
 </div>
 <div class="mpf card"><div class="mpz"><button type="button" id="mpZi" title="${esc(mu('zin'))}" aria-label="${esc(mu('zin'))}">+</button><button type="button" id="mpZo" title="${esc(mu('zout'))}" aria-label="${esc(mu('zout'))}">−</button><button type="button" id="mpZr" title="${esc(mu('reset'))}" aria-label="${esc(mu('reset'))}">⟲</button></div><div id="mpBox"></div></div>
 <div class="mpi" id="mpInfo"></div></div></div>`}

function mpSvg(){
 const v=VW[M.view],W=v.vb[0],Hh=v.vb[1];
 let s=`<svg id="mpSvg" viewBox="0 0 ${W} ${Hh}" role="group" aria-label="${esc(mu('mapAria')+': '+mu(M.view))}" xmlns="http://www.w3.org/2000/svg">`+v.svg();
 if(v.refl&&M.refl)s+=reflSvg(v.refl);
 if(v.ear){
  EAR.forEach((e,i)=>{const nm=S.lang==='ro'?e[0]:e[1];
   s+=`<g class="p ep" data-e="${i}" tabindex="0" role="button" aria-label="${esc(nm)}"><circle class="hit" cx="${e[2]}" cy="${e[3]}" r="9"/><circle class="dot" cx="${e[2]}" cy="${e[3]}" r="3.6"/><text class="lb" x="${e[2]}" y="${e[3]}">${esc(nm)}</text></g>`})
 }else{
  const c=compPos(M.view);
  c.lines.forEach(l=>{const me=MER.find(m=>m.c===l.m);s+=`<path class="ml" data-m="${l.m}" d="${l.d}" stroke="${MCOL[l.m]}"${me&&me.yy==='Yang'?' stroke-dasharray="5 3"':''}/>`});
  Object.keys(c.pos).forEach(code=>{const p=ptBy(code);if(!p)return;
   c.pos[code].forEach((q,i)=>{const k=KEYPTS.has(code);
    s+=`<g class="p${k?' k':''}" data-c="${code}" data-m="${p.m}" tabindex="0" role="button" aria-label="${esc(code+' '+p.p)}"><circle class="hit" cx="${q[0]}" cy="${q[1]}" r="9"/><circle class="dot" cx="${q[0]}" cy="${q[1]}" r="${k?4.6:3.6}" fill="${MCOL[p.m]||MCOL.EX}"/><text class="lb" x="${q[0]}" y="${q[1]}">${esc(code)}</text></g>`})})
 }
 return s+'</svg>'}

function mpApplyView(){
 const svg=$('#mpSvg');if(!svg)return;const v=VW[M.view],W=v.vb[0],Hh=v.vb[1],z=M.z,w=W/z,h=Hh/z;
 M.x=Math.max(0,Math.min(W-w,M.x));M.y=Math.max(0,Math.min(Hh-h,M.y));
 svg.setAttribute('viewBox',`${fx(M.x)} ${fx(M.y)} ${fx(w)} ${fx(h)}`);
 const st=svg.style;st.setProperty('--dr',fx(Math.max(1.8,3.6/Math.pow(z,.6)))+'px');st.setProperty('--hr',fx(Math.max(4.5,9/z))+'px');st.setProperty('--lf',fx(9/z)+'px');st.setProperty('--lo',fx(5/z)+'px');st.setProperty("--lw",fx(Math.max(.7,2/Math.pow(z,.75)))+"px");
 svg.classList.toggle('zl',z>=2||(!!M.mer&&z>=1.4));
 svg.style.touchAction=z>1?'none':'pan-y pinch-zoom';
 svg.querySelectorAll('.k .dot').forEach(d=>{d.style.setProperty('r',fx(Math.max(2.4,4.6/Math.pow(z,.6)))+'px')})}
function mpZoom(f){const v=VW[M.view],W=v.vb[0],Hh=v.vb[1];const cx=M.x+W/M.z/2,cy=M.y+Hh/M.z/2;M.z=Math.max(1,Math.min(7,M.z*f));M.x=cx-W/M.z/2;M.y=cy-Hh/M.z/2;mpApplyView()}
function mpFilter(){
 const svg=$('#mpSvg');if(!svg)return;
 svg.querySelectorAll('.p[data-m],.ml').forEach(e=>{e.style.display=(!M.mer||e.getAttribute('data-m')===M.mer)?'':'none'});
 document.querySelectorAll('#mpChips .chip').forEach(b=>b.classList.toggle('on',b.getAttribute('data-m')===M.mer));
 mpApplyView()}
function mpMarks(){
 const svg=$('#mpSvg');if(!svg)return;
 svg.querySelectorAll('.ring').forEach(r=>r.remove());
 svg.querySelectorAll('.p').forEach(g=>{
  const c=g.getAttribute('data-c'),e=g.getAttribute('data-e');
  const sel=(c&&c===M.sel)||(e!=null&&+e===M.ear),hl=c&&M.hl.indexOf(c)>=0;
  g.classList.toggle('sel',!!sel);g.classList.toggle('hl',!!hl);
  if(sel||hl){const d=g.querySelector('.dot'),r=document.createElementNS('http://www.w3.org/2000/svg','circle');r.setAttribute('class','ring');r.setAttribute('cx',d.getAttribute('cx'));r.setAttribute('cy',d.getAttribute('cy'));r.setAttribute('r','8');g.insertBefore(r,d)}});
 svg.querySelectorAll('.zn').forEach(g=>g.classList.toggle('on',+g.getAttribute('data-z')===M.zone))}
function mpInfo(scroll){
 const el=$('#mpInfo');if(!el)return;let h='';
 if(VW[M.view].ear){
  const ez=M.ear>=0?EAR[M.ear]:null;
  if(ez)h+=`<div class="card"><h3>${esc(S.lang==='ro'?ez[0]:ez[1])}</h3><p class="mut">${esc(mu('earArea'))}: ${esc(mu('a')[ez[4]]||ez[4])}</p></div>`;
  else h+=`<p class="mut">${esc(mu('pick'))}</p>`;
  h+=`<p class="mut" style="font-size:.85rem">${esc(mu('earNote'))}</p><div class="ezl">${EAR.map((e,i)=>`<button type="button" data-e="${i}">${esc(S.lang==='ro'?e[0]:e[1])}</button>`).join('')}</div>`;
 }else if(M.zone>=0&&VW[M.view].refl&&M.refl&&typeof REF!=='undefined'&&REF[M.zone]){
  const r=REF[M.zone];h+=`<div class="card"><h3>${esc(r[0])}</h3><p>${esc(r[1])}</p><p class="mut">${esc(mu('reflNote'))}</p></div>`;
 }else if(M.sel){
  const p=ptBy(M.sel);
  if(p){h+=ptCard(p)+`<p><button class="b alt" type="button" id="mpGo">${esc(mu('toList'))}</button></p>`;if(!mpViewOf(p.c))h+=`<p class="mut">${esc(mu('nopos'))}</p>`}
 }else h+=`<p class="mut">${esc(mu('pick'))}</p>`;
 if(VW[M.view].body)h+=`<p class="mut" style="font-size:.85rem">${esc(mu('bil'))}</p>`;
 el.innerHTML=h;
 const g=$('#mpGo');if(g)g.onclick=()=>goPoint(M.sel);
 if(scroll&&(M.sel||M.ear>=0)){const rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;try{el.scrollIntoView({block:'nearest',behavior:rm?'auto':'smooth'})}catch(e){}}}
function mpDraw(){
 const box=$('#mpBox');if(!box)return;box.innerHTML=mpSvg();
 document.querySelectorAll('.mp .mpt button').forEach(b=>b.setAttribute('aria-selected',b.getAttribute('data-v')===M.view));
 const v=VW[M.view];$('#mpRL').style.display=v.refl?'':'none';$('#mpR').checked=M.refl;
 $('#mpChips').style.display=v.ear?'none':'';$('#mpLg').style.display=v.ear?'none':'';
 mpFilter();mpMarks();mpInfo(false)}
function mpSetView(k,keep){if(!VW[k])return;if(k!==M.view){M.view=k;M.z=1;M.x=0;M.y=0;M.zone=-1;if(!keep){M.ear=-1}}mpDraw()}
function mpSelect(c,scroll){M.sel=c;M.zone=-1;mpMarks();mpInfo(scroll)}
function mpStat(t){const e=$('#mpStat');if(e)e.textContent=t||''}
function mpSearch(raw,force){
 const q=String(raw||'').toUpperCase().replace(/[^A-Z0-9-]/g,'');M.hl=[];
 if(!q){mpStat('');mpMarks();return}
 const ms=PT.filter(p=>p.c.toUpperCase().startsWith(q)),ex=PT.find(p=>p.c.toUpperCase()===q);
 if(!ms.length){mpStat(mu('nomatch'));mpMarks();return}
 const tg=ex?[ex]:ms;
 if(!VW[M.view].ear&&(ex||force)){let vk=null;if(tg.some(p=>compPos(M.view).pos[p.c]))vk=M.view;else for(const k of VORD){if(!VW[k].ear&&tg.some(p=>compPos(k).pos[p.c])){vk=k;break}}
  if(vk&&vk!==M.view){M.mer='';M.view=vk;M.z=1;M.x=0;M.y=0;M.zone=-1;mpDraw()}}
 else if(VW[M.view].ear&&(ex||force)){const vk=VORD.find(k=>!VW[k].ear&&tg.some(p=>compPos(k).pos[p.c]));if(vk){M.view=vk;M.z=1;M.x=0;M.y=0;M.ear=-1;mpDraw()}}
 if(M.mer&&!tg.some(p=>p.m===M.mer)){M.mer='';mpFilter()}
 if(ex){M.hl=[ex.c];M.sel=ex.c;M.zone=-1;mpMarks();mpInfo(true);mpStat(ex.c+(mpViewOf(ex.c)?'':' – '+mu('nopos')))}
 else{M.hl=ms.map(p=>p.c);mpMarks();mpStat(ms.length+' '+mu('found'))}}
function mapsInit(){
 const root=document.querySelector('.mp');if(!root)return;
 root.querySelector('.mpt').addEventListener('click',e=>{const b=e.target.closest('button[data-v]');if(b)mpSetView(b.getAttribute('data-v'))});
 $('#mpChips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;M.mer=b.getAttribute('data-m');mpFilter()});
 $('#mpR').addEventListener('change',e=>{M.refl=e.target.checked;M.zone=-1;mpDraw()});
 $('#mpZi').addEventListener('click',()=>mpZoom(1.5));$('#mpZo').addEventListener('click',()=>mpZoom(1/1.5));
 $('#mpZr').addEventListener('click',()=>{M.z=1;M.x=0;M.y=0;mpApplyView()});
 const qi=$('#mpQ');qi.addEventListener('input',()=>mpSearch(qi.value,false));
 $('#mpForm').addEventListener('submit',e=>{e.preventDefault();mpSearch(qi.value,true)});
 $('#mpInfo').addEventListener('click',e=>{const b=e.target.closest('button[data-e]');if(b){M.ear=+b.getAttribute('data-e');mpMarks();mpInfo(false)}});
 const box=$('#mpBox');let drag=null,moved=0;
 const act=g=>{
  if(g.hasAttribute('data-c')){M.hl=[];mpSelect(g.getAttribute('data-c'),true)}
  else if(g.hasAttribute('data-e')){M.ear=+g.getAttribute('data-e');mpMarks();mpInfo(true)}
  else if(g.hasAttribute('data-z')){M.zone=+g.getAttribute('data-z');mpMarks();mpInfo(true)}};
 box.addEventListener('click',e=>{if(moved>5)return;const g=e.target.closest('.p,.zn');if(g)act(g)});
 box.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const g=e.target.closest&&e.target.closest('.p,.zn');if(g){e.preventDefault();act(g)}});
 box.addEventListener('pointerdown',e=>{const svg=$('#mpSvg');if(!svg||M.z<=1||(e.pointerType==='mouse'&&e.button!==0))return;
  const m=svg.getScreenCTM();if(!m)return;drag={x:e.clientX,y:e.clientY,vx:M.x,vy:M.y,s:m.a};moved=0});
 box.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;moved=Math.max(moved,Math.abs(dx),Math.abs(dy));
  if(moved>5){M.x=drag.vx-dx/drag.s;M.y=drag.vy-dy/drag.s;mpApplyView()}});
 const end=()=>{drag=null;setTimeout(()=>{moved=0},0)};
 box.addEventListener('pointerup',end);box.addEventListener('pointercancel',end);
 mpDraw()}
regView('maps',vMaps,{ro:'Hărți',en:'Maps',fr:'Cartes',it:'Mappe',es:'Mapas',pt:'Mapas',de:'Karten',hu:'Térképek'},{after:'pts',post:mapsInit});
/* modulele 2x se încarcă după inițializarea din 11_render: reîmprospătează dacă vederea curentă e „maps” */
try{if(typeof render==='function'&&document.getElementById('main'))render()}catch(e){}
