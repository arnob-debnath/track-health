// ══════════════════════════════════════════
// SUPABASE INIT
// ══════════════════════════════════════════
const SUPA_URL = 'https://mxflswnydksexbcitfnn.supabase.co';
const SUPA_KEY = 'sb_publishable_z_EGcA7YG6cplcyNvUQemQ_-fZHn6Fn';
const { createClient } = supabase;
const sb = createClient(SUPA_URL, SUPA_KEY);

// ══════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════
const T={cal:1850,pro:155,carb:170,fat:55};
const DAYS=['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
const MONTHS=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
const MEAL_TIMES=['সব','সকাল','দুপুর','বিকেল','রাত'];
const SORD=['সকাল','দুপুর','বিকেল','রাত','সবজি','ফল','বীজ','দুগ্ধজাত','পানীয়','মিষ্টি','ভাজা/জাংক','অন্যান্য'];
const SCOLS={সকাল:'#4ade80',দুপুর:'#60a5fa',বিকেল:'#fbbf24',রাত:'#a78bfa',সবজি:'#2dd4bf',ফল:'#fb923c',বীজ:'#c084fc',দুগ্ধজাত:'#38bdf8',পানীয়:'#86efac',মিষ্টি:'#f472b6','ভাজা/জাংক':'#f87171',অন্যান্য:'#94a3b8'};
const WCOLS={Cardio:'#f87171','Chest + Belly':'#f472b6','Upper Body':'#60a5fa','Back + Core':'#a78bfa',Legs:'#4ade80','Full Body':'#fbbf24',অন্যান্য:'#94a3b8'};
const MSG_TYPES=['suggestion','food request','bug','other'];
const WATER_OPTS=[{ml:200,l:'200ml'},{ml:250,l:'250ml'},{ml:500,l:'500ml'},{ml:1000,l:'1L'}];

const FOODS=[
  {id:'oats',name:'Oats (রান্না)',qty:'50g dry',cal:190,pro:6,carb:33,fat:3,sec:'সকাল',junk:false},
  {id:'egg_w',name:'Egg — পুরো',qty:'1টা (60g)',cal:70,pro:6,carb:1,fat:5,sec:'সকাল',junk:false},
  {id:'egg_wh',name:'Egg white',qty:'1টা white',cal:17,pro:4,carb:0,fat:0,sec:'সকাল',junk:false},
  {id:'chola',name:'Soaked chola (বুট)',qty:'3 tbsp (50g)',cal:80,pro:5,carb:13,fat:1,sec:'সকাল',junk:false},
  {id:'honey',name:'Honey',qty:'1 চা চামচ',cal:21,pro:0,carb:6,fat:0,sec:'সকাল',junk:false},
  {id:'date',name:'খেজুর (Date)',qty:'1টা',cal:23,pro:0,carb:6,fat:0,sec:'সকাল',junk:false},
  {id:'chira',name:'চিড়া ভেজানো',qty:'50g',cal:170,pro:3,carb:37,fat:1,sec:'সকাল',junk:false},
  {id:'muri',name:'মুড়ি',qty:'40g',cal:140,pro:3,carb:31,fat:1,sec:'সকাল',junk:false},
  {id:'flax',name:'Flaxseed / Chia seed',qty:'1 tbsp',cal:40,pro:2,carb:3,fat:3,sec:'সকাল',junk:false},
  {id:'pao',name:'পাউ রুটি',qty:'1 piece',cal:90,pro:3,carb:17,fat:1,sec:'সকাল',junk:false},
  {id:'butter_bun',name:'Butter bun',qty:'1টা',cal:240,pro:5,carb:32,fat:11,sec:'সকাল',junk:true},
  {id:'chicken',name:'Chicken breast',qty:'100g',cal:165,pro:31,carb:0,fat:4,sec:'দুপুর',junk:false},
  {id:'ch_roast',name:'Chicken roast',qty:'1 piece',cal:320,pro:25,carb:8,fat:21,sec:'দুপুর',junk:true},
  {id:'mutton',name:'Mutton curry',qty:'100g',cal:207,pro:17,carb:3,fat:14,sec:'দুপুর',junk:false},
  {id:'fish',name:'মাছ (রুই/পাঙাশ)',qty:'100g',cal:100,pro:17,carb:0,fat:3,sec:'দুপুর',junk:false},
  {id:'hilsha',name:'ইলিশ মাছ',qty:'100g',cal:217,pro:21,carb:0,fat:14,sec:'দুপুর',junk:false},
  {id:'br_rice',name:'Brown rice',qty:'1 কাপ রান্না',cal:215,pro:5,carb:45,fat:2,sec:'দুপুর',junk:false},
  {id:'wh_rice',name:'সাদা ভাত',qty:'1 কাপ',cal:240,pro:4,carb:53,fat:0,sec:'দুপুর',junk:false},
  {id:'roti',name:'Whole wheat roti',qty:'1টা',cal:90,pro:3,carb:18,fat:1,sec:'দুপুর',junk:false},
  {id:'dal',name:'Masur / mung dal',qty:'½ কাপ',cal:100,pro:8,carb:17,fat:0,sec:'দুপুর',junk:false},
  {id:'soy',name:'Soyabean chunks',qty:'30g dry',cal:110,pro:17,carb:8,fat:1,sec:'দুপুর',junk:false},
  {id:'polao',name:'পোলাও',qty:'1 কাপ',cal:290,pro:5,carb:52,fat:8,sec:'দুপুর',junk:true},
  {id:'biriyani',name:'Biriyani (চিকেন)',qty:'1 প্লেট',cal:520,pro:28,carb:58,fat:18,sec:'দুপুর',junk:true},
  {id:'pasta',name:'Pasta',qty:'1 কাপ',cal:220,pro:8,carb:43,fat:1,sec:'দুপুর',junk:false},
  {id:'noodles',name:'Instant noodles',qty:'1 প্যাক',cal:380,pro:8,carb:52,fat:16,sec:'দুপুর',junk:true},
  {id:'ch_fry',name:'Chicken fry',qty:'1 piece',cal:380,pro:28,carb:12,fat:25,sec:'বিকেল',junk:true},
  {id:'ch_ball',name:'Chicken ball',qty:'3টা',cal:210,pro:14,carb:15,fat:10,sec:'বিকেল',junk:true},
  {id:'singara',name:'সিঙ্গারা',qty:'1টা',cal:140,pro:3,carb:17,fat:7,sec:'বিকেল',junk:true},
  {id:'pk_seeds',name:'Pumpkin seeds',qty:'1 tbsp (15g)',cal:85,pro:4,carb:3,fat:7,sec:'বিকেল',junk:false},
  {id:'sf_seeds',name:'Sunflower seeds',qty:'1 tbsp (15g)',cal:83,pro:3,carb:3,fat:7,sec:'বিকেল',junk:false},
  {id:'tok_doi',name:'টক দই',qty:'100g',cal:70,pro:6,carb:7,fat:2,sec:'বিকেল',junk:false},
  {id:'banana',name:'কলা',qty:'1টা',cal:89,pro:1,carb:23,fat:0,sec:'বিকেল',junk:false},
  {id:'apple',name:'Apple',qty:'1টা',cal:95,pro:0,carb:25,fat:0,sec:'বিকেল',junk:false},
  {id:'guava',name:'পেয়ারা',qty:'1টা',cal:68,pro:3,carb:14,fat:1,sec:'বিকেল',junk:false},
  {id:'r_chicken',name:'Chicken breast (রাতের)',qty:'100g',cal:165,pro:31,carb:0,fat:4,sec:'রাত',junk:false},
  {id:'r_fish',name:'মাছ রান্না (রাতের)',qty:'100g',cal:100,pro:17,carb:0,fat:3,sec:'রাত',junk:false},
  {id:'r_roti',name:'Whole wheat roti (রাতের)',qty:'1টা',cal:90,pro:3,carb:18,fat:1,sec:'রাত',junk:false},
  {id:'r_dal',name:'Dal রাতের',qty:'½ কাপ',cal:100,pro:8,carb:17,fat:0,sec:'রাত',junk:false},
  {id:'lau',name:'লাউ রান্না',qty:'1 কাপ',cal:35,pro:1,carb:8,fat:0,sec:'রাত',junk:false},
  {id:'lau_bhaja',name:'লাউ ভাজা',qty:'1 কাপ',cal:80,pro:1,carb:9,fat:4,sec:'রাত',junk:false},
  {id:'begun_bhaja',name:'বেগুন ভাজা',qty:'2 piece',cal:110,pro:1,carb:7,fat:9,sec:'রাত',junk:false},
  {id:'korola_bhaja',name:'করলা ভাজা',qty:'½ কাপ',cal:90,pro:2,carb:6,fat:7,sec:'রাত',junk:false},
  {id:'r_sabji',name:'মিক্স সবজি রান্না',qty:'1 কাপ',cal:60,pro:3,carb:12,fat:1,sec:'রাত',junk:false},
  {id:'tur_milk',name:'হলুদ দুধ',qty:'200ml',cal:130,pro:6,carb:11,fat:7,sec:'রাত',junk:false},
  {id:'lobongo',name:'লবঙ্গ ভেজানো জল',qty:'1 গ্লাস',cal:0,pro:0,carb:0,fat:0,sec:'রাত',junk:false},
  {id:'pumpkin',name:'কুমড়া (Pumpkin)',qty:'1 কাপ',cal:45,pro:2,carb:10,fat:0,sec:'সবজি',junk:false},
  {id:'sw_pot',name:'মিষ্টি আলু',qty:'1টা (150g)',cal:130,pro:2,carb:30,fat:0,sec:'সবজি',junk:false},
  {id:'potato',name:'আলু সেদ্ধ',qty:'1টা (100g)',cal:87,pro:2,carb:20,fat:0,sec:'সবজি',junk:false},
  {id:'cucumb',name:'শসা / Cucumber',qty:'1টা মাঝারি',cal:16,pro:1,carb:3,fat:0,sec:'সবজি',junk:false},
  {id:'spinach',name:'পালং শাক',qty:'1 কাপ',cal:40,pro:4,carb:6,fat:1,sec:'সবজি',junk:false},
  {id:'broccoli',name:'Broccoli',qty:'1 কাপ',cal:55,pro:4,carb:10,fat:1,sec:'সবজি',junk:false},
  {id:'papaya',name:'পেঁপে (Papaya)',qty:'1 কাপ',cal:55,pro:1,carb:13,fat:0,sec:'ফল',junk:false},
  {id:'milk',name:'দুধ',qty:'200ml',cal:124,pro:6,carb:9,fat:7,sec:'দুগ্ধজাত',junk:false},
  {id:'msh_doi',name:'মিষ্টি দই',qty:'100g',cal:150,pro:5,carb:22,fat:5,sec:'দুগ্ধজাত',junk:true},
  {id:'matha',name:'মাঠা (Lassi)',qty:'1 গ্লাস',cal:110,pro:4,carb:14,fat:4,sec:'দুগ্ধজাত',junk:false},
  {id:'gtea',name:'Green tea / Black coffee',qty:'1 কাপ',cal:2,pro:0,carb:0,fat:0,sec:'পানীয়',junk:false},
  {id:'dudh_cha',name:'দুধ চা (চিনি সহ)',qty:'1 কাপ',cal:80,pro:2,carb:14,fat:2,sec:'পানীয়',junk:false},
  {id:'mlk_cof',name:'Milk coffee',qty:'1 কাপ',cal:90,pro:3,carb:12,fat:4,sec:'পানীয়',junk:false},
  {id:'cold_drk',name:'Cold drink',qty:'1 ক্যান (330ml)',cal:140,pro:0,carb:35,fat:0,sec:'পানীয়',junk:true},
  {id:'jilapi',name:'জিলাপি',qty:'1 piece',cal:100,pro:1,carb:18,fat:3,sec:'মিষ্টি',junk:true},
  {id:'cake',name:'Cake',qty:'1 slice (80g)',cal:280,pro:4,carb:40,fat:12,sec:'মিষ্টি',junk:true},
  {id:'ice_crm',name:'Ice cream',qty:'1 scoop',cal:140,pro:2,carb:18,fat:7,sec:'মিষ্টি',junk:true},
  {id:'mishti',name:'মিষ্টি (রসগোল্লা/সন্দেশ)',qty:'1 piece',cal:80,pro:2,carb:14,fat:2,sec:'মিষ্টি',junk:true},
];

const WORKOUTS=[
  {id:'pushup',name:'Push-up',dur:'3×10–12',burn:60,steps:0,sec:'Chest + Belly',mins:15},
  {id:'inc_press',name:'Incline Dumbbell Press',dur:'3×12',burn:55,steps:0,sec:'Chest + Belly',mins:12},
  {id:'cable_fly',name:'Cable Crossover / Pec Fly',dur:'3×15',burn:50,steps:0,sec:'Chest + Belly',mins:12},
  {id:'bench_press',name:'Flat Bench Press',dur:'4×12',burn:70,steps:0,sec:'Chest + Belly',mins:15},
  {id:'dec_pushup',name:'Decline Push-up',dur:'3×10',burn:45,steps:0,sec:'Chest + Belly',mins:10},
  {id:'bicycle_cr',name:'Bicycle Crunch',dur:'3×15',burn:40,steps:0,sec:'Chest + Belly',mins:10},
  {id:'russian_tw',name:'Russian Twist',dur:'3×20',burn:45,steps:0,sec:'Chest + Belly',mins:10},
  {id:'leg_raise',name:'Leg Raise',dur:'3×15',burn:35,steps:0,sec:'Chest + Belly',mins:8},
  {id:'hang_knee',name:'Hanging Knee Raise',dur:'3×12',burn:50,steps:0,sec:'Chest + Belly',mins:10},
  {id:'plank',name:'Plank',dur:'3×30 sec',burn:30,steps:0,sec:'Back + Core',mins:8},
  {id:'side_plank',name:'Side Plank',dur:'3×30 sec',burn:25,steps:0,sec:'Back + Core',mins:8},
  {id:'lat_pull',name:'Lat Pulldown',dur:'4×12',burn:65,steps:0,sec:'Back + Core',mins:12},
  {id:'seated_row',name:'Seated Cable Row',dur:'3×12',burn:60,steps:0,sec:'Back + Core',mins:12},
  {id:'superman',name:'Superman Hold',dur:'3×15',burn:30,steps:0,sec:'Back + Core',mins:8},
  {id:'db_shpress',name:'Dumbbell Shoulder Press',dur:'3×12',burn:55,steps:0,sec:'Upper Body',mins:12},
  {id:'db_row',name:'Dumbbell Row',dur:'3×12',burn:55,steps:0,sec:'Upper Body',mins:10},
  {id:'squat',name:'Squat',dur:'4×15',burn:90,steps:0,sec:'Legs',mins:15},
  {id:'lunges',name:'Lunges',dur:'3×12 each',burn:80,steps:0,sec:'Legs',mins:12},
  {id:'leg_press',name:'Leg Press',dur:'3×15',burn:70,steps:0,sec:'Legs',mins:12},
  {id:'calf_raise',name:'Calf Raise',dur:'3×20',burn:30,steps:0,sec:'Legs',mins:8},
  {id:'burpee',name:'Burpees',dur:'3×10',burn:100,steps:0,sec:'Full Body',mins:12},
  {id:'mtn_climb',name:'Mountain Climber',dur:'3×30 sec',burn:80,steps:0,sec:'Full Body',mins:10},
  {id:'goblet_sq',name:'Goblet Squat',dur:'3×15',burn:85,steps:0,sec:'Full Body',mins:12},
  {id:'treadmill',name:'Treadmill / দৌড়',dur:'25 মিনিট',burn:220,steps:3000,sec:'Cardio',mins:25},
  {id:'cycling',name:'Cycling (machine)',dur:'20 মিনিট',burn:180,steps:0,sec:'Cardio',mins:20},
  {id:'walk',name:'হাঁটা (Walking)',dur:'30 মিনিট',burn:120,steps:4000,sec:'Cardio',mins:30},
  {id:'jump_jack',name:'Jumping Jacks',dur:'3×40',burn:60,steps:0,sec:'Cardio',mins:10},
];

// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
let curUser=null, isAdmin=false, curDate=todayStr();
let aPeriod='week', pOffset=0, fFilter='all', newFoodJunk=false, curMeal='সব';
let msgType='suggestion';
let dayCache={}, customFoodsCache=[], customWorkoutsCache=[], globalFoodsCache=[], globalWorkoutsCache=[];
let openFSec=new Set(SORD), openWSec=new Set(Object.keys(WCOLS));
let syncTimer=null, signupEmail='';

function todayStr(){return new Date().toISOString().slice(0,10);}

// ══════════════════════════════════════════
function toggleLoginPass(){
  const val=document.getElementById('loginEmail').value.trim();
  // Phone login still needs password
  document.getElementById('loginPassField').style.display='block';
}

// INIT
// ══════════════════════════════════════════
async function init(){
  const params=new URLSearchParams(window.location.search);
  const tokenHash=params.get('token_hash');
  const type=params.get('type');
  if(tokenHash&&type==='recovery'){
    // Password reset redirect
    showScreen('auth');
    document.getElementById('loadingScreen').style.display='none';
    document.getElementById('authScreen').style.display='flex';
    const{error}=await sb.auth.verifyOtp({token_hash:tokenHash,type:'recovery'});
    if(!error){
      document.getElementById('newPassForm').style.display='block';
      document.querySelectorAll('.auth-tab').forEach(b=>b.classList.remove('on'));
    } else {
      showAuthTab('login');
      showAuthMsg('loginErr','Reset link মেয়াদ শেষ — আবার চেষ্টা করুন');
    }
    return;
  }
  if(tokenHash&&type){
    const{data,error}=await sb.auth.verifyOtp({token_hash:tokenHash,type});
    window.history.replaceState({},'',window.location.pathname);
    if(!error&&data?.session){await onLogin(data.session.user);return;}
    showScreen('auth');showAuthTab('login');
    showAuthMsg('loginErr','Email verify সমস্যা হয়েছে — আবার login করুন');
    return;
  }
  const {data:{session}}=await sb.auth.getSession();
  if(session){await onLogin(session.user);}
  else{showScreen('auth');}
  sb.auth.onAuthStateChange(async(event,session)=>{
    if(event==='SIGNED_IN'&&session)await onLogin(session.user);
    if(event==='SIGNED_OUT'){curUser=null;showScreen('auth');}
  });
}

async function onLogin(user){
  curUser=user;
  await loadUserProfile();
  await loadCustomFoods();
  await loadCustomWorkouts();
  // Load global foods/workouts added by admin
  const[gf,gw]=await Promise.all([loadGlobalFoods(),loadGlobalWorkouts()]);
  globalFoodsCache=gf;
  globalWorkoutsCache=gw;
  // Load custom targets
  const tgts=JSON.parse(localStorage.getItem('ht_targets')||'{}');
  if(tgts.cal)T.cal=tgts.cal;
  if(tgts.pro)T.pro=tgts.pro;
  if(tgts.carb)T.carb=tgts.carb;
  if(tgts.fat)T.fat=tgts.fat;
  showScreen('app');
  renderFood();
  // Auto-start water notification if was on
  if(localStorage.getItem('ht_water_notif')==='on'&&Notification.permission==='granted'){
    startWaterNotif();
  }
  // Setup realtime — delayed so it doesn't block app load
  setTimeout(()=>setupRealtime(), 2000);
}

async function loadUserProfile(){
  const{data}=await sb.from('profiles').select('*').eq('id',curUser.id).single();
  if(data){
    isAdmin=data.is_admin||false;
    if(isAdmin)document.getElementById('adminNavBtn').style.display='';
  }
  document.getElementById('userBtn').textContent='👤 '+(curUser.user_metadata?.name||curUser.email.split('@')[0]);
}

function showScreen(s){
  document.getElementById('loadingScreen').style.display='none';
  document.getElementById('authScreen').style.display=s==='auth'?'flex':'none';
  document.getElementById('appScreen').style.display=s==='app'?'block':'none';
}

// ══════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════
let tt;
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),2200);}

