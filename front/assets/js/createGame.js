const path = 'http://localhost:8000/api/';
const main = document.querySelector("main");
const containerCat = document.querySelector(".main__container");
const btnPlay = document.querySelector(".main__form__btn");
const mainForm = document.querySelector('.main__form');
const titleMain = document.querySelector(".main__title");
const btnCategory = document.querySelectorAll(".list__categorie__btn");

const divScore = document.createElement('div');
let arrayCategories = [];
let points = 0;

const chooseCategories = () => {
    btnCategory.forEach(el => {
        el.addEventListener("click", () => {
            if (!arrayCategories.includes(el.dataset["number"])) {
                arrayCategories.push(el.dataset["number"]);
            } else arrayCategories.splice(arrayCategories.indexOf(el.dataset["number"]), 1);
            console.log(arrayCategories);
        });

    });
}
const startGame = () => {
    btnPlay.addEventListener("click", (e) => {
        e.preventDefault();
        !arrayCategories[0] ? alert('Choisi une catégorie') : runSession();
    });
}
const runSession = () => {
    main.removeChild(containerCat);
    main.removeChild(mainForm);
    reqQuestion(path);

}
const reqQuestion = (path) => {
    //fetch
    const newCat = {
        categories: arrayCategories
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
    const newQuestion = document.createElement('div');

    // Add text
    newQuestion.innerHTML = "Next question";

    //Add class
    divTime.className = "main__section__timer";
    sectionMain.className = "main__section";
    timeBar.className = "main__section__timer__bar";
    newQuestion.className = 'next__question';

    //add to DOM
    timeBar.style.backgroundColor = "green";
    imgTimer.src = "./assets/img/ClockTimer.png";
    divTime.appendChild(imgTimer);
    divTime.appendChild(timeBar);
    sectionMain.appendChild(divTime);
    score();

    //racine function
    createQuestion(titleMain, fetchResponse, sectionMain, divTime, newQuestion);
}
// …………………...„„-~^^~„-„„_
// ………………„-^*'' : : „'' : : : : *-„
// …………..„-* : : :„„--/ : : : : : : : '\
// …………./ : : „-* . .| : : : : : : : : '|
// ……….../ : „-* . . . | : : : : : : : : |
// ………...\„-* . . . . .| : : : : : : : :'|
// ……….../ . . . . . . '| : : : : : : : :|
// ……..../ . . . . . . . .'\ : : : : : : : |
// ……../ . . . . . . . . . .\ : : : : : : :|
// ……./ . . . . . . . . . . . '\ : : : : : /
// ….../ . . . . . . . . . . . . . *-„„„„-*'
// ….'/ . . . . . . . . . . . . . . '|
// …/ . . . . . . . ./ . . . . . . .|
// ../ . . . . . . . .'/ . . . . . . .'|
// ./ . . . . . . . . / . . . . . . .'|
// '/ . . . . . . . . . . . . . . . .'|
// '| . . . . . \ . . . . . . . . . .|
// '| . . . . . . \„_^- „ . . . . .'|
// '| . . . . . . . . .'\ .\ ./ '/ . |
// | .\ . . . . . . . . . \ .'' / . '|
// | . . . . . . . . . . / .'/ . . .|
// | . . . . . . .| . . / ./ ./ . .|

// Reply
// ...................../´¯¯/)
// ...................,/¯.../
// .................../..../
// .............../´¯/'..'/´¯¯`·¸
// .........../'/.../..../....../¨¯\
// ..........('(....´...´... ¯~/'..')
// ...........\..............'...../
// ............\....\.........._.·´
// .............\..............(
// ..............\..............\
const verificationBtn = (btn, title, section, grid, array, timeBar, nextQuestion, lolo) => {
    btn.addEventListener("click", (e) => {
        clearInterval(lolo);
        const barTime = document.querySelector('.main__section__timer__bar');
        barTime.style.backgroundColor = "green";
        e.preventDefault();
        if (btn.dataset.id != 1) {
            btn.style.backgroundColor = 'red';
            points -= 10;
            setTimeout(() => {
                divScore.innerHTML = `Score : ${points}`;
            }, 1000);
            switchQuestion(title, section, grid, array, timeBar, nextQuestion);
        } else {
            btn.style.backgroundColor = 'green';
            points += 100;
            setTimeout(() => {
                divScore.innerHTML = `Score : ${points}`;
            }, 1000);
            switchQuestion(title, section, grid, array, timeBar, nextQuestion);

        }
    })
}
const switchQuestion = (title, section, grid, array, timeBar, nextQuestion) => {
    if (array.length == 0) {
        setTimeout(() => {
            title.innerHTML = `Score final : ${points}`;
            console.log("session terminé");
            main.removeChild(section);
        }, 1000);
    } else {

        setTimeout(() => {
            section.removeChild(timeBar);
            section.removeChild(grid);
            main.removeChild(title);
            section.appendChild(nextQuestion);
        }, 1000)
        setTimeout(() => {
            section.removeChild(nextQuestion);
            section.appendChild(timeBar)
            main.appendChild(title)
            createQuestion(title, array, section, timeBar, nextQuestion)
        }, 3000)
    }
}
const shuffleResponse = (arr) => {
    arr.sort(() => Math.random() - 0.5);
}
const createQuestion = (title, array, section, timeBar, nextQuestion) => {
    let arrayResponse = [];
    let testArr = Object.values(array[0]);
    title.innerHTML = testArr[0];
    let j = 0;

    const grid = document.createElement("div");
    grid.className = `main__section__grid`;
    grid.setAttribute('id', `${j}`);
    j++;
    let timeColor = "green";
    let progress = 100;
    setTimeout(() => {
        let lolo = setInterval(() => {
            if (progress <= 0) {
                clearInterval(lolo);
                switchQuestion(title, section, grid, array, timeBar, nextQuestion);
            } else {
                progress -= 0.10;
                timesUp(progress, timeColor);
            }
        }, 10);
        for (let i = 1; i < testArr.length; i++) {
            const blockResponse = document.createElement("div");
            const pResponse = document.createElement("p");
            pResponse.innerHTML = testArr[i];
            blockResponse.className = "main__section__grid__response";
            pResponse.innerHTML = testArr[i];
            blockResponse.dataset.id = i;
            blockResponse.appendChild(pResponse);
            arrayResponse.push(blockResponse);
            verificationBtn(blockResponse, title, section, grid, array, timeBar, nextQuestion, lolo);
        }
        shuffleResponse(arrayResponse);
        arrayResponse.forEach(el => {
            grid.appendChild(el)
        })
    }, 2000)
    //Implémente les réponses et créer les block en fonction du nombre de réponse

    section.appendChild(grid);
    main.appendChild(section);
    const barTime = document.querySelector('.main__section__timer__bar');
    barTime.style.background = `linear-gradient(to right,  ${timeColor} ${progress}%, #111 0%)`;
    array.splice('0', 1);

}

const score = () => {
    divScore.innerHTML = `Score : ${points}`;
    divScore.className = "main__score"
    main.appendChild(divScore);
}

const timesUp = (progress, timeColor) => {


    const timeBar = document.querySelector('.main__section__timer__bar');
    if (progress < 65 && progress > 30) {
        timeColor = "orange";
    } else if (progress < 30) {
        timeColor = "red";
    }
    timeBar.style.background = `linear-gradient(to right,  ${timeColor} ${progress}%, #111 0%)`;

}


export { chooseCategories };
export { startGame };