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
const arrayQuestion = [];
console.log(inputQuestion);

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
    console.log(body);
})