// ══════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════
function sv(v){
  document.querySelectorAll('.view').forEach(e=>e.classList.remove('on'));
  document.querySelectorAll('.ntab').forEach(e=>e.classList.remove('on'));
  document.getElementById('v-'+v).classList.add('on');
  const idx={food:0,workout:1,analysis:2,messages:3,profile:4,admin:5}[v];
  document.querySelectorAll('.ntab')[idx]?.classList.add('on');
  if(v==='food')renderFood();
  else if(v==='workout')renderWorkout();
  else if(v==='analysis')renderAnalysis();
  else if(v==='messages')renderMessages();
  else if(v==='profile')renderProfile();
  else if(v==='admin')renderAdmin();
}
function cd(delta){
  const d=new Date(curDate+'T12:00:00');d.setDate(d.getDate()+delta);
  if(d>new Date())return;
  curDate=d.toISOString().slice(0,10);
  renderFood();renderWorkout();
}
function goToday(){curDate=todayStr();renderFood();renderWorkout();}
function setDD(mId,sId){
  const d=new Date(curDate+'T12:00:00');
  document.getElementById(mId).textContent=DAYS[d.getDay()]+', '+d.getDate()+' '+MONTHS[d.getMonth()];
  document.getElementById(sId).textContent=curDate===todayStr()?'আজ':curDate;
}

