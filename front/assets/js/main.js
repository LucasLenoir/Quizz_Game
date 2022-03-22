const main = document.querySelector("main");
const containerCat = document.querySelector(".main__container");
const btnPlay = document.querySelector(".main__form__btn");
const titleMain = document.querySelector(".main__title");
const btnInscription = document.querySelector("#inscriptionBtn");
const formInscription = [];

function createSection() {
  const sectionMain = document.createElement("section");
  const divTime = document.createElement("div");
  const imgTimer = document.createElement("img");
  const timeBar = document.createElement("div");
  const grid = document.createElement("div");
  const btnValidate = document.createElement("button");

  divTime.className = "main__section__timer";
  sectionMain.className = "main__section";
  timeBar.className = "main__section__timer__bar";
  grid.className = "main__section__grid";
  btnValidate.className = "main__section__btn";
  btnValidate.innerHTML = "Valider";

  for (i = 0; i < 4; i++) {
    const blockResponse = document.createElement("div");
    const pResponse = document.createElement("p");

    pResponse.innerHTML = `Brakmar ${i + 1}`;
    blockResponse.className = "main__section__grid__response";

    blockResponse.appendChild(pResponse);
    grid.appendChild(blockResponse);
  }

  imgTimer.src = "./front/assets/img/ClockTimer.png";
  divTime.appendChild(imgTimer);
  divTime.appendChild(timeBar);
  sectionMain.appendChild(divTime);
  sectionMain.appendChild(grid);
  sectionMain.appendChild(btnValidate);
  main.appendChild(sectionMain);
}

btnPlay.addEventListener("click", (e) => {
  e.preventDefault();
  main.removeChild(containerCat);
  createSection();
  titleMain.innerHTML = "Quel nom porte mon gros sexe?";
});

btnInscription.addEventListener("click", () => {
  formInscription.push(username, email, password);
  fetch("/inscription", {
    method: "POST",
    body: "json.stringify(formIncription)",
  }).then((res) => {
    questions = res;
  });
});
