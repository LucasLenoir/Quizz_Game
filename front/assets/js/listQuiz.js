const path = 'http://localhost:8000/api/user/profile/list';
const section = document.querySelector(".profil__quiz__container");
const params = new URLSearchParams(location.search);
const idUser = params.get("id");

//HEADER
const nav = document.querySelector('.nav ul');
const navBar = document.querySelectorAll('.nav__link');
const connexion = document.getElementById('coUser');
const btnListQuiz = document.getElementById("list__quizz");
const accueil = document.getElementById('accueil');
if (idUser != null) {
    const inscription = navBar[0];
    nav.removeChild(inscription);
    connexion.innerHTML = "Profil";
    connexion.setAttribute("href", `./user.html?id=${idUser}`);
    accueil.setAttribute("href", `../../index.html?id=${idUser}`);
    btnListQuiz.setAttribute("href", `./listQuiz.html?id=${idUser}`);
}
const reqAllQuizz = () => {

    fetch(path, { method: "POST" })
        .then(res => {
            return res.json();
        })
        .then(response => {
            for (let i = 0; i < response.length; i++) {
                let user = response[i];
                const article = document.createElement("article");
                const nameQuiz = document.createElement("h3");
                const categorieQuiz = document.createElement("p");
                const btnPlay = document.createElement("button");
                article.className = "profil__quiz__article";
                btnPlay.classList.add("profil__btn", "profil__btn--play");
                nameQuiz.innerHTML = user.quizzName;
                categorieQuiz.innerHTML = user.nameCategory;
                btnPlay.innerHTML = "Play";
                btnPlay.addEventListener("click", () => {
                    return window.location.assign(`../../index.html?id=${idUser}&idQuizz=${user.id_quizz}`);
                })
                article.appendChild(nameQuiz);
                article.appendChild(categorieQuiz);
                article.appendChild(btnPlay);
                section.appendChild(article);
            }
        })
}
reqAllQuizz();
// NAV
const navi = document.querySelector(".nav");
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