// ══════════════════════════════════════════
// START
// ══════════════════════════════════════════
init();// AUTH
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
    sb.from('water_logs').select('*').eq('user_id',curUser.id).eq('date',date).maybeSingle(),
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
function allFoods(){return[...FOODS,...globalFoodsCache,...customFoodsCache];}
function allWorkouts(){return[...WORKOUTS,...globalWorkoutsCache,...customWorkoutsCache];}

// ══════════════════════════════════════════// FOOD RENDER
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
  // Load from cache or fetch if not available
  if(!dayCache[curDate]) await loadDayData(curDate);
  const d=dayCache[curDate];
  if(!d){showToast('লোড হচ্ছে, আবার চেষ্টা করো');return;}
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
  // Clear cache and reload to sync with DB
  delete dayCache[curDate];
  const fresh=await loadDayData(curDate);
  updateMacros(fresh);renderFoodList(fresh);renderMealTabs(fresh);
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

// ══════════════════════════════════════════// WORKOUT RENDER
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
  if(!dayCache[curDate]) await loadDayData(curDate);
  const d=dayCache[curDate];
  if(!d){showToast('লোড হচ্ছে, আবার চেষ্টা করো');return;}
  if(!d.wqty)d.wqty={};
  const cur=d.wqty[id]||0,next=Math.max(0,cur+delta);
  if(next===0)delete d.wqty[id];else d.wqty[id]=next;
  updateWorkoutSummary(d);renderWorkoutList(d);
  const w=allWorkouts().find(x=>x.id===id);
  if(w){if(next>0)showToast(w.name+' × '+next+' = '+Math.round(w.burn*next)+' kcal burn');}
  await saveWorkout(id,next);
  // Clear cache and reload
  delete dayCache[curDate];
  const fresh=await loadDayData(curDate);
  updateWorkoutSummary(fresh);renderWorkoutList(fresh);
}

