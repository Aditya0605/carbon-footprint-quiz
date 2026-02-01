const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwnu1daY9rcOGaQrYmkDFnZR5lEZDmE2deXqYrdQi4c1Z8Ss0rocDi3HYD6kOOxPUEx3g/exec";

const QUIZ = [
  // ========== TRANSPORT (5) ==========
  { arena:"transport", tip:"Transport is often the biggest daily footprint in families.", text:"How does your child usually go to school?", options:[
    {label:"Walk / Cycle", pts:5, why:"Best option: zero fuel emissions"},
    {label:"School bus", pts:4, why:"Shared travel reduces per-person emissions"},
    {label:"Public transport", pts:3, why:"Better than private vehicle"},
    {label:"Carpool with other parents", pts:4, why:"Sharing reduces emissions per family"},
    {label:"Private car (only family)", pts:1, why:"Highest emissions per student"},
  ]},
  { arena:"transport", tip:"Short trips in cars create more pollution per km.", text:"Distance from home to school (one way)?", options:[
    {label:"0–2 km", pts:5, why:"Can be walk/cycle easily"},
    {label:"2–5 km", pts:4, why:"Walk/cycle/bus possible"},
    {label:"5–10 km", pts:3, why:"Shared options help"},
    {label:"10–20 km", pts:2, why:"Try consolidation / carpool"},
    {label:"20+ km", pts:1, why:"High travel footprint"},
  ]},
  { arena:"transport", tip:"Weekend trips add up quickly.", text:"How often does your family use a car for short trips (<2 km)?", options:[
    {label:"Rarely / almost never", pts:5, why:"Great habit"},
    {label:"Sometimes", pts:3, why:"Can reduce further"},
    {label:"Often", pts:1, why:"High avoidable emissions"},
  ]},
  { arena:"transport", tip:"Vehicle efficiency matters.", text:"Your most-used vehicle type:", options:[
    {label:"No vehicle / mostly walk", pts:5, why:"Lowest footprint"},
    {label:"CNG vehicle", pts:4, why:"Lower emissions than petrol/diesel"},
    {label:"Petrol", pts:3, why:"Moderate emissions"},
    {label:"Diesel", pts:2, why:"Higher local pollution"},
    {label:"Old vehicle (10+ years)", pts:1, why:"Often less efficient + more pollution"},
  ]},
  { arena:"transport", tip:"Smooth driving saves fuel.", text:"Do you maintain tyre pressure/service regularly?", options:[
    {label:"Yes, regularly", pts:5, why:"Improves mileage"},
    {label:"Sometimes", pts:3, why:"Can improve consistency"},
    {label:"No / rarely", pts:1, why:"Wastes fuel + more emissions"},
  ]},

  // ========== HOME APPLIANCES (5) ==========
  { arena:"appliances", tip:"AC & cooling can dominate electricity usage.", text:"How much AC use happens in your home on most days?", options:[
    {label:"No AC", pts:5, why:"Lowest electricity load"},
    {label:"0–2 hours/day", pts:4, why:"Controlled usage"},
    {label:"2–5 hours/day", pts:3, why:"Moderate usage"},
    {label:"5–8 hours/day", pts:2, why:"High usage"},
    {label:"8+ hours/day", pts:1, why:"Very high usage"},
  ]},
  { arena:"appliances", tip:"Efficient temperatures matter.", text:"AC temperature setting (if used)?", options:[
    {label:"26–28°C", pts:5, why:"Efficient and comfortable"},
    {label:"24–25°C", pts:3, why:"Moderate efficiency"},
    {label:"< 24°C", pts:1, why:"High electricity use"},
    {label:"Not sure", pts:2, why:"Set 26°C for savings"},
  ]},
  { arena:"appliances", tip:"Lighting efficiency is an easy win.", text:"What kind of bulbs do you mostly use?", options:[
    {label:"Mostly LED", pts:5, why:"Uses much less power"},
    {label:"Mix of LED + old bulbs", pts:3, why:"Can shift more to LED"},
    {label:"Mostly old bulbs/tubes", pts:1, why:"Higher energy use"},
  ]},
  { arena:"appliances", tip:"Water heating consumes a lot of energy.", text:"How do you heat water at home?", options:[
    {label:"Solar / heat pump", pts:5, why:"Lowest footprint"},
    {label:"Geyser used only when needed", pts:4, why:"Controlled usage helps"},
    {label:"Geyser used daily for long time", pts:2, why:"High electricity use"},
    {label:"Gas-based heating", pts:3, why:"Depends on usage"},
  ]},
  { arena:"appliances", tip:"Fridge efficiency impacts 24/7 usage.", text:"How old is your refrigerator?", options:[
    {label:"< 5 years (energy efficient)", pts:5, why:"More efficient models"},
    {label:"5–10 years", pts:3, why:"Moderate efficiency"},
    {label:"10+ years", pts:1, why:"Often inefficient"},
    {label:"Not sure", pts:2, why:"Check star rating / age"},
  ]},

  // ========== ELECTRONIC DEVICES (5) ==========
  { arena:"devices", tip:"Standby power is small but continuous.", text:"Do you switch off plugs for TV/set-top box/routers at night?", options:[
    {label:"Yes, mostly", pts:5, why:"Reduces standby energy"},
    {label:"Sometimes", pts:3, why:"Can improve habit"},
    {label:"No", pts:1, why:"Constant standby usage"},
  ]},
  { arena:"devices", tip:"Charging habits matter.", text:"Do you unplug chargers when not in use?", options:[
    {label:"Yes", pts:5, why:"Avoids standby power draw"},
    {label:"Sometimes", pts:3, why:"Some improvement possible"},
    {label:"No", pts:1, why:"Unnecessary electricity usage"},
  ]},
  { arena:"devices", tip:"Screen time affects electricity + health.", text:"Average family screen time per day (TV + mobile + laptop)?", options:[
    {label:"< 2 hours", pts:5, why:"Lower device use + better health"},
    {label:"2–4 hours", pts:4, why:"Moderate use"},
    {label:"4–6 hours", pts:2, why:"High use"},
    {label:"6+ hours", pts:1, why:"Very high use"},
  ]},
  { arena:"devices", tip:"Energy-saving settings are easy wins.", text:"Do you use power-saving mode / auto-brightness on phones?", options:[
    {label:"Yes", pts:5, why:"Efficient usage"},
    {label:"Sometimes", pts:3, why:"Can be more consistent"},
    {label:"No", pts:1, why:"Higher charging needs"},
  ]},
  { arena:"devices", tip:"Reuse reduces manufacturing footprint.", text:"When you replace phones/electronics, what happens to old devices?", options:[
    {label:"Reuse / repair / donate", pts:5, why:"Best: extends product life"},
    {label:"Keep unused at home", pts:2, why:"Try donating/recycling"},
    {label:"Throw away with normal waste", pts:1, why:"Harmful e-waste disposal"},
    {label:"Send to e-waste recycler", pts:4, why:"Safer disposal"},
  ]},
];

