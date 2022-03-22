const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const btnCategory = document.querySelectorAll(".list__categorie__btn");
const btnPlay = document.querySelector(".main__form__btn");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
const questions = require[questions];
const categories = [];

console.log(btnCategory);
btnCategory.forEach((el) => {
  el.addEventListener("click", () => {
    if (!categories.includes(el.dataset["name"])) {
      categories.push(el.dataset["name"]);
    } else categories.splice(categories.indexOf(el.dataset["name"]), 1);
    console.log(categories);
  });
  module.exports = categories;
});

btnPlay.addEventListener("click", () => {
  fetch("/categories", {
    method: "POST",
    body: "json.stringify(categories)",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      questions = res;
    });
});

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
  if (questions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.getElementsByClassName.width = `${(questionCounter / MAX_QUESTIONS) * 100
    }%`;

  const questionIndex = Math.floor(Math.random() * questions.length);
  console.log(questions.length);
  currentQuestion = questions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];

    questions.splice(questionIndex, 1);
  });
  acceptingAnswers = true;
  questionCounter++;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    console.log(questionCounter);
    console.log(questions.length + "click");

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnwser = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnwser == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
