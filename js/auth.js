// AUTH
// ══════════════════════════════════════════
let signupMethod='email', signupPhone='';

function showAuthTab(t){
  document.querySelectorAll('.auth-tab').forEach((b,i)=>b.classList.toggle('on',(t==='login'&&i===0)||(t==='signup'&&i===1)));
  const forms=['loginForm','signupForm','otpForm','forgotForm','newPassForm'];
  forms.forEach(f=>{const el=document.getElementById(f);if(el)el.style.display='none';});
  const map={login:'loginForm',signup:'signupForm',otp:'otpForm',forgot:'forgotForm',newpass:'newPassForm'};
  if(map[t])document.getElementById(map[t]).style.display='block';
}

function setSignupMethod(m){
  signupMethod=m;
  document.getElementById('togEmail').classList.toggle('on',m==='email');
  document.getElementById('togPhone').classList.toggle('on',m==='phone');
  document.getElementById('emailSignupFields').style.display=m==='email'?'block':'none';
  document.getElementById('phoneSignupFields').style.display=m==='phone'?'block':'none';
}

async function doLogin(){
  const val=document.getElementById('loginEmail').value.trim();
  const pass=document.getElementById('loginPass').value;
  if(!val){showAuthMsg('loginErr','Email বা phone number দিন');return;}
  const btn=document.getElementById('loginBtn');
  btn.disabled=true;btn.textContent='লগিন হচ্ছে...';
  let error;
  if(val.startsWith('+')){
    // Phone OTP login via TextBee Edge Function
    const phoneLoginPass = document.getElementById('loginPass').value;
    if(!phoneLoginPass){showAuthMsg('loginErr','Password দিন');btn.disabled=false;btn.textContent='Login করো';return;}
    localStorage.setItem('pendingPhonePass', phoneLoginPass);
    const _r2=await fetch('https://health-tracker-otp.arnobdebnath216.workers.dev',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:val,action:'send'})});
    const _d2=await _r2.json();
    btn.disabled=false;btn.textContent='Login করো';
    if(!_r2.ok||_d2.error){showAuthMsg('loginErr',_d2.error||'SMS পাঠানো যায়নি');return;}
    signupPhone=val;signupMethod='phone';
    document.getElementById('loginForm').style.display='none';
    document.getElementById('otpForm').style.display='block';
    document.getElementById('otpIcon').textContent='📱';
    document.getElementById('otpTitle').textContent='Phone verify করো';
    document.getElementById('otpEmailShow').textContent=val+'-এ OTP SMS পাঠানো হয়েছে';
    showAuthMsg('otpOk','SMS চেক করো — OTP পাঠানো হয়েছে');
    return;
  } else {
    if(!pass){showAuthMsg('loginErr','Password দিন');btn.disabled=false;btn.textContent='Login করো';return;}
    const{error:e}=await sb.auth.signInWithPassword({email:val,password:pass});
    error=e;
  }
  btn.disabled=false;btn.textContent='Login করো';
  if(error){
    const m=error.message;
    if(m==='Invalid login credentials'||m.includes('invalid_credentials'))
      showAuthMsg('loginErr','Email বা password ভুল — আবার চেষ্টা করো');
    else if(m.includes('Email not confirmed'))
      showAuthMsg('loginErr','Email verify করা হয়নি — inbox চেক করো');
    else if(m.includes('Too many'))
      showAuthMsg('loginErr','অনেকবার চেষ্টা করা হয়েছে — কিছুক্ষণ পরে আবার চেষ্টা করো');
    else showAuthMsg('loginErr',m);
  }
}

