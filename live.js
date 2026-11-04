// Live results through Firebase Realtime Database. Does nothing when config.firebase is null.
(function () {
  const cfg = window.SESSION_CONFIG || {};
  const enabled = !!(cfg.firebase && cfg.firebase.databaseURL);
  const clean = (v) => String(v || "class-1").replace(/[^A-Za-z0-9_-]/g, "-");
  const base = clean(cfg.sessionId);
  const OVERRIDE = "ai-session-reset";
  // Session in use: the one in the student's link, otherwise the presenter's latest reset, otherwise config.js.
  let session = base;
  const fromLink = new URLSearchParams(location.search).get("s");
  if (fromLink) session = clean(fromLink);
  else {
    try { const o = JSON.parse(localStorage.getItem(OVERRIDE) || "null"); if (o && o.base === base && o.id) session = clean(o.id); } catch (e) {}
  }
  const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  let dbPromise = null;

  function load(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src; s.onload = resolve; s.onerror = () => reject(new Error("Could not load " + src));
      document.head.appendChild(s);
    });
  }
  function db() {
    if (!enabled) return Promise.resolve(null);
    if (!dbPromise) {
      dbPromise = load(SDK + "firebase-app-compat.js")
        .then(() => load(SDK + "firebase-database-compat.js"))
        .then(() => { firebase.initializeApp(cfg.firebase); return firebase.database(); })
        .catch((e) => { console.error(e); return null; });
    }
    return dbPromise;
  }
  const path = (activity) => `sessions/${session}/${activity}`;

  window.Live = {
    enabled,
    session,
    // Start a fresh, empty set of results for every poll and quiz. Old answers stay in Firebase but are no longer shown.
    resetAll() {
      const d = new Date(), p = (n) => String(n).padStart(2, "0");
      const id = `${base}-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
      try { localStorage.setItem(OVERRIDE, JSON.stringify({ base, id })); } catch (e) { return false; }
      return true;
    },
    async submit(activity, answers) {
      const d = await db();
      if (!d) return false;
      await d.ref(path(activity)).push({ answers, t: firebase.database.ServerValue.TIMESTAMP });
      return true;
    },
    async listen(activity, callback) {
      const d = await db();
      if (!d) return false;
      d.ref(path(activity)).on("value", (snap) => {
        const v = snap.val() || {};
        callback(Object.values(v).map((r) => r.answers || []));
      });
      return true;
    }
  };
})();
