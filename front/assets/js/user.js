const path = "http://localhost:8000/api/user/profile";
const params = new URLSearchParams(location.search);
const btnAccueil = document.getElementById("accueil");
const section = document.querySelector(".profil__quiz__container");
const createQuiz = document.querySelector(".profil__create__quizz");
const username = document.getElementById("username");
const emailUser = document.getElementById("email");
const navUser = document.querySelectorAll(".profil__nav__link");
const myQuiz = navUser[0];
const myStats = navUser[1];
const edit = navUser[2];
const idUser = params.get("id");
const token = localStorage.getItem("token");
const myUser = {
  id_user: idUser,
  token: token,
};
const myInit = {
  method: "POST",
  headers: { "Content-Type": "application/json" },

  body: JSON.stringify(myUser),
};
const objCat = [
  {
    id_category: 3,
    name: "Culture G",
    score: 0,
    number_question: 0
  },
  {
    id_category: 2,
    name: "Sport",
    score: 0,
    number_question: 0
  },
  {
    id_category: 1,
    name: "Cine",
    score: 0,
    number_question: 0
  }
];
const req = () => {

  fetch(`${path}/user`, myInit)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      return response;
    })
    .then((arrayUser) => {
      username.innerHTML = arrayUser[0].username;
      emailUser.innerHTML = arrayUser[0].email;
    });
};
//CREATE ARTICLE FOR ANY QUIZZ OF USER
const myQuizz = () => {
  fetch(`${path}`, myInit)
    .then(res => {
      return res.json();
    })
    .then(response => {
      myStats.classList.remove("profil__nav__link--active");
      edit.classList.remove("profil__nav__link--active");
      myQuiz.classList.add("profil__nav__link--active");
      section.innerHTML = "";
      for (let i = 0; i < response.length; i++) {
        let user = response[i];
        const article = document.createElement("article");
        const nameQuiz = document.createElement("h3");
        const categorieQuiz = document.createElement("p");
        const shareQuiz = document.createElement("p");
        const btnPlay = document.createElement("button");
        article.className = "profil__quiz__article";
        btnPlay.classList.add("profil__btn", "profil__btn--play");
        nameQuiz.innerHTML = user.name;
        category(user.id_category, categorieQuiz);
        btnPlay.innerHTML = "Play";
        shareQuiz.innerHTML = "share ur quiz : " + user.id_quizz;
        btnPlay.addEventListener("click", () => {
          return window.location.assign(`../../index.html?id=${idUser}&idQuizz=${user.id_quizz}`);
        })
        article.appendChild(nameQuiz);
        article.appendChild(categorieQuiz);
        article.appendChild(shareQuiz)
        article.appendChild(btnPlay);
        section.appendChild(article);
      }
    })
};
//CREATE ARTICLE FOREACH QUIZZ PLAYING
const myStat = () => {
  fetch(`${path}/user/stats`, myInit)
    .then(res => {
      return res.json();
    })
    .then(response => {
      objCat.forEach(el => {
        el.number_question = 0;
        el.score = 0;
      })
      response.forEach(el => {
        let categorie = el.id_category;
        let score = el.score;
        let question = el.number_question;
        objCat.forEach(el => {
          if (categorie == el.id_category) {
            el.score += score;
            el.number_question += question;
          }
        })
      });
      myQuiz.classList.remove("profil__nav__link--active");
      edit.classList.remove("profil__nav__link--active");
      myStats.classList.add("profil__nav__link--active");
      section.innerHTML = "";
      objCat.forEach(el => {
        let percent = Math.floor((100 * el.score) / (el.number_question * 100)) + "%";
        const article = document.createElement("article");
        const nameQuiz = document.createElement("h3");
        const result = document.createElement("p");
        const nbrQuestion = document.createElement('p');
        const resultTime = document.createElement("p");
        article.className = "profil__quiz__article";
        nameQuiz.innerHTML = el.name;
        nbrQuestion.innerHTML = "nombre de questions : " + el.number_question;
        result.innerHTML = `score : ${el.score}`;
        resultTime.innerHTML = "percent : " + percent;
        article.appendChild(nameQuiz);
        article.appendChild(result);
        article.appendChild(nbrQuestion);
        article.appendChild(resultTime);
        section.appendChild(article);
      });
    })
};
//CREATE EDIT QUIZ FOREACH USER QUIZ
const myEdit = () => {
  fetch(`${path}`, myInit)
    .then(res => {
      return res.json();
    })
    .then(response => {
      myStats.classList.remove("profil__nav__link--active");
      myQuiz.classList.remove("profil__nav__link--active");
      edit.classList.add("profil__nav__link--active");
      section.innerHTML = "";
      for (let i = 0; i < response.length; i++) {
        let user = response[i];
        const article = document.createElement("article");
        const nameQuiz = document.createElement("h3");
        const categorieQuiz = document.createElement("p");
        const btnEdit = document.createElement("button");
        article.className = "profil__quiz__article";
        nameQuiz.innerHTML = user.name;
        category(user.id_category, categorieQuiz);
        btnEdit.classList.add("profil__btn", "profil__btn--edit");
        btnEdit.innerHTML = "Edit";
        btnEdit.addEventListener("click", (e) => {
          e.preventDefault();
          return window.location.assign(`./edit.html?id=${idUser}&idQuizz=${user.id_quizz}`)
        })
        article.appendChild(nameQuiz);
        article.appendChild(categorieQuiz);
        article.appendChild(btnEdit);
        section.appendChild(article);
      }
    })
};
// myQuizz();
createQuiz.addEventListener("click", () => {
  return window.location.assign(`./createQuiz.html?id=${idUser}`);
});
btnAccueil.addEventListener("click", () => {
  return window.location.assign(`../../index.html?id=${idUser}`);
});
const category = (idCategory, div) => {
  let nameCategory = "hello";
  if (idCategory == 3) nameCategory = "Culture G";
  if (idCategory == 2) nameCategory = "Sport";
  if (idCategory == 1) nameCategory = "Cine";
  div.innerHTML = nameCategory;
};
const reqQuiz = () => {
  fetch(`${path}`, myInit)
    .then(res => {
      return res.json();
    })
    .then(response => {
      myQuizz(response);
    })
};
req();
reqQuiz();
// EVENT CLICK
myQuiz.addEventListener("click", myQuizz);
myStats.addEventListener("click", myStat);
edit.addEventListener("click", myEdit);