async function doSignup(){
  const name=document.getElementById('signupName').value.trim();
  if(!name){showAuthMsg('signupErr','নাম দিন');return;}
  const btn=document.getElementById('signupBtn');
  btn.disabled=true;btn.textContent='Account বানানো হচ্ছে...';
  if(signupMethod==='phone'){
    const phone=document.getElementById('signupPhone').value.trim();
    if(!phone||!phone.startsWith('+')){showAuthMsg('signupErr','Phone number দিন (+880...)');btn.disabled=false;btn.textContent='Account বানাও';return;}
    const phonePass2 = document.getElementById('signupPhonePass').value;
    if(!phonePass2||phonePass2.length<6){showAuthMsg('signupErr','Password কমপক্ষে ৬ অক্ষর দিন');btn.disabled=false;btn.textContent='Account বানাও';return;}
    // Check if phone already registered
    const phoneEmailCheck = 'u' + phone.replace(/[^0-9]/g,'') + '@healthtracker.app';
    const{data:existCheck}=await sb.from('profiles').select('id').eq('phone',phone).single();
    if(existCheck){
      showAuthMsg('signupErr','এই phone number দিয়ে আগেই account আছে — Login করো');
      btn.disabled=false;btn.textContent='Account বানাও';
      return;
    }
    localStorage.setItem('pendingPhoneName', name);
    localStorage.setItem('pendingPhonePass', phonePass2);
    const _r1=await fetch('https://health-tracker-otp.arnobdebnath216.workers.dev',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,action:'send'})});
    const _d1=await _r1.json();
    btn.disabled=false;btn.textContent='Account বানাও';
    if(!_r1.ok||_d1.error){showAuthMsg('signupErr',_d1.error||'SMS পাঠানো যায়নি');return;}
    signupPhone=phone;signupEmail='';
    document.getElementById('signupForm').style.display='none';
    document.getElementById('otpForm').style.display='block';
    document.getElementById('otpIcon').textContent='📱';
    document.getElementById('otpTitle').textContent='Phone verify করো';
    document.getElementById('otpEmailShow').textContent=phone+'-এ OTP SMS পাঠানো হয়েছে';
    showAuthMsg('otpOk','SMS চেক করো — OTP পাঠানো হয়েছে');
  } else {
    const email=document.getElementById('signupEmail').value.trim();
    const pass=document.getElementById('signupPass').value;
    if(!email||!pass){showAuthMsg('signupErr','Email ও password দিন');btn.disabled=false;btn.textContent='Account বানাও';return;}
    if(pass.length<6){showAuthMsg('signupErr','Password কমপক্ষে ৬ অক্ষর');btn.disabled=false;btn.textContent='Account বানাও';return;}
    const{data:sd,error}=await sb.auth.signUp({email,password:pass,options:{data:{name},emailRedirectTo:'https://arnob-debnath.github.io/track-health'}});
    btn.disabled=false;btn.textContent='Account বানাও';
    if(error){
      const msg=error.message;
      if(msg.includes('already registered')||msg.includes('already exists')||msg.includes('User already'))
        showAuthMsg('signupErr','এই email দিয়ে আগেই account আছে — Login করো অথবা অন্য email ব্যবহার করো');
      else if(msg.includes('invalid')||msg.includes('Invalid'))
        showAuthMsg('signupErr','সঠিক email দিন');
      else if(msg.includes('Password'))
        showAuthMsg('signupErr','Password কমপক্ষে ৬ অক্ষর হতে হবে');
      else showAuthMsg('signupErr',msg);
      return;
    }
    // Supabase sometimes returns user with identities=[] for existing email (no error thrown)
    if(sd?.user&&sd.user.identities&&sd.user.identities.length===0){
      showAuthMsg('signupErr','এই email দিয়ে আগেই account আছে — Login করো অথবা অন্য email ব্যবহার করো');
      return;
    }
    signupEmail=email;
    document.getElementById('signupForm').style.display='none';
    document.getElementById('otpForm').style.display='block';
    document.getElementById('otpIcon').textContent='📧';
    document.getElementById('otpTitle').textContent='Email verify করো';
    document.getElementById('otpEmailShow').textContent=email+'-এ OTP পাঠানো হয়েছে';
    showAuthMsg('otpOk','Email চেক করো — OTP পাঠানো হয়েছে');
  }
}

