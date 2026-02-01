const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwnu1daY9rcOGaQrYmkDFnZR5lEZDmE2deXqYrdQi4c1Z8Ss0rocDi3HYD6kOOxPUEx3g/exec";

const QUIZ = [
  { arena:"transport", text:"How do you usually travel to school?", options:[
    {label:"Walk / Cycle", pts:5, pro:"Zero emissions + good fitness", con:"May be slower / weather dependent"},
    {label:"School bus", pts:4, pro:"Shared travel reduces per-student emissions", con:"Still uses fuel"},
    {label:"Public transport", pts:3, pro:"More efficient than private vehicles", con:"May be crowded"},
    {label:"Two-wheeler", pts:2, pro:"Less fuel than car", con:"Pollution + safety risk"},
    {label:"Car", pts:1, pro:"Comfortable", con:"Highest emissions per student"},
  ]},
  { arena:"transport", text:"How far is your home from school (one-way)?", options:[
    {label:"0–2 km", pts:5, pro:"Easy to walk/cycle", con:"—"},
    {label:"2–5 km", pts:4, pro:"Bus/cycle possible", con:"—"},
    {label:"5–10 km", pts:3, pro:"Shared travel helps", con:"—"},
    {label:"10–20 km", pts:2, pro:"Plan efficient route", con:"—"},
    {label:"20+ km", pts:1, pro:"—", con:"High travel emissions"},
  ]},
  { arena:"transport", text:"How often do you carpool/share rides (if not walking/bus)?", options:[
    {label:"Always", pts:5, pro:"Cuts emissions per person", con:"Needs coordination"},
    {label:"Often", pts:4, pro:"Good reduction", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some benefit", con:"—"},
    {label:"Rarely", pts:2, pro:"—", con:"More emissions"},
    {label:"Never", pts:1, pro:"—", con:"Highest emissions"},
  ]},
  { arena:"transport", text:"Do you combine errands in one trip (avoid extra trips)?", options:[
    {label:"Yes, mostly", pts:5, pro:"Less fuel use", con:"Needs planning"},
    {label:"Sometimes", pts:3, pro:"Some fuel saving", con:"—"},
    {label:"No", pts:1, pro:"—", con:"More trips = more emissions"},
  ]},
  { arena:"transport", text:"What best describes your daily activity?", options:[
    {label:"I walk/cycle daily", pts:5, pro:"Health + low emissions", con:"—"},
    {label:"Some walking", pts:4, pro:"Health benefit", con:"—"},
    {label:"Mostly sitting", pts:2, pro:"—", con:"Lower fitness; indirect higher emissions"},
    {label:"Almost no walking", pts:1, pro:"—", con:"Health impact"},
  ]},

  { arena:"energy", text:"How often do you switch off lights/fans when leaving a room?", options:[
    {label:"Always", pts:5, pro:"Saves electricity", con:"—"},
    {label:"Often", pts:4, pro:"Good savings", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some savings", con:"—"},
    {label:"Rarely", pts:2, pro:"—", con:"Wastes energy"},
    {label:"Never", pts:1, pro:"—", con:"High waste"},
  ]},
  { arena:"energy", text:"How many hours/day is AC used at home (if any)?", options:[
    {label:"No AC", pts:5, pro:"Lowest electricity footprint", con:"—"},
    {label:"0–2 hours", pts:4, pro:"Controlled usage", con:"—"},
    {label:"2–5 hours", pts:3, pro:"—", con:"Moderate electricity use"},
    {label:"5–8 hours", pts:2, pro:"—", con:"High electricity use"},
    {label:"8+ hours", pts:1, pro:"—", con:"Very high electricity use"},
  ]},
  { arena:"energy", text:"Do you use LED bulbs at home?", options:[
    {label:"Mostly LEDs", pts:5, pro:"Uses less power", con:"—"},
    {label:"Some LEDs", pts:3, pro:"Some savings", con:"—"},
    {label:"No / not sure", pts:1, pro:"—", con:"Higher power use"},
  ]},
  { arena:"energy", text:"Do you unplug chargers when not in use?", options:[
    {label:"Yes", pts:5, pro:"Avoids standby power", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some benefit", con:"—"},
    {label:"No", pts:1, pro:"—", con:"Wastes small but continuous energy"},
  ]},
  { arena:"energy", text:"How often do you use natural light during daytime?", options:[
    {label:"Mostly", pts:5, pro:"Saves electricity", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some savings", con:"—"},
    {label:"Rarely", pts:1, pro:"—", con:"More electricity used"},
  ]},

  { arena:"food", text:"How often do you eat vegetarian meals?", options:[
    {label:"Daily", pts:5, pro:"Lower emissions than meat-heavy diets", con:"—"},
    {label:"4–6 days/week", pts:4, pro:"Good reduction", con:"—"},
    {label:"2–3 days/week", pts:3, pro:"Some reduction", con:"—"},
    {label:"Rarely", pts:2, pro:"—", con:"Higher footprint"},
    {label:"Never", pts:1, pro:"—", con:"Highest footprint"},
  ]},
  { arena:"food", text:"How often do you waste food (leave uneaten)?", options:[
    {label:"Almost never", pts:5, pro:"Saves resources", con:"—"},
    {label:"Sometimes", pts:3, pro:"—", con:"Some waste"},
    {label:"Often", pts:1, pro:"—", con:"High waste"},
  ]},
  { arena:"food", text:"Do you carry a reusable water bottle?", options:[
    {label:"Yes, always", pts:5, pro:"Reduces plastic bottles", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some reduction", con:"—"},
    {label:"No", pts:1, pro:"—", con:"More plastic waste"},
  ]},
  { arena:"food", text:"How often do you eat packaged snacks/drinks?", options:[
    {label:"Rarely", pts:5, pro:"Less packaging waste", con:"—"},
    {label:"Sometimes", pts:3, pro:"—", con:"Moderate packaging"},
    {label:"Daily", pts:1, pro:"—", con:"High packaging waste"},
  ]},
  { arena:"food", text:"Do you prefer local/seasonal fruits & vegetables?", options:[
    {label:"Yes", pts:5, pro:"Lower transport emissions", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some benefit", con:"—"},
    {label:"No / not sure", pts:1, pro:"—", con:"Can be higher footprint"},
  ]},

  { arena:"waste", text:"Do you separate dry and wet waste at home?", options:[
    {label:"Yes", pts:5, pro:"Improves recycling + composting", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some benefit", con:"—"},
    {label:"No", pts:1, pro:"—", con:"Harder to recycle"},
  ]},
  { arena:"waste", text:"How often do you use single-use plastic (cups, cutlery, bags)?", options:[
    {label:"Almost never", pts:5, pro:"Cuts plastic pollution", con:"—"},
    {label:"Sometimes", pts:3, pro:"—", con:"Some plastic waste"},
    {label:"Often", pts:1, pro:"—", con:"High plastic waste"},
  ]},
  { arena:"waste", text:"Do you reuse notebooks/paper (use both sides)?", options:[
    {label:"Yes, mostly", pts:5, pro:"Saves paper", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some saving", con:"—"},
    {label:"No", pts:1, pro:"—", con:"More paper waste"},
  ]},
  { arena:"waste", text:"What do you do with old clothes/books?", options:[
    {label:"Donate / reuse", pts:5, pro:"Extends product life", con:"—"},
    {label:"Sometimes donate", pts:3, pro:"Some benefit", con:"—"},
    {label:"Throw away", pts:1, pro:"—", con:"More waste + more new production needed"},
  ]},
  { arena:"waste", text:"Do you recycle e-waste separately (batteries, devices)?", options:[
    {label:"Yes", pts:5, pro:"Prevents toxic pollution", con:"—"},
    {label:"Not sure", pts:2, pro:"—", con:"Risk of unsafe disposal"},
    {label:"No", pts:1, pro:"—", con:"Environmental & health risk"},
  ]},

  { arena:"water", text:"Average shower time?", options:[
    {label:"< 5 minutes", pts:5, pro:"Saves water + energy", con:"—"},
    {label:"5–10 minutes", pts:4, pro:"Good", con:"—"},
    {label:"10–15 minutes", pts:2, pro:"—", con:"High water use"},
    {label:"15+ minutes", pts:1, pro:"—", con:"Very high water use"},
  ]},
  { arena:"water", text:"Do you turn off the tap while brushing?", options:[
    {label:"Always", pts:5, pro:"Saves water", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some saving", con:"—"},
    {label:"Never", pts:1, pro:"—", con:"Wastes water"},
  ]},
  { arena:"water", text:"Do you reuse water (e.g., for plants/cleaning)?", options:[
    {label:"Yes", pts:5, pro:"Reduces water demand", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some benefit", con:"—"},
    {label:"No", pts:1, pro:"—", con:"Higher water use"},
  ]},
  { arena:"water", text:"Do you report/repair leaking taps quickly?", options:[
    {label:"Yes", pts:5, pro:"Prevents huge wastage", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some benefit", con:"—"},
    {label:"No", pts:1, pro:"—", con:"Leaks waste lots of water"},
  ]},
  { arena:"water", text:"Do you use a bucket instead of long running water (where possible)?", options:[
    {label:"Yes", pts:5, pro:"Lower water usage", con:"—"},
    {label:"Sometimes", pts:3, pro:"Some saving", con:"—"},
    {label:"No", pts:1, pro:"—", con:"Higher water usage"},
  ]},
];

const ARENAS = ["transport","energy","food","waste","water"];
const ARENA_LABEL = {
  transport:"🚶 Transport", energy:"💡 Energy", food:"🍽️ Food", waste:"🗑️ Waste", water:"🚿 Water"
};

const LS_KEY = "cf_quiz_v1";
let state = { profile: { name:"", className:"" }, index: 0, answers: {} };

const stepProfile = document.getElementById("stepProfile");
const stepQuiz = document.getElementById("stepQuiz");
const stepResults = document.getElementById("stepResults");

const nameEl = document.getElementById("name");
const classEl = document.getElementById("className");
const btnStart = document.getElementById("btnStart");
const btnResume = document.getElementById("btnResume");

const arenaPill = document.getElementById("arenaPill");
const qText = document.getElementById("qText");
const optionsEl = document.getElementById("options");
const btnBack = document.getElementById("btnBack");
const btnNext = document.getElementById("btnNext");
const progFill = document.getElementById("progFill");
const progText = document.getElementById("progText");

const overallScoreEl = document.getElementById("overallScore");
const badgeTextEl = document.getElementById("badgeText");
const arenaScoresEl = document.getElementById("arenaScores");
const strengthsEl = document.getElementById("strengths");
const improvementsEl = document.getElementById("improvements");
const btnSubmit = document.getElementById("btnSubmit");
const btnRestart = document.getElementById("btnRestart");
const submitStatus = document.getElementById("submitStatus");
const btnRefreshLB = document.getElementById("btnRefreshLB");
const leaderboardEl = document.getElementById("leaderboard");

function save() { localStorage.setItem(LS_KEY, JSON.stringify(state)); }
function load() {
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

function calcScores(){
  const arenaPts = Object.fromEntries(ARENAS.map(a => [a, {got:0, max:0}]));
  const insights = [];

  QUIZ.forEach((q, qi) => {
    const chosen = state.answers[qi];
    const maxPts = Math.max(...q.options.map(o => o.pts));
    arenaPts[q.arena].max += maxPts;

    if (chosen !== undefined) {
      const opt = q.options[chosen];
      arenaPts[q.arena].got += opt.pts;
      insights.push({ arena:q.arena, pts: opt.pts, pro: opt.pro, con: opt.con });
    }
  });

  const arenaScores = {};
  ARENAS.forEach(a => {
    const {got, max} = arenaPts[a];
    arenaScores[a] = max ? Math.round((got / max) * 100) : 0;
  });

  const overall = Math.round(ARENAS.reduce((s,a)=>s+arenaScores[a],0)/ARENAS.length);
  return { overall, arenaScores, insights };
}

function badge(overall){
  if (overall >= 71) return "🌳 Eco Champion";
  if (overall >= 41) return "🌿 Eco Aware";
  return "🌱 Eco Beginner";
}

function renderQuestion(){
  const q = QUIZ[state.index];
  arenaPill.textContent = ARENA_LABEL[q.arena];
  qText.textContent = q.text;

  const pct = Math.round(((state.index) / QUIZ.length) * 100);
  progFill.style.width = `${pct}%`;
  progText.textContent = `${state.index}/${QUIZ.length}`;

  optionsEl.innerHTML = "";
  const selected = state.answers[state.index];

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "opt" + (selected === i ? " selected" : "");
    div.innerHTML = `<span>${opt.label}</span><span>+${opt.pts}</span>`;
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
  const { overall, arenaScores, insights } = calcScores();

  overallScoreEl.textContent = overall;
  badgeTextEl.textContent = badge(overall);

  arenaScoresEl.innerHTML = "";
  ARENAS.forEach(a => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `<div class="k">${ARENA_LABEL[a]}</div><div class="v">${arenaScores[a]}/100</div>`;
    arenaScoresEl.appendChild(box);
  });

  const top = insights.slice().sort((x,y)=>y.pts-x.pts).filter(x=>x.pro && x.pro!=="—").slice(0,2);
  const low = insights.slice().sort((x,y)=>x.pts-y.pts).filter(x=>x.con && x.con!=="—").slice(0,2);

  strengthsEl.innerHTML = "";
  improvementsEl.innerHTML = "";

  top.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${ARENA_LABEL[t.arena]}: ${t.pro}`;
    strengthsEl.appendChild(li);
  });

  low.forEach(l => {
    const li = document.createElement("li");
    li.textContent = `${ARENA_LABEL[l.arena]}: ${l.con}`;
    improvementsEl.appendChild(li);
  });

  state.final = { overall, ...arenaScores };
  save();
}

async function submitToSheet(){
  submitStatus.textContent = "Submitting...";
  btnSubmit.disabled = true;

  const { overall, arenaScores } = calcScores();

  const payload = {
    name: state.profile.name,
    className: state.profile.className,
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
    submitStatus.textContent = "✅ Submitted! Loading leaderboard...";
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
        <div>${escapeHtml(r.name)} <span class="cls">• ${escapeHtml(r.className)}</span></div>
        <div class="cls">${escapeHtml(r.className)}</div>
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

btnStart.onclick = () => {
  const name = nameEl.value.trim();
  const className = classEl.value.trim();
  if (!name || !className) {
    alert("Please enter Name and Class/Section.");
    return;
  }
  state.profile = { name, className };
  state.index = 0;
  state.answers = {};
  save();
  show("quiz");
  renderQuestion();
};

btnResume.onclick = () => {
  show("quiz");
  nameEl.value = state.profile?.name || "";
  classEl.value = state.profile?.className || "";
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
  state = { profile:{name:"", className:""}, index:0, answers:{} };
  nameEl.value = "";
  classEl.value = "";
  submitStatus.textContent = "";
  show("profile");
  checkResume();
};

btnRefreshLB.onclick = loadLeaderboard;

function checkResume(){
  const ok = load();
  if (ok && state?.answers && Object.keys(state.answers).length > 0) {
    btnResume.style.display = "inline-block";
    nameEl.value = state.profile?.name || "";
    classEl.value = state.profile?.className || "";
  } else {
    btnResume.style.display = "none";
  }
}

checkResume();
show("profile");
