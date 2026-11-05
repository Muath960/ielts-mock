/* IELTS Mock Test – application logic (no build step, no dependencies) */
(function () {
'use strict';

const D = window.IELTS_DATA;
const app = document.getElementById('app');
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const LET = 'ABCDEFGHIJKLMNOP';
const range = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const stripHtml = h => String(h).replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
const fmtTime = s => { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const fmtBand = b => (b == null || isNaN(b)) ? '—' : Number(b).toFixed(1);
const NAMES = { listening: 'Listening', reading: 'Reading', writing: 'Writing', speaking: 'Speaking' };
const SECTIONS = ['listening', 'reading', 'writing', 'speaking'];

/* ---------------- band conversion (standard Academic tables) ---------------- */
const LISTEN_TABLE = [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0]];
const READ_TABLE = [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0]];
const toBand = (raw, t) => { for (const [min, b] of t) if (raw >= min) return b; return 0; };
const roundBand = x => Math.round(x * 2) / 2; // .25 -> .5, .75 -> next whole (official rounding for the overall band)

/* ---------------- storage ---------------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
};
const history = () => store.get('ielts_history', []);
function saveResult(r) {
  r.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  r.date = new Date().toISOString();
  const h = history(); h.unshift(r); store.set('ielts_history', h.slice(0, 200));
  if (session) session.ids[r.section] = r.id;
  return r.id;
}
function updateResult(id, patch) { const h = history(); const r = h.find(x => x.id === id); if (r) { Object.assign(r, patch); store.set('ielts_history', h); } }
const getResult = id => history().find(x => x.id === id);
function latestBands() {
  const out = {};
  history().forEach(r => { if (out[r.section] == null && r.band != null && r.mode !== 'practice') out[r.section] = r.band; });
  return out;
}
function overall(b) {
  const v = SECTIONS.map(k => b[k]);
  if (v.some(x => x == null)) return null;
  return roundBand(v.reduce((a, c) => a + c, 0) / 4);
}

/* ---------------- lifecycle ---------------- */
let session = null; // full-test session: { queue: [...], ids: {} }
let cleanups = [];
const addCleanup = f => cleanups.push(f);
function cleanup() {
  const c = cleanups; cleanups = [];
  c.forEach(f => { try { f(); } catch (e) { } });
  TTS.cancel();
  window.onbeforeunload = null;
  window.scrollTo(0, 0);
}
const guardLeave = () => { window.onbeforeunload = e => { e.preventDefault(); e.returnValue = ''; return ''; }; };

function countdown(secs, onTick, onEnd) {
  const end = Date.now() + secs * 1000; let stopped = false;
  const tick = () => {
    if (stopped) return;
    const left = Math.max(0, (end - Date.now()) / 1000);
    onTick && onTick(left);
    if (left <= 0) { stopped = true; clearInterval(id); onEnd && onEnd(); }
  };
  const id = setInterval(tick, 250);
  tick();
  const stop = () => { stopped = true; clearInterval(id); };
  addCleanup(stop);
  return { stop };
}

/* ---------------- text-to-speech ---------------- */
const TTS = {
  ok: 'speechSynthesis' in window,
  voices: [], map: {}, volume: 1, rate: 0.95,
  load() {
    return new Promise(res => {
      if (!this.ok) return res([]);
      const done = () => { this.voices = speechSynthesis.getVoices(); this.pick(); res(this.voices); };
      if (speechSynthesis.getVoices().length) return done();
      speechSynthesis.onvoiceschanged = done;
      setTimeout(done, 1500);
    });
  },
  pick() {
    const en = this.voices.filter(v => /^en([-_]|$)/i.test(v.lang));
    const score = v => (/natural|online|neural|premium|enhanced/i.test(v.name) ? 4 : 0) + (/en[-_]GB/i.test(v.lang) ? 2 : 0) + (/en[-_](AU|IE|NZ)/i.test(v.lang) ? 1 : 0) + (v.localService === false ? 1 : 0);
    en.sort((a, b) => score(b) - score(a));
    const F = /female|zira|hazel|susan|libby|sonia|mia|maisie|aria|jenny|michelle|samantha|serena|kate|karen|moira|tessa|fiona|natasha|catherine|emma|amy|joanna|salli|linda|heera|clara|ava|allison|nancy|sara|olivia|ellie|ada|abbi|bella|hollie|martha|google uk english female/i;
    const M = /\bmale|george|david|mark|ryan|thomas|daniel|guy|arthur|oliver|alfie|ethan|eric|christopher|james|brian|william|liam|andrew|steffan|roger|tony|davis|jason|richard|noah|elliot|alex|fred|ralph|aaron|elliot|thomas|google uk english male/i;
    const fem = en.filter(v => F.test(v.name) && !/\bmale/i.test(v.name.replace(/female/i, '')));
    const mal = en.filter(v => M.test(v.name) && !/female/i.test(v.name));
    const any = en[0] || null;
    this.map = {
      f: fem[0] || any, f2: fem[1] || fem[0] || any,
      m: mal[0] || any, m2: mal[1] || mal[0] || any,
      n: mal[1] || fem[1] || mal[0] || any
    };
  },
  describe() {
    const v = this.map; if (!v.f && !v.m) return 'No English voice found on this device.';
    const names = [...new Set([v.f, v.m, v.n, v.f2].filter(Boolean).map(x => x.name))];
    return 'Voices: ' + names.join(', ');
  },
  speak(text, who, token) {
    return new Promise(res => {
      if (!this.ok || (token && token.cancelled)) return res();
      const u = new SpeechSynthesisUtterance(text);
      const v = this.map[who] || this.map.n;
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-GB';
      // if a female and male part share one voice, shift the pitch so speakers stay distinguishable
      const isF = who === 'f' || who === 'f2';
      const isM = who === 'm' || who === 'm2';
      u.pitch = (isF && v && v === this.map.m && this.map.m !== null && this.map.f === this.map.m) ? 1.3 : (isM && v === this.map.f && this.map.f === this.map.m ? 0.75 : 1);
      if (who === 'f2' && this.map.f2 === this.map.f) u.pitch = 1.15;
      if (who === 'm2' && this.map.m2 === this.map.m) u.pitch = 0.85;
      u.rate = this.rate; u.volume = this.volume;
      let done = false;
      const fin = () => { if (!done) { done = true; clearTimeout(t); res(); } };
      u.onend = fin; u.onerror = fin;
      const t = setTimeout(fin, 5000 + text.length * 120);
      speechSynthesis.speak(u);
    });
  },
  cancel() { if (this.ok) try { speechSynthesis.cancel(); } catch (e) { } }
};
const splitSentences = t => (t.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || [t]).map(s => s.trim()).filter(Boolean);
async function speakText(text, who, token) {
  for (const s of splitSentences(text)) { if (token && token.cancelled) return; await TTS.speak(s, who, token); }
}

/* =====================================================================
   HOME / ABOUT / HISTORY
   ===================================================================== */
function topbar() {
  return `<header class="topbar"><a href="#" class="brand" data-go="home">IELTS <span>Mock Test</span></a>
  <nav><a href="#" data-go="history">History</a><a href="#" data-go="about">How scoring works</a></nav></header>`;
}
function home() {
  cleanup(); session = null;
  const b = latestBands(); const ov = overall(b);
  const card = (k, icon, time, desc) => `<div class="scard">
      <div class="scard-top"><span class="sicon">${icon}</span><div><h3>${NAMES[k]}</h3><div class="muted">${time}</div></div></div>
      <p>${desc}</p>
      <div class="scard-foot"><span class="lastband">Latest: <b>${fmtBand(b[k])}</b></span><button class="btn primary" data-start="${k}">Start</button></div></div>`;
  app.innerHTML = topbar() + `<main class="page">
    <section class="hero">
      <h1>IELTS Academic – Full Mock Test</h1>
      <p>A computer-delivered style simulation of all four sections, with real timing, real question types and honest scoring. Take the whole test in one go, or choose any section.</p>
      <div class="hero-actions"><button class="btn primary big" data-start="full">Start full test</button><span class="muted">Listening → Reading → Writing → Speaking · about 2 h 50 min</span></div>
    </section>
    <section class="cards">
      ${card('listening', '🎧', '≈ 32 min · 4 parts · 40 questions', 'Recording plays once only. Form, notes, multiple choice and matching questions. 2 minutes to check at the end.')}
      ${card('reading', '📖', '60 min · 3 passages · 40 questions', 'True/False/Not Given, matching headings, summary completion and more. Highlight text as you read.')}
      ${card('writing', '✍️', '60 min · 2 tasks', 'Task 1: describe a graph (150+ words). Task 2: essay (250+ words). No spell-check, like the real test.')}
      ${card('speaking', '🎙️', '11–14 min · 3 parts', 'An examiner voice asks the questions. Your answers are recorded and transcribed so you can assess them.')}
    </section>
    <section class="panel">
      <h2>Your latest exam-mode scores</h2>
      <div class="bandrow">
        ${SECTIONS.map(k => `<div class="bandcell"><div class="bc-label">${NAMES[k]}</div><div class="bc-val">${fmtBand(b[k])}</div></div>`).join('')}
        <div class="bandcell overall"><div class="bc-label">Overall</div><div class="bc-val">${fmtBand(ov)}</div></div>
      </div>
      <p class="muted small">Overall = average of the four sections, rounded to the nearest half band (x.25 → x.5, x.75 → next whole band), as in the real test. It appears once every section has a score.</p>
    </section>
    ${progressPanel()}
  </main>`;
  bindProgress();
  const rb = $('#resetAll');
  if (rb) rb.onclick = () => {
    if (!confirm('Delete ALL saved results and start tracking from zero? This cannot be undone.')) return;
    store.set('ielts_history', []); store.set('ielts_writing_draft', null); home();
  };
}

/* ---------------- progress chart ---------------- */
const SERIES_COLORS = { listening: '#2a78d6', reading: '#eb6834', writing: '#1baf7a', speaking: '#eda100', overall: '#52514e' };
function progressData() {
  const h = history().filter(r => r.band != null && r.mode !== 'practice').slice().reverse(); // oldest first
  const latest = {};
  return h.map((r, i) => { latest[r.section] = r.band; return { i, date: r.date, section: r.section, band: r.band, overall: overall(latest) }; });
}
function progressPanel() {
  const d = progressData();
  const head = `<section class="panel progress"><div class="row-between"><h2>Your progress</h2>
    <button class="btn sm ghost danger" id="resetAll">Reset all results</button></div>`;
  if (!d.length) return head + `<p class="muted">Your band for every attempt will appear here as a chart. Finish a section in exam mode to add the first point.</p></section>`;
  const W = 760, H = 300, L = 34, R = 128, T = 14, B = 40, pw = W - L - R, ph = H - T - B, n = d.length;
  const x = i => n === 1 ? L + pw / 2 : L + pw * i / (n - 1);
  const y = b => T + ph * (1 - b / 9);
  const day = s => new Date(s).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
  let s = `<svg viewBox="0 0 ${W} ${H}" class="pchart" role="img" aria-label="Band score for each attempt">`;
  for (let b = 0; b <= 9; b++) s += `<line x1="${L}" x2="${L + pw}" y1="${y(b)}" y2="${y(b)}" class="pgrid"/><text x="${L - 8}" y="${y(b) + 4}" text-anchor="end" class="pax">${b}</text>`;
  const step = Math.max(1, Math.ceil(n / 10));
  d.forEach((p, i) => { if (i % step === 0 || i === n - 1) s += `<text x="${x(i)}" y="${T + ph + 18}" text-anchor="middle" class="pax">#${i + 1}</text><text x="${x(i)}" y="${T + ph + 32}" text-anchor="middle" class="pax sub">${day(p.date)}</text>`; });
  const ends = [];
  const keys = [...SECTIONS, 'overall'];
  keys.forEach(k => {
    const pts = k === 'overall' ? d.filter(p => p.overall != null).map(p => ({ i: p.i, b: p.overall, date: p.date })) : d.filter(p => p.section === k).map(p => ({ i: p.i, b: p.band, date: p.date }));
    if (!pts.length) return;
    const c = SERIES_COLORS[k], name = k === 'overall' ? 'Overall' : NAMES[k];
    if (pts.length > 1) s += `<polyline points="${pts.map(p => `${x(p.i)},${y(p.b)}`).join(' ')}" fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round" ${k === 'overall' ? 'stroke-dasharray="6 4"' : ''}/>`;
    pts.forEach(p => {
      s += `<circle cx="${x(p.i)}" cy="${y(p.b)}" r="4.5" fill="${c}" stroke="#fff" stroke-width="2"/>`;
      s += `<circle cx="${x(p.i)}" cy="${y(p.b)}" r="11" fill="transparent" class="hit" data-tip="${esc(name)}: <b>${fmtBand(p.b)}</b><br>#${p.i + 1} · ${esc(new Date(p.date).toLocaleString())}"/>`;
    });
    const last = pts[pts.length - 1];
    ends.push({ y: y(last.b), name, c, b: last.b });
  });
  // direct end labels, nudged apart so equal bands do not overlap
  ends.sort((a, b) => a.y - b.y);
  for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 14) ends[i].y = ends[i - 1].y + 14;
  const over = ends.length ? ends[ends.length - 1].y - (T + ph) : 0;
  if (over > 0) ends.forEach(e => { e.y -= over; });
  ends.forEach(e => { s += `<rect x="${L + pw + 10}" y="${e.y - 4}" width="8" height="8" rx="2" fill="${e.c}"/><text x="${L + pw + 22}" y="${e.y + 4}" class="plab">${e.name} ${fmtBand(e.b)}</text>`; });
  s += '</svg>';
  const legend = keys.filter(k => k === 'overall' ? d.some(p => p.overall != null) : d.some(p => p.section === k))
    .map(k => `<span class="lgi"><i style="background:${SERIES_COLORS[k]}" class="${k === 'overall' ? 'dash' : ''}"></i>${k === 'overall' ? 'Overall' : NAMES[k]}</span>`).join('');
  const first = {}, last = {};
  d.forEach(p => { if (first[p.section] == null) first[p.section] = p.band; last[p.section] = p.band; });
  const change = SECTIONS.filter(k => first[k] != null).map(k => {
    const delta = last[k] - first[k];
    return `<div class="chg"><div class="bc-label">${NAMES[k]}</div><div class="chg-v">${fmtBand(first[k])} → <b>${fmtBand(last[k])}</b></div><div class="chg-d ${delta > 0 ? 'up' : delta < 0 ? 'down' : ''}">${delta > 0 ? '▲ +' : delta < 0 ? '▼ ' : '■ '}${delta.toFixed(1)}</div></div>`;
  }).join('');
  return head + `<p class="muted small">Every exam-mode attempt is one point (#1 = your first). Overall appears once all four sections have a score. Writing and Speaking points appear after you enter their bands.</p>
    <div class="legend">${legend}</div>
    <div class="pwrap">${s}<div class="ptip" id="ptip"></div></div>
    <div class="chgrow">${change}</div>
    <details class="ptable"><summary>Show as table</summary><div class="tablewrap"><table class="tbl"><thead><tr><th>#</th><th>Date</th><th>Section</th><th>Band</th><th>Overall</th></tr></thead><tbody>
    ${d.map(p => `<tr><td>${p.i + 1}</td><td>${new Date(p.date).toLocaleString()}</td><td>${NAMES[p.section]}</td><td><b>${fmtBand(p.band)}</b></td><td>${fmtBand(p.overall)}</td></tr>`).join('')}
    </tbody></table></div></details></section>`;
}
function bindProgress() {
  const wrap = $('.pwrap'), tip = $('#ptip'); if (!wrap) return;
  wrap.addEventListener('mouseover', e => {
    const h = e.target.closest('.hit'); if (!h) return;
    tip.innerHTML = h.dataset.tip; tip.style.display = 'block';
    const wr = wrap.getBoundingClientRect(), r = h.getBoundingClientRect();
    let left = r.left - wr.left + r.width / 2, top = r.top - wr.top - 8;
    tip.style.left = Math.min(Math.max(left, 70), wr.width - 70) + 'px'; tip.style.top = top + 'px';
  });
  wrap.addEventListener('mouseout', e => { if (e.target.closest('.hit')) tip.style.display = 'none'; });
}

