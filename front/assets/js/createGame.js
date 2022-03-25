
const titleMain = document.querySelector(".main__title");
const main = document.querySelector("main");
const btnCategory = document.querySelectorAll(".list__categorie__btn");
let arrayCtegories = [];
let question = 0;

btnCategory.forEach(el => {
    el.addEventListener("click", () => {
        if (!arrayCtegories.includes(el.dataset["number"])) {
            arrayCtegories.push(el.dataset["number"]);
        } else arrayCtegories.splice(arrayCtegories.indexOf(el.dataset["number"]), 1);
        console.log(arrayCtegories);
    });

});
const reqQuestion = (path) => {
    //fetch
    const newCat = {
        categories: arrayCtegories
    }
    const myInit = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat)
    }
    fetch(path, myInit)
        .then(res => {
            return res.json();
        })
        .then(response => {

            const allQuestions = response;
            createSection(allQuestions);
        })
}
const createSection = (fetchResponse) => {
    //create block
    const sectionMain = document.createElement("section");
    const divTime = document.createElement("div");
    const imgTimer = document.createElement("img");
    const timeBar = document.createElement("div");
    const grid = document.createElement("div");

    //Add class
    divTime.className = "main__section__timer";
    sectionMain.className = "main__section";
    timeBar.className = "main__section__timer__bar";

    //add to DOM
    imgTimer.src = "./assets/img/ClockTimer.png";
    divTime.appendChild(imgTimer);
    divTime.appendChild(timeBar);
    sectionMain.appendChild(divTime);
    createQuestion(titleMain, fetchResponse, sectionMain, grid);


}
const nextQuestion = (btn, title, section, grid, array) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        section.removeChild(grid);
        createQuestion(title, array, section, grid);

        // if (btn.dataset.id != 1) {
        //     console.log('not good bitch');
        // } else {
        //     console.log('good grosse burne');
        // }
    })
}

const suffleResponse = (arr) => {
    arr.sort(() => Math.random() - 0.5);
}


const createQuestion = (title, array, section) => {
    let arrayResponse = [];
    let testArr = Object.values(array[0]);
    title.innerHTML = testArr[0];
    let j = 0;

    const grid = document.createElement("div");
    grid.className = `main__section__grid`;
    grid.setAttribute('id', `${j}`)
    j++
    //Implémente les réponses et créer les block en fonction du nombre de réponse

    for (let i = 1; i < testArr.length; i++) {
        const blockResponse = document.createElement("div");
        const pResponse = document.createElement("p");
        pResponse.innerHTML = testArr[i];
        blockResponse.className = "main__section__grid__response";
        pResponse.innerHTML = testArr[i];
        blockResponse.dataset.id = i;
        blockResponse.appendChild(pResponse);
        arrayResponse.push(blockResponse);
        nextQuestion(blockResponse, title, section, grid, array);
    }
    suffleResponse(arrayResponse);
    arrayResponse.forEach(el => {
        grid.appendChild(el)
    })
    section.appendChild(grid);
    main.appendChild(section);
    console.log(array);
    array.splice('0', 1);

}

export { reqQuestion };