const ARENAS = ["transport","appliances","devices"];
const ARENA_LABEL = {
  transport:"🚗 Transport",
  appliances:"🏠 Home Appliances",
  devices:"📱 Electronic Devices"
};

const LS_KEY = "cf_parent_v1";
let state = {
  profile: { parentName:"", phone:"", address:"", childClass:"" },
  index: 0,
  answers: {} // questionIndex -> optionIndex
};

// DOM
const stepProfile = document.getElementById("stepProfile");
const stepQuiz = document.getElementById("stepQuiz");
const stepResults = document.getElementById("stepResults");

const parentNameEl = document.getElementById("parentName");
const phoneEl = document.getElementById("phone");
const addressEl = document.getElementById("address");
const childClassEl = document.getElementById("childClass");

const btnStart = document.getElementById("btnStart");
const btnResume = document.getElementById("btnResume");

const arenaPill = document.getElementById("arenaPill");
const qText = document.getElementById("qText");
const qSub = document.getElementById("qSub");
const optionsEl = document.getElementById("options");
const btnBack = document.getElementById("btnBack");
const btnNext = document.getElementById("btnNext");
const progFill = document.getElementById("progFill");
const progText = document.getElementById("progText");

const overallScoreEl = document.getElementById("overallScore");
const badgeTextEl = document.getElementById("badgeText");
const whereYouAreEl = document.getElementById("whereYouAre");
const arenaScoresEl = document.getElementById("arenaScores");
const improvementsEl = document.getElementById("improvements");
const healthBenefitsEl = document.getElementById("healthBenefits");
const envBenefitsEl = document.getElementById("envBenefits");

const btnSubmit = document.getElementById("btnSubmit");
const btnRestart = document.getElementById("btnRestart");
const btnAI = document.getElementById("btnAI");
const submitStatus = document.getElementById("submitStatus");
const btnRefreshLB = document.getElementById("btnRefreshLB");
const leaderboardEl = document.getElementById("leaderboard");
const aiBox = document.getElementById("aiBox");
const aiText = document.getElementById("aiText");

function save(){ localStorage.setItem(LS_KEY, JSON.stringify(state)); }
function load(){
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return false;
  try { state = JSON.parse(raw); return true; } catch { return false; }
}
function clearSave(){ localStorage.removeItem(LS_KEY); }

