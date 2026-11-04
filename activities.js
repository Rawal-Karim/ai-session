// Polls and quizzes used in the session. Students see these on join.html.
window.ACTIVITIES = {
  poll1: {
    type: "poll",
    title: "Quick poll",
    question: "Which is closest to how you use AI right now?",
    options: ["To explain things", "To check my writing", "To write things for me", "I don’t use it yet"]
  },
  quiz1: {
    type: "quiz",
    title: "Part 1 check",
    questions: [
      {
        q: "Your lecturer says AI may explain the task. Which request fits that rule?",
        short: "Which request fits the rule?",
        options: ["“Write my reflection for me.”", "“Explain what ‘reflect’ means with a simple example.”", "“Make my reflection sound more impressive.”"],
        correct: 1,
        explain: "Asking AI to explain the task is allowed here. Writing the reflection is your part."
      },
      {
        q: "AI gives you a source with an author, a year, a journal and page numbers. What do you do first?",
        short: "AI gives you a source. What first?",
        options: ["Use it. The details show it’s real.", "Ask AI whether the source is real.", "Search for it yourself and read it."],
        correct: 2,
        explain: "AI can invent sources that look perfect. If you can’t find it yourself, don’t use it."
      },
      {
        q: "AI wrote “I led the team”, but you helped visitors at the entrance. What do you do?",
        short: "AI wrote “I led the team”. Fix?",
        options: ["Keep it. It sounds better.", "Change it to what you actually did.", "Ask AI to make it sound even stronger."],
        correct: 1,
        explain: "Only write what you can explain if someone asks you about it."
      }
    ]
  },
  poll2: {
    type: "poll",
    title: "Which sentence would you send?",
    question: "Which sentence would you send?",
    options: ["A. “I managed guest services for a major event.”", "B. “I welcomed visitors and showed them where to register.”"]
  },
  quiz2: {
    type: "quiz",
    title: "Work check",
    questions: [
      {
        q: "Which of these should stay out of an AI chat?",
        short: "What stays out of the chat?",
        options: ["A made-up complaint for practice", "A guest’s phone number", "Your own draft paragraph"],
        correct: 1,
        explain: "A phone number belongs to a real person. Keep it out, or use a made-up example."
      },
      {
        q: "AI’s draft reply offers the guest a free night. What do you do?",
        short: "AI offers a free night. What now?",
        options: ["Send it. Guests like free nights.", "Check with your supervisor before offering anything.", "Change it to two free nights."],
        correct: 1,
        explain: "Only your supervisor can say what the hotel can offer."
      },
      {
        q: "An interviewer asks how many people you helped. You didn’t count. What do you say?",
        short: "You didn’t count. What do you say?",
        options: ["“About a hundred.”", "“I didn’t count, but it was busy most of the morning.”", "Ask AI to guess a number for you."],
        correct: 1,
        explain: "It’s fine to say you don’t know. A made-up number is the same problem as “I led the team.”"
      }
    ]
  },
  poll3: {
    type: "poll",
    title: "Before you go",
    question: "Which question will you use first this week?",
    options: ["What help is allowed?", "What part should I do myself?", "How will I check the answer?"]
  }
};
