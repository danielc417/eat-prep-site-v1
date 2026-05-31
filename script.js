let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let selectedChapter = null;

let currentFlashcards = [];
let flashcardIndex = 0;
let flashcardShowingDefinition = false;
let selectedAnswerIndexes = new Set();
let lastQuizOrders = {};
let lastAnswerOrders = {};

let quizReview = [];

let stats = JSON.parse(localStorage.getItem("emtStats")) || {
  answered: 0,
  correct: 0
};
let todayStats = getTodayStats();

let missedQuestions = JSON.parse(localStorage.getItem("missedQuestions")) || [];
let username = localStorage.getItem("emtUsername") || "";
let currentStreak = username
  ? Number(localStorage.getItem(getStreakKey(username))) || Number(localStorage.getItem("emtStreak")) || 0
  : 0;
let leaderboard = JSON.parse(localStorage.getItem("emtLeaderboard")) || [];

const chapterList = document.getElementById("chapter-list");

function setupUsername() {
  const modal = document.getElementById("username-modal");
  const form = document.getElementById("username-form");
  const input = document.getElementById("username-input");

  input.value = username;
  updateUsernameGreeting();

  if (!username) {
    showUsernameModal();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const enteredUsername = input.value.trim();
    if (!enteredUsername) return;

    username = enteredUsername;
    localStorage.setItem("emtUsername", username);
    currentStreak = Number(localStorage.getItem(getStreakKey(username))) || 0;
    updateUsernameGreeting();
    updateStreak();
    updateLeaderboard();
    modal.classList.add("hidden");
  });
}

function showUsernameModal() {
  const modal = document.getElementById("username-modal");
  const input = document.getElementById("username-input");

  input.value = username;
  modal.classList.remove("hidden");
  input.focus();
}

function getStreakKey(name) {
  return `emtStreak:${name.trim().toLowerCase()}`;
}

function getTodayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getTodayStats() {
  const savedStats = JSON.parse(localStorage.getItem("emtTodayStats")) || {};
  const todayKey = getTodayKey();

  if (savedStats.date === todayKey) {
    return savedStats;
  }

  return {
    date: todayKey,
    answered: 0,
    correct: 0,
    missed: 0
  };
}

function saveTodayStats() {
  localStorage.setItem("emtTodayStats", JSON.stringify(todayStats));
}

function saveCurrentStreak() {
  if (username) {
    localStorage.setItem(getStreakKey(username), currentStreak);
  }

  localStorage.setItem("emtStreak", currentStreak);
}

function updateUsernameGreeting() {
  const greeting = document.getElementById("user-greeting");
  if (!greeting) return;

  greeting.textContent = username ? `Welcome back, ${username}` : "";
}

function loadChapters() {
  chapterList.innerHTML = "";

  chapters.forEach((chapter) => {
    const card = document.createElement("div");
    card.className = "chapter-card";
    card.onclick = () => startChapterQuiz(chapter.id);

    const chapterQuestions = questionBank.filter((question) => {
      return question.chapter === chapter.id;
    });

    card.innerHTML = `
      <p>Chapter ${chapter.id} • ${chapterQuestions.length} questions</p>
      <h3>${chapter.title}</h3>
      <p>${chapter.description}</p>
    `;

    chapterList.appendChild(card);
  });
}

function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");

  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");

  if (screenId === "missed-screen") {
    loadMissedQuestions();
  }

  if (screenId === "flashcards-screen") {
    loadFlashcards();
  }

  if (screenId === "home-screen") {
    updateStats();
    updateStreak();
  }

  if (screenId === "ranking-screen") {
    loadRanking();
  }
}

function startQuickQuiz(amount = 10) {
  selectedChapter = null;

  currentQuestions = prepareQuestionsForQuiz(questionBank, `quick-${amount}`, amount);

  startQuiz();
}

function startChapterQuiz(chapterId) {
  selectedChapter = chapterId;

  const chapterQuestions = questionBank.filter((question) => {
    return question.chapter === chapterId;
  });

  currentQuestions = prepareQuestionsForQuiz(chapterQuestions, `chapter-${chapterId}`);
  startQuiz();
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  quizReview = [];
  showScreen("quiz-screen");
  showQuestion();
}