async function delCW(id,e){
  e.stopPropagation();
  if(!confirm('এই custom exercise delete করবেন?'))return;
  const item=customWorkoutsCache.find(c=>c.id===id);
  if(item){await sb.from('custom_workouts').delete().eq('id',item.dbId);}
  await loadCustomWorkouts();renderWorkout();showToast('Exercise মুছে ফেলা হয়েছে');
}

// ══════════════════════════════════════════// ANALYSIS
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



// ══════════════════════════════════════════// MESSAGES
// ══════════════════════════════════════════
async function renderMessages(){
  const chips=document.getElementById('msgTypeChips');chips.innerHTML='';
  MSG_TYPES.forEach(t=>{
    const c=document.createElement('button');
    c.className='type-chip'+(msgType===t?' on':'');
    c.textContent=t;c.onclick=()=>{msgType=t;renderMessages();};
    chips.appendChild(c);
  });
  const{data}=await sb.from('messages').select('*').eq('user_id',curUser.id).order('created_at',{ascending:false});
  const list=document.getElementById('msgList');
  if(!data||!data.length){list.innerHTML='<div class="empty">এখনো কোনো message নেই</div>';return;}
  list.innerHTML='<div class="msg-list">'+data.map(m=>`
    <div class="msg-card">
      <div class="msg-meta">
        <span class="msg-type">${m.type}</span>
        <span class="msg-time">${new Date(m.created_at).toLocaleDateString('bn-BD')}</span>
        ${m.is_solved?'<span class="solved-badge">✓ solved</span>':'<span style="margin-left:auto;font-size:10px;color:var(--t3)">pending</span>'}
      </div>
      <div class="msg-content">${m.content}</div>
      ${m.admin_reply?`<div class="msg-reply"><div class="msg-reply-lbl">Admin reply</div>${m.admin_reply}</div>`:''}
    </div>`).join('')+'</div>';
}

