// VARIABLE
const path = "http://localhost:8000/api/";
const params = new URLSearchParams(location.search);
const idUser = params.get("id");
const idQuizz = params.get("idQuizz");
const main = document.querySelector("main");
const containerCat = document.getElementById("block__random__quiz");
const btnPlay = document.getElementById("play__random__quiz");
const catTitle = document.getElementById("title__category");
const btnCategory = document.querySelectorAll(".list__categorie__btn");
const divScore = document.createElement("div");
const btnNumber = document.getElementById("questions");
const mainWelcome = document.getElementById("main__welcome");
const welcomeTitle = document.getElementById("welcome__title");
const btnRunQuiz = document.getElementById("btn__run__quiz");
const blockCreatedQuiz = document.getElementById("block__id__quiz");
const turbulence = document.querySelector("feTurbulence");
let valueNumber = 5;
//ARRAY
let arrayCategories = [];
let points = 0;
let arrayPoint = [];
// FUNCTION CHOICE CATEGORIE
const chooseCategories = () => {
  btnCategory.forEach((el) => {
    el.addEventListener("click", () => {
      if (!arrayCategories.includes(el.dataset["number"])) {
        arrayCategories.push(el.dataset["number"]);
        el.classList.add("list__categorie__btn--active");
      } else {
        el.classList.remove("list__categorie__btn--active");
        arrayCategories.splice(
          arrayCategories.indexOf(el.dataset["number"]),
          1
        );
      }
    });
  });
};
// FUNCTION RUN GAME
const startGame = () => {
  btnPlay.addEventListener("click", (e) => {
    e.preventDefault();
    valueNumber = btnNumber.value;
    !arrayCategories[0] ? alert("Choisi une catégorie") : runSession(path);
  });
};
const runQuizz = (idQuiz) => {
  //fetch
  catTitle.style.display = "block";
  const bodyQuizz = {
    id_quizz: idQuiz,
  };
  const myInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyQuizz),
  };
  fetch(`${path}user/profile/id_quizz`, myInit)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      arrayCategories.push(response[0].id_category);
      console.table(response);
      catTitle.style.display = "block";
      main.removeChild(mainWelcome);
      main.removeChild(welcomeTitle);
      main.removeChild(blockCreatedQuiz);
      main.removeChild(containerCat);
      const allQuestions = response;
      shuffleArray(allQuestions);
      createSection(allQuestions);
    });
};
const runSession = (path) => {
  main.removeChild(containerCat);
  reqQuestion(path);
};
// FUNCTION REQUEST
const reqQuestion = (path) => {
  //fetch
  const newCat = {
    categories: arrayCategories,
  };
  const myInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCat),
  };
  fetch(path, myInit)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      const allQuestions = response;
      shuffleArray(allQuestions);
      allQuestions.splice(valueNumber);
      createSection(allQuestions);
    });
};
const postScore = () => {
  const myInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arrayPoint),
  };
  fetch(`${path}user/profile/endGame`, myInit);
};
//FUNCTION CREATE GAME
const createSection = (fetchResponse) => {
  // add objet in arrayPoint
  arrayCategories.forEach((el) => {
    const objPoint = {
      id_user: idUser,
      id_category: el,
      score: 0,
      number_question: 0,
    };
    arrayPoint.push(objPoint);
  });
  //create block
  const sectionMain = document.createElement("section");
  const divTime = document.createElement("div");
  const imgTimer = document.createElement("img");
  const timeBar = document.createElement("div");
  const newQuestion = document.createElement("div");

  // Add text
  newQuestion.innerHTML = "Next question";

  //Add class
  divTime.className = "main__section__timer";
  sectionMain.className = "main__section";
  timeBar.className = "main__section__timer__bar";
  newQuestion.className = "next__question";

  //add to DOM
  timeBar.style.backgroundColor = "green";
  timeBar.style.filter = 'url("#turb")';
  imgTimer.src = "./assets/img/ClockTimer.png";
  divTime.appendChild(imgTimer);
  divTime.appendChild(timeBar);
  sectionMain.appendChild(divTime);
  score();

  //racine function
  createQuestion(catTitle, fetchResponse, sectionMain, divTime, newQuestion);
};
const createQuestion = (title, array, section, timeBar, nextQuestion) => {
  let arrayResponse = [];
  let testArr = Object.values(array[0]);
  title.innerHTML = testArr[1];
  title.style.fontFamily = "Impact";
  responsive(title);

  let j = 0;
  const idCategorie = testArr[0];
  pushQuestionCat(idCategorie);
  const grid = document.createElement("div");
  grid.className = `main__section__grid`;
  grid.setAttribute("id", `${j}`);
  j++;
  let timeColor = "#25E2A1";
  let progress = 100;
  turbulence.setAttribute("baseFrequency", "0.00001 0.00001");
  setTimeout(() => {
    let timeDown = setInterval(() => {
      let verticalFrequency = 0.0001;
      if (progress <= 0) {
        clearInterval(timeDown);
        pushScoreDown(idCategorie);
        points -= 10;
        divScore.innerHTML = `Score : ${points}`;
        switchQuestion(title, section, grid, array, timeBar, nextQuestion);
      } else {
        progress -= 0.1;
        verticalFrequency += 0.1;
        timesUp(progress, timeColor, verticalFrequency);
      }
    }, 10);
    for (let i = 2; i < testArr.length; i++) {
      const blockResponse = document.createElement("div");
      const pResponse = document.createElement("p");
      pResponse.innerHTML = testArr[i];
      blockResponse.className = "main__section__grid__response";
      pResponse.innerHTML = testArr[i];
      blockResponse.dataset.id = i - 1;
      blockResponse.appendChild(pResponse);
      arrayResponse.push(blockResponse);
      verificationBtn(
        blockResponse,
        title,
        section,
        grid,
        array,
        timeBar,
        nextQuestion,
        timeDown,
        idCategorie
      );
    }
    shuffleArray(arrayResponse);
    arrayResponse.forEach((el) => {
      grid.appendChild(el);
    });
  }, 1000);
  //Implémente les réponses et créer les block en fonction du nombre de réponse
  section.style.pointerEvents = "auto";
  section.appendChild(grid);
  main.appendChild(section);
  const barTime = document.querySelector(".main__section__timer__bar");
  barTime.style.background = `linear-gradient(to right,  ${timeColor} ${progress}%, #111 0%)`;
  array.splice("0", 1);
};
// FUNCTION BTN
const verificationBtn = (
  btn,
  title,
  section,
  grid,
  array,
  timeBar,
  nextQuestion,
  timeDown,
  idCategorie
) => {
  btn.addEventListener("click", (e) => {
    section.style.pointerEvents = "none";
    clearInterval(timeDown);
    const barTime = document.querySelector(".main__section__timer__bar");
    barTime.style.backgroundColor = "#25E2A1";
    e.preventDefault();
    if (btn.dataset.id != 1) {
      btn.style.backgroundColor = "red";
      points -= 10;
      pushScoreDown(idCategorie);
      setTimeout(() => {
        divScore.innerHTML = `Score : ${points}`;
      }, 1000);
      switchQuestion(title, section, grid, array, timeBar, nextQuestion);
    } else {
      btn.style.backgroundColor = "#25E2A1";
      points += 100;
      pushScoreUp(idCategorie);
      setTimeout(() => {
        divScore.innerHTML = `Score : ${points}`;
      }, 1000);
      switchQuestion(title, section, grid, array, timeBar, nextQuestion);
    }
  });
};
//FUNCTION NEXT QUESTION
const switchQuestion = (title, section, grid, array, timeBar, nextQuestion) => {
  if (array.length == 0) {
    setTimeout(() => {
      idUser != null ? postScore() : console.log("user not found");
      title.innerHTML = `Score final : ${points}`;
      console.log("session terminé");
      main.removeChild(section);
      seeScore();
    }, 1000);
  } else {
    setTimeout(() => {
      section.removeChild(timeBar);
      section.removeChild(grid);
      main.removeChild(title);
      section.appendChild(nextQuestion);
    }, 1000);
    setTimeout(() => {
      section.removeChild(nextQuestion);
      section.appendChild(timeBar);
      main.appendChild(title);
      createQuestion(title, array, section, timeBar, nextQuestion);
    }, 3000);
  }
};
// FUNCTION RANDOM ARRAY
const shuffleArray = (arr) => {
  arr.sort(() => Math.random() - 0.5);
};
// FUNCTION TIMEBAR
const timesUp = (progress, timeColor, turb) => {
  const timeBar = document.querySelector(".main__section__timer__bar");
  if (progress < 65 && progress > 30) {
    timeColor = "#FF8C32";
    turbulence.setAttribute("baseFrequency", `${turb} 0.0001`);
    setTimeout(() => {
      turb = 0.0001;
      turbulence.setAttribute("baseFrequency", `${turb} 0.0041`);
    }, 50);
  } else if (progress < 30) {
    timeColor = "red";
    turbulence.setAttribute("baseFrequency", `${turb} 0.0001`);
    setTimeout(() => {
      turb = 0.0001;
      turbulence.setAttribute("baseFrequency", `${turb} 0.0001`);
    }, 0.4);
  }
  timeBar.style.background = `linear-gradient(to right,  ${timeColor} ${progress}%, #111 0%)`;
};
// SCORE FUNCTION
const score = () => {
  divScore.innerHTML = `Score : ${points}`;
  divScore.className = "main__score";
  main.appendChild(divScore);
};
const pushQuestionCat = (idCategorie) => {
  arrayPoint.forEach((el) => {
    if (idCategorie == el.id_category) el.number_question += 1;
  });
};
const pushScoreUp = (idCategorie) => {
  arrayPoint.forEach((el) => {
    if (idCategorie == el.id_category) el.score += 100;
  });
};
const pushScoreDown = (idCategorie) => {
  arrayPoint.forEach((el) => {
    if (idCategorie == el.id_category) el.score -= 10;
  });
};
const seeScore = () => {
  const section = document.createElement("div");
  const titleStats = document.createElement("h2");
  titleStats.innerHTML = "Stats";
  section.classList.add("main__container__stats");
  section.appendChild(titleStats);
  const containerGrid = document.createElement("div");
  containerGrid.classList.add("main__container__stats__grid");
  arrayPoint.forEach((el) => {
    const categorie = el.id_category;
    const divCategorie = document.createElement("h3");
    const divQuestion = document.createElement("p");
    const divStats = document.createElement("p");
    const divContainerStat = document.createElement("div");
    divStats.innerHTML = `Points : ${el.score}`;
    divQuestion.innerHTML = `Nombres de questions : ${el.number_question}`;
    if (categorie == 3) {
      divCategorie.innerHTML = `Culture G`;
    } else if (categorie == 2) {
      divCategorie.innerHTML = `Sport`;
    } else if (categorie == 1) {
      divCategorie.innerHTML = `Cine`;
    }
    divContainerStat.appendChild(divCategorie);
    divContainerStat.appendChild(divQuestion);
    divContainerStat.appendChild(divStats);
    containerGrid.appendChild(divContainerStat);
  });
  section.appendChild(containerGrid);
  main.appendChild(section);
};
//FUNCTION RESPONSIVE
const responsive = (title) => {
  const windowWidth = window.innerWidth;
  if (title.textContent.length > 50) {
    if (windowWidth <= 599) title.style.fontSize = "1.2rem";
    else if (windowWidth > 599) title.style.fontSize = "2rem";
  } else {
    if (windowWidth <= 599) title.style.fontSize = "1.3rem";
    else if (windowWidth > 599) title.style.fontSize = "2.5rem";
  }
};
if (idQuizz != null) runQuizz(idQuizz);
// EXPORT FUNCTION
export { chooseCategories };
export { startGame };
btnRunQuiz.addEventListener("click", (e) => {
  e.preventDefault();
  const numberQuiz = document.getElementById("id__quiz");
  runQuizz(numberQuiz.value);
});
