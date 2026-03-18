// FOOD RENDER
// ══════════════════════════════════════════
async function renderFood(){
  setDD('dMain','dSub');
  const data=await loadDayData(curDate);
  updateMacros(data);
  renderWater(data);
  renderMealTabs(data);
  renderFoodChips();
  renderFoodList(data);
}

function updateMacros(data){
  const q=data.qty||{};
  let t={cal:0,pro:0,carb:0,fat:0};
  Object.keys(q).forEach(id=>{
    const qty=q[id]||0;if(!qty)return;
    const f=allFoods().find(x=>x.id===id);
    if(f){t.cal+=f.cal*qty;t.pro+=f.pro*qty;t.carb+=f.carb*qty;t.fat+=f.fat*qty;}
  });
  const p=(v,m)=>Math.min(100,Math.round(v/m*100));
  document.getElementById('mCal').textContent=Math.round(t.cal);
  document.getElementById('mPro').textContent=Math.round(t.pro)+'g';
  document.getElementById('mCarb').textContent=Math.round(t.carb)+'g';
  document.getElementById('mFat').textContent=Math.round(t.fat)+'g';
  document.getElementById('mCal').className='mval'+(t.cal>T.cal?' over':'');
  document.getElementById('bCal').style.width=p(t.cal,T.cal)+'%';
  document.getElementById('bPro').style.width=p(t.pro,T.pro)+'%';
  document.getElementById('bCarb').style.width=p(t.carb,T.carb)+'%';
  document.getElementById('bFat').style.width=p(t.fat,T.fat)+'%';
  return t;
}

function renderWater(data){
  const wlog=data.water||[];
  const totalMl=wlog.reduce((s,x)=>s+x,0);
  const btns=document.getElementById('wBtns');btns.innerHTML='';
  wlog.forEach((ml,i)=>{
    const opt=WATER_OPTS.find(o=>o.ml===ml)||WATER_OPTS[2];
    const b=document.createElement('button');
    b.className='wbtn on';
    b.innerHTML=`<span class="wml">${opt.l}</span><span class="wsl">remove</span>`;
    b.onclick=async()=>{
      const d=dayCache[curDate];if(!d)return;
      d.water.splice(i,1);
      renderWater(d);
      await saveWater(d.water);
    };
    btns.appendChild(b);
  });
  WATER_OPTS.forEach(opt=>{
    const b=document.createElement('button');
    b.className='wbtn';
    b.innerHTML=`<span class="wml">+${opt.l}</span><span class="wsl">add</span>`;
    b.onclick=async()=>{
      const d=dayCache[curDate];if(!d)return;
      d.water.push(opt.ml);
      renderWater(d);
      await saveWater(d.water);
      showToast('+'+opt.l+' পানি যোগ হয়েছে');
    };
    btns.appendChild(b);
  });
  document.getElementById('wSt').textContent=totalMl+'/3000ml'+(totalMl>=3000?' ✓':'');
}

function renderMealTabs(data){
  const q=data.qty||{};
  const tabs=document.getElementById('mealTabs');tabs.innerHTML='';
  MEAL_TIMES.forEach(mt=>{
    let kcal=0;
    allFoods().filter(f=>mt==='সব'||f.sec===mt).forEach(f=>{if(q[f.id])kcal+=f.cal*(q[f.id]||0);});
    const btn=document.createElement('button');
    btn.className='mtab'+(curMeal===mt?' on':'');
    btn.innerHTML=mt+(kcal>0?`<span class="mc-badge">${Math.round(kcal)}</span>`:'');
    btn.onclick=()=>{curMeal=mt;renderMealTabs(data);renderFoodList(data);};
    tabs.appendChild(btn);
  });
}

function renderFoodChips(){
  const chips=document.getElementById('fChips');chips.innerHTML='';
  [{v:'all',l:'সব',j:false},{v:'healthy',l:'Healthy',j:false},{v:'junk',l:'Junk',j:true}].forEach(({v,l,j})=>{
    const c=document.createElement('button');
    c.className='chip'+(j?' jc':'')+(fFilter===v?' on':'');
    c.textContent=l;
    c.onclick=()=>{fFilter=v;renderFoodChips();renderFoodList(dayCache[curDate]||{qty:{}});};
    chips.appendChild(c);
  });
}

