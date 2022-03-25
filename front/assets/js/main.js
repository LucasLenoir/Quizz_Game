import { reqQuestion } from "./createGame.js";
import { reqCategories } from "./reqCat.js";

const main = document.querySelector("main");
const containerCat = document.querySelector(".main__container");
const btnPlay = document.querySelector(".main__form__btn");
const mainForm = document.querySelector('.main__form');

const path = 'http://localhost:8000/api/';

btnPlay.addEventListener("click", (e) => {
  e.preventDefault();
  main.removeChild(containerCat);
  main.removeChild(mainForm);
  reqQuestion(path);
});
// reqCategories(path);