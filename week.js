// Divya ❤️ Smit — Valentine Week dashboard
// Unlock window: Feb 7–14, 2026
// Locking uses Asia/Kolkata date (not device timezone)

const DAYS = [
  { id: "d1", date: "2026-02-07", title: "Rose Day",       label: "One small key 🔑",     type: "code" },
  { id: "d2", date: "2026-02-08", title: "Propose Day",    label: "Pick one",            type: "choose" },
  { id: "d3", date: "2026-02-09", title: "Chocolate Day",  label: "A slider truth",      type: "slider" },
  { id: "d4", date: "2026-02-10", title: "Teddy Day",      label: "A soft letter",       type: "letter" },
  { id: "d5", date: "2026-02-11", title: "Promise Day",    label: "3 tiny promises",     type: "checks" },
  { id: "d6", date: "2026-02-12", title: "Hug Day",        label: "Memory reveal",       type: "reveal" },
  { id: "d7", date: "2026-02-13", title: "Kiss Day",       label: "One question",        type: "question" },
  { id: "d8", date: "2026-02-14", title: "Valentine’s Day",label: "Final unlock ✨",      type: "final" },
];

function getKolkataYMD() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const obj = Object.fromEntries(parts.filter(p => p.type !== "literal").map(p => [p.type, p.value]));
  return `${obj.year}-${obj.month}-${obj.day}`; // YYYY-MM-DD
}

const TODAY_YMD = getKolkataYMD();

const grid = document.getElementById("grid");
const backdrop = document.getElementById("backdrop");
const closeBtn = document.getElementById("closeBtn");
const mTitle = document.getElementById("mTitle");
const mText = document.getElementById("mText");
const mBody = document.getElementById("mBody");

function unlockedByDate(dateStr) {
  // ISO strings compare lexicographically correctly for YYYY-MM-DD
  return TODAY_YMD >= dateStr;
}

function fmt(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
}

// Optional: progression lock (must complete previous day)
function isCompleted(id) {
  return localStorage.getItem(`done_${id}`) === "1";
}
function canOpen(index) {
  if (!unlockedByDate(DAYS[index].date)) return false;
  if (index === 0) return true;
  return isCompleted(DAYS[index - 1].id);
}
function markDone(id) { localStorage.setItem(`done_${id}`, "1"); }

function renderCards() {
  grid.innerHTML = "";
  DAYS.forEach((d, i) => {
    const locked = !canOpen(i);
    const card = document.createElement("div");
    card.className = "daycard" + (locked ? " locked" : "");

    const badge = locked ? "🔒" : (isCompleted(d.id) ? "✅" : "🔓");
    const hint = locked
      ? (!unlockedByDate(d.date) ? `Unlocks on ${fmt(d.date)}.` : `Finish ${fmt(DAYS[i-1].date)} first 🙂`)
      : (isCompleted(d.id) ? "Already opened. Still yours." : "Tap to open.");

    card.innerHTML = `
      <div class="date">${fmt(d.date)} · ${d.title}</div>
      <div class="label">${d.label}</div>
      <div class="hint">${hint}</div>
      <div class="lockbadge">${badge}</div>
    `;

    card.addEventListener("click", () => {
      if (locked) return;
      openDay(d);
    });

    grid.appendChild(card);
  });
}

function openModal(title, text, bodyHtml) {
  mTitle.textContent = title;
  mText.textContent = text;
  mBody.innerHTML = bodyHtml || "";
  backdrop.style.display = "flex";
}
function closeModal() {
  backdrop.style.display = "none";
  mBody.innerHTML = "";
  renderCards();
}

closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(); });

