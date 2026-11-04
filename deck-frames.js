// Frame content for the zooming presentation. Each frame is drawn at 1600 × 900.
// stage = where the slide sits in the story (tracker, top right)
// qs    = which of the three questions the slide uses (badges, bottom left)
// pill  = what students do now (bottom right)
(function () {
  // ---------- helpers ----------
  function rnd(seed) { let s = seed; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }
  function roughEllipse(cx, cy, rx, ry, seed = 1, wobble = 0.04) {
    const r = rnd(seed), pts = [], n = 28, start = r() * Math.PI * 2;
    for (let i = 0; i <= n + 3; i++) {
      const a = start + (i / n) * Math.PI * 2, k = 1 + (r() - 0.5) * wobble * 2;
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
      d += ` Q${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)}`;
    }
    return d;
  }
  const ico = (n) => `<svg class="ico" viewBox="${ICONS[n].vb}" fill="currentColor" aria-hidden="true">${ICONS[n].d}</svg>`;
  const ic = (n, v = "blue") => `<span class="ic ${v}">${ico(n)}</span>`;
  const photo = (name) => `<img class="photo" src="${name}.jpg" alt="" onerror="this.remove()">`;
  const scene = (name, cls = "", rot = 0) =>
    `<figure class="scene ${cls}" style="--r:${rot}deg">${window.SCENES(name)}${photo(name)}<i class="tape"></i></figure>`;
  const arrow = (w, h, cls = "") =>
    `<svg class="sk ${cls}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="ink" d="M6,${h - 8} C${w * 0.35},${h * 0.2} ${w * 0.7},${h * 0.15} ${w - 14},10"/><path class="ink" d="M${w - 40},6 L${w - 12},10 L${w - 22},36"/></svg>`;
  const underline = (w) =>
    `<svg class="sk ink-u" viewBox="0 0 ${w} 24" width="${w}" height="24" fill="none" stroke-width="4" stroke-linecap="round" aria-hidden="true"><path class="ink" d="M4,16 C${w * 0.3},6 ${w * 0.6},20 ${w - 4},9"/></svg>`;

  // chat rows with avatars
  const me = (t, cls = "") => `<div class="row me">${`<div class="bubble me ${cls}">${t}</div>`}<span class="av av-me">${ico("FaUser")}</span></div>`;
  const ai = (t, cls = "", who = "AI", icon = "FaRobot") =>
    `<div class="row ai"><span class="av ${who === "AI" ? "av-ai" : "av-boss"}">${ico(icon)}</span><div class="bubble ai ${cls}"><span class="who">${who}</span>${t}</div></div>`;
  const boss = (t, cls = "") => ai(t, cls, "Interviewer", "FaUserTie");

  // ---------- poll / quiz frames ----------
  function activityFrame(id) {
    const a = window.ACTIVITIES[id];
    const isQuiz = a.type === "quiz";
    const rows = isQuiz
      ? a.questions.map((q, i) => `<li class="res-row"><div class="res-text"><span class="qn">${i + 1}</span>${q.short}</div><div class="res-bar"><span></span></div><div class="res-pct"></div></li>`).join("")
      : a.options.map((o) => `<li class="res-row"><div class="res-text">${o}</div><div class="res-bar"><span></span></div><div class="res-pct"></div></li>`).join("");
    return `
      <div class="act" data-activity="${id}" data-type="${a.type}">
        <div class="act-left">
          <div class="qr-wrap"><div class="qr" data-qr="${id}"></div><span class="qr-badge">${ico("FaMobileAlt")}</span></div>
          <p class="scan">Scan with your phone, or open the link in the chat</p>
          <p class="url" data-url="${id}"></p>
          <button class="copy-link" type="button" data-copy="${id}">${ico("FaLink")}<span>Copy link for the chat</span></button>
          <p class="anon">${ico("FaLock")} Anonymous. No names collected.</p>
        </div>
        <div class="act-right">
          <p class="kind">${ic(isQuiz ? "FaCheckCircle" : "FaPoll", isQuiz ? "yellow" : "blue")}<span class="hand">${isQuiz ? "Quiz" : "Poll"}</span></p>
          <h2 class="act-q">${isQuiz ? a.title + `<span class="sub">${a.questions.length} quick questions. Your phone tells you if you’re right.</span>` : a.question}</h2>
          <ul class="res ${isQuiz ? "quiz" : "poll"}">${rows}</ul>
          <p class="count">${ico("FaUsers")}<span></span></p>
          ${isQuiz ? `<p class="hint hand">Results show when everyone’s done.</p>` : ""}
        </div>
      </div>`;
  }

  // ---------- frames ----------
  const F = {};
  F.f1 = { dark: true, stage: "study", pill: ["write", "Write it down: 45 sec"], html: `
    <h2 class="w900">Your reflection is due in 20 minutes.</h2>
    <div class="f1-asks">
      <p class="who-line">${ic("FaUserTie", "white")}<span>Your lecturer asks:</span></p>
      <p class="big">What did you do?</p>
      <p class="big">What would you change next time?</p>
    </div>
    ${scene("fair", "f1-scene", 1.4)}
    <div class="sticky f1-sticky"><p class="sticky-t">${ico("FaPencilAlt")} My first request to AI</p><i class="ln2"></i><i class="ln2"></i></div>` };

  F.f2 = { pill: ["poll", "Poll coming up"], html: `
    <h2>Today’s plan</h2>
    <div class="stops">
      <div class="stop">${ic("FaGraduationCap", "blue xl")}<div><p class="n">1</p><h3>Study</h3><p>A university assignment</p></div></div>
      <div class="stop">${ic("FaFileAlt", "blue xl")}<div><p class="n">2</p><h3>Apply</h3><p>Your first internship application</p></div></div>
      <div class="stop">${ic("FaHotel", "blue xl")}<div><p class="n">3</p><h3>Work</h3><p>Your first task at work</p></div></div>
    </div>
    <p class="muted">Ask every time:</p>
    <div class="qcards">
      <div class="qcard">${ic("FaUnlockAlt", "yellow lg")}<p>What help is allowed?</p></div>
      <div class="qcard">${ic("FaPenNib", "yellow lg")}<p>What part should I do myself?</p></div>
      <div class="qcard">${ic("FaSearch", "yellow lg")}<p>How will I check the answer?</p></div>
    </div>
    <p class="hand plan-note">Listen for these three.</p>` };

  F.f3 = { stage: "study", qs: ["allowed", "check"], pill: ["think", "Think: 45 sec"], html: `
    <h2>What does “reflect” mean?</h2>
    <div class="cols">
      <div class="col chat">
        <p class="thought">${ico("FaQuoteLeft")} I know what happened. I’m unsure what my lecturer wants me to write.</p>
        ${me("What does ‘reflect’ mean? Can you give me a simple example?")}
        ${ai("You gave a presentation. The students at the back couldn’t read your slide. Next time, you’d use bigger letters.")}
      </div>
      <div class="col">
        <div class="pl grey">${ic("FaListUl", "grey")}<div><span class="tag">Describes</span><p>“I gave a presentation.”</p></div></div>
        <div class="pl">${ic("FaLightbulb", "yellow")}<div><span class="tag">Reflects</span><p><b>“Next time, I’ll use bigger letters so everyone can read my slide.”</b></p></div></div>
        <p class="muted mt">Your turn, about the fair:</p>
        <p class="frame-line">${ico("FaPencilAlt")}<span class="hand">I noticed …</span></p>
        <p class="frame-line">${ico("FaPencilAlt")}<span class="hand">Next time, I would …</span></p>
      </div>
    </div>` };

  F.f4 = { stage: "study", qs: ["mine"], pill: ["chat", "Type it in the chat"], html: `
    <h2>Would you submit this?</h2>
    <div class="cols">
      <div class="col chat">
        ${me("Write a reflection for me.")}
        ${ai("I led the team and learned to manage a large event.", "xl")}
      </div>
      <div class="col center">
        ${ic("FaSearch", "yellow huge")}
        <p class="hand xl">Which words can you support?</p>
        <p class="lead">Pick one phrase you’d question.</p>
      </div>
    </div>` };

  F.f5 = { stage: "study", qs: ["mine"], pill: ["think", "Think: 50 sec"], html: `
    <h2>Ask for one question</h2>
    <div class="cols">
      <div class="col chat">
        ${me("Ask me one question about the fair. Wait for my answer.")}
        ${ai("What did visitors keep asking you?")}
        ${me("They wanted to know where to register.")}
        <p class="done">${ic("FaCheck", "blue sm")} Close the chat. Now I write.</p>
      </div>
      <div class="col">
        <p class="muted">Try two sentences:</p>
        <p class="frame-line">${ico("FaPencilAlt")}<span class="hand">That day, I …</span></p>
        <p class="frame-line">${ico("FaPencilAlt")}<span class="hand">Next time, I’d …</span></p>
        <div class="chain">
          <div>${ic("FaRobot", "ink lg")}<p>AI asks</p></div>${arrow(80, 44)}
          <div>${ic("FaLightbulb", "yellow lg")}<p>I think</p></div>${arrow(80, 44)}
          <div>${ic("FaPenNib", "blue lg")}<p>I write</p></div>
        </div>
      </div>
    </div>` };

  F.f6 = { stage: "study", pill: ["timer", "11 minutes"], html: `
    <h2>Your turn: try it on your own work</h2>
    <div class="steps">
      <div class="step">${ic("FaClipboardList", "blue lg")}<p class="hand num">1</p><h3>Pick a task</h3><p>A real task due in the next week or two.</p></div>
      <div class="step">${ic("FaUnlockAlt", "blue lg")}<p class="hand num">2</p><h3>Answer two questions</h3><p>What help is allowed? What part is mine?</p></div>
      <div class="step">${ic("FaPaperPlane", "blue lg")}<p class="hand num">3</p><h3>Write one request</h3><p>Get help without AI doing your part.</p></div>
    </div>
    <div class="slips">
      <p class="slip r1">${ico("FaQuoteLeft")}Explain … with a simple example.</p>
      <p class="slip r2">${ico("FaQuoteLeft")}Ask me one question and wait for my answer.</p>
      <p class="slip r3">${ico("FaQuoteLeft")}Tell me what’s unclear. Don’t rewrite it.</p>
    </div>
    <p class="foot"><b>No task?</b> Write 100 words about a group project: what went well, what you’d change.</p>` };

  F.f7 = { stage: "study", qs: ["check"], pill: ["chat", "Type one way to check"], html: `
    <h2>It sounds sure. Is it true?</h2>
    <div class="cols">
      <div class="col chat">
        ${me("Give me a source that shows signs help visitors at events.")}
        <div class="index-card"><span class="who">${ico("FaRobot")} AI</span><p>Tan, M. (2021). <i>Wayfinding at campus events.</i> Journal of Student Event Studies, 12(3), 45–58.</p><p class="hand stamp">looks real?</p></div>
      </div>
      <div class="col center">
        ${scene("library", "s-md", -1.2)}
        <p class="big">How would you check this?</p>
      </div>
    </div>` };

  F.f8 = { stage: "study", qs: ["allowed"], pill: ["write", "Write your AI note: 60 sec"], html: `
    <h2>Say how you used AI</h2>
    <div class="cols">
      <div class="col">
        <div class="doc">
          <p class="doc-title">${ico("FaFileAlt")} Reflection: University club fair</p>
          <i class="ln" style="width:92%"></i><i class="ln" style="width:84%"></i><i class="ln" style="width:90%"></i><i class="ln" style="width:60%"></i>
          <div class="ai-note"><span class="who">${ico("FaRobot")} AI note</span>“I used AI to explain what ‘reflect’ means and to ask me one question about the fair. I wrote the reflection myself.”</div>
        </div>
      </div>
      <div class="col">
        <p class="big">Where are the rules for your course?</p>
        <div class="irow">${ic("FaBook", "blue")}<p>Course outline</p></div>
        <div class="irow">${ic("FaLaptop", "blue")}<p>Course page on your learning platform</p></div>
        <div class="irow">${ic("FaComments", "blue")}<p>Ask your lecturer. It’s a normal question.</p></div>
      </div>
    </div>` };

  F.f10 = { stage: "apply", qs: ["mine"], pill: ["think", "One sentence: 40 sec"], html: `
    <h2>Your first internship application</h2>
    <div class="cols">
      <div class="col">
        <div class="form">
          <div class="form-head">${ico("FaHotel")} Hotel internship, Bangkok</div>
          <p class="form-q">Tell us about a time you helped someone.</p>
          <div class="form-field"><i class="cursor"></i></div>
          <span class="form-btn">Submit</span>
        </div>
        <p class="hand">Could the fair answer this?</p>
      </div>
      <div class="col">
        ${scene("hotel", "s-sm", 1.2)}
        <p class="big">It says “someone.”</p>
        <p class="lead">A visitor at your club fair counts.</p>
      </div>
    </div>` };

  F.f11 = { stage: "apply", qs: ["check"], pill: ["poll", "Vote on the next slide"], html: `
    <h2>Which sentence could you explain?</h2>
    <div class="ab">
      <div class="ab-col"><div class="slip big-slip r1"><span class="letter">A</span>“I managed guest services for a major event.”</div>${boss("What did you manage?")}</div>
      <div class="ab-col"><div class="slip big-slip r2"><span class="letter">B</span>“I welcomed visitors and showed them where to register.”</div>${boss("What did visitors need help with?")}</div>
    </div>` };

  F.f12 = { stage: "apply", qs: ["check"], html: `
    <h2>Practise one interview question</h2>
    <p class="prompt">${ico("FaRobot")} “Pretend you’re interviewing me for a hotel internship. Ask one question about the fair. Wait for my answer.”</p>
    <div class="f12">
      <div class="dialogue">
        ${boss("How did you know visitors needed help?")}
        ${me("Several visitors came up to us and asked where to register.")}
        ${boss("How many people did you help?")}
        ${me("I didn’t count, so I don’t know the exact number. It was busy most of the morning.", "honest")}
      </div>
      <div class="f12-side">${scene("interview", "s-sm", 1)}<div class="honest-note"><p class="hand">An honest answer</p>${arrow(160, 80, "flip")}</div></div>
    </div>` };

  F.f13 = { stage: "apply", pill: ["timer", "8 minutes"], rule: "If you don’t know, say so.", html: `
    <h2>Practise with an AI interviewer</h2>
    <div class="cols">
      <div class="col">
        <div class="chatwin">
          <div class="chatwin-bar">${ico("FaRobot")} AI interviewer</div>
          <div class="chatwin-body">
            ${me("Pretend you’re interviewing me for a hotel internship. Ask one question at a time.")}
            ${boss("Tell me about a time you helped someone.")}
            ${me("At our club fair, I showed visitors where to register.")}
          </div>
        </div>
      </div>
      <div class="col">
        <div class="step-row">${ic("FaRobot", "blue")}<div><h3>Ask AI to interview you</h3><p>“Pretend you’re interviewing me for a hotel internship. Ask one question at a time and wait for my answer.”</p></div></div>
        <div class="step-row">${ic("FaUser", "blue")}<div><h3>Answer two questions</h3><p>Use your sentence from the last slide. Be honest about what you did.</p></div></div>
        <div class="step-row">${ic("FaSearch", "blue")}<div><h3>Check and improve</h3><p>Ask: “Was any part of my answer unclear?” Then improve one answer.</p></div></div>
      </div>
    </div>` };

  F.f14 = { stage: "work", qs: ["allowed"], pill: ["chat", "Type yes or no"], html: `
    <h2>A guest is waiting</h2>
    <div class="cols">
      <div class="col">
        <div class="msg">
          <p class="msg-title">${ico("FaEnvelope")} Guest message</p>
          <p class="msg-row"><span>Name</span><i class="redact"></i>${ico("FaLock")}</p>
          <p class="msg-row"><span>Phone</span><i class="redact"></i>${ico("FaLock")}</p>
          <p class="msg-row"><span>Booking no.</span><i class="redact"></i>${ico("FaLock")}</p>
          <p class="msg-body">“My room wasn’t ready when I arrived.”</p>
        </div>
        <p class="lead">Your supervisor asks you to draft a reply.</p>
      </div>
      <div class="col">
        ${scene("reception", "s-sm", -1.2)}
        <p class="big">Would you paste the whole message into AI?</p>
      </div>
    </div>` };

  F.f15 = { stage: "work", qs: ["allowed"], pill: ["chat", "Type the letters you’d keep out"], html: `
    <h2>What stays out of the chat?</h2>
    <div class="grid6">
      ${[["A", "FaFileAlt", "Your own draft paragraph"], ["B", "FaPhone", "A guest’s phone number"], ["C", "FaIdCard", "Your student ID number"],
         ["D", "FaCommentAlt", "A made-up complaint for practice"], ["E", "FaUserFriends", "A classmate’s name and their feedback on your group"], ["F", "FaClipboardList", "Your lecturer’s assignment instructions"]]
        .map(([l, i, t], k) => `<div class="slip tile r${(k % 3) + 1}"><div class="tile-top"><span class="letter">${l}</span>${ic(i, "blue sm")}</div>${t}</div>`).join("")}
    </div>` };

  F.f16 = { stage: "work", qs: ["check"], pill: ["chat", "Type the words you’d check"], html: `
    <h2>Can you promise that?</h2>
    <div class="cols">
      <div class="col">
        <div class="draft"><span class="who">${ico("FaRobot")} Draft reply from AI</span><p>“We’re sorry you had to wait. We’ll give you a free night.”</p></div>
      </div>
      <div class="col center">
        ${ic("FaGift", "yellow huge")}
        <p class="big">Who agreed to the free night?</p>
      </div>
    </div>
    <div class="story">
      <p class="muted">The story so far</p>
      <div class="story-row">
        <p class="slip r1">${ic("FaGraduationCap", "blue sm")}At uni: “I led the team”</p>
        <p class="slip r2">${ic("FaBook", "blue sm")}A source: “Tan (2021)”</p>
        <p class="slip r3">${ic("FaHotel", "blue sm")}At work: ?</p>
      </div>
    </div>` };

  F.f17 = { stage: "wrap", qs: ["allowed", "mine", "check"], pill: ["write", "Rewrite: 60 sec"], html: `
    <h2>What would you type now?</h2>
    <div class="cols">
      <div class="col">
        <div class="f17-art">${scene("desk", "s-md", -1.2)}<span class="clock-badge">${ico("FaClock")}<b>20 min</b></span></div>
        <p class="lead">Back to the start: your reflection is due.</p>
      </div>
      <div class="col">
        <div class="sticky grey"><p class="sticky-t">My first request</p><i class="ln2"></i><i class="ln2"></i></div>
        <p class="hand down">${ico("FaArrowDown")} rewrite it</p>
        <div class="sticky"><p class="sticky-t">${ico("FaPencilAlt")} My new request</p><i class="ln2"></i><i class="ln2"></i></div>
        <p class="lead">What will you do yourself? What will you ask for?</p>
      </div>
    </div>` };

  F.f18 = { dark: true, pill: ["ask", "Your questions"], html: `
    <h2>Before you open AI</h2>
    <div class="qcards dark3">
      <div class="qcard">${ic("FaUnlockAlt", "yellow lg")}<p>What help is allowed?</p></div>
      <div class="qcard">${ic("FaPenNib", "yellow lg")}<p>What part should I do myself?</p></div>
      <div class="qcard">${ic("FaSearch", "yellow lg")}<p>How will I check the answer?</p></div>
    </div>
    <p class="muted mt">Requests to keep</p>
    <div class="keep">
      <p>${ico("FaQuoteLeft")}Explain … with a simple example.</p><p>${ico("FaQuoteLeft")}Ask me one question and wait for my answer.</p>
      <p>${ico("FaQuoteLeft")}Make my sentence clearer. Keep the facts the same.</p><p>${ico("FaQuoteLeft")}Was any part of my answer unclear?</p>
    </div>` };

  const ACT_STAGE = { poll1: null, quiz1: "study", poll2: "apply", quiz2: "work", poll3: null };
  Object.keys(ACT_STAGE).forEach((id) => {
    F[id] = { html: activityFrame(id), activity: id, stage: ACT_STAGE[id], pill: ["scan", window.ACTIVITIES[id].type === "quiz" ? "Scan to answer" : "Scan to vote"] };
  });

  // ---------- countdown timers (seconds), from the presenter script ----------
  const TIMERS = { f1: 45, f3: 45, f4: 45, f5: 50, f6: 660, f7: 45, f8: 60, f10: 40, f13: 480,
    f14: 30, f15: 60, f16: 30, f17: 60, f18: 180, poll1: 45, quiz1: 120, poll2: 30, quiz2: 120, poll3: 45 };
  Object.entries(TIMERS).forEach(([id, secs]) => { if (F[id]) F[id].timer = secs; });
  F.f18.pill = ["ask", "Your questions"];
  const fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  // ---------- slide chrome ----------
  const STAGES = [["study", "FaGraduationCap", "Study"], ["apply", "FaFileAlt", "Apply"], ["work", "FaHotel", "Work"]];
  const QS = [["allowed", "FaUnlockAlt", "Allowed?"], ["mine", "FaPenNib", "Mine?"], ["check", "FaSearch", "Check?"]];
  const PILL = { think: "FaLightbulb", write: "FaPencilAlt", chat: "FaCommentDots", poll: "FaPoll", timer: "FaStopwatch", scan: "FaQrcode", ask: "FaQuestionCircle" };
  function chrome(def) {
    let h = "";
    if (def.stage) {
      const idx = { study: 0, apply: 1, work: 2, wrap: 3 }[def.stage];
      h += `<div class="tracker">${STAGES.map(([k, icn, l], i) => `<div class="tk ${i === idx ? "cur" : i < idx ? "past" : ""}">${ico(icn)}<span>${l}</span></div>`).join('<i class="tk-line"></i>')}</div>`;
    }
    if (def.qs) h += `<div class="qs">${QS.map(([k, icn, l]) => `<div class="qb ${def.qs.includes(k) ? "on" : ""}">${ic(icn, def.qs.includes(k) ? "blue sm" : "off sm")}<span>${l}</span></div>`).join("")}</div>`;
    if (def.rule) h += `<p class="rule">${ico("FaStar")} Rule: ${def.rule}</p>`;
    if (def.pill && def.timer) {
      h += `<div class="timer-box">
        <button class="pl-reset" type="button" aria-label="Reset timer" title="Reset timer">${ico("FaUndo")}</button>
        <button class="pill timer-pill p-${def.pill[0]} idle" type="button" data-secs="${def.timer}" aria-label="Start ${fmt(def.timer)} timer">
          ${ico(PILL[def.pill[0]])}<span class="pl-label">${def.pill[1]}</span><span class="pl-time">${fmt(def.timer)}</span>
          <span class="pl-act">${ico("FaPlay")}<b>Start</b></span><i class="pl-prog"></i>
        </button></div>`;
    } else if (def.pill) h += `<div class="pill p-${def.pill[0]}">${ico(PILL[def.pill[0]])}<span>${def.pill[1]}</span></div>`;
    return h;
  }

  window.DECK = { F, roughEllipse, chrome, ico, ic, scene, fmt };
})();