function aboutView() {
  cleanup();
  app.innerHTML = topbar() + `<main class="page narrow prose">
  <h1>How scoring works</h1>
  <p>The aim of this site is an <b>honest</b> estimate. Here is exactly how each band is produced, and how reliable it is.</p>
  <h2>Listening & Reading — scored automatically</h2>
  <ul>
    <li>Each of the 40 questions is worth one mark. Answers are checked exactly as an IELTS marker would: spelling must be correct, the word limit must be respected (an answer with too many words is wrong), capital letters don't matter.</li>
    <li>The raw score is converted with the standard Academic conversion table (e.g. Listening 30/40 = 7.0, Reading 30/40 = 7.0). Real tables shift slightly from test to test, so treat the band as accurate to about <b>±0.5</b>.</li>
    <li>Practice-mode Listening (where you can replay the audio) is saved separately and never counted in your overall score.</li>
  </ul>
  <h2>Writing & Speaking — need a human-style judgement</h2>
  <p>No simple program can mark an essay or a spoken answer reliably, so the site does <b>not</b> invent a number. Instead you get three things:</p>
  <ol>
    <li><b>Measured indicators</b> — word count, paragraphing, sentence length, vocabulary variety, linking words, repetition, informal language, overview/position checks (Writing); speaking speed, answer length and vocabulary variety from the transcript (Speaking). These point to weaknesses but are not a band.</li>
    <li><b>An examiner prompt</b> — one click copies your full answers plus strict marking instructions. Paste it into Claude (or another AI) to get criterion-by-criterion bands with quoted evidence and corrections, in Arabic.</li>
    <li><b>Band entry</b> — enter the four criterion bands (from the AI, a teacher, or your own judgement using the descriptors shown). The site then calculates the section band:
      <ul><li>Writing: each task = average of its 4 criteria; Task 2 counts twice as much as Task 1.</li>
      <li>Speaking: average of the 4 criteria.</li></ul></li>
  </ol>
  <h2>Limits you should know</h2>
  <ul>
    <li>The Listening audio uses your device's text-to-speech voices. It is clearer and more even than real recordings, which have natural speed changes and background noise, so your real Listening score may be a little lower.</li>
    <li>Speech recognition is imperfect and often removes "um" and "er", so speaking fluency can look better on the transcript than it really is. Listen to your recording too.</li>
    <li>All content is original practice material written in the style of the real test; it is not official IELTS material.</li>
  </ul>
  <p><button class="btn primary" data-go="home">Back to home</button></p>
  </main>`;
}

function historyView() {
  cleanup();
  const h = history();
  app.innerHTML = topbar() + `<main class="page narrow">
  <h1>History</h1>
  ${h.length ? `<div class="tablewrap"><table class="tbl"><thead><tr><th>Date</th><th>Section</th><th>Raw</th><th>Band</th><th></th></tr></thead><tbody>
  ${h.map(r => `<tr><td>${new Date(r.date).toLocaleString()}</td><td>${NAMES[r.section]}${r.mode === 'practice' ? ' <span class="tag">practice</span>' : ''}</td>
    <td>${r.raw != null ? r.raw + '/40' : ''}</td><td><b>${fmtBand(r.band)}</b>${r.band == null ? ' <span class="tag warn">not assessed</span>' : ''}</td>
    <td>${(r.section === 'writing' || r.section === 'speaking') ? `<button class="btn sm" data-open="${r.id}">Open</button>` : ''}</td></tr>`).join('')}
  </tbody></table></div>
  <p><button class="btn ghost" id="clearH">Clear history</button></p>` : '<p class="muted">No results yet.</p>'}
  <p><button class="btn primary" data-go="home">Back to home</button></p></main>`;
  const c = $('#clearH');
  if (c) c.onclick = () => { if (confirm('Delete all saved results?')) { store.set('ielts_history', []); historyView(); } };
}

/* =====================================================================
   OBJECTIVE QUESTION ENGINE (Listening + Reading)
   ===================================================================== */
const groupNums = g => g.type === 'multi' ? g.ns : g.type === 'notes' ? Object.keys(g.answers).map(Number).sort((a, b) => a - b) : g.items.map(i => i.n);

