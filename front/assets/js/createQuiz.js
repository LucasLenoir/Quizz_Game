const path = "http://localhost:8000/api/user/profile/user/create";
const params = new URLSearchParams(location.search);
const idUser = params.get('id');
const token = localStorage.getItem("token");
const btnNextQuestion = document.getElementById('next__question');
const btnValidateQuiz = document.getElementById('validateQuiz');

//Take all input
const inputName = document.getElementById('nameQuiz');
const inputCategorie = document.getElementById('categorie');
const inputQuestion = document.getElementById('question');
const inputResponse1 = document.getElementById('response_1');
const inputResponse2 = document.getElementById('response_2');
const inputResponse3 = document.getElementById('response_3');
const inputResponse4 = document.getElementById('response_4');
//variable
const arrayQuestion = [];
let nbrQuestion = 0;
console.log(inputName.labels[0]);

btnNextQuestion.addEventListener("click", (e) => {
    e.preventDefault();
    const body = {
        token: token,
        id_user: idUser,
        name: inputName.value,
        id_category: inputCategorie.value,
        question: inputQuestion.value,
        response_1: inputResponse1.value,
        response_2: inputResponse2.value,
        response_3: inputResponse3.value,
        response_4: inputResponse4.value,
    }
    if (inputName.value && inputQuestion.value && inputResponse1.value && inputResponse2.value && inputResponse3.value && inputResponse4.value) {
        arrayQuestion.push(body);
        nbrQuestion++;
        inputQuestion.value = "";
        inputResponse1.value = "";
        inputResponse2.value = "";
        inputResponse3.value = "";
        inputResponse4.value = "";
        inputQuestion.labels[0].innerHTML = `Question ${nbrQuestion + 1}`;
        inputName.style.display = "none";
        inputName.labels[0].style.display = "none";
    } else {
        alert('Remplissez les champs vide');
    }
});
btnValidateQuiz.addEventListener("click", (e) => {
    e.preventDefault();
    if (arrayQuestion.length < 4) {
        alert(`Il vous reste ${5 - nbrQuestion} questions à faire minimum`);
    } else {
        postQuiz(arrayQuestion);
    }
})
const postQuiz = (array) => {
    const myInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(array)
    };
    fetch(path, myInit)
        .then(() => {
            alert('Quiz Créé !');
            return window.location.assign(`./user.html?id=${idUser}`);
        })
};


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

});


//HEADER
const btnListQuiz = document.getElementById("list__quizz");
const accueil = document.getElementById('accueil');
const profil = document.getElementById('coUser');
//FUNCTION USER LOGIN NAV HEADER
if (idUser != null) {
    btnListQuiz.setAttribute("href", `./listQuiz.html?id=${idUser}`)
    accueil.setAttribute("href", `../../index.html?id=${idUser}`);
    profil.setAttribute("href", `./user.html?id=${idUser}`);
    const linkLogo = document.getElementById("link__logo");
    linkLogo.setAttribute("href", `../../index.html?id=${idUser}`);
}