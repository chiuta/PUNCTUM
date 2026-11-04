/* ================= ROUTER ================= */
const PF={q:'',m:'',r:'',fav:false};
function view(){return (location.hash||'#home').slice(1).split(':')[0]||'home'}
function go(v){if(location.hash==='#'+v)render();else location.hash='#'+v}
window.addEventListener('hashchange',()=>{$('#q').value='';render();window.scrollTo(0,0)});
function renderNav(){
  const v=view();const L=T().nav;
  $('#nav').innerHTML=NAVK.map((k,i)=>`<a href="#${k}" class="${k===v?'on':''}">${esc(L[i])}</a>`).join('');
}
function setLang(l){S.lang=l;save();document.documentElement.lang=l;applyI18n();render()}
function applyI18n(){
  $('#lang').value=S.lang;$('#q').placeholder=T().ph;$('#sub').textContent=T().sub;
  $('#ftxt').textContent=T().disc;
  const d=new Date(2026,10,4);let ds;try{ds=d.toLocaleDateString(S.lang,{day:'numeric',month:'long',year:'numeric'})}catch(e){ds='2026-11-04'}
  $('#fver').textContent=T().ver+' '+ds;
}
function toggleTheme(){const order=['auto','light','dark'];S.theme=order[(order.indexOf(S.theme)+1)%3];save();applyTheme()}
function applyTheme(){const r=document.documentElement;if(S.theme==='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',S.theme);$('#thm').textContent=S.theme==='dark'?'☾':S.theme==='light'?'☀':'◐'}

