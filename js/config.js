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
let dayCache={}, customFoodsCache=[], customWorkoutsCache=[];
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
init();