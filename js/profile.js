// PROFILE
// ══════════════════════════════════════════
let waterNotifInterval = null;

async function renderProfile(){
  if(!curUser) return;
  const{data:prof}=await sb.from('profiles').select('*').eq('id',curUser.id).single();
  const tgts=JSON.parse(localStorage.getItem('ht_targets')||'{}');
  document.getElementById('profName').value=prof?.name||curUser.user_metadata?.name||'';
  const emailVal=curUser.email||'';
  document.getElementById('profEmail').value=emailVal.includes('@healthtracker.app')?'(phone user)':emailVal;
  if(prof?.phone){
    document.getElementById('profPhoneField').style.display='block';
    document.getElementById('profPhone').value=prof.phone;
  }
  document.getElementById('tgtCal').value=tgts.cal||T.cal;
  document.getElementById('tgtPro').value=tgts.pro||T.pro;
  document.getElementById('tgtCarb').value=tgts.carb||T.carb;
  document.getElementById('tgtFat').value=tgts.fat||T.fat;
  if(prof?.avatar_url){
    document.getElementById('profileAvatarImg').src=prof.avatar_url;
    document.getElementById('profileAvatarImg').style.display='block';
    document.getElementById('profileAvatarIcon').style.display='none';
  }
  updateNotifBtn();
}

function updateNotifBtn(){
  const on=localStorage.getItem('ht_water_notif')==='on';
  const btn=document.getElementById('notifToggleBtn');
  const st=document.getElementById('notifStatus');
  if(!btn)return;
  if(on){
    btn.textContent='বন্ধ করো';
    btn.style.background='var(--rdim)';btn.style.color='var(--red)';btn.style.borderColor='rgba(248,113,113,.3)';
    st.textContent='Notification চালু — প্রতি ৩০ মিনিটে reminder আসবে';
    st.style.color='var(--green)';
  } else {
    btn.textContent='চালু করো';
    btn.style.background='var(--s2)';btn.style.color='var(--t2)';btn.style.borderColor='var(--bd2)';
    st.textContent='Notification off আছে';
    st.style.color='var(--t3)';
  }
}

async function toggleWaterNotif(){
  const on=localStorage.getItem('ht_water_notif')==='on';
  if(!on){
    if(!('Notification' in window)){showToast('এই browser-এ notification support নেই');return;}
    const perm=await Notification.requestPermission();
    if(perm!=='granted'){showToast('Browser settings থেকে notification permission দাও');return;}
    localStorage.setItem('ht_water_notif','on');
    startWaterNotif();
    showToast('Water reminder চালু হয়েছে!');
  } else {
    localStorage.setItem('ht_water_notif','off');
    stopWaterNotif();
    showToast('Water reminder বন্ধ হয়েছে');
  }
  updateNotifBtn();
}

function startWaterNotif(){
  stopWaterNotif();
  waterNotifInterval=setInterval(async()=>{
    if(Notification.permission!=='granted')return;
    const d=await loadDayData(todayStr());
    const total=(d.water||[]).reduce((s,x)=>s+x,0);
    if(total<3000){
      new Notification('💧 পানি খাওয়ার সময়!',{
        body:`এখন পর্যন্ত ${total}ml — আরো ${3000-total}ml বাকি`
      });
    }
  },30*60*1000);
}

function stopWaterNotif(){
  if(waterNotifInterval){clearInterval(waterNotifInterval);waterNotifInterval=null;}
}

async function saveProfile(){
  const name=document.getElementById('profName').value.trim();
  if(!name){showAuthMsg('profErr','নাম দিন');return;}
  const{error}=await sb.from('profiles').update({name}).eq('id',curUser.id);
  await sb.auth.updateUser({data:{name}});
  if(error){showAuthMsg('profErr',error.message);return;}
  document.getElementById('userBtn').textContent='👤 '+name;
  showAuthMsg('profOk','Profile save হয়েছে!');
}

async function saveTargets(){
  const tgts={
    cal:+document.getElementById('tgtCal').value||1850,
    pro:+document.getElementById('tgtPro').value||155,
    carb:+document.getElementById('tgtCarb').value||170,
    fat:+document.getElementById('tgtFat').value||55
  };
  localStorage.setItem('ht_targets',JSON.stringify(tgts));
  T.cal=tgts.cal;T.pro=tgts.pro;T.carb=tgts.carb;T.fat=tgts.fat;
  showToast('Targets save হয়েছে!');
  sv('food');
}

async function changeProfilePass(){
  const p1=document.getElementById('profNewPass').value;
  const p2=document.getElementById('profNewPass2').value;
  if(!p1||p1.length<6){showAuthMsg('profPassErr','Password কমপক্ষে ৬ অক্ষর');return;}
  if(p1!==p2){showAuthMsg('profPassErr','Password দুটো মিলছে না');return;}
  const{error}=await sb.auth.updateUser({password:p1});
  if(error){showAuthMsg('profPassErr',error.message);return;}
  document.getElementById('profNewPass').value='';
  document.getElementById('profNewPass2').value='';
  showAuthMsg('profPassOk','Password change হয়েছে!');
}

async function uploadAvatar(event){
  const file=event.target.files[0];
  if(!file)return;
  showToast('Upload হচ্ছে...');
  const ext=file.name.split('.').pop();
  const path=`avatars/${curUser.id}.${ext}`;
  const{error}=await sb.storage.from('avatars').upload(path,file,{upsert:true});
  if(error){showToast('Upload error: '+error.message);return;}
  const{data}=sb.storage.from('avatars').getPublicUrl(path);
  await sb.from('profiles').update({avatar_url:data.publicUrl}).eq('id',curUser.id);
  document.getElementById('profileAvatarImg').src=data.publicUrl+'?t='+Date.now();
  document.getElementById('profileAvatarImg').style.display='block';
  document.getElementById('profileAvatarIcon').style.display='none';
  showToast('Profile photo update হয়েছে!');
}

// ══════════════════════════════════════════