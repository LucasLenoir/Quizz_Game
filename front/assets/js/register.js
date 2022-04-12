const path = 'http://localhost:8000/api/';
const myForm = document.getElementById('my_form')
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const req = (input) => {
    const myInit = {
        method: "POST",
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(`${path}user/register`, myInit)
        .then((response) => {
            if (response.ok) window.location.assign('../../index.html');
        });
}
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const myInput = {
        username: username.value,
        email: email.value,
        password: password.value
    }
    req(myInput);
})

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