function showQuestion() {
  const question = currentQuestions[currentIndex];
  selectedAnswerIndexes = new Set();
  const isMultiAnswer = Array.isArray(question.correct);

  document.getElementById("quiz-progress").textContent =
    `Question ${currentIndex + 1} of ${currentQuestions.length}`;

  document.getElementById("progress-fill").style.width =
    `${((currentIndex + 1) / currentQuestions.length) * 100}%`;

  document.getElementById("question-topic").textContent = question.topic;
  document.getElementById("question-text").textContent = question.question;

  const existingImage = document.getElementById("question-image");
  if (existingImage) {
    existingImage.remove();
  }

  if (question.image) {
    const image = document.createElement("img");
    image.id = "question-image";
    image.className = "question-image";
    image.src = question.image;
    image.alt = question.imageAlt || "";
    document.getElementById("question-text").after(image);
  }

  const answerOptions = document.getElementById("answer-options");
  answerOptions.innerHTML = "";

  document.getElementById("feedback-box").classList.add("hidden");

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.onclick = () => {
      if (isMultiAnswer) {
        toggleMultiAnswer(index);
      } else {
        selectAnswer(index);
      }
    };
    answerOptions.appendChild(button);
  });

  if (isMultiAnswer) {
    const submitButton = document.createElement("button");
    submitButton.id = "submit-multi-answer";
    submitButton.className = "primary-btn hidden";
    submitButton.textContent = "Submit Answers";
    submitButton.onclick = submitMultiAnswer;
    answerOptions.appendChild(submitButton);
  }
}

function selectAnswer(selectedIndex) {
  gradeAnswer([selectedIndex]);
}

function toggleMultiAnswer(index) {
  const buttons = document.querySelectorAll(".answer-btn");
  const submitButton = document.getElementById("submit-multi-answer");

  if (selectedAnswerIndexes.has(index)) {
    selectedAnswerIndexes.delete(index);
    buttons[index].classList.remove("selected");
  } else {
    selectedAnswerIndexes.add(index);
    buttons[index].classList.add("selected");
  }

  submitButton.classList.toggle("hidden", selectedAnswerIndexes.size === 0);
}

function submitMultiAnswer() {
  gradeAnswer(Array.from(selectedAnswerIndexes));
}

function gradeAnswer(selectedIndexes) {
  const question = currentQuestions[currentIndex];
  const buttons = document.querySelectorAll(".answer-btn");
  const submitButton = document.getElementById("submit-multi-answer");
  const correctIndexes = Array.isArray(question.correct)
    ? question.correct
    : [question.correct];
  const isCorrect = sameAnswers(selectedIndexes, correctIndexes);

  quizReview.push({
    question: question.question,
    topic: question.topic,
    chapter: question.chapter,
    selectedAnswer: formatAnswers(question.answers, selectedIndexes),
    correctAnswer: formatAnswers(question.answers, correctIndexes),
    isCorrect,
    explanation: question.explanation
  });

  buttons.forEach((button) => {
    button.disabled = true;
  });

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add("hidden");
  }

  stats.answered++;
  todayStats.answered++;

  if (isCorrect) {
    score++;
    stats.correct++;
    todayStats.correct++;
    currentStreak++;
    updateLeaderboard();

    correctIndexes.forEach((index) => {
      buttons[index].classList.add("correct");
    });
    document.getElementById("feedback-title").textContent = "Correct";
  } else {
    currentStreak = 0;

    selectedIndexes.forEach((index) => {
      if (!correctIndexes.includes(index)) {
        buttons[index].classList.add("wrong");
      }
    });

    correctIndexes.forEach((index) => {
      buttons[index].classList.add("correct");
    });
    document.getElementById("feedback-title").textContent = "Not quite";

    saveMissedQuestion(question);
    todayStats.missed++;
  }

  localStorage.setItem("emtStats", JSON.stringify(stats));
  saveTodayStats();
  saveCurrentStreak();

  updateStats();
  updateStreak();

  document.getElementById("feedback-text").textContent = question.explanation;
  document.getElementById("feedback-box").classList.remove("hidden");
}

function sameAnswers(selectedIndexes, correctIndexes) {
  if (selectedIndexes.length !== correctIndexes.length) return false;

  const selected = [...selectedIndexes].sort((a, b) => a - b);
  const correct = [...correctIndexes].sort((a, b) => a - b);

  return selected.every((index, position) => index === correct[position]);
}

