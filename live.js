// Live results through Firebase Realtime Database. Does nothing when config.firebase is null.
(function () {
  const cfg = window.SESSION_CONFIG || {};
  const enabled = !!(cfg.firebase && cfg.firebase.databaseURL);
  const session = String(cfg.sessionId || "class-1").replace(/[^A-Za-z0-9_-]/g, "-");
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