function renderGroup(g) {
  const nums = groupNums(g); const a = nums[0], b = nums[nums.length - 1];
  let h = `<section class="qgroup"><h3>Questions ${a}${b !== a ? '–' + b : ''}</h3><div class="instr">${g.instructions}</div>`;
  if (g.type === 'notes') {
    h += `<div class="notes">${g.title ? `<h4>${g.title}</h4>` : ''}${g.html.replace(/\{\{(\d+)\}\}/g, (m, n) =>
      `<span class="gap" id="q${n}"><input type="text" data-q="${n}" placeholder="${n}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Question ${n}"></span>`)}</div>`;
  } else if (g.type === 'mcq') {
    h += g.items.map(it => `<div class="q" id="q${it.n}"><div class="qtext"><b class="qn">${it.n}</b><span>${it.q}</span></div>
      <div class="opts">${it.options.map((o, i) => `<label class="opt"><input type="radio" name="r${it.n}" data-q="${it.n}" value="${LET[i]}"><span class="ol">${LET[i]}</span><span>${o}</span></label>`).join('')}</div></div>`).join('');
  } else if (g.type === 'tf') {
    h += g.items.map(it => `<div class="q" id="q${it.n}"><div class="qtext"><b class="qn">${it.n}</b><span>${it.q}</span></div>
      <div class="opts inline">${g.options.map(o => `<label class="opt"><input type="radio" name="r${it.n}" data-q="${it.n}" value="${o}"><span>${o}</span></label>`).join('')}</div></div>`).join('');
  } else if (g.type === 'match') {
    h += `<div class="optbox">${g.optionsTitle ? `<h4>${g.optionsTitle}</h4>` : ''}<ul>${g.options.map(o => `<li><b>${o.k}</b><span>${o.t}</span></li>`).join('')}</ul></div>`;
    h += g.items.map(it => `<div class="q row" id="q${it.n}"><div class="qtext"><b class="qn">${it.n}</b><span>${it.q}</span></div>
      <select data-q="${it.n}" aria-label="Question ${it.n}"><option value="">–</option>${g.options.map(o => `<option value="${o.k}">${o.k}</option>`).join('')}</select></div>`).join('');
  } else if (g.type === 'multi') {
    h += `<div class="q" id="q${g.ns[0]}">${g.ns.slice(1).map(n => `<span id="q${n}"></span>`).join('')}
      <div class="qtext"><b class="qn">${g.ns.join('–')}</b><span>${g.q}</span></div>
      <div class="opts">${g.options.map((o, i) => `<label class="opt"><input type="checkbox" data-multi="${g.ns.join(',')}" value="${LET[i]}"><span class="ol">${LET[i]}</span><span>${o}</span></label>`).join('')}</div></div>`;
  }
  return h + '</section>';
}

function bindAnswers(root, st, onChange) {
  root.addEventListener('input', e => {
    const t = e.target;
    if (t.matches('input[type=text][data-q]')) { st.ans[t.dataset.q] = t.value; onChange(); }
  });
  root.addEventListener('change', e => {
    const t = e.target;
    if (t.matches('input[type=radio][data-q], select[data-q]')) { st.ans[t.dataset.q] = t.value; onChange(); }
    else if (t.matches('input[type=checkbox][data-multi]')) {
      const ns = t.dataset.multi.split(',');
      const boxes = $$(`input[data-multi="${t.dataset.multi}"]`, root);
      let checked = boxes.filter(x => x.checked);
      if (checked.length > ns.length) { t.checked = false; checked = boxes.filter(x => x.checked); }
      const vals = checked.map(x => x.value).sort();
      ns.forEach((n, i) => { st.ans[n] = vals[i] || ''; });
      onChange();
    }
  });
}
function restoreAnswers(root, st) {
  $$('input[type=text][data-q]', root).forEach(i => { i.value = st.ans[i.dataset.q] || ''; });
  $$('input[type=radio][data-q]', root).forEach(i => { i.checked = st.ans[i.dataset.q] === i.value; });
  $$('select[data-q]', root).forEach(s => { s.value = st.ans[s.dataset.q] || ''; });
  $$('input[type=checkbox][data-multi]', root).forEach(x => { x.checked = x.dataset.multi.split(',').some(n => st.ans[n] === x.value); });
}

function navHTML(parts) {
  return `<nav class="qnav">${parts.map((p, pi) => `<div class="navpart" data-np="${pi}">
    <button class="partbtn" data-part="${pi}">${p.label}</button>
    <span class="nums">${range(p.range[0], p.range[1]).map(n => `<button class="nb" data-nav="${n}" data-part="${pi}">${n}</button>`).join('')}</span>
    <span class="cnt" data-cnt="${pi}"></span></div>`).join('')}</nav>`;
}
function updateNav(st, parts) {
  $$('.nb').forEach(b => b.classList.toggle('done', !!String(st.ans[b.dataset.nav] || '').trim()));
  parts.forEach((p, pi) => {
    const c = $(`[data-cnt="${pi}"]`);
    if (c) c.textContent = range(p.range[0], p.range[1]).filter(n => String(st.ans[n] || '').trim()).length + ' of ' + (p.range[1] - p.range[0] + 1);
  });
}
function markPart(pi) { $$('.navpart').forEach(d => d.classList.toggle('cur', +d.dataset.np === pi)); }
function bindNav(st, renderPart) {
  $('.qnav').addEventListener('click', e => {
    const b = e.target.closest('[data-part]'); if (!b) return;
    const pi = +b.dataset.part;
    if (pi !== st.part) renderPart(pi);
    if (b.dataset.nav) {
      const el = document.getElementById('q' + b.dataset.nav);
      if (el) {
        const box = el.closest('.q') || el;
        box.scrollIntoView({ block: 'center', behavior: 'smooth' });
        const inp = el.matches('input,select') ? el : el.querySelector('input,select');
        if (inp && inp.type !== 'radio' && inp.type !== 'checkbox') inp.focus({ preventScroll: true });
        box.classList.add('flash'); setTimeout(() => box.classList.remove('flash'), 900);
      }
    }
  });
}

