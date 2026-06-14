/**
 * FIFA 2026 Match Predictor — script.js
 * -------------------------------------------------------
 * Handles team data, dropdown population, prediction
 * algorithm, result rendering, and top-10 leaderboard.
 * -------------------------------------------------------
 */

/* ============================================================
   1. TEAM DATA
   Each team has:
     - name, flag (emoji), confederation
     - overall: composite rating (0–100)
     - attack, defence, midfield, form (0–100)
   ============================================================ */
const TEAMS = [
  { name: "Brazil",        flag: "🇧🇷", confederation: "CONMEBOL", overall: 91, attack: 94, defence: 87, midfield: 92, form: 88 },
  { name: "France",        flag: "🇫🇷", confederation: "UEFA",     overall: 90, attack: 93, defence: 88, midfield: 91, form: 90 },
  { name: "England",       flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", confederation: "UEFA",     overall: 88, attack: 89, defence: 86, midfield: 88, form: 85 },
  { name: "Spain",         flag: "🇪🇸", confederation: "UEFA",     overall: 88, attack: 88, defence: 87, midfield: 90, form: 89 },
  { name: "Argentina",     flag: "🇦🇷", confederation: "CONMEBOL", overall: 87, attack: 90, defence: 83, midfield: 86, form: 86 },
  { name: "Germany",       flag: "🇩🇪", confederation: "UEFA",     overall: 86, attack: 87, defence: 85, midfield: 87, form: 83 },
  { name: "Portugal",      flag: "🇵🇹", confederation: "UEFA",     overall: 86, attack: 91, defence: 82, midfield: 85, form: 84 },
  { name: "Netherlands",   flag: "🇳🇱", confederation: "UEFA",     overall: 85, attack: 87, defence: 83, midfield: 85, form: 82 },
  { name: "Belgium",       flag: "🇧🇪", confederation: "UEFA",     overall: 84, attack: 86, defence: 82, midfield: 84, form: 80 },
  { name: "Italy",         flag: "🇮🇹", confederation: "UEFA",     overall: 83, attack: 82, defence: 87, midfield: 83, form: 79 },
  { name: "Croatia",       flag: "🇭🇷", confederation: "UEFA",     overall: 82, attack: 82, defence: 81, midfield: 85, form: 81 },
  { name: "Uruguay",       flag: "🇺🇾", confederation: "CONMEBOL", overall: 81, attack: 82, defence: 82, midfield: 79, form: 78 },
  { name: "USA",           flag: "🇺🇸", confederation: "CONCACAF", overall: 80, attack: 80, defence: 79, midfield: 80, form: 82 },
  { name: "Mexico",        flag: "🇲🇽", confederation: "CONCACAF", overall: 79, attack: 79, defence: 79, midfield: 78, form: 77 },
  { name: "Colombia",      flag: "🇨🇴", confederation: "CONMEBOL", overall: 79, attack: 82, defence: 75, midfield: 79, form: 80 },
  { name: "Denmark",       flag: "🇩🇰", confederation: "UEFA",     overall: 79, attack: 78, defence: 81, midfield: 79, form: 78 },
  { name: "Japan",         flag: "🇯🇵", confederation: "AFC",      overall: 78, attack: 78, defence: 77, midfield: 78, form: 80 },
  { name: "Morocco",       flag: "🇲🇦", confederation: "CAF",      overall: 78, attack: 76, defence: 82, midfield: 77, form: 79 },
  { name: "Senegal",       flag: "🇸🇳", confederation: "CAF",      overall: 77, attack: 78, defence: 75, midfield: 77, form: 76 },
  { name: "Switzerland",   flag: "🇨🇭", confederation: "UEFA",     overall: 77, attack: 75, defence: 80, midfield: 77, form: 75 },
  { name: "South Korea",   flag: "🇰🇷", confederation: "AFC",      overall: 76, attack: 76, defence: 75, midfield: 76, form: 74 },
  { name: "Canada",        flag: "🇨🇦", confederation: "CONCACAF", overall: 76, attack: 76, defence: 75, midfield: 75, form: 77 },
  { name: "Australia",     flag: "🇦🇺", confederation: "AFC",      overall: 75, attack: 74, defence: 75, midfield: 75, form: 73 },
  { name: "Ecuador",       flag: "🇪🇨", confederation: "CONMEBOL", overall: 74, attack: 74, defence: 74, midfield: 73, form: 73 },
  { name: "Poland",        flag: "🇵🇱", confederation: "UEFA",     overall: 74, attack: 75, defence: 73, midfield: 73, form: 71 },
  { name: "Serbia",        flag: "🇷🇸", confederation: "UEFA",     overall: 73, attack: 75, defence: 71, midfield: 73, form: 72 },
  { name: "Cameroon",      flag: "🇨🇲", confederation: "CAF",      overall: 72, attack: 73, defence: 70, midfield: 72, form: 70 },
  { name: "Ghana",         flag: "🇬🇭", confederation: "CAF",      overall: 71, attack: 72, defence: 69, midfield: 71, form: 69 },
  { name: "Nigeria",       flag: "🇳🇬", confederation: "CAF",      overall: 73, attack: 74, defence: 71, midfield: 72, form: 72 },
  { name: "Costa Rica",    flag: "🇨🇷", confederation: "CONCACAF", overall: 70, attack: 68, defence: 73, midfield: 69, form: 68 },
  { name: "Tunisia",       flag: "🇹🇳", confederation: "CAF",      overall: 70, attack: 69, defence: 72, midfield: 69, form: 68 },
  { name: "Iran",          flag: "🇮🇷", confederation: "AFC",      overall: 69, attack: 68, defence: 71, midfield: 68, form: 67 },
];

// Sort teams alphabetically for the dropdowns
const SORTED_TEAMS = [...TEAMS].sort((a, b) => a.name.localeCompare(b.name));

/* ============================================================
   2. DOM REFERENCES
   ============================================================ */
const selectA    = document.getElementById("team-a");
const selectB    = document.getElementById("team-b");
const flagA      = document.getElementById("flag-a");
const flagB      = document.getElementById("flag-b");
const miniA      = document.getElementById("mini-a");
const miniB      = document.getElementById("mini-b");
const cardA      = document.getElementById("card-a");
const cardB      = document.getElementById("card-b");
const btnPredict = document.getElementById("btn-predict");
const btnRandom  = document.getElementById("btn-random");
const loading    = document.getElementById("loading");
const resultPanel= document.getElementById("result-panel");

/* ============================================================
   3. POPULATE DROPDOWNS
   ============================================================ */
function populateDropdowns() {
  SORTED_TEAMS.forEach(team => {
    const optA = new Option(`${team.flag}  ${team.name}`, team.name);
    const optB = new Option(`${team.flag}  ${team.name}`, team.name);
    selectA.add(optA);
    selectB.add(optB);
  });
}

/* ============================================================
   4. FIND TEAM BY NAME
   ============================================================ */
function getTeam(name) {
  return TEAMS.find(t => t.name === name) || null;
}

/* ============================================================
   5. RENDER MINI STATS INSIDE TEAM CARD
   ============================================================ */
function renderMiniStats(container, team) {
  if (!team) { container.innerHTML = ""; return; }

  const stats = [
    { label: "Attack",   value: team.attack   },
    { label: "Defence",  value: team.defence  },
    { label: "Midfield", value: team.midfield },
    { label: "Form",     value: team.form     },
  ];

  container.innerHTML = stats.map(s => `
    <div class="mini-stat-row">
      <span class="mini-stat-label">${s.label}</span>
      <div class="mini-stat-bar-track">
        <div class="mini-stat-bar-fill" style="width:${s.value}%"></div>
      </div>
      <span class="mini-stat-val">${s.value}</span>
    </div>
  `).join("");
}

/* ============================================================
   6. SYNC DROPDOWNS — prevent selecting the same team twice
   ============================================================ */
function syncDropdowns() {
  const valA = selectA.value;
  const valB = selectB.value;

  // Disable the option in B that matches A, and vice versa
  Array.from(selectB.options).forEach(opt => {
    opt.disabled = (opt.value !== "" && opt.value === valA);
  });
  Array.from(selectA.options).forEach(opt => {
    opt.disabled = (opt.value !== "" && opt.value === valB);
  });

  // Update cards
  const teamA = getTeam(valA);
  const teamB = getTeam(valB);

  flagA.textContent = teamA ? teamA.flag : "🌍";
  flagB.textContent = teamB ? teamB.flag : "🌍";

  cardA.classList.toggle("active", !!teamA);
  cardB.classList.toggle("active", !!teamB);

  renderMiniStats(miniA, teamA);
  renderMiniStats(miniB, teamB);

  // Enable predict button only when both teams are selected
  btnPredict.disabled = !(valA && valB);

  // Hide stale results when selection changes
  resultPanel.hidden = true;
  loading.setAttribute("aria-hidden", "true");
}

selectA.addEventListener("change", syncDropdowns);
selectB.addEventListener("change", syncDropdowns);

/* ============================================================
   7. RANDOM MATCH BUTTON
   ============================================================ */
btnRandom.addEventListener("click", () => {
  // Pick two unique random indices
  const indices = [];
  while (indices.length < 2) {
    const r = Math.floor(Math.random() * TEAMS.length);
    if (!indices.includes(r)) indices.push(r);
  }
  selectA.value = TEAMS[indices[0]].name;
  selectB.value = TEAMS[indices[1]].name;
  syncDropdowns();
});

/* ============================================================
   8. PREDICTION ALGORITHM
   -------------------------------------------------------
   Weighted composite score per team:
     score = overall*0.30 + attack*0.25 + defence*0.20
             + midfield*0.15 + form*0.10
   A tiny random variance (±4 pts) simulates match day luck.
   Win probabilities are derived from the score gap using a
   logistic-like curve so a 5-pt gap ≈ 60/40 split.
   Draw probability peaks when scores are very close.
   ============================================================ */
function calcComposite(team) {
  return (
    team.overall  * 0.30 +
    team.attack   * 0.25 +
    team.defence  * 0.20 +
    team.midfield * 0.15 +
    team.form     * 0.10
  );
}

function predict(teamA, teamB) {
  const scoreA = calcComposite(teamA) + (Math.random() * 8 - 4); // ±4 variance
  const scoreB = calcComposite(teamB) + (Math.random() * 8 - 4);

  const gap = scoreA - scoreB;

  // Logistic curve: probability of A winning given gap
  const rawProbA = 1 / (1 + Math.exp(-gap / 6));

  // Draw probability: higher when gap is small
  const drawProb = Math.max(0.05, 0.28 - Math.abs(gap) * 0.014);

  // Redistribute remaining probability
  const remaining = 1 - drawProb;
  const winA = rawProbA * remaining;
  const winB = (1 - rawProbA) * remaining;

  // Round to 1 decimal
  const pA = Math.round(winA * 1000) / 10;
  const pD = Math.round(drawProb * 1000) / 10;
  const pB = Math.round((1 - winA - drawProb) * 1000) / 10;

  const winner = winA > winB ? teamA : teamB;

  return { scoreA, scoreB, pA, pB, pD, winner };
}

/* ============================================================
   9. BUILD EXPLANATION TEXT
   ============================================================ */
function buildExplanation(teamA, teamB, result) {
  const { winner, pA, pB, pD } = result;
  const loser = winner === teamA ? teamB : teamA;

  const winnerProb = winner === teamA ? pA : pB;
  const confidence =
    winnerProb > 65 ? "strong favourite" :
    winnerProb > 55 ? "slight favourite" : "narrow favourite";

  const attackDiff = teamA.attack - teamB.attack;
  const defenceDiff = teamA.defence - teamB.defence;

  const attackLeader = attackDiff >= 0 ? teamA : teamB;
  const defenceLeader = defenceDiff >= 0 ? teamA : teamB;

  const formNote =
    teamA.form > teamB.form
      ? `${teamA.name} arrives in better recent form (${teamA.form} vs ${teamB.form}), which adds to their edge.`
      : teamB.form > teamA.form
      ? `${teamB.name} arrives in better recent form (${teamB.form} vs ${teamA.form}), which tips the balance.`
      : `Both teams arrive in equally strong form (${teamA.form}).`;

  return `${winner.flag} <strong>${winner.name}</strong> emerges as the ${confidence} in this fixture, with a ${winnerProb}% chance of victory. ` +
    `${attackLeader.name} holds the attacking edge while ${defenceLeader.name} is more resilient at the back. ` +
    `${formNote} ` +
    `There is a ${pD}% probability the match ends level after 90 minutes — knockout-stage extra time could still swing things in ${loser.name}'s favour.`;
}

/* ============================================================
   10. RENDER RESULT PANEL
   ============================================================ */
function renderResult(teamA, teamB, result) {
  const { pA, pB, pD, winner, scoreA, scoreB } = result;

  // Winner banner
  document.getElementById("winner-name").textContent = winner.name;
  document.getElementById("winner-flag").textContent = winner.flag;

  // Probability bars
  document.getElementById("prob-label-a").textContent = teamA.name;
  document.getElementById("prob-label-b").textContent = teamB.name;

  // Bars fill = win % of each team (draw is shown as label only)
  const totalBarA = pA / (pA + pB) * 100;
  const totalBarB = pB / (pA + pB) * 100;

  // Slight delay to trigger CSS transition
  setTimeout(() => {
    document.getElementById("prob-bar-a").style.width = totalBarA + "%";
    document.getElementById("prob-bar-b").style.width = totalBarB + "%";
  }, 80);

  document.getElementById("prob-pct-a").textContent = `${pA}% Win`;
  document.getElementById("prob-pct-draw").textContent = `${pD}% Draw`;
  document.getElementById("prob-pct-b").textContent = `${pB}% Win`;

  // Stats breakdown
  const statsGrid = document.getElementById("stats-grid");
  const attrs = [
    { key: "overall",  label: "Overall" },
    { key: "attack",   label: "Attack" },
    { key: "defence",  label: "Defence" },
    { key: "midfield", label: "Midfield" },
    { key: "form",     label: "Recent Form" },
  ];

  statsGrid.innerHTML = attrs.map(attr => {
    const vA = teamA[attr.key];
    const vB = teamB[attr.key];
    const total = vA + vB;
    const widthA = (vA / total * 100).toFixed(1);
    const widthB = (vB / total * 100).toFixed(1);
    return `
      <div class="stat-row-5">
        <span class="stat-val-a">${vA}</span>
        <div class="stat-bar-wrap" style="justify-content:flex-end">
          <div class="stat-bar-a" style="width:0%" data-target="${widthA}%"></div>
        </div>
        <span style="font-size:0.72rem;color:var(--muted);text-align:center;white-space:nowrap;padding:0 0.3rem">${attr.label}</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar-b" style="width:0%" data-target="${widthB}%"></div>
        </div>
        <span class="stat-val-b">${vB}</span>
      </div>
    `;
  }).join("");

  // Animate stat bars
  setTimeout(() => {
    statsGrid.querySelectorAll("[data-target]").forEach(el => {
      el.style.width = el.dataset.target;
    });
  }, 120);

  // Explanation
  document.getElementById("explanation-text").innerHTML = buildExplanation(teamA, teamB, result);

  // Show panel
  resultPanel.hidden = false;
}

/* ============================================================
   11. PREDICT BUTTON HANDLER
   ============================================================ */
btnPredict.addEventListener("click", () => {
  const teamA = getTeam(selectA.value);
  const teamB = getTeam(selectB.value);
  if (!teamA || !teamB) return;

  // Hide old result, show loading
  resultPanel.hidden = true;
  loading.setAttribute("aria-hidden", "false");
  btnPredict.disabled = true;

  // Simulate async analysis (800ms delay for UX)
  setTimeout(() => {
    const result = predict(teamA, teamB);

    // Hide loading
    loading.setAttribute("aria-hidden", "true");
    btnPredict.disabled = false;

    renderResult(teamA, teamB, result);

    // Smooth scroll to results
    resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 900);
});

/* ============================================================
   12. TOP 10 LEADERBOARD
   ============================================================ */
function renderTopTeams() {
  const top10 = [...TEAMS]
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 10);

  const list = document.getElementById("top-teams-list");
  list.innerHTML = top10.map((team, i) => `
    <li class="team-rank-item">
      <span class="rank-number">${i + 1}</span>
      <span class="rank-flag">${team.flag}</span>
      <div class="rank-info">
        <div class="rank-name">${team.name}</div>
        <div class="rank-overall">${team.confederation} · ATK ${team.attack} · DEF ${team.defence}</div>
      </div>
      <span class="rank-score">${team.overall}</span>
    </li>
  `).join("");
}

/* ============================================================
   13. INITIALISE
   ============================================================ */
function init() {
  populateDropdowns();
  syncDropdowns();
  renderTopTeams();
}

init();