function formatAnswers(answers, indexes) {
  return [...indexes]
    .sort((a, b) => a - b)
    .map((index) => answers[index])
    .join("; ");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function saveMissedQuestion(question) {
  const alreadySaved = missedQuestions.some((missed) => {
    return missed.question === question.question;
  });

  if (!alreadySaved) {
    missedQuestions.push(question);
    localStorage.setItem("missedQuestions", JSON.stringify(missedQuestions));
  }
}

function loadMissedQuestions() {
  const missedScreen = document.getElementById("missed-screen");

  if (missedQuestions.length === 0) {
    missedScreen.innerHTML = `
      <div class="empty-card">
        <h2>Missed Questions</h2>
        <p>You have no missed questions yet. Take a quiz and missed answers will show up here.</p>
      </div>
    `;
    return;
  }

  missedScreen.innerHTML = `
    <h2 class="section-title">Missed Questions</h2>
    <div class="missed-list">
      ${missedQuestions.map((item) => `
        <div class="missed-card">
          <p class="missed-topic">Chapter ${item.chapter} • ${item.topic}</p>
          <h3>${item.question}</h3>
          <p><strong>Answer:</strong> ${formatAnswers(item.answers, Array.isArray(item.correct) ? item.correct : [item.correct])}</p>
          <p>${item.explanation}</p>
        </div>
      `).join("")}
    </div>

    <button class="secondary-btn" onclick="clearMissedQuestions()">
      Clear Missed Questions
    </button>
  `;
}

function clearMissedQuestions() {
  missedQuestions = [];
  localStorage.removeItem("missedQuestions");
  loadMissedQuestions();
  updateStats();
}

function nextQuestion() {
  currentIndex++;

  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  showScreen("results-screen");

  const percent = Math.round((score / currentQuestions.length) * 100);

  document.getElementById("result-score").textContent =
    `${score} out of ${currentQuestions.length} correct (${percent}%)`;

  let message = "";

  if (percent >= 90) {
    message = "Solid work. You’re looking strong on this section.";
  } else if (percent >= 70) {
    message = "Good job. Review the ones you missed and run it again.";
  } else {
    message = "Keep practicing. Focus on the explanations after each answer.";
  }

  document.getElementById("result-message").textContent = message;
}

function restartQuiz() {
  if (selectedChapter) {
    startChapterQuiz(selectedChapter);
  } else {
    startQuickQuiz(currentQuestions.length);
  }
}

function goHome() {
  showScreen("home-screen");
}

function prepareQuestionsForQuiz(questions, quizKey, amount = questions.length) {
  let randomizedQuestions = shuffleArray(questions).slice(0, amount);
  const questionOrder = randomizedQuestions.map((question) => question.question).join("|");

  if (randomizedQuestions.length > 1 && lastQuizOrders[quizKey] === questionOrder) {
    randomizedQuestions = rotateUntilNewOrder(
      randomizedQuestions,
      (items) => items.map((question) => question.question).join("|"),
      [lastQuizOrders[quizKey]]
    );
  }

  lastQuizOrders[quizKey] = randomizedQuestions
    .map((question) => question.question)
    .join("|");

  return randomizedQuestions.map((question) => shuffleQuestionAnswers(question));
}

function shuffleQuestionAnswers(question) {
  const correctIndexes = Array.isArray(question.correct)
    ? question.correct
    : [question.correct];

  let answerPairs = question.answers.map((answer, index) => ({
    answer,
    originalIndex: index
  }));

  answerPairs = shuffleArray(answerPairs);

  const originalOrder = question.answers.join("|");
  const answerOrder = answerPairs.map((pair) => pair.answer).join("|");
  const questionKey = question.question;

  if (
    answerPairs.length > 1 &&
    (answerOrder === originalOrder || lastAnswerOrders[questionKey] === answerOrder)
  ) {
    answerPairs = rotateUntilNewOrder(
      answerPairs,
      (items) => items.map((pair) => pair.answer).join("|"),
      [originalOrder, lastAnswerOrders[questionKey]]
    );
  }

  lastAnswerOrders[questionKey] = answerPairs
    .map((pair) => pair.answer)
    .join("|");

  const shuffledAnswers = answerPairs.map((pair) => pair.answer);
  const shuffledCorrectIndexes = answerPairs
    .map((pair, index) => correctIndexes.includes(pair.originalIndex) ? index : null)
    .filter((index) => index !== null);

  return {
    ...question,
    answers: shuffledAnswers,
    correct: Array.isArray(question.correct) ? shuffledCorrectIndexes : shuffledCorrectIndexes[0]
  };
}

function rotateArray(array) {
  return [...array.slice(1), array[0]];
}

function rotateUntilNewOrder(array, getSignature, blockedSignatures) {
  const blocked = blockedSignatures.filter(Boolean);
  let rotated = [...array];

  for (let attempt = 0; attempt < array.length; attempt++) {
    rotated = rotateArray(rotated);

    if (!blocked.includes(getSignature(rotated))) {
      return rotated;
    }
  }

  return array;
}

function shuffleArray(array) {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temporaryItem = newArray[i];
    newArray[i] = newArray[randomIndex];
    newArray[randomIndex] = temporaryItem;
  }

  return newArray;
}

function loadFlashcards() {

  const select = document.getElementById("flashcard-chapter-select");

  const selectedValue = select.value;

  let flashcardSet = [];

  if (selectedValue === "all") {

    flashcardSet = flashcards;

  } else {

    flashcardSet = flashcards.filter((card) => {

      return card.chapter === Number(selectedValue);

    });

  }

  currentFlashcards = shuffleArray(flashcardSet);

  flashcardIndex = 0;

  flashcardShowingDefinition = false;

  showFlashcard();

}

