import { chooseCategories, startGame } from "./createGame.js";
const params = new URLSearchParams(location.search);
const idUser = params.get('id');
// NAV HEADER
const nav = document.querySelector('.nav ul');
const navBar = document.querySelectorAll('.nav__link');
const connexion = document.getElementById('coUser');
const accueil = document.getElementById('accueil');
// ALL BTN
const btnChooseRandom = document.getElementById('btn__random__quiz');
const btnChooseCreated = document.getElementById('btn__quiz__created');
// BLOCK MAIN
const blockRandomQuiz = document.getElementById('block__random__quiz');
const blockCreatedQuiz = document.getElementById('block__id__quiz');
const mainWelcome = document.getElementById('main__welcome');
const welcomeTitle = document.getElementById('welcome__title');
const catTitle = document.getElementById("title__category");
if (idUser != null) {
    const inscription = navBar[0];
    nav.removeChild(inscription);
    connexion.innerHTML = "Profil";
    connexion.setAttribute("href", `./assets/pages/user.html?id=${idUser}`);
    accueil.setAttribute("href", `./index.html?id=${idUser}`);
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