function show(step){
  stepProfile.style.display = step==="profile" ? "block" : "none";
  stepQuiz.style.display = step==="quiz" ? "block" : "none";
  stepResults.style.display = step==="results" ? "block" : "none";
}

function scoreBand(overall){
  if (overall >= 75) return { badge:"🌳 Eco Champion", where:"You are doing great. Focus on small optimizations." };
  if (overall >= 45) return { badge:"🌿 Eco Aware", where:"Good start. A few changes can reduce footprint a lot." };
  return { badge:"🌱 Eco Beginner", where:"You have big improvement opportunities. Start with 2–3 quick wins." };
}

function calcScores(){
  const arenaPts = Object.fromEntries(ARENAS.map(a => [a, {got:0, max:0}]));
  const chosenDetails = [];

  QUIZ.forEach((q, qi) => {
    const maxPts = Math.max(...q.options.map(o => o.pts));
    arenaPts[q.arena].max += maxPts;

    const chosen = state.answers[qi];
    if (chosen !== undefined) {
      const opt = q.options[chosen];
      arenaPts[q.arena].got += opt.pts;
      chosenDetails.push({ arena:q.arena, pts:opt.pts, why:opt.why, q:q.text });
    }
  });

  const arenaScores = {};
  ARENAS.forEach(a => {
    const {got, max} = arenaPts[a];
    arenaScores[a] = max ? Math.round((got / max) * 100) : 0;
  });

  const overall = Math.round(ARENAS.reduce((s,a)=>s+arenaScores[a],0)/ARENAS.length);
  return { overall, arenaScores, chosenDetails };
}

function renderQuestion(){
  const q = QUIZ[state.index];
  arenaPill.textContent = ARENA_LABEL[q.arena];
  qText.textContent = q.text;
  qSub.textContent = q.tip || "";

  const pct = Math.round((state.index / QUIZ.length) * 100);
  progFill.style.width = `${pct}%`;
  progText.textContent = `${state.index+1}/${QUIZ.length}`;

  const selected = state.answers[state.index];
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "opt" + (selected === i ? " selected" : "");
    // ⚠️ NO POINTS shown
    div.innerHTML = `<div style="font-weight:850">${opt.label}</div><div style="color:var(--muted);font-size:13px;margin-top:6px">${opt.why}</div>`;
    div.onclick = () => {
      state.answers[state.index] = i;
      save();
      renderQuestion();
      btnNext.disabled = false;
    };
    optionsEl.appendChild(div);
  });

  btnBack.disabled = state.index === 0;
  btnNext.disabled = (state.answers[state.index] === undefined);
}

