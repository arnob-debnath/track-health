// WORKOUT RENDER
// ══════════════════════════════════════════
async function renderWorkout(){
  setDD('wdMain','wdSub');
  const data=await loadDayData(curDate);
  updateWorkoutSummary(data);
  renderWorkoutList(data);
}

function updateWorkoutSummary(data){
  const wq=data.wqty||{},q=data.qty||{};
  let burn=0,steps=0,mins=0;
  Object.keys(wq).forEach(id=>{const qty=wq[id]||0;if(!qty)return;const w=allWorkouts().find(x=>x.id===id);if(w){burn+=w.burn*qty;steps+=w.steps*qty;mins+=w.mins*qty;}});
  let fcal=0;Object.keys(q).forEach(id=>{const qty=q[id]||0;if(!qty)return;const f=allFoods().find(x=>x.id===id);if(f)fcal+=f.cal*qty;});
  document.getElementById('wBurn').textContent=Math.round(burn);
  document.getElementById('wSteps').textContent=Math.round(steps).toLocaleString();
  document.getElementById('wNet').textContent=Math.round(fcal-burn);
  document.getElementById('wMins').textContent=Math.round(mins);
}

function renderWorkoutList(data){
  const wq=data.wqty||{};
  const srch=(document.getElementById('srchW').value||'').toLowerCase();
  const filtered=allWorkouts().filter(w=>!srch||w.name.toLowerCase().includes(srch));
  const grouped={};
  filtered.forEach(w=>{if(!grouped[w.sec])grouped[w.sec]=[];grouped[w.sec].push(w);});
  const secs=Object.keys(WCOLS).filter(s=>grouped[s]);
  const wl=document.getElementById('wList');wl.innerHTML='';
  secs.forEach(sn=>{
    const items=grouped[sn],col=WCOLS[sn]||'#888',isOpen=openWSec.has(sn);
    let sb2=0;items.forEach(w=>{if(wq[w.id])sb2+=w.burn*(wq[w.id]||0);});
    const sd=document.createElement('div');sd.className='fsec';
    const hdr=document.createElement('div');hdr.className='fhdr';
    hdr.innerHTML=`<div class="fdot" style="background:${col}"></div><span class="fnm">${sn}</span><span class="fcal">${Math.round(sb2)} kcal burn</span><span class="farr${isOpen?' op':''}">▶</span>`;
    hdr.onclick=()=>{if(openWSec.has(sn))openWSec.delete(sn);else openWSec.add(sn);renderWorkoutList(data);};
    sd.appendChild(hdr);
    const id_div=document.createElement('div');id_div.className='fitems'+(isOpen?' op':'');
    items.forEach(w=>{
      const qty=wq[w.id]||0,isActive=qty>0,isCustom=customWorkoutsCache.some(c=>c.id===w.id);
      const row=document.createElement('div');
      row.className='wrow'+(isActive?' active':'');
      row.innerHTML=`
        <div class="qctrl">
          <button class="qbtn minus" onclick="chgWQty('${w.id}',-1,event)">−</button>
          <span class="qnum${qty===0?' zero':''}">${qty}</span>
          <button class="qbtn plus" onclick="chgWQty('${w.id}',1,event)">+</button>
        </div>
        <div class="winfo">
          <div class="wname">${w.name}${isCustom?'<span class="cbadge" style="margin-left:5px">custom</span>':''}</div>
          <div class="wdur">${w.dur}${qty>1?' × '+qty+' rounds':''}</div>
        </div>
        <span class="wburn">🔥 ${Math.round(w.burn*Math.max(qty,1))} kcal</span>
        ${isCustom?`<button class="delbtn" onclick="delCW('${w.id}',event)">✕</button>`:''}`;
      id_div.appendChild(row);
    });
    sd.appendChild(id_div);wl.appendChild(sd);
  });
}

async function chgWQty(id,delta,e){
  e.stopPropagation();
  const d=dayCache[curDate];if(!d)return;
  if(!d.wqty)d.wqty={};
  const cur=d.wqty[id]||0,next=Math.max(0,cur+delta);
  if(next===0)delete d.wqty[id];else d.wqty[id]=next;
  updateWorkoutSummary(d);renderWorkoutList(d);
  const w=allWorkouts().find(x=>x.id===id);
  if(w){if(next>0)showToast(w.name+' × '+next+' = '+Math.round(w.burn*next)+' kcal burn');}
  await saveWorkout(id,next);
}

async function delCW(id,e){
  e.stopPropagation();
  if(!confirm('এই custom exercise delete করবেন?'))return;
  const item=customWorkoutsCache.find(c=>c.id===id);
  if(item){await sb.from('custom_workouts').delete().eq('id',item.dbId);}
  await loadCustomWorkouts();renderWorkout();showToast('Exercise মুছে ফেলা হয়েছে');
}

// ══════════════════════════════════════════