async function doVerifyOTP(){
  const code=document.getElementById('otpCode').value.trim();
  if(!code||code.length<6){showAuthMsg('otpErr','OTP code দিন');return;}
  const btn=document.getElementById('otpBtn');
  btn.disabled=true;btn.textContent='Verify হচ্ছে...';

  if(signupMethod==='phone'){
    // Verify via Edge Function
    const _r3=await fetch('https://health-tracker-otp.arnobdebnath216.workers.dev',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:signupPhone,otp:code,action:'verify'})});
    const _d3=await _r3.json();
    if(!_r3.ok||_d3.error){
      btn.disabled=false;btn.textContent='Verify করো';
      showAuthMsg('otpErr',_d3.error||'OTP ভুল বা মেয়াদ শেষ');
      return;
    }
    // OTP verified — create/login Supabase account using phone + password
    const name = localStorage.getItem('pendingPhoneName') || signupPhone;
    const savedPass = localStorage.getItem('pendingPhonePass') || '';
    const phoneEmail = 'u' + signupPhone.replace(/[^0-9]/g,'') + '@healthtracker.app';

    // Try login first (returning user)
    const{data:ld, error:le}=await sb.auth.signInWithPassword({email:phoneEmail, password:savedPass});
    if(!le && ld?.session){
      btn.disabled=false;btn.textContent='Verify করো';
      localStorage.removeItem('pendingPhoneName');
      localStorage.removeItem('pendingPhonePass');
      showAuthMsg('otpOk','Login হয়েছে!');
      return;
    }

    // Check if account exists but wrong password
    if(le && (le.message.includes('Invalid login') || le.message.includes('invalid_credentials'))){
      // Account exists — check if it's a duplicate phone
      const{data:profCheck}=await sb.from('profiles').select('id').eq('phone',signupPhone).single();
      if(profCheck){
        btn.disabled=false;btn.textContent='Verify করো';
        showAuthMsg('otpErr','এই phone number দিয়ে আগেই account আছে — সঠিক password দিন');
        return;
      }
    }

    // New user — signup
    const{data:sd, error:se}=await sb.auth.signUp({
      email: phoneEmail,
      password: savedPass,
      options:{data:{name, phone: signupPhone}}
    });
    btn.disabled=false;btn.textContent='Verify করো';
    if(se && !se.message.includes('already') && !se.message.includes('registered')){
      showAuthMsg('otpErr','Account তৈরি হয়নি: '+se.message);return;
    }
    // If already registered, just try login
    if(se && (se.message.includes('already') || se.message.includes('registered'))){
      const{error:le3}=await sb.auth.signInWithPassword({email:phoneEmail, password:savedPass});
      btn.disabled=false;btn.textContent='Verify করো';
      if(le3){showAuthMsg('otpErr','Password ভুল — আবার চেষ্টা করো');return;}
      localStorage.removeItem('pendingPhoneName');
      localStorage.removeItem('pendingPhonePass');
      showAuthMsg('otpOk','Login হয়েছে!');
      return;
    }
    // Login after fresh signup
    const{error:le2}=await sb.auth.signInWithPassword({email:phoneEmail, password:savedPass});
    if(le2){showAuthMsg('otpErr','Login হয়নি — আবার চেষ্টা করো');return;}
    // Save phone in profile
    const uid=(await sb.auth.getUser()).data.user?.id;
    if(uid) await sb.from('profiles').upsert({id:uid,name,phone:signupPhone,is_admin:false},{onConflict:'id'});
    localStorage.removeItem('pendingPhoneName');
    localStorage.removeItem('pendingPhonePass');
    showAuthMsg('otpOk','Account তৈরি হয়েছে! Login হচ্ছে...');
  } else {
    const{error}=await sb.auth.verifyOtp({email:signupEmail,token:code,type:'email'});
    btn.disabled=false;btn.textContent='Verify করো';
    if(error){showAuthMsg('otpErr','OTP ভুল বা মেয়াদ শেষ');return;}
    showAuthMsg('otpOk','Verify হয়েছে! Login হচ্ছে...');
  }
}

async function resendOTP(){
  if(signupMethod==='phone'){
    const _r4=await fetch('https://health-tracker-otp.arnobdebnath216.workers.dev',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:signupPhone,action:'send'})});
    const _d4=await _r4.json();
    if(!_r4.ok||_d4.error)showAuthMsg('otpErr',_d4.error||'SMS পাঠানো যায়নি');
    else showAuthMsg('otpOk','নতুন OTP পাঠানো হয়েছে');
  } else {
    const{error}=await sb.auth.resend({type:'signup',email:signupEmail});
    if(error)showAuthMsg('otpErr',error.message);
    else showAuthMsg('otpOk','নতুন OTP পাঠানো হয়েছে');
  }
}

async function doForgotPassword(){
  const email=document.getElementById('forgotEmail').value.trim();
  if(!email){showAuthMsg('forgotErr','Email দিন');return;}
  const btn=document.getElementById('forgotBtn');
  btn.disabled=true;btn.textContent='পাঠানো হচ্ছে...';
  const{error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:'https://arnob-debnath.github.io/track-health?type=recovery'});
  btn.disabled=false;btn.textContent='Reset Link পাঠাও';
  if(error){showAuthMsg('forgotErr',error.message);return;}
  showAuthMsg('forgotOk','Email চেক করো — Reset link পাঠানো হয়েছে');
}

