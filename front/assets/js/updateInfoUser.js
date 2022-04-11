const path = "http://localhost:8000/api/user/profile/";
const token = localStorage.getItem("token");
const myUserUpdateForm = document.getElementById("my_userUpdateForm");
const updatedEmail = document.getElementById("updatedEmail");
const updatedUsername = document.getElementById("updatedUsername");
const updatedPassword = document.getElementById("updatedPassword");
const bio = document.getElementById("bio");
const image = document.getElementById("image");
const params = new URLSearchParams(location.search);
const idUser = params.get("id");

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
  myForm.append("id_user", idUser);
  myForm.append("token", token);
  console.log(myForm.values());
  updateUserInfo(myForm);
});
