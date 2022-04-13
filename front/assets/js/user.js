const path = "http://localhost:8000/api/user/profile";
const params = new URLSearchParams(location.search);
const section = document.querySelector(".profil__quiz__container");
const createQuiz = document.querySelector(".profil__create__quizz");
const username = document.getElementById("username");
const emailUser = document.getElementById("email");
const navUser = document.querySelectorAll(".profil__nav__link");
const imgUser = document.getElementById("profil__user");
const btnUpdateUser = document.getElementById("update__profile");
const myQuiz = navUser[0];
const myStats = navUser[1];
const edit = navUser[2];
const idUser = params.get("id");
const token = localStorage.getItem("token");
//HEADER
const btnListQuiz = document.getElementById("list__quizz");
const accueil = document.getElementById("accueil");
const btnLogout = document.getElementById("logout");


//FUNCTION USER LOGIN NAV HEADER
if (idUser != null) {
  btnListQuiz.setAttribute("href", `./listQuiz.html?id=${idUser}`);
  accueil.setAttribute("href", `../../index.html?id=${idUser}`);
  const linkLogo = document.getElementById("link__logo");
  linkLogo.setAttribute("href", `../../index.html?id=${idUser}`);
}
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
// REQ FETCH
const req = () => {

  fetch(`${path}/user`, myInit)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      return response;
    })
    .then((arrayUser) => {
      console.log(arrayUser);
      username.innerHTML = arrayUser[0].username;
      emailUser.innerHTML = arrayUser[0].email;
      arrayUser[0].picture == null ? imgUser.src = "../img/avatarUser/avatar.png" : imgUser.src = `../../../back/images/${arrayUser[0].picture}`;


    });
};
const reqDelete = (idQuiz) => {
  let thisQuiz = {
    token: token,
    id_quizz: idQuiz
  };
  const init = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(thisQuiz)
  }
  fetch(`${path}/user/id_quizz/delete`, init)
    .then(el => {
      alert('Quizz Supprimé!');
      location.reload();
    })
}
//CREATE ARTICLE FOR ANY QUIZZ OF USER
const myQuizz = () => {
  fetch(`${path}`, myInit)
    .then(res => {
      return res.json();
    })
    .then(response => {
      console.log(response);
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
        article.className = "profil__quiz__article profil__quiz__article__stats";
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
        const blockBtn = document.createElement('div');
        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");
        article.className = "profil__quiz__article profil__quiz__article__edit";
        nameQuiz.innerHTML = user.name;
        category(user.id_category, categorieQuiz);
        btnEdit.classList.add("profil__btn", "profil__btn--edit");
        btnDelete.classList.add("profil__btn", "profil__btn--delete");
        blockBtn.className = "block__btn";
        btnEdit.innerHTML = "Edit";
        btnDelete.innerHTML = "Delete";
        btnEdit.addEventListener("click", (e) => {
          e.preventDefault();
          return window.location.assign(`./edit.html?id=${idUser}&idQuizz=${user.id_quizz}`)
        })
        btnDelete.addEventListener("click", (e) => {
          reqDelete(user.id_quizz);
        })
        blockBtn.appendChild(btnEdit);
        blockBtn.appendChild(btnDelete);
        article.appendChild(nameQuiz);
        article.appendChild(categorieQuiz);
        article.appendChild(blockBtn);
        section.appendChild(article);
      }
    })
};
createQuiz.addEventListener("click", () => {
  return window.location.assign(`./createQuiz.html?id=${idUser}`);
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
      console.log(response);
      myQuizz(response);
    })
};
req();
reqQuiz();
// EVENT CLICK
myQuiz.addEventListener("click", myQuizz);
myStats.addEventListener("click", myStat);
edit.addEventListener("click", myEdit);
btnUpdateUser.addEventListener('click', () => {
  return window.location.assign(`./userInfoUpdate.html?id=${idUser}`);
});
btnLogout.addEventListener("click", () => {
  localStorage.clear();
})

// NAV
const navi = document.querySelector(".nav");
const nav = document.querySelector('.nav ul');
const toggleBtn = document.getElementById("wrap");
toggleBtn.addEventListener("click", (e) => {
  nav.classList.toggle("nav__ul--active");
  navi.classList.toggle("nav__top");
  if (toggleBtn.innerHTML === "✗") {
    toggleBtn.innerHTML = "≡";
  } else {
    toggleBtn.innerHTML = "&#x02717";
  }

})