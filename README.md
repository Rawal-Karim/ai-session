# AI for Study, Work and Career: live online session

A zooming, Prezi-style presentation for a 90-minute online session in Google Meet, with no break and no breakout rooms.
Students join the polls and quizzes by scanning a QR code or clicking a link you paste in the Meet chat.
Everything runs on GitHub Pages. Live results on the slides are optional and use a free Firebase database.

| File | What it is |
|---|---|
| `index.html` | The presentation |
| `join.html` | The page students open from the QR code |
| `config.js` | Your settings: site address, class name, live results |
| `activities.js` | The poll and quiz questions |
| `notes.js` | Presenter notes (from the presenter script) |
| `database.rules.json` | Security rules for live results |
| `scenes.js` | The illustrations (the same student appears in every scene) |
| `icons.js` | The icons |
| `*.ttf`, `OFL-*.txt` | Fonts and their licences |
| `qrcode.js` | Makes the QR codes |

## 1. Put it on GitHub Pages (about 5 minutes)

1. Sign in to GitHub and create a new **public** repository, for example `ai-session`.
2. On the repository page, choose **Add file → Upload files**. Drag in everything from this folder
   (all files sit in one folder, so you can drag them in at once), then select **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   choose the `main` branch and the `/ (root)` folder, then **Save**.
4. After a minute or two, your site is live at `https://YOUR-USERNAME.github.io/ai-session/`.

Open that address to present. The QR codes use the address the slides are opened from, so they work
without any setup. If you present from a downloaded copy instead, put your site address in `siteUrl` in `config.js`.

## 2. Turn on live results (optional, about 10 minutes)

Without this step, students can still scan and answer, and quizzes still mark their answers on their phone,
but you won’t see results on the screen. With it, poll bars move as students vote, and quiz results
appear when you press **R**.

1. Go to <https://console.firebase.google.com>, select **Create a project**, and follow the steps
   (you can turn off Google Analytics).
2. In the left menu, open **Build → Realtime Database → Create database**. Pick a location near your
   students and start in **locked mode**.
3. Open the **Rules** tab, replace everything with the contents of `database.rules.json`, and **Publish**.
   These rules let students add answers but not change or delete anyone’s answers.
4. Open **Project settings** (the gear icon) → **Your apps** → the **</>** (web) button. Register the app
   with any nickname. Firebase shows a `firebaseConfig` block.
5. In `config.js`, replace `firebase: null` with those values, including `databaseURL`, for example:

   ```js
   firebase: {
     apiKey: "AIza...",
     authDomain: "ai-session-12345.firebaseapp.com",
     databaseURL: "https://ai-session-12345-default-rtdb.firebaseio.com",
     projectId: "ai-session-12345",
     appId: "1:1234:web:abcd"
   }
   ```

   If there’s no `databaseURL` in the block, copy it from the top of the Realtime Database page.
6. Upload the changed `config.js` to GitHub (**Add file → Upload files**).

The Firebase web config is meant to be public; the database rules are what protect the data.

## 3. Before each class

- Change `sessionId` in `config.js` (for example `class-2`) so the results start from zero.
- Open the site, scan one QR code with your own phone, and answer it to check everything works.
- After class you can delete the answers in the Firebase console (Realtime Database → Data).

## Reading the slides

Every slide uses the same signals, so students always know where they are and what to do:

- **Top right:** where we are in the story (Study, Apply, Work).
- **Bottom left:** which of the three questions this slide is about (Allowed? Mine? Check?).
- **Bottom right:** what students do now (think, type in the chat, scan, or an activity timer).
- **Chat bubbles:** the student’s messages are blue on the right; AI replies are white with a robot on the left.

## Presenting

| Key | Action |
|---|---|
| → or Space | Next (clickers work too) |
| ← | Previous |
| O | Back to the overview |
| R | Show or hide quiz results |
| T | Start or pause the slide timer |
| Shift + T | Reset the slide timer |
| N | Notes on this screen (for rehearsing) |
| P | Presenter view in a separate window |
| F | Full screen |

**Countdown timers:** slides with thinking time or an activity have a timer button in the bottom right
(for example “Think: 45 sec ▶ Start”). Click it, press **T**, or use **Start** in the presenter view.
The button turns into a large countdown, goes red for the last 10 seconds, and chimes at zero.
Click it again to pause. The round arrow next to it resets the timer.
If you move to another slide while a timer is running, a small timer stays in the top-left corner;
click it to jump back. This is handy during the activities.

To make timers start by themselves when you arrive on a slide, set `autoStartTimers: true` in `config.js`.
To change a timer’s length, edit the `TIMERS` list in `deck-frames.js` (times are in seconds).

**Presenter view:** press **P**, drag the new window to your own screen, and share only the slides window.
The presenter view shows the script for each step, what comes next, a timer, and Next / Previous /
Show results buttons that control the slides, plus the slide timer. It works when both windows are open from your GitHub Pages address.

Click any card in the overview to jump straight to it.

## Running it in Google Meet

- Share the slides tab: **Present now → A tab**. Open the presenter view (**P**) in a separate window that you don’t share.
- On every poll and quiz slide, click **Copy link for the chat** and paste the link into the Meet chat.
  Students can click it, or scan the QR code on screen with their phone.
- Free Google Meet has no polls or breakout rooms, which is why the polls run on this site and both activities are solo.
- **Time limit:** free Google accounts usually end group calls (3 or more people) at 60 minutes. If that applies to you,
  post a second Meet link after the Part 1 quiz (about minute 43) and ask everyone to switch. The notes remind you.

## Where the polls and quizzes are

| After | Activity | Time |
|---|---|---|
| Today’s plan | Poll: how do you use AI right now? | 1 min |
| Say how you used AI | Quiz: Part 1 check (3 questions) | 3 min |
| Which sentence could you explain? | Poll: which sentence would you send? | 1 min |
| Can you promise that? | Quiz: Work check (3 questions) | 3 min |
| Before you open AI | Poll: which question will you use first? | 3 min, with the close |

To fit the quizzes into 90 minutes, Activity 1 runs 11 minutes and Activity 2 (practise with an AI interviewer) runs 8,
compared with 14 and 11 in the PowerPoint. The timers on those slides are already set to match.

To change a question, edit `activities.js`. For quizzes, `correct` is the position of the right answer,
counting from 0.

## Privacy

Students don’t sign in and no names are collected. Each response stores only the chosen answers and a time.
A student’s phone remembers that they’ve answered, so the same phone can’t vote twice.

## Credits

Fonts: DM Sans and Caveat (SIL Open Font License, licences in `OFL-*.txt`). Icons: Font Awesome Free (CC BY 4.0). QR codes: qrcode-generator by Kazuhiko Arase (MIT).

## Optional photos

Each slide illustration can be swapped for a photo: upload a file with the
matching name next to index.html and it appears in place of the drawing, in black and white.

  fair.jpg       club fair registration desk (slides 1 and the overview)
  desk.jpg       student working on a laptop at night (overview, "What would you type now?")
  library.jpg    library or bookshelves ("It sounds sure. Is it true?")
  hotel.jpg      a hotel building ("Your first internship application")
  interview.jpg  a job interview ("Practise one interview question")
  reception.jpg  a hotel front desk ("A guest is waiting")

Use photos you have the right to use (your own, or from a free licence site such as Unsplash or Pexels).
Landscape photos (3:2) work best. Keep each file under about 500 KB so the slides load quickly.
Note: the drawings keep the same student (blue jumper) in every scene, which helps the story.
Photos lose that thread unless you use photos of the same person.