function renderFoodList(data){
  const q=data?.qty||{};
  const srch=(document.getElementById('srchF').value||'').toLowerCase();
  const filtered=allFoods().filter(f=>{
    const ms=!srch||f.name.toLowerCase().includes(srch);
    const mm=curMeal==='সব'||f.sec===curMeal;
    let mf=true;
    if(fFilter==='healthy')mf=!f.junk;
    else if(fFilter==='junk')mf=f.junk;
    return ms&&mm&&mf;
  });
  const grouped={};
  filtered.forEach(f=>{if(!grouped[f.sec])grouped[f.sec]=[];grouped[f.sec].push(f);});
  const secs=SORD.filter(s=>grouped[s]);
  const fl=document.getElementById('fList');fl.innerHTML='';
  if(!secs.length){fl.innerHTML='<div class="empty">কোনো খাবার পাওয়া যায়নি</div>';return;}
  secs.forEach(sn=>{
    const items=grouped[sn],col=SCOLS[sn]||'#888',isOpen=openFSec.has(sn);
    let sc=0;items.forEach(f=>{if(q[f.id])sc+=f.cal*(q[f.id]||0);});
    const sd=document.createElement('div');sd.className='fsec';
    const hdr=document.createElement('div');hdr.className='fhdr';
    hdr.innerHTML=`<div class="fdot" style="background:${col}"></div><span class="fnm">${sn}</span><span class="fcal">${Math.round(sc)} kcal</span><span class="farr${isOpen?' op':''}">▶</span>`;
    hdr.onclick=()=>{if(openFSec.has(sn))openFSec.delete(sn);else openFSec.add(sn);renderFoodList(data);};
    sd.appendChild(hdr);
    const id_div=document.createElement('div');id_div.className='fitems'+(isOpen?' op':'');
    items.forEach(f=>{
      const qty=q[f.id]||0,isActive=qty>0,isCustom=customFoodsCache.some(c=>c.id===f.id);
      const row=document.createElement('div');
      row.className='frow'+(isActive?' active':'')+(f.junk?' junk':'');
      row.innerHTML=`
        <div class="qctrl">
          <button class="qbtn minus" onclick="chgFQty('${f.id}',-1,event)">−</button>
          <span class="qnum${qty===0?' zero':''}">${qty}</span>
          <button class="qbtn plus" onclick="chgFQty('${f.id}',1,event)">+</button>
        </div>
        <div class="finfo">
          <div class="fname-row"><span class="fname">${f.name}</span>${f.junk?'<span class="jbadge">junk</span>':''}${isCustom?'<span class="cbadge">custom</span>':''}</div>
          <div class="fqty-lbl">${f.qty}${qty>1?' × '+qty+' = '+Math.round(f.cal*qty)+' kcal':''}</div>
        </div>
        <div class="fmacs">
          <span class="mp mpc">${Math.round(f.cal*Math.max(qty,1))}kcal</span>
          <span class="mp mpp">P${Math.round(f.pro*Math.max(qty,1))}g</span>
          <span class="mp mpcr">C${Math.round(f.carb*Math.max(qty,1))}g</span>
          <span class="mp mpf">F${Math.round(f.fat*Math.max(qty,1))}g</span>
        </div>
        ${isCustom?`<button class="delbtn" onclick="delCF('${f.id}',event)">✕</button>`:''}`;
      id_div.appendChild(row);
    });
    sd.appendChild(id_div);fl.appendChild(sd);
  });
}

async function chgFQty(id,delta,e){
  e.stopPropagation();
  const d=dayCache[curDate];if(!d)return;
  if(!d.qty)d.qty={};
  const cur=d.qty[id]||0,next=Math.max(0,cur+delta);
  if(next===0)delete d.qty[id];else d.qty[id]=next;
  updateMacros(d);renderFoodList(d);renderMealTabs(d);
  const f=allFoods().find(x=>x.id===id);
  if(f){
    if(next>0)showToast(f.name+' × '+next+' = '+Math.round(f.cal*next)+' kcal');
    else showToast(f.name+' সরানো হয়েছে');
  }
  await saveFood(id,next);
}

async function delCF(id,e){
  e.stopPropagation();
  if(!confirm('এই custom খাবার delete করবেন?'))return;
  const item=customFoodsCache.find(c=>c.id===id);
  if(item){await sb.from('custom_foods').delete().eq('id',item.dbId);}
  await loadCustomFoods();
  renderFood();showToast('খাবার মুছে ফেলা হয়েছে');
}

// ══════════════════════════════════════════
// MODALS
// ══════════════════════════════════════════
function openFoodModal(){
  newFoodJunk=false;
  document.getElementById('togH').classList.add('on');document.getElementById('togJ').classList.remove('on');
  ['fname','fqty','fcal','fpro','fcarb','ffat'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('fsec').value='সকাল';
  document.getElementById('foodModal').classList.add('on');
}
function setFT(t){
  newFoodJunk=t==='junk';
  document.getElementById('togH').classList.toggle('on',t==='healthy');
  document.getElementById('togJ').classList.toggle('on',t==='junk');
  document.getElementById('fsec').value=t==='junk'?'ভাজা/জাংক':'সকাল';
}
async function saveFoodItem(){
  const name=document.getElementById('fname').value.trim();
  if(!name){showToast('খাবারের নাম লিখুন');return;}
  const{error}=await sb.from('custom_foods').insert({user_id:curUser.id,name,quantity_label:document.getElementById('fqty').value||'1 serving',calories:+document.getElementById('fcal').value||0,protein:+document.getElementById('fpro').value||0,carbs:+document.getElementById('fcarb').value||0,fat:+document.getElementById('ffat').value||0,category:document.getElementById('fsec').value,is_junk:newFoodJunk});
  if(error){showToast('Error: '+error.message);return;}
  await loadCustomFoods();closeModal('foodModal');renderFood();showToast('"'+name+'" যোগ করা হয়েছে');
}

function openWorkoutModal(){
  ['wname','wdur','wburnI','wstepI'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('wsec').value='Cardio';
  document.getElementById('workoutModal').classList.add('on');
}
async function saveWorkoutItem(){
  const name=document.getElementById('wname').value.trim();
  if(!name){showToast('Exercise-এর নাম লিখুন');return;}
  const{error}=await sb.from('custom_workouts').insert({user_id:curUser.id,name,category:document.getElementById('wsec').value,duration_label:document.getElementById('wdur').value||'—',calories_burned:+document.getElementById('wburnI').value||0,steps:+document.getElementById('wstepI').value||0});
  if(error){showToast('Error: '+error.message);return;}
  await loadCustomWorkouts();closeModal('workoutModal');renderWorkout();showToast('"'+name+'" যোগ করা হয়েছে');
}

function closeModal(id){document.getElementById(id).classList.remove('on');}
document.querySelectorAll('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('on');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.overlay.on').forEach(o=>o.classList.remove('on'));});

// ══════════════════════════════════════════