async function sendMessage(){
  const content=document.getElementById('msgContent').value.trim();
  if(!content){showToast('Message লিখুন');return;}
  const{error}=await sb.from('messages').insert({user_id:curUser.id,user_name:curUser.user_metadata?.name||curUser.email.split('@')[0],content,type:msgType});
  if(error){showToast('Error: '+error.message);return;}
  document.getElementById('msgContent').value='';
  showToast('Message পাঠানো হয়েছে');
  renderMessages();
}

// ══════════════════════════════════════════
// ADMIN PANEL
// ══════════════════════════════════════════
let adminTab='messages';

async function renderAdmin(){
  if(!isAdmin){showToast('Access denied');return;}
  const el=document.getElementById('v-admin');

  // Load all data
  const[{data:msgs},{data:users},{data:gf},{data:gw}]=await Promise.all([
    sb.from('messages').select('*').order('created_at',{ascending:false}),
    sb.from('profiles').select('*').order('created_at',{ascending:false}),
    sb.from('global_foods').select('*').order('name'),
    sb.from('global_workouts').select('*').order('name'),
  ]);
  globalFoodsCache=gf||[];
  globalWorkoutsCache=gw||[];

  el.querySelector('.admin-wrap').innerHTML=`
    <div style="font-size:16px;font-weight:500;margin-bottom:14px;color:var(--green)">Admin Panel</div>

    <!-- Admin Tabs -->
    <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
      ${['messages','users','foods','workouts'].map(t=>`
        <button onclick="switchAdminTab('${t}')" id="atab_${t}"
          style="padding:6px 14px;border-radius:8px;border:1px solid var(--bd2);background:${adminTab===t?'var(--gdim)':'transparent'};color:${adminTab===t?'var(--green)':'var(--t2)'};font-size:12px;cursor:pointer;font-family:inherit;transition:all .15s">
          ${t==='messages'?'Messages'+(msgs?.filter(m=>!m.is_solved).length?' ('+msgs.filter(m=>!m.is_solved).length+')':'')
            :t==='users'?'Users ('+( users?.length||0)+')'
            :t==='foods'?'Global Foods'
            :'Global Workouts'}
        </button>`).join('')}
    </div>

    <!-- Messages Tab -->
    <div id="adminTab_messages" style="display:${adminTab==='messages'?'block':'none'}">
      ${!msgs||!msgs.length?'<div class="empty">কোনো message নেই</div>':
        '<div class="msg-list">'+msgs.map(m=>`
          <div class="msg-card" style="${m.is_suspended?'opacity:.5':''}">
            <div class="msg-meta">
              <span class="msg-user">${m.user_name||'Unknown'}</span>
              <span class="msg-type">${m.type}</span>
              <span class="msg-time">${new Date(m.created_at).toLocaleDateString('bn-BD')}</span>
              ${m.is_solved?'<span class="solved-badge" style="margin-left:auto">✓ solved</span>':'<span style="margin-left:auto;font-size:10px;color:var(--amber)">pending</span>'}
            </div>
            <div class="msg-content">${m.content}</div>
            ${m.admin_reply?`<div class="msg-reply"><div class="msg-reply-lbl">Admin reply</div>${m.admin_reply}</div>`:''}
            ${!m.is_solved?`
              <textarea class="admin-reply-box" id="reply_${m.id}" placeholder="Reply লিখুন...">${m.admin_reply||''}</textarea>
              <div style="display:flex;gap:6px;margin-top:6px">
                <button class="reply-btn" onclick="sendAdminReply('${m.id}')">Reply পাঠাও</button>
                <button class="solve-btn" onclick="markSolved('${m.id}')">✓ Solved</button>
              </div>
            `:''}
          </div>`).join('')+'</div>'}
    </div>

    <!-- Users Tab -->
    <div id="adminTab_users" style="display:${adminTab==='users'?'block':'none'}">
      <div class="admin-section">
        ${!users||!users.length?'<div class="empty">কোনো user নেই</div>':
          users.map(u=>`
            <div style="background:var(--s2);border-radius:var(--r);padding:12px;margin-bottom:8px;border:1px solid var(--bd)${u.is_suspended?';border-color:rgba(248,113,113,.3)':''}">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <div style="width:36px;height:36px;border-radius:50%;background:var(--gdim);border:1px solid var(--green);display:flex;align-items:center;justify-content:center;font-size:14px">
                  ${u.avatar_url?`<img src="${u.avatar_url}" style="width:100%;height:100%;border-radius:50%;object-fit:cover">`:'👤'}
                </div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:500">${u.name||'—'} ${u.is_admin?'<span class="admin-tag">admin</span>':''} ${u.is_suspended?'<span style="font-size:9px;padding:1px 6px;border-radius:3px;background:var(--rdim);color:var(--red)">suspended</span>':''}</div>
                  <div style="font-size:11px;color:var(--t3)">${u.phone||'no phone'}</div>
                </div>
                <div style="font-size:10px;color:var(--t3);text-align:right">
                  <div>joined ${new Date(u.created_at).toLocaleDateString('bn-BD')}</div>
                </div>
              </div>
              <div style="display:flex;gap:6px;flex-wrap:wrap">
                ${!u.is_admin?`
                  <button onclick="toggleSuspend('${u.id}',${u.is_suspended})"
                    style="padding:4px 10px;border-radius:6px;border:1px solid ${u.is_suspended?'rgba(74,222,128,.3)':'rgba(248,113,113,.3)'};background:${u.is_suspended?'var(--gdim)':'var(--rdim)'};color:${u.is_suspended?'var(--green)':'var(--red)'};font-size:11px;cursor:pointer;font-family:inherit">
                    ${u.is_suspended?'Unsuspend':'Suspend'}
                  </button>
                  <button onclick="deleteUser('${u.id}','${u.name||'এই user'}')"
                    style="padding:4px 10px;border-radius:6px;border:1px solid rgba(248,113,113,.3);background:var(--rdim);color:var(--red);font-size:11px;cursor:pointer;font-family:inherit">
                    Delete
                  </button>
                `:'<span style="font-size:11px;color:var(--t3)">Admin user</span>'}
              </div>
            </div>`).join('')}
      </div>
    </div>

    <!-- Global Foods Tab -->
    <div id="adminTab_foods" style="display:${adminTab==='foods'?'block':'none'}">
      <div class="admin-section">
        <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
          <input class="finp" id="gfName" placeholder="Food নাম *" style="flex:2;min-width:120px">
          <input class="finp" id="gfQty" placeholder="পরিমাণ label" style="flex:1;min-width:80px">
          <select class="finp" id="gfSec" style="flex:1;min-width:80px">
            <option>সকাল</option><option>দুপুর</option><option>বিকেল</option><option>রাত</option>
            <option>সবজি</option><option>ফল</option><option>বীজ</option><option>দুগ্ধজাত</option>
            <option>পানীয়</option><option>মিষ্টি</option><option>ভাজা/জাংক</option><option>অন্যান্য</option>
          </select>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:10px">
          <input class="finp" id="gfCal" type="number" placeholder="Cal" min="0">
          <input class="finp" id="gfPro" type="number" placeholder="Pro(g)" min="0">
          <input class="finp" id="gfCarb" type="number" placeholder="Carb(g)" min="0">
          <input class="finp" id="gfFat" type="number" placeholder="Fat(g)" min="0">
        </div>
        <div style="display:flex;gap:8px;margin-bottom:14px;align-items:center">
          <label style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--t2);cursor:pointer">
            <input type="checkbox" id="gfJunk"> Junk food
          </label>
          <button class="reply-btn" onclick="addGlobalFood()">+ Global Food যোগ করো</button>
        </div>
        <div style="font-size:11px;color:var(--t2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Current Global Foods (${globalFoodsCache.length})</div>
        ${globalFoodsCache.length===0?'<div class="empty">কোনো global food নেই</div>':
          globalFoodsCache.map(f=>`
            <div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;border:1px solid var(--bd);background:var(--s1);margin-bottom:3px">
              <div style="flex:1">
                <span style="font-size:12px">${f.name}</span>
                ${f.is_junk?'<span class="jbadge" style="margin-left:5px">junk</span>':''}
                <span style="font-size:10px;color:var(--t3);margin-left:6px">${f.category} • ${f.calories}kcal</span>
              </div>
              <button onclick="deleteGlobalFood('${f.id}')"
                style="width:22px;height:22px;border-radius:4px;border:none;background:var(--rdim);color:var(--red);cursor:pointer;font-size:12px">✕</button>
            </div>`).join('')}
      </div>
    </div>

    <!-- Global Workouts Tab -->
    <div id="adminTab_workouts" style="display:${adminTab==='workouts'?'block':'none'}">
      <div class="admin-section">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
          <input class="finp" id="gwName" placeholder="Exercise নাম *">
          <select class="finp" id="gwSec">
            <option>Cardio</option><option>Chest + Belly</option><option>Upper Body</option>
            <option>Back + Core</option><option>Legs</option><option>Full Body</option><option>অন্যান্য</option>
          </select>
          <input class="finp" id="gwDur" placeholder="Duration (যেমন: 3×12)">
          <input class="finp" id="gwBurn" type="number" placeholder="Calorie burn" min="0">
          <input class="finp" id="gwSteps" type="number" placeholder="Steps" min="0">
        </div>
        <button class="reply-btn" onclick="addGlobalWorkout()" style="margin-bottom:14px">+ Global Workout যোগ করো</button>
        <div style="font-size:11px;color:var(--t2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Current Global Workouts (${globalWorkoutsCache.length})</div>
        ${globalWorkoutsCache.length===0?'<div class="empty">কোনো global workout নেই</div>':
          globalWorkoutsCache.map(w=>`
            <div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;border:1px solid var(--bd);background:var(--s1);margin-bottom:3px">
              <div style="flex:1">
                <span style="font-size:12px">${w.name}</span>
                <span style="font-size:10px;color:var(--t3);margin-left:6px">${w.category} • ${w.calories_burned}kcal burn</span>
              </div>
              <button onclick="deleteGlobalWorkout('${w.id}')"
                style="width:22px;height:22px;border-radius:4px;border:none;background:var(--rdim);color:var(--red);cursor:pointer;font-size:12px">✕</button>
            </div>`).join('')}
      </div>
    </div>
  `;
}

