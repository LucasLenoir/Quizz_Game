const path = "http://localhost:8000/api/user/profile/";
const token = localStorage.getItem("token");
const myUserUpdateForm = document.getElementById("my_userUpdateForm");
const updatedEmail = document.getElementById("updatedEmail");
const updatedUsername = document.getElementById("updatedUsername");
const updatedPassword = document.getElementById("updatedPassword");
const bio = document.getElementById("bio");
const image = document.getElementById("image");
const params = new URLSearchParams(location.search);
const idUser = params.get('id');

//! Upadte User Info
const updateUserInfo = (input) => {
  const myInit = {
    method: "POST",
    body: input,
  };
  fetch(`${path}infos/update`, myInit).then((response) => {
    if (response.ok) window.location.assign(`./user.html?id=${idUser}`);
  });
};
myUserUpdateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const myForm = new FormData(myUserUpdateForm);
  myForm.append('id_user', idUser);
  myForm.append('token', token);
  updateUserInfo(myForm);
});


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