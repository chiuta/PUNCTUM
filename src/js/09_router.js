/* ================= ROUTER ================= */
const PF={q:'',m:'',r:'',fav:false};
function view(){return (location.hash||'#home').slice(1).split(':')[0]||'home'}
function go(v){if(location.hash==='#'+v)render();else location.hash='#'+v}
window.addEventListener('hashchange',()=>{$('#q').value='';render();window.scrollTo(0,0)});
function navList(){
  const L=T().nav;let arr=NAVK.map((k,i)=>({k,t:L[i]}));
  NAVX.forEach(x=>{const t=(x.l&&(x.l[S.lang]||x.l.en||x.l.ro))||x.k;const e={k:x.k,t};const i=x.after?arr.findIndex(y=>y.k===x.after):-1;if(i>=0){let j=i;while(arr[j+1]&&NAVX.some(z=>z.k===arr[j+1].k&&z.after===x.after))j++;arr.splice(j+1,0,e)}else arr.push(e)});
  const ai=arr.findIndex(y=>y.k==='acu');if(ai>1){arr.splice(1,0,arr.splice(ai,1)[0]);['masaj','durere'].forEach((k,n)=>{const mi=arr.findIndex(y=>y.k===k);if(mi>2+n)arr.splice(2+n,0,arr.splice(mi,1)[0])})}
  return arr;
}
function renderNav(){
  const v=view();
  $('#nav').innerHTML=navList().map(x=>`<a href="#${x.k}" class="${x.k===v?'on':''}">${esc(x.t)}</a>`).join('');
}
function setLang(l){S.lang=l;save();document.documentElement.lang=l;applyI18n();render();if(typeof trAll==='function')trAll()}
function applyI18n(){
  $('#lang').value=S.lang;$('#q').placeholder=T().ph;$('#sub').textContent=T().sub;
  $('#ftxt').textContent=T().disc;
  const d=new Date(2026,10,4);let ds;try{ds=d.toLocaleDateString(S.lang,{day:'numeric',month:'long',year:'numeric'})}catch(e){ds='2026-11-04'}
  $('#fver').textContent=T().ver+' '+ds;
}
function toggleTheme(){const order=['auto','light','dark'];S.theme=order[(order.indexOf(S.theme)+1)%3];save();applyTheme()}
function applyTheme(){const r=document.documentElement;if(S.theme==='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',S.theme);$('#thm').textContent=S.theme==='dark'?'☾':S.theme==='light'?'☀':'◐'}

