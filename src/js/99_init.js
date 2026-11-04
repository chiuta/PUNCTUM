/* init */
load();document.documentElement.lang=S.lang;applyAcc();applyTheme();applyI18n();
/* blocurile i18n sunt servite DUPĂ script (primul randare nu mai așteaptă 4 MB de JSON). În română nu e nevoie de ele;
   într-o altă limbă conținutul se randează abia când documentul e complet citit (fără clipire de text românesc). */
if(S.lang!=='ro'&&document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>{render();trWatch();trAll()});
}else{render();trWatch();trAll()}