function switchAdminTab(t){
  adminTab=t;
  renderAdmin();
}

async function sendAdminReply(msgId){
  const reply=document.getElementById('reply_'+msgId)?.value.trim();
  if(!reply){showToast('Reply লিখুন');return;}
  await sb.from('messages').update({admin_reply:reply}).eq('id',msgId);
  showToast('Reply পাঠানো হয়েছে');renderAdmin();
}

async function markSolved(msgId){
  await sb.from('messages').update({is_solved:true,status:'solved'}).eq('id',msgId);
  showToast('Solved mark করা হয়েছে');renderAdmin();
}

async function toggleSuspend(userId,isSuspended){
  const msg=isSuspended?'এই user-কে unsuspend করবেন?':'এই user-কে suspend করবেন?';
  if(!confirm(msg))return;
  await sb.from('profiles').update({is_suspended:!isSuspended}).eq('id',userId);
  showToast(isSuspended?'User unsuspend হয়েছে':'User suspend হয়েছে');
  renderAdmin();
}

async function deleteUser(userId,name){
  if(!confirm(`"${name}" কে permanently delete করবেন? এটা undo করা যাবে না!`))return;
  if(!confirm('আপনি কি সত্যিই নিশ্চিত?'))return;
  // Delete all user data
  await Promise.all([
    sb.from('food_logs').delete().eq('user_id',userId),
    sb.from('workout_logs').delete().eq('user_id',userId),
    sb.from('water_logs').delete().eq('user_id',userId),
    sb.from('custom_foods').delete().eq('user_id',userId),
    sb.from('custom_workouts').delete().eq('user_id',userId),
    sb.from('messages').delete().eq('user_id',userId),
  ]);
  await sb.from('profiles').delete().eq('id',userId);
  showToast('User delete হয়েছে');
  renderAdmin();
}