function showFlashcard() {
  if (currentFlashcards.length === 0) {
    document.getElementById("flashcard-label").textContent = "No cards";
    document.getElementById("flashcard-text").textContent = "No flashcards found.";
    return;
  }

  const card = currentFlashcards[flashcardIndex];

  document.getElementById("flashcard-label").textContent =
    flashcardShowingDefinition ? "Definition" : `Chapter ${card.chapter} Term`;

  document.getElementById("flashcard-text").textContent =
    flashcardShowingDefinition ? card.definition : card.term;
}

function flipFlashcard() {
  flashcardShowingDefinition = !flashcardShowingDefinition;
  showFlashcard();
}

function nextFlashcard() {
  if (currentFlashcards.length === 0) return;

  flashcardIndex++;

  if (flashcardIndex >= currentFlashcards.length) {
    flashcardIndex = 0;
  }

  flashcardShowingDefinition = false;
  showFlashcard();
}

function previousFlashcard() {
  if (currentFlashcards.length === 0) return;

  flashcardIndex--;

  if (flashcardIndex < 0) {
    flashcardIndex = currentFlashcards.length - 1;
  }

  flashcardShowingDefinition = false;
  showFlashcard();
}

function showReview() {
  showScreen("review-screen");

  const reviewList = document.getElementById("review-list");

  reviewList.innerHTML = quizReview.map((item, index) => {
    return `
      <div class="review-card ${item.isCorrect ? "review-correct" : "review-wrong"}">
        <p class="review-topic">Question ${index + 1} • Chapter ${item.chapter} • ${item.topic}</p>
        <h3>${item.question}</h3>

        <p><strong>Your answer:</strong> ${item.selectedAnswer}</p>
        <p><strong>Correct answer:</strong> ${item.correctAnswer}</p>
        <p>${item.explanation}</p>
      </div>
    `;
  }).join("");
}

function updateStats() {
  const totalAnswered = document.getElementById("total-answered");
  const accuracyRate = document.getElementById("accuracy-rate");
  const missedCount = document.getElementById("missed-count");
  const todayAnswered = document.getElementById("today-answered");
  const todayAccuracyRate = document.getElementById("today-accuracy-rate");
  const todayMissedCount = document.getElementById("today-missed-count");

  if (
    !totalAnswered ||
    !accuracyRate ||
    !missedCount ||
    !todayAnswered ||
    !todayAccuracyRate ||
    !todayMissedCount
  ) return;

  todayStats = getTodayStats();

  const accuracy = stats.answered === 0
    ? 0
    : Math.round((stats.correct / stats.answered) * 100);
  const todayAccuracy = todayStats.answered === 0
    ? 0
    : Math.round((todayStats.correct / todayStats.answered) * 100);

  totalAnswered.textContent = stats.answered;
  accuracyRate.textContent = `${accuracy}%`;
  missedCount.textContent = missedQuestions.length;
  todayAnswered.textContent = todayStats.answered;
  todayAccuracyRate.textContent = `${todayAccuracy}%`;
  todayMissedCount.textContent = todayStats.missed;
}

function updateStreak() {
  const streakBadge = document.querySelector(".streak-badge");

  if (!streakBadge) return;

  streakBadge.textContent = `🔥 ${currentStreak}`;
}

function updateLeaderboard() {
  if (!username) return;

  const existingEntry = leaderboard.find((entry) => {
    return entry.username.toLowerCase() === username.toLowerCase();
  });

  if (existingEntry) {
    existingEntry.username = username;
    existingEntry.bestStreak = Math.max(existingEntry.bestStreak, currentStreak);
  } else {
    leaderboard.push({
      username,
      bestStreak: currentStreak
    });
  }

  leaderboard = leaderboard
    .sort((first, second) => second.bestStreak - first.bestStreak)
    .slice(0, 5);

  localStorage.setItem("emtLeaderboard", JSON.stringify(leaderboard));
  loadRanking();
}

function loadRanking() {
  const rankingList = document.getElementById("ranking-list");
  if (!rankingList) return;

  if (leaderboard.length === 0) {
    rankingList.innerHTML = `
      <div class="empty-card">
        <h2>No rankings yet</h2>
        <p>Answer questions correctly to start a streak.</p>
      </div>
    `;
    return;
  }

  rankingList.innerHTML = leaderboard.map((entry, index) => {
    return `
      <div class="ranking-card">
        <div class="ranking-place">#${index + 1}</div>
        <div>
          <p class="ranking-name">${escapeHtml(entry.username)}</p>
          <p class="ranking-label">Best correct streak</p>
        </div>
        <div class="ranking-streak">${entry.bestStreak}</div>
      </div>
    `;
  }).join("");
}

setupUsername();
loadChapters();
updateStats();
updateStreak();
loadRanking();
