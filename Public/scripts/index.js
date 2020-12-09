"use strict";

const loginBtn = document.getElementById("js-loginBtn");
const signupBtn = document.getElementById("js-signupBtn");

/**
 * Event listeners for navigating to login and signup pages
 */
loginBtn.addEventListener("click", () => {
  window.open(url + "/login.html", "_self", false);
});

signupBtn.addEventListener("click", () => {
  window.open(url + "/signUp.html", "_self", false);
});

/**
 * Checks the user type and will hide buttons if logged in.
 */

if (userType != "anonymous") {
  loginBtn.classList.add("hide");
  signupBtn.classList.add("hide");
} else {
  loginBtn.classList.remove("hide");
  signupBtn.classList.remove("hide");
}