const norm = s => String(s || '').toLowerCase().replace(/[‘’`´]/g, "'").replace(/[£$€%]/g, '').replace(/[.,;:!?"()]/g, ' ').replace(/\s+/g, ' ').trim();
function scoreGroups(groups, ans) {
  let raw = 0; const rows = [];
  groups.forEach(g => {
    if (g.type === 'multi') {
      const chosen = g.ns.map(n => ans[n]).filter(Boolean);
      const hits = chosen.filter(c => g.answers.includes(c)).length;
      raw += hits;
      rows.push({ n: g.ns.join(' & '), your: chosen.join(', ') || '—', correct: g.answers.join(', '), score: hits, max: g.ns.length });
      return;
    }
    groupNums(g).forEach(n => {
      const your = String(ans[n] || '').trim(); const a = g.answers[n];
      let ok, correct;
      if (g.type === 'notes') { const list = [].concat(a); ok = !!your && list.some(x => norm(x) === norm(your)); correct = list.join(' / '); }
      else { ok = your === a; correct = a; }
      if (ok) raw++;
      rows.push({ n, your: your || '—', correct, score: ok ? 1 : 0, max: 1 });
    });
  });
  return { raw, rows };
}

function examShell(title, left, right, body, nav) {
  return `<div class="exam"><header class="examhead">
    <div class="eh-l"><span class="eh-title">${title}</span>${left || ''}</div>
    <div class="eh-c"><span class="timer" id="timer"></span></div>
    <div class="eh-r">${right || ''}<button class="btn ghost sm" id="exitBtn">Exit</button><button class="btn primary sm" id="submitBtn">Submit</button></div>
  </header>${body}${nav || ''}</div>`;
}
function bindExit(msg) {
  $('#exitBtn').onclick = () => { if (confirm(msg || 'Leave this section? Your answers will be lost.')) { session = null; home(); } };
}
function overlay(html) { return `<div class="overlay" id="overlay"><div class="modal">${html}</div></div>`; }

/* =====================================================================
   LISTENING
   ===================================================================== */
function startListening() {
  cleanup();
  const L = D.listening;
  const st = { ans: {}, part: 0, mode: 'exam', token: null, done: false, started: false };
  const parts = L.parts.map((p, i) => ({ label: 'Part ' + (i + 1), range: p.range }));
  app.innerHTML = examShell('Listening', `<span class="audiostat" id="astat">Audio not started</span>`,
    `<label class="vol" title="Volume">🔊<input type="range" id="vol" min="0" max="1" step="0.05" value="${TTS.volume}"></label>`,
    `<main class="exambody single"><div class="qcol" id="qarea"></div></main>`, navHTML(parts)) +
    overlay(`<h2>IELTS Listening</h2>
    <ul class="rules">
      <li>4 parts, 40 questions, about 30 minutes.</li>
      <li><b>Exam mode:</b> the recording plays <b>once only</b>, with reading time before each part. Answer while you listen. When the recording ends you get <b>2 minutes</b> to check, then your answers are submitted automatically.</li>
      <li><b>Practice mode:</b> play any part as many times as you like, no time limit (not counted in your overall score).</li>
      <li>Spelling must be correct and you must respect the word limit in each instruction.</li>
      <li>The recording is read by your browser's English voices — Microsoft Edge and Google Chrome have the most natural ones. Use headphones.</li>
    </ul>
    ${TTS.ok ? '' : '<p class="alert">Your browser does not support speech synthesis. Please use Chrome, Edge or Safari.</p>'}
    <div class="modes"><label><input type="radio" name="lmode" value="exam" checked> Exam mode</label><label><input type="radio" name="lmode" value="practice"> Practice mode</label></div>
    <div class="row-between"><label class="small">Speed <select id="rate"><option value="0.9">Slower</option><option value="0.95" selected>Normal</option><option value="1.05">Faster</option></select></label><span class="muted small" id="vinfo">Loading voices…</span></div>
    <div class="modal-actions"><button class="btn" id="testSound">Test sound</button><button class="btn primary" id="startBtn">Start test</button></div>`);

  const qarea = $('#qarea'), astat = $('#astat'), timer = $('#timer');
  const setStat = t => { astat.textContent = t; };
  TTS.load().then(() => { $('#vinfo') && ($('#vinfo').textContent = TTS.describe()); });
  $('#vol').oninput = e => { TTS.volume = +e.target.value; };
  $('#rate').onchange = e => { TTS.rate = +e.target.value; };
  $('#testSound').onclick = () => { TTS.cancel(); speakText('This is a sound check. You should now adjust the volume so that you can hear clearly.', 'n', { cancelled: false }); };

  bindAnswers(qarea, st, () => updateNav(st, parts));
  bindNav(st, renderPart);
  bindExit();

  function renderPart(pi) {
    st.part = pi; const p = L.parts[pi];
    qarea.innerHTML = `<div class="partintro"><h2>Part ${pi + 1}</h2><p>Listen and answer questions ${p.range[0]}–${p.range[1]}.</p>
      ${st.mode === 'practice' ? `<div class="pctl"><button class="btn sm" data-act="play">▶ Play Part ${pi + 1}</button><button class="btn sm ghost" data-act="stop">■ Stop</button></div>` : ''}</div>` +
      p.groups.map(renderGroup).join('');
    restoreAnswers(qarea, st); markPart(pi); updateNav(st, parts);
    qarea.parentElement.scrollTop = 0;
  }
  qarea.addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    if (b.dataset.act === 'play') playSeq([st.part]);
    else { if (st.token) st.token.cancelled = true; TTS.cancel(); setStat('Stopped'); }
  });

  function pauseFor(sec, token, onTick) {
    return new Promise(res => {
      const end = Date.now() + sec * 1000; onTick(sec);
      const id = setInterval(() => { const left = (end - Date.now()) / 1000; if (token.cancelled || left <= 0) { clearInterval(id); res(); } else onTick(left); }, 200);
    });
  }
  async function playSeq(list) {
    if (st.token) st.token.cancelled = true; TTS.cancel();
    const token = st.token = { cancelled: false };
    for (const pi of list) {
      if (token.cancelled) return false;
      if (st.part !== pi) renderPart(pi);
      for (const item of L.parts[pi].script) {
        if (token.cancelled) return false;
        if (item.p) await pauseFor(item.p, token, left => setStat(`Part ${pi + 1} · ${item.label} ${fmtTime(left)}`));
        else { setStat(`▶ Part ${pi + 1} playing`); await speakText(item.t, item.s, token); }
      }
    }
    if (!token.cancelled) setStat(st.mode === 'practice' ? 'Finished – replay or submit' : 'Recording finished');
    return !token.cancelled;
  }

  $('#startBtn').onclick = () => {
    st.mode = $('input[name=lmode]:checked').value;
    $('#overlay').remove(); st.started = true; guardLeave();
    addCleanup(() => { if (st.token) st.token.cancelled = true; });
    renderPart(0);
    if (st.mode === 'exam') {
      playSeq([0, 1, 2, 3]).then(ok => {
        if (!ok || st.done) return;
        setStat('Check your answers');
        timer.classList.add('on');
        countdown(120, l => { timer.textContent = 'Checking time ' + fmtTime(l); timer.classList.toggle('warn', l <= 30); }, finish);
      });
    } else setStat('Practice mode – press ▶ Play');
  };
  $('#submitBtn').onclick = () => { if (st.started && confirm('Submit your answers and finish the Listening test?')) finish(); };

  function finish() {
    if (st.done) return; st.done = true;
    if (st.token) st.token.cancelled = true; TTS.cancel();
    const groups = L.parts.flatMap(p => p.groups);
    const sc = scoreGroups(groups, st.ans);
    const perPart = L.parts.map(p => scoreGroups(p.groups, st.ans).raw);
    const band = toBand(sc.raw, LISTEN_TABLE);
    saveResult({ section: 'listening', raw: sc.raw, band, perPart, mode: st.mode });
    objectiveResults('listening', { raw: sc.raw, band, rows: sc.rows, perPart, mode: st.mode });
  }
}

/* =====================================================================
   READING
   ===================================================================== */
function startReading() {
  cleanup();
  const R = D.reading;
  const st = { ans: {}, part: 0, done: false, started: false, phtml: {} };
  const parts = R.passages.map((p, i) => ({ label: 'Part ' + (i + 1), range: p.range }));
  app.innerHTML = examShell('Reading', '', '', `<main class="exambody split"><article class="passage" id="passage"></article><section class="qcol" id="qarea"></section></main>`, navHTML(parts)) +
    overlay(`<h2>IELTS Academic Reading</h2>
    <ul class="rules">
      <li>3 passages, 40 questions, <b>60 minutes</b>. There is no extra time to transfer answers.</li>
      <li>Spend about 20 minutes on each passage. Use the buttons at the bottom to move between parts and questions.</li>
      <li>To <b>highlight</b> text in a passage, select it with the mouse. Click a highlight to remove it.</li>
      <li>Spelling must be correct and word limits respected. When the time runs out, your answers are submitted automatically.</li>
    </ul>
    <div class="modal-actions"><button class="btn primary" id="startBtn">Start test</button></div>`);
  const passage = $('#passage'), qarea = $('#qarea'), timer = $('#timer');
  bindAnswers(qarea, st, () => updateNav(st, parts));
  bindNav(st, renderPart);
  bindExit();

  function renderPart(pi) {
    if (st.started && passage.innerHTML) st.phtml[st.part] = passage.innerHTML;
    st.part = pi; const p = R.passages[pi];
    passage.innerHTML = st.phtml[pi] || `<h2 class="ptitle">Reading Passage ${pi + 1}</h2>
      <p class="pinstr">You should spend about 20 minutes on <b>Questions ${p.range[0]}–${p.range[1]}</b>, which are based on Reading Passage ${pi + 1} below.</p>
      <h3 class="ptext-title">${p.title}</h3><div class="ptext">${p.html}</div>`;
    qarea.innerHTML = p.groups.map(renderGroup).join('');
    restoreAnswers(qarea, st); markPart(pi); updateNav(st, parts);
    passage.scrollTop = 0; qarea.scrollTop = 0;
  }
  // highlighting
  let justMarked = false;
  passage.addEventListener('mouseup', () => {
    const sel = window.getSelection(); if (!sel || sel.isCollapsed || !sel.rangeCount) return;
    const r = sel.getRangeAt(0); if (!passage.contains(r.commonAncestorContainer)) return;
    try { const m = document.createElement('mark'); r.surroundContents(m); justMarked = true; } catch (e) { /* selection crosses elements – ignore */ }
    sel.removeAllRanges();
  });
  passage.addEventListener('click', e => {
    if (justMarked) { justMarked = false; return; }
    const m = e.target.closest('mark'); if (m) { m.replaceWith(...m.childNodes); passage.normalize(); }
  });

  $('#startBtn').onclick = () => {
    $('#overlay').remove(); st.started = true; guardLeave(); renderPart(0);
    timer.classList.add('on');
    countdown(3600, l => { timer.textContent = fmtTime(l) + ' left'; timer.classList.toggle('warn', l <= 600); }, () => { alert('Time is up. Your answers will now be submitted.'); finish(); });
  };
  $('#submitBtn').onclick = () => { if (st.started && confirm('Submit your answers and finish the Reading test?')) finish(); };
  function finish() {
    if (st.done) return; st.done = true;
    const groups = R.passages.flatMap(p => p.groups);
    const sc = scoreGroups(groups, st.ans);
    const perPart = R.passages.map(p => scoreGroups(p.groups, st.ans).raw);
    const band = toBand(sc.raw, READ_TABLE);
    saveResult({ section: 'reading', raw: sc.raw, band, perPart });
    objectiveResults('reading', { raw: sc.raw, band, rows: sc.rows, perPart });
  }
}

/* ---------------- objective results ---------------- */
function nextButtons() {
  if (session && session.queue.length) return `<button class="btn primary" data-next="1">Continue to ${NAMES[session.queue[0]]} ▶</button>`;
  if (session) return `<button class="btn primary" data-go="summary">Full test summary ▶</button>`;
  return `<button class="btn primary" data-go="home">Back to home</button>`;
}
function objectiveResults(section, r) {
  cleanup();
  const isL = section === 'listening';
  const src = isL ? D.listening.parts : D.reading.passages;
  const sizes = src.map(p => p.range[1] - p.range[0] + 1);
  const wrong = r.rows.filter(x => x.score < x.max).length;
  app.innerHTML = topbar() + `<main class="page narrow">
    <div class="bandhero"><div class="bandnum">${fmtBand(r.band)}</div>
      <div><div class="bh-title">${NAMES[section]} band${r.mode === 'practice' ? ' <span class="tag">practice mode</span>' : ''}</div>
      <div class="bh-sub">Raw score <b>${r.raw} / 40</b></div></div></div>
    ${r.mode === 'practice' ? '<p class="alert">Practice mode allows replaying the audio, so this band is not a true exam score and is not counted in your overall band.</p>' : ''}
    <p class="muted small">Converted with the standard IELTS Academic ${NAMES[section]} table. Real conversion tables vary slightly between test versions, so treat this as ±0.5 band.</p>
    <div class="partbars">${r.perPart.map((v, i) => `<div class="pb"><div class="pb-l">Part ${i + 1}</div><div class="pb-bar"><span style="width:${v / sizes[i] * 100}%"></span></div><div class="pb-v">${v}/${sizes[i]}</div></div>`).join('')}</div>
    <div class="actions">${nextButtons()}</div>
    <h2>Answer review <span class="muted small">(${wrong} to check)</span></h2>
    <label class="small"><input type="checkbox" id="onlyWrong"> Show only incorrect answers</label>
    <div class="tablewrap"><table class="tbl review"><thead><tr><th>Q</th><th>Your answer</th><th>Correct answer</th><th></th></tr></thead><tbody>
    ${r.rows.map(x => `<tr class="${x.score === x.max ? 'ok' : 'bad'}"><td>${x.n}</td><td>${esc(x.your)}</td><td>${esc(x.correct)}</td><td>${x.score === x.max ? '✓' : (x.max > 1 ? x.score + '/' + x.max : '✗')}</td></tr>`).join('')}
    </tbody></table></div>
    ${isL ? `<h2>Transcripts</h2>${D.listening.parts.map((p, i) => `<details class="transcript"><summary>Part ${i + 1} transcript</summary>
      ${p.script.filter(x => x.t).map(x => `<p><b>${({ n: 'Narrator', f: i === 0 ? 'Receptionist' : 'Lecturer', f2: 'Lucy', m: i === 0 ? 'Caller' : i === 1 ? 'Tom' : 'Ahmed', m2: 'Speaker' })[x.s]}:</b> ${esc(x.t)}</p>`).join('')}</details>`).join('')}` : ''}
    <div class="actions">${nextButtons()}</div>
  </main>`;
  $('#onlyWrong').onchange = e => $$('.review tr.ok').forEach(tr => tr.style.display = e.target.checked ? 'none' : '');
}

/* =====================================================================
   WRITING
   ===================================================================== */
function lineChartSVG(c) {
  const W = 600, H = 360, L = 52, R = 140, T = 24, B = 46, pw = W - L - R, ph = H - T - B;
  const x = i => L + pw * i / (c.years.length - 1), y = v => T + ph * (1 - v / 100);
  const cols = ['#1f5fa8', '#c0392b', '#2e8b57', '#8e44ad'];
  const dash = ['', '7 4', '2 4', '10 4 2 4'];
  let s = `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="${esc(c.title)}">`;
  s += `<text x="${L + pw / 2}" y="14" text-anchor="middle" class="ct">${esc(c.title)}</text>`;
  for (let v = 0; v <= 100; v += 20) s += `<line x1="${L}" x2="${L + pw}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end" class="ax">${v}</text>`;
  c.years.forEach((yr, i) => { s += `<text x="${x(i)}" y="${T + ph + 20}" text-anchor="middle" class="ax">${yr}</text>`; });
  s += `<text transform="translate(14 ${T + ph / 2}) rotate(-90)" text-anchor="middle" class="ax">% of households</text>`;
  s += `<line x1="${L}" x2="${L}" y1="${T}" y2="${T + ph}" class="axis"/><line x1="${L}" x2="${L + pw}" y1="${T + ph}" y2="${T + ph}" class="axis"/>`;
  c.series.forEach((se, si) => {
    const pts = se.data.map((v, i) => `${x(i)},${y(v)}`).join(' ');
    s += `<polyline points="${pts}" fill="none" stroke="${cols[si]}" stroke-width="2.5" stroke-dasharray="${dash[si]}"/>`;
    se.data.forEach((v, i) => { s += `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="${cols[si]}"/>`; });
    const ly = T + 18 + si * 24;
    s += `<line x1="${L + pw + 18}" x2="${L + pw + 46}" y1="${ly}" y2="${ly}" stroke="${cols[si]}" stroke-width="2.5" stroke-dasharray="${dash[si]}"/><text x="${L + pw + 52}" y="${ly + 4}" class="lg">${esc(se.name)}</text>`;
  });
  return s + '</svg>';
}

function startWriting() {
  cleanup();
  const W = D.writing;
  const draft = store.get('ielts_writing_draft', null);
  const t2i = Math.floor(Math.random() * W.task2.length);
  const st = { task: 0, text: ['', ''], t2i, done: false, started: false };
  const nav = `<nav class="qnav">${[0, 1].map(i => `<div class="navpart wtask" data-np="${i}"><button class="partbtn" data-task="${i}">Task ${i + 1}</button><span class="cnt" id="wc${i}">0 words</span></div>`).join('')}</nav>`;
  app.innerHTML = examShell('Writing', '', '', `<main class="exambody split"><article class="passage" id="prompt"></article>
     <section class="qcol writecol"><textarea id="essay" spellcheck="false" autocorrect="off" autocapitalize="off" autocomplete="off" placeholder="Type your answer here…"></textarea>
     <div class="wcbar"><span id="wcLive">Words: 0</span><span class="muted small" id="wcMin"></span></div></section></main>`, nav) +
    overlay(`<h2>IELTS Academic Writing</h2>
    <ul class="rules">
      <li><b>60 minutes</b> for two tasks. Switch between tasks at any time using the buttons at the bottom.</li>
      <li><b>Task 1</b> – describe a graph in at least <b>150 words</b>. Spend about 20 minutes.</li>
      <li><b>Task 2</b> – write an essay of at least <b>250 words</b>. Spend about 40 minutes. Task 2 counts <b>twice</b> as much as Task 1.</li>
      <li>Spell-check and auto-correct are switched off, as in the real computer-delivered test.</li>
      <li>When the time is up your answers are submitted automatically.</li>
    </ul>
    ${draft && (draft.text[0] || draft.text[1]) ? `<p class="alert">An unfinished attempt was found. <label><input type="checkbox" id="useDraft"> Continue it</label></p>` : ''}
    <div class="modal-actions"><button class="btn primary" id="startBtn">Start test</button></div>`);
  const prompt = $('#prompt'), essay = $('#essay'), timer = $('#timer');
  const wc = t => (t.trim().match(/\S+/g) || []).filter(w => /[A-Za-z0-9]/.test(w)).length;

  function renderTask(i) {
    st.task = i;
    const t = i === 0 ? W.task1 : W.task2[st.t2i];
    prompt.innerHTML = `<h2 class="ptitle">Writing Task ${i + 1}</h2><p class="pinstr">You should spend about ${i ? 40 : 20} minutes on this task.</p>
      <div class="taskbox">${t.prompt}</div>${i === 0 ? lineChartSVG(W.task1.chart) + `<p class="muted small">${W.task1.chart.note}</p>` : '<p>Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>'}
      <p><b>Write at least ${t.min} words.</b></p>`;
    essay.value = st.text[i]; updWC();
    $$('.qnav .navpart').forEach(d => d.classList.toggle('active', +d.dataset.np === i));
    essay.focus();
  }
  function updWC() {
    const n = wc(essay.value); const min = st.task === 0 ? 150 : 250;
    $('#wcLive').textContent = 'Words: ' + n;
    $('#wcMin').textContent = n < min ? `${min - n} more to reach the minimum` : 'Minimum reached';
    [0, 1].forEach(i => { $('#wc' + i).textContent = wc(st.text[i]) + ' words'; });
  }
  essay.addEventListener('input', () => { st.text[st.task] = essay.value; updWC(); store.set('ielts_writing_draft', { text: st.text, t2i: st.t2i }); });
  $('.qnav').addEventListener('click', e => { const b = e.target.closest('[data-task]'); if (b) renderTask(+b.dataset.task); });
  bindExit('Leave the Writing test? Your text is kept as a draft on this device.');

  $('#startBtn').onclick = () => {
    if ($('#useDraft') && $('#useDraft').checked) { st.text = draft.text.slice(); st.t2i = draft.t2i; }
    $('#overlay').remove(); st.started = true; guardLeave(); renderTask(0);
    timer.classList.add('on');
    countdown(3600, l => { timer.textContent = fmtTime(l) + ' left'; timer.classList.toggle('warn', l <= 600); }, () => { alert('Time is up. Your answers will now be submitted.'); finish(); });
  };
  $('#submitBtn').onclick = () => { if (st.started && confirm('Submit both tasks and finish the Writing test?')) finish(); };
  function finish() {
    if (st.done) return; st.done = true;
    store.set('ielts_writing_draft', null);
    const id = saveResult({ section: 'writing', band: null, texts: st.text.slice(), t2i: st.t2i, wc: st.text.map(wc) });
    writingResults(id);
  }
}

/* ---------------- text analysis ---------------- */
const STOP = new Set('a an the and or but if of to in on at by for with from as is are was were be been being it its this that these those there their they them he she his her we our you your i my me not no do does did have has had will would can could should may might must than then so such also very more most much many some any all each other into over under about after before between during while which who whom whose what when where why how one two three four five per cent percent'.split(' '));
const LINKERS = ['however', 'moreover', 'furthermore', 'in addition', 'additionally', 'therefore', 'consequently', 'as a result', 'thus', 'hence', 'on the other hand', 'in contrast', 'by contrast', 'nevertheless', 'nonetheless', 'for example', 'for instance', 'such as', 'firstly', 'secondly', 'thirdly', 'first of all', 'first', 'second', 'third', 'also', 'finally', 'in conclusion', 'to conclude', 'to sum up', 'overall', 'whereas', 'although', 'even though', 'despite', 'in spite of', 'meanwhile', 'similarly', 'likewise', 'in particular', 'in other words', 'besides', 'on the contrary', 'as well as', 'not only'];
const INFORMAL = [/\b\w+n't\b/gi, /\b(i'm|it's|that's|they're|we're|you're|there's|i've|i'd|i'll)\b/gi, /\b(gonna|wanna|kids|stuff|things|a lot of|lots of|okay|ok|guys|really|so many|nowadays)\b/gi];
const SUBORD = /\b(which|who|whom|whose|although|though|because|since|while|whereas|unless|if|when|whenever|where|after|before|until|so that|even though|despite|in spite of|not only)\b/i;

function mattr(toks, w) {
  w = w || 50;
  if (!toks.length) return 0;
  if (toks.length <= w) return new Set(toks).size / toks.length;
  const cnt = new Map(); let uniq = 0;
  const add = t => { const c = (cnt.get(t) || 0) + 1; cnt.set(t, c); if (c === 1) uniq++; };
  const rem = t => { const c = cnt.get(t) - 1; cnt.set(t, c); if (c === 0) uniq--; };
  for (let i = 0; i < w; i++) add(toks[i]);
  let sum = uniq, n = 1;
  for (let i = w; i < toks.length; i++) { rem(toks[i - w]); add(toks[i]); sum += uniq; n++; }
  return sum / n / w;
}
function analyze(text, kind) {
  const t = (text || '').trim();
  const words = (t.match(/\S+/g) || []).filter(w => /[A-Za-z0-9]/.test(w));
  const wc = words.length;
  const paras = t ? t.split(/\n+/).filter(p => p.trim().length > 20).length : 0;
  const sents = (t.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map(s => s.trim()).filter(s => /[a-z]/i.test(s));
  const avgSent = sents.length ? wc / sents.length : 0;
  const low = t.toLowerCase();
  const toks = low.match(/[a-z]+(?:['-][a-z]+)*/g) || [];
  const variety = mattr(toks);
  const longPct = toks.length ? toks.filter(x => x.length >= 7).length / toks.length * 100 : 0;
  const complexPct = sents.length ? sents.filter(s => SUBORD.test(s)).length / sents.length * 100 : 0;
  const longSents = sents.filter(s => (s.match(/\S+/g) || []).length > 40).length;
  const linkers = {};
  LINKERS.forEach(l => { const m = low.match(new RegExp('\\b' + l.replace(/ /g, '\\s+') + '\\b', 'g')); if (m) linkers[l] = m.length; });
  const overused = Object.entries(linkers).filter(([, c]) => c >= 3).map(([l, c]) => `${l} ×${c}`);
  const freq = {};
  toks.forEach(x => { if (!STOP.has(x) && x.length > 3) freq[x] = (freq[x] || 0) + 1; });
  const repeated = Object.entries(freq).filter(([, c]) => c >= (wc > 200 ? 5 : 4)).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w, c]) => `${w} ×${c}`);
  const informal = [];
  INFORMAL.forEach(re => { (t.match(re) || []).forEach(m => informal.push(m.toLowerCase())); });
  const informalU = [...new Set(informal)];
  const min = kind === 1 ? 150 : 250;
  const items = [];
  const add = (label, value, level, note) => items.push({ label, value, level, note });

  add('Word count', `${wc} / ${min}`, wc >= min ? 'good' : wc >= min * 0.9 ? 'ok' : 'bad',
    wc >= min ? 'Meets the minimum.' : `Under the minimum. Under-length answers lose marks in ${kind === 1 ? 'Task Achievement' : 'Task Response'}${wc < min * 0.7 ? ' — this is a serious penalty' : ''}.`);
  const pGood = kind === 1 ? 3 : 4;
  add('Paragraphs', paras, paras >= pGood ? 'good' : paras >= pGood - 1 ? 'ok' : 'bad',
    kind === 1 ? 'Expected: introduction, overview, 2 body paragraphs (3–4 in total).' : 'Expected: introduction, 2–3 body paragraphs, conclusion (4–5 in total). Weak paragraphing limits Coherence & Cohesion.');
  add('Average sentence length', avgSent.toFixed(1) + ' words', avgSent >= 12 && avgSent <= 26 ? 'good' : (avgSent >= 9 && avgSent <= 32) ? 'ok' : 'bad',
    avgSent < 12 ? 'Mostly short sentences – suggests a limited grammatical range.' : avgSent > 26 ? 'Very long sentences – check for run-ons and punctuation errors.' : 'Healthy mix of sentence lengths.');
  add('Sentences with complex structures (approx.)', Math.round(complexPct) + '%', complexPct >= 45 ? 'good' : complexPct >= 25 ? 'ok' : 'bad',
    'Share of sentences containing a subordinate clause or complex connector. Band 7+ needs frequent, accurate complex sentences.');
  if (longSents) add('Sentences over 40 words', longSents, 'ok', 'Very long sentences often hide grammar and punctuation errors.');
  add('Vocabulary variety (MATTR)', variety.toFixed(2), variety >= 0.72 ? 'good' : variety >= 0.64 ? 'ok' : 'bad',
    'Average proportion of different words in every 50-word stretch. Higher = less repetition. Rough guide only: ≥0.72 varied, 0.64–0.72 adequate, <0.64 repetitive.');
  add('Longer words (7+ letters)', Math.round(longPct) + '%', longPct >= 22 ? 'good' : longPct >= 16 ? 'ok' : 'bad',
    'A rough sign of academic vocabulary. It does not measure accuracy or appropriacy.');
  const nLink = Object.keys(linkers).length;
  add('Different linking words', nLink, nLink >= 6 ? 'good' : nLink >= 3 ? 'ok' : 'bad',
    (nLink ? 'Used: ' + Object.entries(linkers).map(([l, c]) => c > 1 ? `${l} ×${c}` : l).join(', ') + '. ' : '') + (overused.length ? 'Possibly over-used: ' + overused.join(', ') + ' (mechanical linking is a Band 6 feature).' : ''));
  add('Repeated content words', repeated.length ? repeated.join(', ') : 'none', repeated.length > 2 ? 'bad' : repeated.length ? 'ok' : 'good',
    repeated.length ? 'Try synonyms or paraphrase. Repetition limits Lexical Resource.' : 'No heavy repetition detected.');
  add('Informal language', informalU.length ? informalU.slice(0, 10).join(', ') : 'none', informalU.length ? 'bad' : 'good',
    informalU.length ? 'Avoid contractions and informal words in academic writing.' : 'Register looks appropriate.');
  if (kind === 1) {
    const ov = /\b(overall|in general|generally|it is clear|it is evident|it can be seen|as a whole)\b/i.test(t);
    add('Overview statement', ov ? 'found' : 'not found', ov ? 'good' : 'bad', ov ? 'An overview phrase was detected — make sure it summarises the main trends, not details.' : "No clear overview detected (e.g. 'Overall, …'). Without an overview, Task Achievement is usually limited to Band 5.");
    const nums = (t.match(/\d+(\.\d+)?\s*(%|per\s*cent|percent)?/gi) || []).length;
    add('Data figures quoted', nums, nums >= 5 ? 'good' : nums >= 2 ? 'ok' : 'bad', 'Key features should be supported with accurate figures from the graph.');
    const opinion = /\b(i think|i believe|in my opinion|i feel)\b/i.test(t);
    if (opinion) add('Personal opinion', 'found', 'bad', 'Task 1 must not include your opinion – report only what the graph shows.');
  } else {
    const pos = /\b(i (strongly |firmly |completely |partly |partially )?(believe|agree|disagree|think|feel|would argue)|in my (opinion|view)|from my (perspective|point of view)|my (own )?view)\b/i.test(t);
    add('Clear position', pos ? 'found' : 'not found', pos ? 'good' : 'ok', pos ? 'A position phrase was found — keep the same position throughout.' : 'No explicit position phrase found. Band 7 Task Response needs a clear position throughout.');
    const concl = /\b(in conclusion|to conclude|to sum up|in summary|to summarise|to summarize|all in all)\b/i.test(t);
    add('Conclusion', concl ? 'found' : 'not found', concl ? 'good' : 'ok', concl ? 'A concluding signal was found.' : 'No concluding paragraph signal detected.');
  }
  return { wc, items };
}
function indicatorsHTML(a) {
  return `<div class="indicators">${a.items.map(i => `<div class="ind ${i.level}"><div class="ind-h"><span class="dot"></span><b>${esc(i.label)}</b><span class="ind-v">${esc(i.value)}</span></div><div class="ind-n">${esc(i.note)}</div></div>`).join('')}</div>`;
}

function criteriaHTML(prefix, keys, saved) {
  return keys.map(k => {
    const d = D.descriptors[k];
    const v = saved && saved[k];
    return `<div class="crit"><div class="crit-h"><b>${d.name}</b>
      <select data-crit="${prefix}${k}"><option value="">Band…</option>${[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(b => `<option value="${b}" ${String(v) === String(b) ? 'selected' : ''}>${b}</option>`).join('')}</select></div>
      <details><summary>Band descriptors</summary><table class="desc">${[9, 8, 7, 6, 5, 4, 3].map(b => `<tr><td><b>${b}</b></td><td>${d.bands[b]}</td></tr>`).join('')}</table></details></div>`;
  }).join('');
}
async function copyText(text, btn) {
  try { await navigator.clipboard.writeText(text); }
  catch (e) { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (x) { } ta.remove(); }
  if (btn) { const o = btn.textContent; btn.textContent = 'Copied ✓'; setTimeout(() => { btn.textContent = o; }, 1800); }
}

function writingPrompt(r) {
  const W = D.writing, c = W.task1.chart, t2 = W.task2[r.t2i];
  const table = c.series.map(s => `${s.name}: ` + c.years.map((y, i) => `${y} = ${s.data[i]}%`).join(', ')).join('\n');
  return `You are a senior, certified IELTS Writing examiner. Assess the candidate's IELTS Academic Writing test below strictly and honestly, exactly as an official examiner would, using the public IELTS Writing band descriptors. Do not inflate scores and do not soften your judgement to be encouraging.

For EACH task:
1. Give a whole-number band (0–9) for each of the four criteria: Task 1 → Task Achievement; Task 2 → Task Response; both tasks → Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy.
2. Justify each band in 2–3 sentences, quoting the candidate's own words as evidence.
3. List every grammar, vocabulary, spelling and punctuation error you find, with the correction.
Responses under the minimum length (150 words for Task 1, 250 for Task 2) must be penalised in Task Achievement / Task Response. In Task 1, an answer without a clear overview of the main trends should not receive more than Band 5 for Task Achievement.

Then:
- Give the overall Writing band (Task 2 counts twice as much as Task 1; round to the nearest half band).
- Give the 5 changes that would raise this candidate's score the most, in order of impact.
- Rewrite the weakest paragraph of Task 2 at Band 8 level.

Write all feedback in Arabic, but keep quotations, corrections and the rewritten paragraph in English. At the very end, give a short summary table in this format:
Task 1: TA x, CC x, LR x, GRA x | Task 2: TR x, CC x, LR x, GRA x | Overall Writing: x

=== TASK 1 (minimum 150 words) ===
${stripHtml(W.task1.prompt)}
Line graph data – ${c.title}:
${table}

Candidate's response (${r.wc[0]} words):
"""
${r.texts[0] || '(no answer)'}
"""

=== TASK 2 (minimum 250 words) ===
${stripHtml(t2.prompt)}
Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Candidate's response (${r.wc[1]} words):
"""
${r.texts[1] || '(no answer)'}
"""`;
}

function writingResults(id) {
  cleanup();
  const r = getResult(id); if (!r) return home();
  const a1 = analyze(r.texts[0], 1), a2 = analyze(r.texts[1], 2);
  const prompt = writingPrompt(r);
  const W = D.writing;
  app.innerHTML = topbar() + `<main class="page narrow">
    <div class="bandhero"><div class="bandnum" id="wBand">${fmtBand(r.band)}</div><div><div class="bh-title">Writing band</div>
      <div class="bh-sub" id="wSub">${r.band == null ? 'Not assessed yet – follow steps 1–3 below.' : `Task 1: ${fmtBand(r.t1)} · Task 2: ${fmtBand(r.t2)}`}</div></div></div>
    <p class="muted small">Writing is marked on four criteria per task. A program cannot judge ideas, accuracy or style reliably, so this page does not invent a band. Use the indicators, get an examiner-style assessment, then enter the bands.</p>

    <h2>Step 1 · Measured indicators</h2>
    <div class="twocol">
      <div><h3>Task 1</h3>${indicatorsHTML(a1)}</div>
      <div><h3>Task 2</h3>${indicatorsHTML(a2)}</div>
    </div>

    <h2>Step 2 · Examiner-style assessment</h2>
    <p>Copy this prompt and paste it into <a href="https://claude.ai/new" target="_blank" rel="noopener">Claude</a> (or another AI assistant, or send it to a teacher). It contains both tasks, your answers and strict marking instructions. Feedback comes back in Arabic.</p>
    <div class="actions"><button class="btn primary" id="copyPrompt">Copy examiner prompt</button><a class="btn" href="https://claude.ai/new" target="_blank" rel="noopener">Open Claude ↗</a></div>
    <details class="promptbox"><summary>Show prompt</summary><pre>${esc(prompt)}</pre></details>

    <h2>Step 3 · Enter the criterion bands</h2>
    <div class="twocol">
      <div><h3>Task 1</h3>${criteriaHTML('t1', ['TA', 'CC', 'LR', 'GRA'], r.crit && r.crit.t1)}</div>
      <div><h3>Task 2</h3>${criteriaHTML('t2', ['TR', 'CC', 'LR', 'GRA'], r.crit && r.crit.t2)}</div>
    </div>
    <div class="actions"><button class="btn primary" id="saveBand">Calculate & save Writing band</button><span id="saveMsg" class="muted"></span></div>

    <h2>Your answers</h2>
    <details class="essay"><summary>Task 1 (${a1.wc} words)</summary><div class="taskbox">${W.task1.prompt}</div><pre class="essaytext">${esc(r.texts[0] || '(no answer)')}</pre></details>
    <details class="essay"><summary>Task 2 (${a2.wc} words)</summary><div class="taskbox">${W.task2[r.t2i].prompt}</div><pre class="essaytext">${esc(r.texts[1] || '(no answer)')}</pre></details>
    <div class="actions">${nextButtons()}</div>
  </main>`;
  $('#copyPrompt').onclick = e => copyText(prompt, e.target);
  $('#saveBand').onclick = () => {
    const get = k => { const v = $(`[data-crit="${k}"]`).value; return v === '' ? null : +v; };
    const c1 = { TA: get('t1TA'), CC: get('t1CC'), LR: get('t1LR'), GRA: get('t1GRA') };
    const c2 = { TR: get('t2TR'), CC: get('t2CC'), LR: get('t2LR'), GRA: get('t2GRA') };
    if ([...Object.values(c1), ...Object.values(c2)].some(v => v == null)) { $('#saveMsg').textContent = 'Please choose a band for all 8 criteria.'; return; }
    const avg = o => Object.values(o).reduce((s, v) => s + v, 0) / 4;
    const t1 = avg(c1), t2 = avg(c2);
    const band = roundBand((t1 + 2 * t2) / 3);
    updateResult(id, { crit: { t1: c1, t2: c2 }, t1, t2, band });
    $('#wBand').textContent = fmtBand(band);
    $('#wSub').textContent = `Task 1: ${t1.toFixed(2)} · Task 2: ${t2.toFixed(2)} → (T1 + 2×T2) ÷ 3 = ${((t1 + 2 * t2) / 3).toFixed(2)}`;
    $('#saveMsg').textContent = 'Saved ✓';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

/* =====================================================================
   SPEAKING
   ===================================================================== */
function buildSpeakingPlan() {
  const S = D.speaking;
  const first = S.part1First[Math.floor(Math.random() * S.part1First.length)];
  const extra = shuffle(S.part1Topics).slice(0, 2);
  const card = S.part2[Math.floor(Math.random() * S.part2.length)];
  const steps = [{ k: 'say', t: S.script.intro, part: 1 }, { k: 'say', t: S.script.p1intro, part: 1 }];
  [first, ...extra].forEach((tp, ti) => tp.qs.forEach((q, qi) => steps.push({ k: 'q', part: 1, t: (qi === 0 && ti > 0 ? `Now, let's talk about ${tp.name.toLowerCase()}. ` : '') + q, limit: 45 })));
  steps.push({ k: 'say', t: S.script.p2intro, part: 2 });
  steps.push({ k: 'prep', part: 2, secs: 60 });
  steps.push({ k: 'talk', part: 2, t: S.script.p2start, limit: 120 });
  steps.push({ k: 'say', t: S.script.p2end, part: 2 });
  steps.push({ k: 'say', t: S.script.p3intro.replace('{topic}', card.topic), part: 3 });
  card.p3.forEach(q => steps.push({ k: 'q', part: 3, t: q, limit: 75 }));
  steps.push({ k: 'end', t: S.script.end, part: 3 });
  return { steps, card };
}
function cueHTML(card) {
  return `<div class="cuecard"><b>${card.title}</b><p>You should say:</p><ul>${card.bullets.map(b => `<li>${b}</li>`).join('')}</ul><p>${card.explain}</p></div>`;
}

function startSpeaking() {
  cleanup();
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const plan = buildSpeakingPlan();
  const st = { idx: -1, answers: [], cur: null, capturing: false, graceIdx: -1, graceUntil: 0, done: false, ansTimer: null, recOn: false, token: { cancelled: false } };
  app.innerHTML = examShell('Speaking', `<span class="audiostat" id="plabel">Part 1</span>`, `<label class="small showq"><input type="checkbox" id="showq" checked> Show questions</label>`,
    `<main class="exambody single"><div class="speak">
      <div class="examiner"><div class="avatar">👤</div><div class="ebox"><div class="who">Examiner</div><div class="etext" id="etext">…</div></div></div>
      <div id="cue"></div>
      <textarea id="notes" class="notesbox hidden" placeholder="Notes (optional) – you have one minute to prepare"></textarea>
      <div class="sstatus"><span id="sstat" class="sstat"></span><span id="stimer" class="bigtimer"></span></div>
      <div class="caption" id="caption"></div>
      <div class="sactions"><button class="btn primary big" id="nextBtn" disabled>Next ▶</button></div>
      <p class="muted small center">The examiner moves on automatically when the time for an answer is up (Part 1 ≈ 45 s, Part 2 = 2 min, Part 3 ≈ 75 s). Press Next when you have finished an answer.</p>
    </div></main>`) +
    overlay(`<h2>IELTS Speaking</h2>
    <ul class="rules">
      <li>3 parts, 11–14 minutes. <b>Part 1:</b> questions about familiar topics. <b>Part 2:</b> a cue card – 1 minute to prepare, then speak for up to 2 minutes. <b>Part 3:</b> a discussion of more abstract questions.</li>
      <li>The examiner's questions are read aloud. Answer out loud as you would in the real test. Use <b>headphones</b> so the examiner's voice is not picked up by your microphone.</li>
      <li>Your whole test is recorded (you can listen and download it at the end) and transcribed for assessment.</li>
      <li>Transcription needs <b>Google Chrome or Microsoft Edge</b> and an internet connection.</li>
    </ul>
    ${SR ? '' : '<p class="alert">This browser has no speech recognition, so no transcript will be produced. Audio recording still works. Use Chrome or Edge for the full experience.</p>'}
    <p class="muted small" id="micMsg"></p>
    <div class="modal-actions"><button class="btn primary" id="startBtn">Allow microphone & start</button></div>`);

  const etext = $('#etext'), sstat = $('#sstat'), stimer = $('#stimer'), caption = $('#caption'), nextBtn = $('#nextBtn'), cue = $('#cue'), notes = $('#notes');
  $('#showq').onchange = e => etext.classList.toggle('blurred', !e.target.checked);
  bindExit('Leave the Speaking test? Your recording will be lost.');
  TTS.load();

  let stream = null, recorder = null, chunks = [], rec = null;
  addCleanup(() => {
    st.token.cancelled = true; st.recOn = false;
    try { rec && rec.stop(); } catch (e) { }
    try { recorder && recorder.state !== 'inactive' && recorder.stop(); } catch (e) { }
    if (stream) stream.getTracks().forEach(t => t.stop());
  });

  function startRecognition() {
    if (!SR) return;
    rec = new SR(); rec.lang = 'en-GB'; rec.continuous = true; rec.interimResults = true;
    rec.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i], txt = res[0].transcript.trim();
        if (res.isFinal) {
          let target = null;
          if (st.capturing && st.cur) target = st.cur;
          else if (Date.now() < st.graceUntil && st.answers[st.graceIdx]) target = st.answers[st.graceIdx];
          if (target && txt) target.text = (target.text + ' ' + txt).trim();
        } else interim += txt + ' ';
      }
      caption.textContent = st.capturing ? ((st.cur ? st.cur.text.split(' ').slice(-14).join(' ') + ' ' : '') + interim).trim() : '';
    };
    rec.onerror = e => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { st.recOn = false; caption.textContent = 'Speech recognition is blocked – only audio will be recorded.'; } };
    rec.onend = () => { if (st.recOn) setTimeout(() => { try { rec.start(); } catch (e) { } }, 150); };
    st.recOn = true;
    try { rec.start(); } catch (e) { }
  }

  $('#startBtn').onclick = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      $('#micMsg').textContent = 'Microphone access was refused or is unavailable. Allow the microphone for this site (lock icon in the address bar) and try again.';
      return;
    }
    try { recorder = new MediaRecorder(stream); recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); }; recorder.start(1000); } catch (e) { recorder = null; }
    startRecognition();
    $('#overlay').remove(); guardLeave();
    st.startTime = Date.now();
    next();
  };
  nextBtn.onclick = () => next();
  $('#submitBtn').onclick = () => { if (st.idx >= 0 && confirm('End the speaking test now?')) finish(); };

  function beginAnswer(s, q) {
    st.cur = { part: s.part, q, text: '', start: Date.now(), end: null };
    st.answers.push(st.cur); st.capturing = true;
    sstat.innerHTML = '<span class="recdot"></span> Your turn – speak now';
    nextBtn.disabled = false; nextBtn.textContent = 'Next ▶';
    const myIdx = st.idx;
    st.ansTimer = countdown(s.limit, l => { stimer.textContent = fmtTime(l); stimer.classList.toggle('warn', l <= 10); }, () => { if (st.idx === myIdx) next(); });
  }
  function endAnswer() {
    if (st.ansTimer) { st.ansTimer.stop(); st.ansTimer = null; }
    if (st.cur && st.capturing) {
      st.capturing = false; st.cur.end = Date.now();
      st.graceIdx = st.answers.length - 1; st.graceUntil = Date.now() + 2000; st.cur = null;
    }
    stimer.textContent = ''; stimer.classList.remove('warn'); caption.textContent = '';
  }
  async function examinerSays(t) {
    etext.textContent = t; sstat.textContent = 'Examiner speaking…'; nextBtn.disabled = true;
    await speakText(t, 'm', st.token);
  }
  async function next() {
    if (st.done) return;
    endAnswer();
    const my = ++st.idx; const s = plan.steps[my];
    if (!s) return finish();
    $('#plabel').textContent = 'Part ' + s.part;
    if (s.part === 3) { cue.innerHTML = ''; notes.classList.add('hidden'); }
    if (s.k === 'say') {
      await examinerSays(s.t); if (st.idx === my) next();
    } else if (s.k === 'q') {
      await examinerSays(s.t); if (st.idx === my) beginAnswer(s, s.t);
    } else if (s.k === 'prep') {
      cue.innerHTML = cueHTML(plan.card); notes.classList.remove('hidden');
      etext.textContent = 'Here is your topic. You have one minute to prepare.';
      sstat.textContent = '📝 Preparation time – make notes if you wish';
      nextBtn.disabled = false; nextBtn.textContent = "I'm ready ▶";
      st.ansTimer = countdown(s.secs, l => { stimer.textContent = fmtTime(l); }, () => { if (st.idx === my) next(); });
    } else if (s.k === 'talk') {
      await examinerSays(s.t); if (st.idx === my) beginAnswer(s, plan.card.title + ' (' + plan.card.bullets.join('; ') + '; ' + plan.card.explain + ')');
    } else if (s.k === 'end') {
      cue.innerHTML = ''; notes.classList.add('hidden');
      await examinerSays(s.t); if (st.idx === my) finish();
    }
  }
  function finish() {
    if (st.done) return; st.done = true;
    endAnswer(); st.token.cancelled = true; TTS.cancel();
    sstat.textContent = 'Finishing…'; nextBtn.disabled = true;
    setTimeout(() => { // give the recogniser a moment to deliver the last words
      st.recOn = false; try { rec && rec.stop(); } catch (e) { }
      const answers = st.answers.map(a => ({ part: a.part, q: a.q, text: a.text, secs: Math.round(((a.end || Date.now()) - a.start) / 1000) }));
      const done = url => {
        if (stream) stream.getTracks().forEach(t => t.stop());
        const id = saveResult({ section: 'speaking', band: null, answers, card: plan.card.title, transcript: !!SR });
        speakingResults(id, url);
      };
      if (recorder && recorder.state !== 'inactive') {
        recorder.onstop = () => done(chunks.length ? URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })) : null);
        recorder.stop();
      } else done(null);
    }, 1800);
  }
}

