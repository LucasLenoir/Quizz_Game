const path = "http://localhost:8000/api/user/profile/create";
const params = new URLSearchParams(location.search);
const idUser = params.get('id');
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