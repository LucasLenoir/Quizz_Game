const params = new URLSearchParams(location.search);
const section = document.querySelector('.profil__quiz__container');
const createQuiz = document.querySelector('.profil__create__quizz');
const navUser = document.querySelectorAll('.profil__nav__link');
const username = document.getElementById('username');
const emailUser = document.getElementById('email');
const myQuiz = navUser[0];
const myStats = navUser[1];
const edit = navUser[2];
const table = 3;
const idUser = params.get('id');
const req = () => {
    const myUser =
    {
        id_user: idUser
    };
    const myInit = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(myUser)
    };
    const path = "http://localhost:8000/api/user/profile/user";
    fetch(path, myInit)
        .then(res => {
            return res.json();
        })
        .then(response => {
            return response[0];
        })
        .then(arrayUser => {
            console.log(arrayUser);
            username.innerHTML = arrayUser.username;
            emailUser.innerHTML = arrayUser.email;
        })
}
//CREATE ARTICLE FOR ANY QUIZZ OF USER
const myQuizz = () => {
    myStats.classList.remove('profil__nav__link--active');
    edit.classList.remove('profil__nav__link--active');
    myQuiz.classList.add('profil__nav__link--active');
    section.innerHTML = "";
    for (let i = 0; i < table; i++) {
        const article = document.createElement('article');
        const nameQuiz = document.createElement('h3');
        const categorieQuiz = document.createElement('p');
        const nbrQuestion = document.createElement('p');
        const btnPlay = document.createElement('button');
        article.className = "profil__quiz__article";
        btnPlay.classList.add('profil__btn', 'profil__btn--play');
        nameQuiz.innerHTML = `Name quiz ${table}`;
        categorieQuiz.innerHTML = "Categorie quiz";
        nbrQuestion.innerHTML = "nbr question";
        btnPlay.innerHTML = "Play";
        article.appendChild(nameQuiz);
        article.appendChild(categorieQuiz);
        article.appendChild(nbrQuestion);
        article.appendChild(btnPlay);
        section.appendChild(article);
    }
}
//CREATE ARTICLE FOREACH QUIZZ PLAYING
const myStat = () => {
    myQuiz.classList.remove('profil__nav__link--active');
    edit.classList.remove('profil__nav__link--active');
    myStats.classList.add('profil__nav__link--active');
    section.innerHTML = "";
    for (let i = 0; i < table; i++) {
        const article = document.createElement('article');
        const nameQuiz = document.createElement('h3');
        const result = document.createElement('p');
        const resultTime = document.createElement('p');
        article.className = "profil__quiz__article";
        nameQuiz.innerHTML = `Name quiz ${table}`;
        result.innerHTML = `résult : 10/20`;
        resultTime.innerHTML = `01:20`;
        article.appendChild(nameQuiz);
        article.appendChild(result);
        article.appendChild(resultTime);
        section.appendChild(article);
    }
}
//CREATE EDIT QUIZ FOREACH USER QUIZ
const myEdit = () => {
    myStats.classList.remove('profil__nav__link--active');
    myQuiz.classList.remove('profil__nav__link--active');
    edit.classList.add('profil__nav__link--active');
    section.innerHTML = "";
    for (let i = 0; i < table; i++) {
        const article = document.createElement('article');
        const nameQuiz = document.createElement('h3');
        const categorieQuiz = document.createElement('p');
        const nbrQuestion = document.createElement('p');
        const btnEdit = document.createElement('button');
        article.className = "profil__quiz__article";
        nameQuiz.innerHTML = `Name quiz ${table}`;
        categorieQuiz.innerHTML = "Categorie quiz";
        nbrQuestion.innerHTML = "nbr question";
        btnEdit.classList.add('profil__btn', 'profil__btn--edit')
        btnEdit.innerHTML = "Edit";
        article.appendChild(nameQuiz);
        article.appendChild(categorieQuiz);
        article.appendChild(nbrQuestion);
        article.appendChild(btnEdit);
        section.appendChild(article);
    }
}
req();
myQuizz();
myQuiz.addEventListener("click", myQuizz);
myStats.addEventListener("click", myStat);
edit.addEventListener("click", myEdit);
createQuiz.addEventListener("click", () => {
    return window.location.assign(`./createQuiz.html?id=${idUser}`);
})
