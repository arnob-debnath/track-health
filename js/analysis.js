// ANALYSIS
// ══════════════════════════════════════════
function setPeriod(p,btn){aPeriod=p;pOffset=0;document.querySelectorAll('.pbtn').forEach(b=>b.classList.remove('on'));btn.classList.add('on');renderAnalysis();}
function shiftP(d){pOffset+=d;if(pOffset>0)pOffset=0;renderAnalysis();}

function getWeekDates(off){
  const t=new Date(todayStr()+'T12:00:00');
  const mon=new Date(t);mon.setDate(t.getDate()-((t.getDay()+6)%7)+off*7);
  return Array.from({length:7},(_,i)=>{const d=new Date(mon);d.setDate(mon.getDate()+i);return d.toISOString().slice(0,10);});
}
function getMonthDates(off){
  const t=new Date();const m=t.getMonth()+off,y=t.getFullYear();
  const first=new Date(y,m,1),last=new Date(y,m+1,0);
  const dates=[];for(let d=new Date(first);d<=last;d.setDate(d.getDate()+1))dates.push(d.toISOString().slice(0,10));
  return dates;
}

async function renderAnalysis(){
  const dates=aPeriod==='week'?getWeekDates(pOffset):getMonthDates(pOffset);
  const dn=['সো','মঙ','বু','বৃ','শু','শ','র'];
  if(aPeriod==='week'){const d0=new Date(dates[0]+'T12:00:00'),d6=new Date(dates[6]+'T12:00:00');document.getElementById('pLbl').textContent=d0.getDate()+'/'+(d0.getMonth()+1)+' – '+d6.getDate()+'/'+(d6.getMonth()+1);}
  else{const d0=new Date(dates[0]+'T12:00:00');document.getElementById('pLbl').textContent=MONTHS[d0.getMonth()]+' '+d0.getFullYear();}

  const ac=document.getElementById('aContent');
  ac.innerHTML='<div class="empty"><div class="spinner" style="display:inline-block;margin:0 8px 0 0"></div>লোড হচ্ছে...</div>';

  const allDayData=await Promise.all(dates.map(d=>loadDayData(d)));
  const stats=dates.map((dt,i)=>{
    const d=allDayData[i];const q=d.qty||{};const wq=d.wqty||{};const wlog=d.water||[];
    let cal=0,pro=0,carb=0,fat=0,junkCal=0,burn=0,steps=0;
    Object.keys(q).forEach(id=>{const qty=q[id]||0;if(!qty)return;const f=allFoods().find(x=>x.id===id);if(f){cal+=f.cal*qty;pro+=f.pro*qty;carb+=f.carb*qty;fat+=f.fat*qty;if(f.junk)junkCal+=f.cal*qty;}});
    Object.keys(wq).forEach(id=>{const qty=wq[id]||0;if(!qty)return;const w=allWorkouts().find(x=>x.id===id);if(w){burn+=w.burn*qty;steps+=w.steps*qty;}});
    return{dt,cal,pro,carb,fat,junkCal,burn,steps,waterMl:wlog.reduce((s,x)=>s+x,0),tracked:cal>0||burn>0};
  });

  const active=stats.filter(s=>s.tracked);
  if(!active.length){ac.innerHTML='<div class="empty">এই সময়ে কোনো data নেই।</div>';return;}
  const avg=(k)=>active.length?Math.round(active.reduce((s,d)=>s+d[k],0)/active.length):0;
  const avgCal=avg('cal'),avgBurn=avg('burn'),avgWater=avg('waterMl');
  const totalJunk=Math.round(stats.reduce((s,d)=>s+d.junkCal,0));
  const freq={};
  dates.forEach((dt,i)=>{const q=allDayData[i].qty||{};Object.keys(q).forEach(id=>{if(q[id]>0)freq[id]=(freq[id]||0)+q[id];});});
  const topF=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,8);

  let h='';
  if(totalJunk>600)h+=`<div class="jwarn"><b>সতর্কতা:</b> ${totalJunk} kcal junk food এসেছে — fat loss slow হচ্ছে!</div>`;
  h+=`<div class="sg3">
    <div class="sc"><div class="sclbl">গড় ক্যালোরি/দিন</div><div class="scval" style="color:${avgCal>T.cal?'var(--red)':'var(--green)'}">${avgCal}</div><div class="scsub">লক্ষ্য ${T.cal}</div></div>
    <div class="sc"><div class="sclbl">গড় burn/দিন</div><div class="scval" style="color:var(--red)">${avgBurn}</div><div class="scsub">workout</div></div>
    <div class="sc"><div class="sclbl">Junk total</div><div class="scval" style="color:var(--amber)">${totalJunk}</div><div class="scsub">${aPeriod==='week'?'সপ্তাহে':'মাসে'}</div></div>
    <div class="sc"><div class="sclbl">গড় পানি/দিন</div><div class="scval" style="color:var(--blue)">${avgWater}ml</div><div class="scsub">লক্ষ্য 3000ml</div></div>
    <div class="sc"><div class="sclbl">নেট ক্যালোরি</div><div class="scval" style="color:var(--teal)">${avgCal-avgBurn}</div><div class="scsub">খাবার − workout</div></div>
    <div class="sc"><div class="sclbl">Track করা দিন</div><div class="scval" style="color:var(--purple)">${active.length}/${dates.length}</div><div class="scsub">দিন</div></div>
  </div>`;

  const dispS=aPeriod==='week'?stats:stats.slice(0,31);
  const maxC=Math.max(T.cal,...dispS.map(s=>s.cal),1);
  const tPct=Math.round(T.cal/maxC*100);
  h+=`<div class="csec"><div class="ctitle">দৈনিক ক্যালোরি</div>
  <div style="position:relative">
    <div style="position:absolute;top:${100-tPct}%;left:0;right:0;height:1px;background:rgba(248,113,113,.4)">
      <span style="position:absolute;right:0;top:-12px;font-size:8px;color:var(--red);font-family:'DM Mono',monospace">${T.cal}</span>
    </div>
    <div class="barchart">`;
  dispS.forEach((s,i)=>{
    const bh=Math.round(s.cal/maxC*100);
    const col=s.cal===0?'var(--s3)':s.cal>T.cal?'var(--red)':s.junkCal>300?'var(--amber)':'var(--green)';
    const lbl=aPeriod==='week'?dn[new Date(s.dt+'T12:00:00').getDay()]:(i+1).toString();
    h+=`<div class="bcol"><div class="bval">${s.cal>0?Math.round(s.cal):''}</div><div class="bwrap"><div class="bar" style="height:${bh}%;background:${col}"></div></div><div class="blbl">${lbl}</div></div>`;
  });
  h+=`</div></div></div>`;

  if(topF.length){
    const mf=topF[0][1];
    h+=`<div class="csec"><div class="ctitle">সবচেয়ে বেশি খাওয়া</div><div>`;
    topF.forEach(([id,cnt],i)=>{const f=allFoods().find(x=>x.id===id);if(!f)return;h+=`<div class="fri"><span class="frk">${i+1}</span><span class="frn" style="${f.junk?'color:var(--red)':''}">${f.name}</span><div class="frbw"><div class="frb" style="width:${Math.round(cnt/mf*100)}%;background:${f.junk?'var(--red)':'var(--green)'}"></div></div><span class="frc">${cnt}x</span></div>`;});
    h+=`</div></div>`;
  }

  const avgPro=avg('pro'),avgCarb=avg('carb'),avgFat=avg('fat');
  h+=`<div class="csec"><div class="ctitle">গড় Macros / দিন</div>`;
  [{l:'Protein',v:avgPro,t:T.pro,c:'var(--blue)'},{l:'Carbs',v:avgCarb,t:T.carb,c:'var(--amber)'},{l:'Fat',v:avgFat,t:T.fat,c:'var(--green)'}].forEach(({l,v,t,c})=>{
    h+=`<div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span style="font-size:11px;color:var(--t2)">${l}</span><span style="font-size:11px;font-family:'DM Mono',monospace;color:${v>t?'var(--red)':c}">${v}g / ${t}g</span></div><div class="mbar"><div class="mbf" style="background:${v>t?'var(--red)':c};width:${Math.min(100,Math.round(v/t*100))}%"></div></div></div>`;
  });
  h+=`</div>`;
  ac.innerHTML=h;
}



// ══════════════════════════════════════════