import { db } from "./firebase-config.js";
import { chapters, questionBank, flashcards } from "./data/questions.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

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
let username = localStorage.getItem("emtAuthUsername") || "";
let currentStreak = username
  ? Number(localStorage.getItem(getStreakKey(username))) || Number(localStorage.getItem("emtStreak")) || 0
  : 0;
let leaderboard = JSON.parse(localStorage.getItem("emtLeaderboard")) || [];
let weeklyLeaderboard = JSON.parse(localStorage.getItem("emtWeeklyLeaderboard")) || [];
let currentAuthAction = "login";

const chapterList = document.getElementById("chapter-list");

function setupUsername() {
  const modal = document.getElementById("username-modal");
  const form = document.getElementById("username-form");
  const input = document.getElementById("username-input");
  const passwordInput = document.getElementById("password-input");

  input.value = username || localStorage.getItem("emtUsername") || "";
  updateUsernameGreeting();

  if (!username) {
    showUsernameModal();
  } else {
    loadUserProgress();
  }

  form.querySelectorAll("[data-auth-action]").forEach((button) => {
    button.addEventListener("click", () => {
      currentAuthAction = button.dataset.authAction;
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setLoginMessage("");

    const enteredUsername = input.value.trim();
    const enteredPassword = passwordInput.value;
    if (!enteredUsername || !enteredPassword) return;

    if (enteredPassword.length < 4) {
      setLoginMessage("Password must be at least 4 characters.");
      return;
    }

    const authSucceeded = currentAuthAction === "create"
      ? await createAccount(enteredUsername, enteredPassword)
      : await loginAccount(enteredUsername, enteredPassword);

    if (!authSucceeded) return;

    username = enteredUsername;
    localStorage.setItem("emtAuthUsername", username);
    localStorage.setItem("emtUsername", username);
    saveCurrentStreak();
    passwordInput.value = "";
    updateUsernameGreeting();
    updateStreak();
    updateLeaderboard();
    modal.classList.add("hidden");
  });

  document.getElementById("profile-menu").addEventListener("click", (event) => {
    if (event.target.id === "profile-menu") {
      closeProfileMenu();
    }
  });
}

function showUsernameModal() {
  const modal = document.getElementById("username-modal");
  const input = document.getElementById("username-input");
  const passwordInput = document.getElementById("password-input");

  input.value = username || localStorage.getItem("emtUsername") || "";
  passwordInput.value = "";
  setLoginMessage("");
  modal.classList.remove("hidden");
  input.focus();
}

async function createAccount(enteredUsername, enteredPassword) {
  try {
    const userRef = doc(db, "users", getUserId(enteredUsername));
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      setLoginMessage("That username already exists. Try logging in.");
      return false;
    }

    const passwordHash = await hashPassword(enteredPassword);
    await setDoc(userRef, {
      username: enteredUsername,
      usernameLower: enteredUsername.toLowerCase(),
      passwordHash,
      stats,
      todayStats,
      missedQuestions,
      currentStreak,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.warn("Could not create account.", error);
    setLoginMessage(`Could not create account: ${getErrorMessage(error)}`);
    return false;
  }
}

async function loginAccount(enteredUsername, enteredPassword) {
  try {
    const userRef = doc(db, "users", getUserId(enteredUsername));
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      setLoginMessage("No account found. Create an account first.");
      return false;
    }

    const passwordHash = await hashPassword(enteredPassword);
    const userData = snapshot.data();

    if (userData.passwordHash !== passwordHash) {
      setLoginMessage("Incorrect password.");
      return false;
    }

    loadProgressFromUserData(userData);
    return true;
  } catch (error) {
    console.warn("Could not log in.", error);
    setLoginMessage(`Could not log in: ${getErrorMessage(error)}`);
    return false;
  }
}

async function loadUserProgress() {
  if (!username) return;

  try {
    const snapshot = await getDoc(doc(db, "users", getUserId(username)));
    if (!snapshot.exists()) return;

    loadProgressFromUserData(snapshot.data());
  } catch (error) {
    console.warn("Could not load user progress.", error);
  }
}

function loadProgressFromUserData(userData) {
  stats = userData.stats || stats;
  todayStats = userData.todayStats?.date === getTodayKey()
    ? userData.todayStats
    : getTodayStats();
  missedQuestions = Array.isArray(userData.missedQuestions)
    ? userData.missedQuestions
    : [];
  currentStreak = Number(userData.currentStreak) || 0;

  localStorage.setItem("emtStats", JSON.stringify(stats));
  localStorage.setItem("emtTodayStats", JSON.stringify(todayStats));
  localStorage.setItem("missedQuestions", JSON.stringify(missedQuestions));
  saveCurrentStreak();
  updateStats();
  updateStreak();
}

async function saveUserProgress() {
  if (!username) return;

  try {
    await setDoc(doc(db, "users", getUserId(username)), {
      username,
      usernameLower: username.toLowerCase(),
      stats,
      todayStats,
      missedQuestions,
      currentStreak,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn("Could not save user progress.", error);
  }
}

function getStreakKey(name) {
  return `emtStreak:${name.trim().toLowerCase()}`;
}

function getUserId(name) {
  return encodeURIComponent(name.trim().toLowerCase());
}

async function hashPassword(password) {
  const encodedPassword = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedPassword);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function setLoginMessage(message) {
  const loginMessage = document.getElementById("login-message");
  if (!loginMessage) return;

  loginMessage.textContent = message;
}

function getErrorMessage(error) {
  if (error?.code === "permission-denied") {
    return "Firestore rules need to be updated and published.";
  }

  return error?.message || "check your connection and try again.";
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
  const trigger = document.getElementById("profile-trigger");
  const greeting = document.getElementById("user-greeting");
  const profileName = document.getElementById("profile-menu-name");
  if (!trigger || !greeting) return;

  trigger.classList.toggle("hidden", !username);
  greeting.textContent = username ? `Welcome back, ${username}` : "";

  if (profileName) {
    profileName.textContent = username;
  }

  updateProfileAvatar();
}

function toggleProfileMenu() {
  const profileMenu = document.getElementById("profile-menu");
  if (!profileMenu || !username) return;

  profileMenu.classList.toggle("hidden");
}

function closeProfileMenu() {
  const profileMenu = document.getElementById("profile-menu");
  if (!profileMenu) return;

  profileMenu.classList.add("hidden");
}

function getProfilePictureKey(name) {
  return `emtProfilePicture:${name.trim().toLowerCase()}`;
}

function getStoredProfilePicture(name) {
  return name ? localStorage.getItem(getProfilePictureKey(name)) : "";
}

function updateProfileAvatar() {
  const avatars = [
    document.getElementById("profile-avatar"),
    document.getElementById("profile-menu-avatar")
  ].filter(Boolean);

  const initials = username ? username.slice(0, 2).toUpperCase() : "?";
  const profilePicture = getStoredProfilePicture(username);

  avatars.forEach((avatar) => {
    avatar.textContent = initials;
    avatar.classList.toggle("has-image", Boolean(profilePicture));
    avatar.style.backgroundImage = profilePicture ? `url(${profilePicture})` : "";
  });
}

function updateProfilePicture(event) {
  const file = event.target.files?.[0];
  if (!file || !username) return;

  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem(getProfilePictureKey(username), reader.result);
    updateProfileAvatar();
  };
  reader.readAsDataURL(file);
}

function logoutUser() {
  username = "";
  currentStreak = 0;
  localStorage.removeItem("emtAuthUsername");
  localStorage.removeItem("emtUsername");
  closeProfileMenu();
  updateUsernameGreeting();
  updateStreak();
  showUsernameModal();
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
  if (screenId === "quiz-screen" && currentQuestions.length === 0) {
    startQuickQuiz(10);
    return;
  }

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
    loadWeeklyCorrectRanking();
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
    updateWeeklyCorrectLeaderboard();

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
  saveUserProgress();

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
  saveUserProgress();
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

function getWeekKey(date = new Date()) {
  const weekStart = new Date(date);
  const day = weekStart.getDay();
  const daysSinceMonday = (day + 6) % 7;
  weekStart.setDate(weekStart.getDate() - daysSinceMonday);
  weekStart.setHours(0, 0, 0, 0);

  const year = weekStart.getFullYear();
  const month = String(weekStart.getMonth() + 1).padStart(2, "0");
  const monthDay = String(weekStart.getDate()).padStart(2, "0");

  return `${year}-${month}-${monthDay}`;
}

async function updateLeaderboard() {
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

  try {
    const leaderboardRef = doc(db, "leaderboard", getLeaderboardId(username));
    const snapshot = await getDoc(leaderboardRef);
    const savedBestStreak = snapshot.exists() ? Number(snapshot.data().bestStreak) || 0 : 0;

    if (currentStreak > savedBestStreak) {
      await setDoc(leaderboardRef, {
        username,
        usernameLower: username.toLowerCase(),
        bestStreak: currentStreak,
        updatedAt: serverTimestamp()
      }, { merge: true });
    }

    await loadRanking();
  } catch (error) {
    console.warn("Could not sync leaderboard with Firestore.", error);
  }
}

async function updateWeeklyCorrectLeaderboard() {
  if (!username) return;

  const weekKey = getWeekKey();
  const existingEntry = weeklyLeaderboard.find((entry) => {
    return entry.username.toLowerCase() === username.toLowerCase();
  });

  if (existingEntry) {
    existingEntry.correctCount++;
    existingEntry.weekKey = weekKey;
  } else {
    weeklyLeaderboard.push({
      username,
      weekKey,
      correctCount: 1
    });
  }

  weeklyLeaderboard = weeklyLeaderboard
    .filter((entry) => entry.weekKey === weekKey)
    .sort((first, second) => second.correctCount - first.correctCount)
    .slice(0, 5);
  localStorage.setItem("emtWeeklyLeaderboard", JSON.stringify(weeklyLeaderboard));
  loadWeeklyCorrectRanking();

  try {
    const weeklyRef = doc(
      db,
      "weeklyCorrectLeaderboard",
      weekKey,
      "entries",
      getLeaderboardId(username)
    );
    const snapshot = await getDoc(weeklyRef);
    const savedCorrectCount = snapshot.exists() ? Number(snapshot.data().correctCount) || 0 : 0;

    await setDoc(weeklyRef, {
      username,
      usernameLower: username.toLowerCase(),
      correctCount: savedCorrectCount + 1,
      updatedAt: serverTimestamp()
    }, { merge: true });

    await loadWeeklyCorrectRanking();
  } catch (error) {
    console.warn("Could not sync weekly correct leaderboard with Firestore.", error);
  }
}

async function loadRanking() {
  const rankingList = document.getElementById("ranking-list");
  if (!rankingList) return;

  try {
    const leaderboardQuery = query(
      collection(db, "leaderboard"),
      orderBy("bestStreak", "desc"),
      limit(5)
    );
    const snapshot = await getDocs(leaderboardQuery);

    leaderboard = snapshot.docs.map((snapshotDoc) => {
      const data = snapshotDoc.data();

      return {
        username: data.username,
        bestStreak: Number(data.bestStreak) || 0
      };
    });

    localStorage.setItem("emtLeaderboard", JSON.stringify(leaderboard));
  } catch (error) {
    console.warn("Could not load Firestore leaderboard. Showing local scores.", error);
  }

  renderRankingList(
    rankingList,
    leaderboard,
    "bestStreak",
    "Best correct streak",
    "Answer questions correctly to start a streak."
  );
}

async function loadWeeklyCorrectRanking() {
  const weeklyRankingList = document.getElementById("weekly-ranking-list");
  if (!weeklyRankingList) return;

  const weekKey = getWeekKey();
  weeklyLeaderboard = weeklyLeaderboard.filter((entry) => entry.weekKey === weekKey);

  try {
    const weeklyQuery = query(
      collection(db, "weeklyCorrectLeaderboard", weekKey, "entries"),
      orderBy("correctCount", "desc"),
      limit(5)
    );
    const snapshot = await getDocs(weeklyQuery);

    weeklyLeaderboard = snapshot.docs
      .map((snapshotDoc) => {
        const data = snapshotDoc.data();

        return {
          username: data.username,
          correctCount: Number(data.correctCount) || 0
        };
      })
      .slice(0, 5);

    localStorage.setItem("emtWeeklyLeaderboard", JSON.stringify(weeklyLeaderboard));
  } catch (error) {
    console.warn("Could not load weekly correct leaderboard. Showing local scores.", error);
  }

  renderRankingList(
    weeklyRankingList,
    weeklyLeaderboard,
    "correctCount",
    "Correct this week",
    "Answer questions correctly this week to appear here."
  );
}

function renderRankingList(container, entries, scoreKey, label, emptyMessage) {
  if (entries.length === 0) {
    container.innerHTML = `
      <div class="empty-card">
        <h2>No rankings yet</h2>
        <p>${emptyMessage}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = entries.map((entry, index) => {
    const profilePicture = getStoredProfilePicture(entry.username);
    const initials = entry.username ? entry.username.slice(0, 2).toUpperCase() : "?";
    const medal = getRankingMedal(index);
    const avatarStyle = profilePicture
      ? ` style="background-image: url('${profilePicture}')"`
      : "";

    return `
      <div class="ranking-card">
        <div class="ranking-place ${medal.className}">${medal.label}</div>
        <div class="ranking-avatar ${profilePicture ? "has-image" : ""}"${avatarStyle}>${escapeHtml(initials)}</div>
        <div>
          <p class="ranking-name">${escapeHtml(entry.username)}</p>
          <p class="ranking-label">${label}</p>
        </div>
        <div class="ranking-streak">${entry[scoreKey]}</div>
      </div>
    `;
  }).join("");
}

function getRankingMedal(index) {
  const medals = [
    { label: "🥇", className: "ranking-gold" },
    { label: "🥈", className: "ranking-silver" },
    { label: "🥉", className: "ranking-bronze" }
  ];

  return medals[index] || {
    label: `#${index + 1}`,
    className: ""
  };
}

function getLeaderboardId(name) {
  return encodeURIComponent(name.trim().toLowerCase());
}

Object.assign(window, {
  clearMissedQuestions,
  flipFlashcard,
  goHome,
  loadFlashcards,
  logoutUser,
  nextFlashcard,
  nextQuestion,
  previousFlashcard,
  restartQuiz,
  showReview,
  showScreen,
  startQuickQuiz,
  toggleProfileMenu,
  updateProfilePicture
});

setupUsername();
loadChapters();
updateStats();
updateStreak();
loadRanking();
loadWeeklyCorrectRanking();
