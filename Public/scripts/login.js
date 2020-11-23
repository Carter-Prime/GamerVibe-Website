"use strict";

const authenticateLogin = document.getElementById("js-authenticate-login");

const toggleHide = () => {
  window.open(`${url}` + "userProfile.html", "_self", false);
};

authenticateLogin.addEventListener("click", toggleHide);

//Login submit form
