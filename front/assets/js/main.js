import { chooseCategories, startGame } from "./createGame.js";
const params = new URLSearchParams(location.search);
const idUser = params.get('id');
// NAV HEADER
const navi = document.querySelector(".nav");
const nav = document.querySelector('.nav ul');
console.log(nav);
const navBar = document.querySelectorAll('.nav__link');
const connexion = document.getElementById('coUser');
const accueil = document.getElementById('accueil');
const btnListQuiz = document.getElementById("list__quizz");
// ALL BTN
const btnChooseRandom = document.getElementById('btn__random__quiz');
const btnChooseCreated = document.getElementById('btn__quiz__created');
// BLOCK MAIN
const blockRandomQuiz = document.getElementById('block__random__quiz');
const blockCreatedQuiz = document.getElementById('block__id__quiz');
const mainWelcome = document.getElementById('main__welcome');
const welcomeTitle = document.getElementById('welcome__title');
const catTitle = document.getElementById("title__category");
const linkLogo = document.getElementById("link__logo");

//FUNCTION USER LOGIN NAV HEADER
if (idUser != null) {
    const inscription = navBar[2];
    nav.removeChild(inscription);
    connexion.innerHTML = "Profil";
    connexion.setAttribute("href", `./assets/pages/user.html?id=${idUser}`);
    accueil.setAttribute("href", `./index.html?id=${idUser}`);
    btnListQuiz.setAttribute("href", `./assets/pages/listQuiz.html?id=${idUser}`);
    linkLogo.setAttribute("href", `./index.html?id=${idUser}`);
}

btnChooseRandom.addEventListener("click", (e) => {
    e.preventDefault();
    console.log('hello');
    catTitle.style.display = "block";
    blockRandomQuiz.style.display = "block";
    mainWelcome.style.display = "none";
    welcomeTitle.style.display = "none";
});
btnChooseCreated.addEventListener("click", (e) => {
    e.preventDefault();
    console.log('there');
    blockCreatedQuiz.style.display = "block";
    mainWelcome.style.display = "none";
    welcomeTitle.style.display = "none";
});
chooseCategories();
startGame();
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