function openDay(d) {
  if (d.type === "code") {
    openModal(
      `${fmt(d.date)} · ${d.title}`,
      `Hi Divya. Small key first — answer this and today unlocks.`,
      `
        <input class="input" id="ans" placeholder="Type the secret…" />
        <div class="tiny" style="margin-top:8px;">Hint: a private nickname / first proper chat memory.</div>
        <div class="row"><button class="btn primary" id="go">Unlock</button></div>
        <div id="msg"></div>
      `
    );

    document.getElementById("go").onclick = () => {
      const v = (document.getElementById("ans").value || "").trim().toLowerCase();

      // CHANGE THIS:
      const SECRET = "change-this-to-your-inside-answer";

      if (v === SECRET) {
        markDone(d.id);
        document.getElementById("msg").innerHTML =
          `<div class="success">Unlocked ❤️<br><span class="tiny">I love how it’s always you. — Smit</span></div>`;
      } else {
        document.getElementById("msg").innerHTML = `<div class="warn">Not that 😄 Try again.</div>`;
      }
      renderCards();
    };
    return;
  }

  if (d.type === "choose") {
    openModal(
      `${fmt(d.date)} · ${d.title}`,
      `No pressure. Just choose what you want from me today.`,
      `
        <div class="row">
          <button class="btn primary" id="a">A calm voice note</button>
          <button class="btn primary" id="b">A bold message</button>
        </div>
        <div id="msg"></div>
      `
    );
    document.getElementById("a").onclick = () => {
      markDone(d.id);
      document.getElementById("msg").innerHTML =
        `<div class="success">Done.<br><span class="tiny">Now send her a voice note: “Divya, I’m proud of you. I’m with you.”</span></div>`;
      renderCards();
    };
    document.getElementById("b").onclick = () => {
      markDone(d.id);
      document.getElementById("msg").innerHTML =
        `<div class="success">Done.<br><span class="tiny">Now text her: “I choose you. Even on boring days.”</span></div>`;
      renderCards();
    };
    return;
  }

  if (d.type === "slider") {
    openModal(
      `${fmt(d.date)} · ${d.title}`,
      `Okay Divya… how much do you miss me today?`,
      `
        <input type="range" min="0" max="100" value="50" id="rng" style="width:100%;" />
        <div id="val" style="margin-top:10px;"></div>
        <div class="row"><button class="btn primary" id="done">Save</button></div>
      `
    );
    const val = document.getElementById("val");
    const rng = document.getElementById("rng");
    const render = () => {
      const n = Number(rng.value);
      let msg = "Hmm.";
      if (n <= 20) msg = "Liar 🙂";
      else if (n <= 60) msg = "Acceptable.";
      else if (n <= 90) msg = "Good. I miss you too.";
      else msg = "That’s my girl. ❤️";
      val.innerHTML = `<div class="success">${n}% — ${msg}</div>`;
    };
    rng.oninput = render; render();

    document.getElementById("done").onclick = () => { markDone(d.id); closeModal(); };
    return;
  }

  if (d.type === "letter") {
    openModal(
      `${fmt(d.date)} · ${d.title}`,
      `Open this when you’re alone for 2 minutes.`,
      `
        <div class="success">
          Divya,<br><br>
          (Replace this with your 8–12 lines. Specific. Real.)<br><br>
          — Smit
        </div>
        <div class="row"><button class="btn primary" id="done">I read it</button></div>
      `
    );
    document.getElementById("done").onclick = () => { markDone(d.id); closeModal(); };
    return;
  }

  if (d.type === "checks") {
    openModal(
      `${fmt(d.date)} · ${d.title}`,
      `Tiny promises. Only what we can actually keep.`,
      `
        <label><input type="checkbox" class="ck" /> I’ll speak gently even when I’m stressed.</label><br>
        <label><input type="checkbox" class="ck" /> I’ll make time, not excuses.</label><br>
        <label><input type="checkbox" class="ck" /> I’ll keep choosing you.</label>
        <div class="row"><button class="btn primary" id="done" disabled>Seal it</button></div>
      `
    );
    const btn = document.getElementById("done");
    const cks = Array.from(document.querySelectorAll(".ck"));
    const check = () => { btn.disabled = !cks.every(c => c.checked); };
    cks.forEach(c => (c.onchange = check));
    btn.onclick = () => { markDone(d.id); closeModal(); };
    return;
  }

  if (d.type === "reveal") {
    openModal(
      `${fmt(d.date)} · ${d.title}`,
      `Tap to reveal.`,
      `
        <div class="row">
          <button class="btn primary rv">Memory 1</button>
          <button class="btn primary rv">Memory 2</button>
          <button class="btn primary rv">Memory 3</button>
        </div>
        <div id="msg"></div>
      `
    );
    const msgs = [
      "(Replace with a real memory 1)",
      "(Replace with a real memory 2)",
      "(Replace with a real memory 3)",
    ];
    const out = document.getElementById("msg");
    Array.from(document.querySelectorAll(".rv")).forEach((b, i) => {
      b.onclick = () => { out.innerHTML = `<div class="success">${msgs[i]}</div>`; };
    });

    // Completing this day just by opening keeps it non-annoying
    markDone(d.id);
    renderCards();
    return;
  }

  if (d.type === "question") {
    openModal(
      `${fmt(d.date)} · ${d.title}`,
      `One question. Answer honestly.`,
      `
        <div class="success">
          “What’s one thing I can do that would make you feel loved this week?”
        </div>
        <div class="tiny" style="margin-top:10px;">Reply to Smit with one line. That’s the game.</div>
        <div class="row"><button class="btn primary" id="done">Done</button></div>
      `
    );
    document.getElementById("done").onclick = () => { markDone(d.id); closeModal(); };
    return;
  }

  // final
  openModal(
    `${fmt(d.date)} · ${d.title}`,
    `You made it. Final unlock.`,
    `
      <div class="success">
        Divya,<br><br>
        (Final message here.)<br><br>
        Add: your video link / playlist link / gift link.<br><br>
        — Smit
      </div>
      <div class="row"><button class="btn primary" id="done">Finish ❤️</button></div>
    `
  );
  document.getElementById("done").onclick = () => { markDone(d.id); closeModal(); };
}

renderCards();
