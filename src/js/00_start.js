"use strict";
const cmp=(a,b)=>String(a).localeCompare(String(b),'ro');
/* registru de vizualizări: modulele noi (src/js/2x_*.js) se înregistrează aici */
const VREG={};const NAVX=[];
function regView(k,fn,labels,opts){opts=opts||{};VREG[k]={fn,post:opts.post||null};if(!opts.nonav)NAVX.push({k,l:labels,after:opts.after||null})}
