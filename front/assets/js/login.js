const path = "http://localhost:8000/api/";
const myForm = document.getElementById("my_form");
const username = document.getElementById("username");
const password = document.getElementById("password");

const req = (input) => {
  const myInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(input),
  };
  fetch(`${path}user/login`, myInit)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      const { id_user, token } = res;
      localStorage.setItem("token", token);
      localStorage.setItem("id_user", id_user);

      return window.location.assign(`../pages/user.html?id=${id_user}`);
    });
};
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const myForm = {
    username: username.value,
    password: password.value,
  };
  req(myForm);
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