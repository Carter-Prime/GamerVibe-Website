"use strict";

const loginBtn = document.getElementById("js-loginBtn");
const signupBtn = document.getElementById("js-signupBtn");

loginBtn.addEventListener("click", () => {
  window.open(url + "/login.html", "_self", false);
});

signupBtn.addEventListener("click", () => {
  window.open(url + "/signUp.html", "_self", false);
});