async function doUpdatePassword(){
  const p1=document.getElementById('newPass').value;
  const p2=document.getElementById('newPass2').value;
  if(!p1||p1.length<6){showAuthMsg('newPassErr','Password কমপক্ষে ৬ অক্ষর');return;}
  if(p1!==p2){showAuthMsg('newPassErr','Password দুটো মিলছে না');return;}
  const btn=document.getElementById('newPassBtn');
  btn.disabled=true;btn.textContent='Update হচ্ছে...';
  const{error}=await sb.auth.updateUser({password:p1});
  btn.disabled=false;btn.textContent='Password Update করো';
  if(error){showAuthMsg('newPassErr',error.message);return;}
  showAuthMsg('newPassOk','Password update হয়েছে! Login হচ্ছে...');
  setTimeout(()=>location.reload(),2000);
}

function showAuthMsg(id,msg){
  const el=document.getElementById(id);
  if(!el)return;
  el.textContent=msg;el.style.display='block';
  setTimeout(()=>el.style.display='none',5000);
}

function showUserMenu(){
  sv('profile');
}

// ══════════════════════════════════════════
// DAY DATA (Supabase)
// ══════════════════════════════════════════
async function loadDayData(date){
  if(dayCache[date])return dayCache[date];
  setSyncing(true);
  const[{data:fl},{data:wl},{data:wtr}]=await Promise.all([
    sb.from('food_logs').select('*').eq('user_id',curUser.id).eq('date',date),
    sb.from('workout_logs').select('*').eq('user_id',curUser.id).eq('date',date),
    sb.from('water_logs').select('*').eq('user_id',curUser.id).eq('date',date).single(),
  ]);
  const qty={}, wqty={};
  (fl||[]).forEach(r=>qty[r.food_id]=r.quantity);
  (wl||[]).forEach(r=>wqty[r.workout_id]=r.quantity);
  dayCache[date]={qty,wqty,water:wtr?.entries||[]};
  setSyncing(false);
  return dayCache[date];
}

async function saveFood(foodId,quantity){
  const f=allFoods().find(x=>x.id===foodId);if(!f)return;
  setSyncing(true);
  if(quantity<=0){
    await sb.from('food_logs').delete().eq('user_id',curUser.id).eq('date',curDate).eq('food_id',foodId);
  } else {
    await sb.from('food_logs').upsert({user_id:curUser.id,date:curDate,food_id:foodId,food_name:f.name,quantity,calories:f.cal*quantity,protein:f.pro*quantity,carbs:f.carb*quantity,fat:f.fat*quantity,meal_time:f.sec,is_junk:f.junk},{onConflict:'user_id,date,food_id'});
  }
  setSyncing(false);
}

async function saveWorkout(wId,quantity){
  const w=allWorkouts().find(x=>x.id===wId);if(!w)return;
  setSyncing(true);
  if(quantity<=0){
    await sb.from('workout_logs').delete().eq('user_id',curUser.id).eq('date',curDate).eq('workout_id',wId);
  } else {
    await sb.from('workout_logs').upsert({user_id:curUser.id,date:curDate,workout_id:wId,workout_name:w.name,quantity,calories_burned:w.burn*quantity,steps:w.steps*quantity},{onConflict:'user_id,date,workout_id'});
  }
  setSyncing(false);
}

async function saveWater(entries){
  setSyncing(true);
  await sb.from('water_logs').upsert({user_id:curUser.id,date:curDate,entries,updated_at:new Date().toISOString()},{onConflict:'user_id,date'});
  setSyncing(false);
}

function setSyncing(v){document.getElementById('syncStatus').textContent=v?'syncing...':'';}

// ══════════════════════════════════════════
// CUSTOM FOODS/WORKOUTS
// ══════════════════════════════════════════
async function loadCustomFoods(){
  const{data}=await sb.from('custom_foods').select('*').eq('user_id',curUser.id).order('created_at');
  customFoodsCache=(data||[]).map(r=>({id:'cf_'+r.id,name:r.name,qty:r.quantity_label||'1 serving',cal:r.calories,pro:r.protein,carb:r.carbs,fat:r.fat,sec:r.category,junk:r.is_junk,dbId:r.id}));
}
async function loadCustomWorkouts(){
  const{data}=await sb.from('custom_workouts').select('*').eq('user_id',curUser.id).order('created_at');
  customWorkoutsCache=(data||[]).map(r=>({id:'cw_'+r.id,name:r.name,dur:r.duration_label||'—',burn:r.calories_burned,steps:r.steps,sec:r.category,mins:30,dbId:r.id}));
}
function allFoods(){return[...FOODS,...customFoodsCache];}
function allWorkouts(){return[...WORKOUTS,...customWorkoutsCache];}

// ══════════════════════════════════════════