async function addGlobalFood(){
  const name=document.getElementById('gfName').value.trim();
  if(!name){showToast('Food নাম দিন');return;}
  const{error}=await sb.from('global_foods').insert({
    name,
    quantity_label:document.getElementById('gfQty').value||'1 serving',
    category:document.getElementById('gfSec').value,
    calories:+document.getElementById('gfCal').value||0,
    protein:+document.getElementById('gfPro').value||0,
    carbs:+document.getElementById('gfCarb').value||0,
    fat:+document.getElementById('gfFat').value||0,
    is_junk:document.getElementById('gfJunk').checked,
    created_by:curUser.id
  });
  if(error){showToast('Error: '+error.message);return;}
  showToast('"'+name+'" global food-এ যোগ হয়েছে');
  // Clear food input fields
  ['gfName','gfQty','gfCal','gfPro','gfCarb','gfFat'].forEach(id=>{
    const el=document.getElementById(id); if(el)el.value='';
  });
  renderAdmin();
}

async function deleteGlobalFood(id){
  if(!confirm('এই global food মুছে ফেলবেন?'))return;
  await sb.from('global_foods').delete().eq('id',id);
  showToast('Global food মুছে ফেলা হয়েছে');
  renderAdmin();
}

async function addGlobalWorkout(){
  const name=document.getElementById('gwName').value.trim();
  if(!name){showToast('Exercise নাম দিন');return;}
  const{error}=await sb.from('global_workouts').insert({
    name,
    category:document.getElementById('gwSec').value,
    duration_label:document.getElementById('gwDur').value||'—',
    calories_burned:+document.getElementById('gwBurn').value||0,
    steps:+document.getElementById('gwSteps').value||0,
    created_by:curUser.id
  });
  if(error){showToast('Error: '+error.message);return;}
  showToast('"'+name+'" global workout-এ যোগ হয়েছে');
  ['gwName','gwDur','gwBurn','gwSteps'].forEach(id=>{
    const el=document.getElementById(id); if(el)el.value='';
  });
  renderAdmin();
}

