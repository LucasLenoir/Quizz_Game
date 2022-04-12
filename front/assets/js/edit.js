const path = "http://localhost:8000/api/user/profile/user/id_quizz";
const params = new URLSearchParams(location.search);
const idUser = params.get('id');
const idQuizz = params.get('idQuizz');
const token = localStorage.getItem("token");
const myForm = document.getElementById('my_form');
// HEADER
const btnListQuiz = document.getElementById("list__quizz");
const accueil = document.getElementById("accueil");
const connexion = document.getElementById('coUser');

//FUNCTION USER LOGIN NAV HEADER
if (idUser != null) {
    btnListQuiz.setAttribute("href", `./listQuiz.html?id=${idUser}`);
    connexion.setAttribute("href", `./user.html?id=${idUser}`);
    accueil.setAttribute("href", `../../index.html?id=${idUser}`);
    const linkLogo = document.getElementById("link__logo");
    linkLogo.setAttribute("href", `../../index.html?id=${idUser}`);
}
//
const arrayQuest = [];
const bodyQuizz = {
    token: token,
    id_quizz: idQuizz
};
const myInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyQuizz),
};
const editQuiz = () => {
    fetch(`${path}/edit`, myInit)
        .then(res => {
            return res.json();
        })
        .then(response => {
            let j = 0;
            const btnEditLast = document.createElement('button');
            btnEditLast.classList.add('main__form__btn', 'main__form__btn--blue', 'btn__edit');
            btnEditLast.innerHTML = "Valider";
            btnEditLast.style.marginBottom = "3rem";
            response.forEach(el => {
                j++
                const block = document.createElement('div');
                block.classList.add('block__response');
                const article = document.createElement('div');
                const question = document.createElement('input');
                // RESPONSE
                const trueResponse = document.createElement('input');
                const response2 = document.createElement('input');
                const response3 = document.createElement('input');
                const response4 = document.createElement('input');
                //LABEL 
                const labelQuestion = document.createElement('label');
                const labelTrue = document.createElement('label');
                const labelRes2 = document.createElement('label');
                const labelRes3 = document.createElement('label');
                const labelRes4 = document.createElement('label');
                labelQuestion.innerHTML = `Question ${j}`;
                labelTrue.innerHTML = `True Response`;
                labelRes2.innerHTML = `Response 2`;
                labelRes3.innerHTML = `Response 3`;
                labelRes4.innerHTML = `Response 4`;
                article.classList.add('main__form__unit_container', "form__response");
                question.setAttribute('type', 'text');
                question.value = el.question;
                trueResponse.value = el.response_1;
                response2.value = el.response_2;
                response3.value = el.response_3;
                response4.value = el.response_4;
                article.appendChild(labelQuestion);
                article.appendChild(question);
                article.appendChild(labelTrue);
                article.appendChild(trueResponse);
                article.appendChild(labelRes2);
                article.appendChild(response2);
                article.appendChild(labelRes3);
                article.appendChild(response3);
                article.appendChild(labelRes4);
                article.appendChild(response4);
                block.appendChild(article);
                myForm.appendChild(block);
            });
            myForm.appendChild(btnEditLast);
            const allBtn = document.querySelectorAll('button');
            const allQuest = document.querySelectorAll('.form__response');
            allBtn.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let i = 0;
                    allQuest.forEach(div => {
                        const inputs = div.childNodes;
                        let objQuestion = {
                            token: token,
                            id_question: response[i].id_question,
                            question: inputs[1].value,
                            response_1: inputs[3].value,
                            response_2: inputs[5].value,
                            response_3: inputs[7].value,
                            response_4: inputs[9].value,

                        }
                        i++;
                        arrayQuest.push(objQuestion);
                    })
                    reqUpdate(path, arrayQuest);
                })
            })
        });
}
const reqUpdate = (path, array) => {
    const init = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(array),
    };
    fetch(`${path}/update`, init)
        .then(res => {
            alert('Quizz update !');
            return window.location.assign(`./user.html?id=${idUser}`);
        })

}
editQuiz();
//HEADER CLICK


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