function speakingMetrics(answers) {
  const by = p => answers.filter(a => a.part === p);
  const wcount = t => (t.match(/[A-Za-z']+/g) || []).length;
  const all = answers.map(a => a.text).join(' ');
  const totalW = wcount(all), totalS = answers.reduce((s, a) => s + a.secs, 0);
  const wpm = totalS ? totalW / (totalS / 60) : 0;
  const toks = all.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
  const fillers = (all.toLowerCase().match(/\b(um+|uh+|er+m?|hmm+|ah+)\b/g) || []).length;
  const avg = arr => arr.length ? arr.reduce((s, a) => s + wcount(a.text), 0) / arr.length : 0;
  const p1 = avg(by(1)), p3 = avg(by(3));
  const p2a = by(2)[0]; const p2w = p2a ? wcount(p2a.text) : 0, p2s = p2a ? p2a.secs : 0;
  const longPct = toks.length ? toks.filter(x => x.length >= 7).length / toks.length * 100 : 0;
  const items = [];
  const add = (label, value, level, note) => items.push({ label, value, level, note });
  if (!totalW) {
    add('Transcript', 'empty', 'bad', 'No speech was transcribed (recognition unavailable, blocked, or nothing was said). Use your recording and the descriptors to assess yourself.');
    return { items, totalW };
  }
  add('Speaking rate', Math.round(wpm) + ' words/min', wpm >= 110 ? 'good' : wpm >= 80 ? 'ok' : 'bad', 'Counted over your answer time, including pauses. Natural fluent speech is usually 120–160 wpm; under ~80 suggests frequent pausing.');
  add('Part 1 – average answer length', Math.round(p1) + ' words', p1 >= 30 ? 'good' : p1 >= 15 ? 'ok' : 'bad', 'Good Part 1 answers are 2–4 sentences (≈ 30–60 words): answer, reason, example.');
  add('Part 2 – long turn', `${p2w} words in ${fmtTime(p2s)}`, (p2s >= 100 && p2w >= 180) ? 'good' : (p2s >= 60 && p2w >= 100) ? 'ok' : 'bad', 'You should keep talking for close to the full 2 minutes (≈ 200–300 words). Stopping early limits Fluency & Coherence.');
  add('Part 3 – average answer length', Math.round(p3) + ' words', p3 >= 50 ? 'good' : p3 >= 25 ? 'ok' : 'bad', 'Part 3 needs developed answers: opinion, explanation, example, maybe a contrast (≈ 50–100 words).');
  add('Vocabulary variety (MATTR)', mattr(toks).toFixed(2), mattr(toks) >= 0.7 ? 'good' : mattr(toks) >= 0.62 ? 'ok' : 'bad', 'Proportion of different words per 50-word stretch. Speech is naturally more repetitive than writing.');
  add('Longer words (7+ letters)', Math.round(longPct) + '%', longPct >= 14 ? 'good' : longPct >= 9 ? 'ok' : 'bad', 'Rough sign of less common vocabulary.');
  add('Fillers transcribed (um, er…)', fillers, fillers <= 3 ? 'ok' : 'bad', 'Speech recognition usually deletes fillers, so the real number is probably higher. Listen to your recording.');
  return { items, totalW };
}
function speakingPrompt(r) {
  const wc = t => (t.match(/[A-Za-z']+/g) || []).length;
  const parts = [1, 2, 3].map(p => `--- Part ${p} ---\n` + r.answers.filter(a => a.part === p).map(a =>
    `Examiner: ${a.q}\nCandidate (${a.secs} s, ${wc(a.text)} words${a.secs ? ', ' + Math.round(wc(a.text) / (a.secs / 60)) + ' wpm' : ''}): ${a.text || '(nothing transcribed)'}`).join('\n\n')).join('\n\n');
  return `You are a senior, certified IELTS Speaking examiner. Below is an automatic speech-recognition transcript of a candidate's full IELTS Speaking test (Parts 1–3). Assess it strictly and honestly, exactly as an official examiner would, using the public IELTS Speaking band descriptors. Do not inflate scores.

Important limitations:
- This is a machine transcript: punctuation is missing or wrong, some words may be mis-recognised, and hesitation sounds (um, er) have usually been deleted. Take this into account and do not penalise obvious recognition errors.
- You cannot hear the candidate, so do NOT give a Pronunciation band. Instead, tell the candidate what to listen for in their own recording.
- The time and words-per-minute figures for each answer are included to help you judge fluency and length. Times include pauses.

Please give:
1. A whole-number band (0–9) for Fluency and Coherence, Lexical Resource, and Grammatical Range and Accuracy, each with 2–3 sentences of justification quoting the candidate's words.
2. A list of grammar and vocabulary errors with corrections.
3. Improved Band 7–8 versions of three of the weakest answers.
4. The 5 most important things this candidate should work on.

Write all feedback in Arabic, but keep quotations, corrections and model answers in English. End with a summary line: FC x, LR x, GRA x.

=== TRANSCRIPT ===
${parts}`;
}
function speakingResults(id, audioUrl) {
  cleanup();
  const r = getResult(id); if (!r) return home();
  const m = speakingMetrics(r.answers);
  const prompt = speakingPrompt(r);
  app.innerHTML = topbar() + `<main class="page narrow">
    <div class="bandhero"><div class="bandnum" id="sBand">${fmtBand(r.band)}</div><div><div class="bh-title">Speaking band</div>
      <div class="bh-sub" id="sSub">${r.band == null ? 'Not assessed yet – follow steps 1–4 below.' : 'Average of the four criteria'}</div></div></div>
    <h2>Step 1 · Listen to yourself</h2>
    ${audioUrl ? `<audio controls src="${audioUrl}" class="player"></audio><div class="actions"><a class="btn" href="${audioUrl}" download="ielts-speaking-${new Date().toISOString().slice(0, 10)}.webm">Download recording</a></div>
      <p class="muted small">The recording is only kept until you leave this page. Download it if you want to keep it or share it with a teacher.</p>`
      : '<p class="muted">The recording is only available straight after the test.</p>'}
    <h2>Step 2 · Measured indicators</h2>
    ${indicatorsHTML(m)}
    <h2>Step 3 · Examiner-style assessment</h2>
    <p>Copy this prompt and paste it into <a href="https://claude.ai/new" target="_blank" rel="noopener">Claude</a> or another AI assistant. It includes the full transcript with timings. Pronunciation cannot be judged from text – assess it yourself from the recording, or ask a teacher to listen.</p>
    <div class="actions"><button class="btn primary" id="copyPrompt">Copy examiner prompt</button><a class="btn" href="https://claude.ai/new" target="_blank" rel="noopener">Open Claude ↗</a></div>
    <details class="promptbox"><summary>Show prompt</summary><pre>${esc(prompt)}</pre></details>
    <h2>Step 4 · Enter the criterion bands</h2>
    ${criteriaHTML('', ['FC', 'SLR', 'SGRA', 'P'], r.crit)}
    <div class="actions"><button class="btn primary" id="saveBand">Calculate & save Speaking band</button><span id="saveMsg" class="muted"></span></div>
    <h2>Transcript</h2>
    ${[1, 2, 3].map(p => `<details class="transcript" ${p === 1 ? 'open' : ''}><summary>Part ${p}</summary>${r.answers.filter(a => a.part === p).map(a => `<div class="qa"><div class="qq">${esc(a.q)}</div><div class="aa">${esc(a.text) || '<span class="muted">(nothing transcribed)</span>'} <span class="muted small">· ${a.secs}s</span></div></div>`).join('')}</details>`).join('')}
    <div class="actions">${nextButtons()}</div>
  </main>`;
  $('#copyPrompt').onclick = e => copyText(prompt, e.target);
  $('#saveBand').onclick = () => {
    const c = {}; let missing = false;
    ['FC', 'SLR', 'SGRA', 'P'].forEach(k => { const v = $(`[data-crit="${k}"]`).value; if (v === '') missing = true; c[k] = +v; });
    if (missing) { $('#saveMsg').textContent = 'Please choose a band for all 4 criteria.'; return; }
    const avg = (c.FC + c.SLR + c.SGRA + c.P) / 4; const band = roundBand(avg);
    updateResult(id, { crit: c, band });
    $('#sBand').textContent = fmtBand(band); $('#sSub').textContent = `Average ${avg.toFixed(2)} → ${fmtBand(band)}`;
    $('#saveMsg').textContent = 'Saved ✓'; window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

/* =====================================================================
   FULL TEST SUMMARY
   ===================================================================== */
function summaryView() {
  cleanup();
  const ids = (session && session.ids) || {};
  const b = {}; SECTIONS.forEach(k => { const r = ids[k] && getResult(ids[k]); b[k] = r ? r.band : null; });
  const ov = overall(b);
  app.innerHTML = topbar() + `<main class="page narrow">
    <h1>Full test result</h1>
    <div class="bandrow big">
      ${SECTIONS.map(k => `<div class="bandcell"><div class="bc-label">${NAMES[k]}</div><div class="bc-val">${fmtBand(b[k])}</div>
        ${b[k] == null && ids[k] && (k === 'writing' || k === 'speaking') ? `<button class="btn sm" data-open="${ids[k]}">Assess</button>` : ''}</div>`).join('')}
      <div class="bandcell overall"><div class="bc-label">Overall</div><div class="bc-val">${fmtBand(ov)}</div></div>
    </div>
    ${ov == null ? '<p class="alert">The overall band appears once Writing and Speaking have been assessed (enter their criterion bands on their result pages – you can also do this later from History).</p>' : ''}
    <p class="muted small">Overall band = average of the four sections, rounded to the nearest half band.</p>
    <div class="actions"><button class="btn" data-go="summary">Refresh</button><button class="btn primary" data-go="home">Home</button></div>
  </main>`;
}

/* =====================================================================
   ROUTING
   ===================================================================== */
function startSection(k) {
  ({ listening: startListening, reading: startReading, writing: startWriting, speaking: startSpeaking })[k]();
}
app.addEventListener('click', e => {
  const g = e.target.closest('[data-go]');
  if (g) {
    e.preventDefault();
    const v = g.dataset.go;
    if (v === 'home') home(); else if (v === 'history') historyView(); else if (v === 'about') aboutView(); else if (v === 'summary') summaryView();
    return;
  }
  const s = e.target.closest('[data-start]');
  if (s) {
    const k = s.dataset.start;
    if (k === 'full') { session = { queue: ['reading', 'writing', 'speaking'], ids: {} }; startSection('listening'); }
    else { session = null; startSection(k); }
    return;
  }
  if (e.target.closest('[data-next]') && session && session.queue.length) { startSection(session.queue.shift()); return; }
  const o = e.target.closest('[data-open]');
  if (o) { const r = getResult(o.dataset.open); if (!r) return; if (r.section === 'writing') writingResults(r.id); else if (r.section === 'speaking') speakingResults(r.id, null); }
});

home();
})();
