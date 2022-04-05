import { chooseCategories, startGame } from "./createGame.js";
const params = new URLSearchParams(location.search);
const idUser = params.get('id');
const nav = document.querySelector('.nav ul');
const navBar = document.querySelectorAll('.nav__link');
const connexion = document.getElementById('coUser');
console.log(connexion);
if (idUser != null) {
    const inscription = navBar[0];
    nav.removeChild(inscription);
    connexion.innerHTML = "Profil";
    connexion.setAttribute("href", `./assets/pages/user.html?id=${idUser}`);
}
chooseCategories();
startGame();
