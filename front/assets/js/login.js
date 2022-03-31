const path = "http://localhost:8000/api/";
const myForm = document.getElementById("my_form");
const username = document.getElementById("username");
const password = document.getElementById("password");

const req = (input) => {
  const myInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // credentials: "include",

    body: JSON.stringify(input),
  };
  fetch(`${path}user/login`, myInit)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      const token = res;
      const name = res.name;
      const value = res.value;
      const expires = res.expires;
      console.log(res.name);
      const newCookie = (` ${name}`, `${value}`, ` ${expires}`);
      document.cookie = newCookie;
      const id = res.id_user;

      ("jwt=tamere; Max-Age=86400;HttpOnly:true");

      document.cookie = token;
      //   document.cookie.name = "jwt";

      return window.location.assign(`../pages/user.html?id=${id}`);

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
