"use strict";

const authenticateSignup = document.getElementById("js-authenticate-signup");

const toggleHide = () => {
  window.open(`${url}` + "userProfile.html", "_self", false);
};

authenticateSignup.addEventListener("click", toggleHide);
