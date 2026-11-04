// Session settings. This is the only file you need to edit.
window.SESSION_CONFIG = {
  // Your GitHub Pages address, for example "https://rawal-karim.github.io/ai-session/".
  // Leave it empty and the QR codes use the address the slides are opened from,
  // which is right whenever you present from GitHub Pages.
  siteUrl: "https://rawal-karim.github.io/ai-session/",

  // Change this before each new class so the results start from zero.
  // Letters, numbers and hyphens only.
  sessionId: "class-2",

  // Countdown timers. false = each timer waits for you to click Start (or press T).
  // true = the timer starts by itself a moment after you arrive on the slide.
  autoStartTimers: false,

  // Play a soft chime when a timer reaches zero.
  timerSound: true,

  // Paste your Firebase web app config here to see live results on the slides
  // (see README.md, "Turn on live results"). Leave it as null to run without live results:
  // students can still answer, and quizzes still mark their answers, but nothing is collected.
  firebase: {
    apiKey: "AIzaSyCALkmVjN4i-kHOTSF042_a26GysA0t14s",
    authDomain: "ai-session-87fb8.firebaseapp.com",
    databaseURL: "https://ai-session-87fb8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ai-session-87fb8",
    storageBucket: "ai-session-87fb8.firebasestorage.app",
    messagingSenderId: "44307718306",
    appId: "1:44307718306:web:b112c592debe8b672e77fb"
  }
};