function renderResults(){
  const { overall, arenaScores, chosenDetails } = calcScores();
  overallScoreEl.textContent = overall;

  const band = scoreBand(overall);
  badgeTextEl.textContent = band.badge;
  whereYouAreEl.textContent = band.where;

  arenaScoresEl.innerHTML = "";
  ARENAS.forEach(a => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `<div class="k">${ARENA_LABEL[a]}</div><div class="v">${arenaScores[a]}/100</div>`;
    arenaScoresEl.appendChild(box);
  });

  // Improvements: pick the lowest scoring answers (by pts)
  const improvements = chosenDetails
    .slice()
    .sort((x,y)=>x.pts - y.pts)
    .slice(0,5);

  improvementsEl.innerHTML = "";
  improvements.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${ARENA_LABEL[item.arena]}: ${item.q} → ${item.why}`;
    improvementsEl.appendChild(li);
  });

  // Benefits (generic, parent-friendly)
  healthBenefitsEl.innerHTML = "";
  ["Cleaner air exposure (less smoke/dust from traffic)",
   "Better daily activity if walking/cycling",
   "Lower indoor heat load with efficient AC usage",
   "Reduced screen fatigue with balanced device use"
  ].forEach(t => {
    const li = document.createElement("li"); li.textContent = t; healthBenefitsEl.appendChild(li);
  });

  envBenefitsEl.innerHTML = "";
  ["Lower CO₂ emissions from fewer car trips",
   "Lower electricity demand (less fossil fuel power)",
   "Less e-waste from reuse and recycling",
   "Better city air quality through efficient transport"
  ].forEach(t => {
    const li = document.createElement("li"); li.textContent = t; envBenefitsEl.appendChild(li);
  });

  state.final = { overall, ...arenaScores };
  save();
}

async function submitToSheet(){
  submitStatus.textContent = "Submitting...";
  btnSubmit.disabled = true;

  const { overall, arenaScores } = calcScores();
  const payload = {
    parentName: state.profile.parentName,
    phone: state.profile.phone,
    address: state.profile.address,
    childClass: state.profile.childClass,
    scores: { overall, ...arenaScores },
    answers: buildAnswerPayload()
  };

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || "Submit failed");
    submitStatus.textContent = "✅ Submitted! Refreshing leaderboard...";
    await loadLeaderboard();
  } catch (e) {
    submitStatus.textContent = `❌ Submit failed: ${e.message}`;
  } finally {
    btnSubmit.disabled = false;
  }
}

function buildAnswerPayload(){
  const out = {};
  QUIZ.forEach((q, qi) => {
    const chosen = state.answers[qi];
    out[`Q${qi+1} (${q.arena})`] = chosen !== undefined ? q.options[chosen].label : "";
  });
  return out;
}

async function loadLeaderboard(){
  leaderboardEl.innerHTML = "Loading...";
  try {
    const url = `${APPS_SCRIPT_URL}?action=leaderboard&limit=10`;
    const res = await fetch(url);
    const json = await res.json();
    if (!json.ok) throw new Error("Leaderboard fetch failed");

    const rows = json.leaderboard || [];
    if (!rows.length) {
      leaderboardEl.innerHTML = "<div class='status'>No submissions yet.</div>";
      return;
    }

    leaderboardEl.innerHTML = "";
    rows.forEach(r => {
      const div = document.createElement("div");
      div.className = "lbrow";
      div.innerHTML = `
        <div><b>#${r.rank}</b></div>
        <div>${escapeHtml(r.name)} <span class="cls">• ${escapeHtml(r.childClass)}</span></div>
        <div class="cls">${escapeHtml(r.childClass)}</div>
        <div style="text-align:right;"><b>${r.overall}</b></div>
      `;
      leaderboardEl.appendChild(div);
    });
  } catch (e) {
    leaderboardEl.innerHTML = `<div class="status">❌ ${e.message}</div>`;
  }
}

function escapeHtml(s){
  return String(s || "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

async function getAIAdvice(){
  aiBox.style.display = "none";
  aiText.textContent = "";
  submitStatus.textContent = "Getting AI advice...";

  const { overall, arenaScores } = calcScores();

  try {
    const url = `${APPS_SCRIPT_URL}?action=advice&overall=${overall}&transport=${arenaScores.transport}&appliances=${arenaScores.appliances}&devices=${arenaScores.devices}`;
    const res = await fetch(url);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || "AI advice failed");
    aiText.textContent = json.advice || "";
    aiBox.style.display = "block";
    submitStatus.textContent = "✅ AI advice ready.";
  } catch (e) {
    submitStatus.textContent = `❌ ${e.message}`;
  }
}

// Events
btnStart.onclick = () => {
  const parentName = parentNameEl.value.trim();
  const phone = phoneEl.value.trim();
  const address = addressEl.value.trim();
  const childClass = childClassEl.value.trim();

  if (!parentName || !phone || !address || !childClass) {
    alert("Please fill Parent Name, Phone, Address, and Child Class.");
    return;
  }

  state.profile = { parentName, phone, address, childClass };
  state.index = 0;
  state.answers = {};
  save();

  show("quiz");
  renderQuestion();
};

btnResume.onclick = () => {
  show("quiz");
  parentNameEl.value = state.profile?.parentName || "";
  phoneEl.value = state.profile?.phone || "";
  addressEl.value = state.profile?.address || "";
  childClassEl.value = state.profile?.childClass || "";
  renderQuestion();
};

btnBack.onclick = () => {
  state.index = Math.max(0, state.index - 1);
  save();
  renderQuestion();
};

btnNext.onclick = () => {
  if (state.answers[state.index] === undefined) return;
  state.index += 1;
  save();

  if (state.index >= QUIZ.length) {
    show("results");
    renderResults();
    loadLeaderboard();
  } else {
    renderQuestion();
  }
};

btnSubmit.onclick = submitToSheet;

btnRestart.onclick = () => {
  clearSave();
  state = { profile:{parentName:"",phone:"",address:"",childClass:""}, index:0, answers:{} };
  parentNameEl.value = "";
  phoneEl.value = "";
  addressEl.value = "";
  childClassEl.value = "";
  submitStatus.textContent = "";
  aiBox.style.display = "none";
  show("profile");
  checkResume();
};

btnRefreshLB.onclick = loadLeaderboard;
btnAI.onclick = getAIAdvice;

function checkResume(){
  const ok = load();
  const hasAnswers = ok && state?.answers && Object.keys(state.answers).length > 0;
  if (hasAnswers) {
    btnResume.style.display = "inline-block";
    parentNameEl.value = state.profile?.parentName || "";
    phoneEl.value = state.profile?.phone || "";
    addressEl.value = state.profile?.address || "";
    childClassEl.value = state.profile?.childClass || "";
  } else {
    btnResume.style.display = "none";
  }
}

checkResume();
show("profile");