async function deleteGlobalWorkout(id){
  if(!confirm('এই global workout মুছে ফেলবেন?'))return;
  await sb.from('global_workouts').delete().eq('id',id);
  showToast('Global workout মুছে ফেলা হয়েছে');
  renderAdmin();
}

async function loadGlobalFoods(){
  const{data}=await sb.from('global_foods').select('*').order('name');
  return(data||[]).map(r=>({
    id:'gf_'+r.id,name:r.name,qty:r.quantity_label||'1 serving',
    cal:r.calories,pro:r.protein,carb:r.carbs,fat:r.fat,
    sec:r.category,junk:r.is_junk,isGlobal:true
  }));
}

async function loadGlobalWorkouts(){
  const{data}=await sb.from('global_workouts').select('*').order('name');
  return(data||[]).map(r=>({
    id:'gw_'+r.id,name:r.name,dur:r.duration_label||'—',
    burn:r.calories_burned,steps:r.steps,sec:r.category,mins:30,isGlobal:true
  }));
}

// ══════════════════════════════════════════
// REALTIME
// ══════════════════════════════════════════
let realtimeChannel = null;

function setupRealtime(){
  try{
    if(realtimeChannel){sb.removeChannel(realtimeChannel);realtimeChannel=null;}
    realtimeChannel = sb.channel('ht-'+curUser.id)
      .on('postgres_changes',{event:'UPDATE',schema:'public',table:'messages',filter:'user_id=eq.'+curUser.id},(payload)=>{
        try{
          if(document.getElementById('v-messages').classList.contains('on'))renderMessages();
          if(payload.new.admin_reply&&!payload.old.admin_reply){
            showToast('Admin reply করেছেন!');
            if(Notification.permission==='granted')new Notification('Health Tracker',{body:'Admin reply করেছেন!'});
          }
          if(payload.new.is_solved&&!payload.old.is_solved)showToast('Message solved হয়েছে!');
        }catch(e){}
      })
      .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages'},()=>{
        try{
          if(isAdmin&&document.getElementById('v-admin').classList.contains('on')){renderAdmin();showToast('নতুন message!');}
        }catch(e){}
      })
      .subscribe((status,err)=>{
        if(err)console.log('Realtime error:',err);
      });
  }catch(e){console.log('Realtime setup failed:',e);}
}

// ══════════════════════════════════════════// PROFILE
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