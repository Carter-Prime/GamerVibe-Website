"use strict";

const url = "http://127.0.0.1:61909/GamerVibe-Website/frontend/";
const url = "https://10.114.32.110/app/";

const mainNav = document.getElementById("js-menu");
const navTabs = document.querySelectorAll(".nav-tab");
const loginBtn = document.querySelectorAll(".login-btn");
const logo = document.getElementById("js-logo");
const signupBtn = document.querySelectorAll(".signUp-btn");
const friendsTab = document.getElementById("js-friends-tab");
const accountTab = document.getElementById("js-account-tab");
const homeTab = document.getElementById("js-home-tab");
const loginTab = document.getElementById("js-login-tab");
const signupTab = document.getElementById("js-signup-tab");

const toggleMenu = () => {
  mainNav.classList.toggle("show");
};

const openTab = (event) => {
  console.log(event.target.id);
  switch (event.target.id) {
    case "js-search-tab":
      window.open(`${url}` + "search.html", "_self", false);
      break;
    case "logo-title":
      window.open(`${url}` + "index.html", "_self", false);
      break;
    case "js-home-tab":
      window.open(`${url}` + "userProfile.html", "_self", false);
      break;
    case "js-discover-tab":
      window.open(`${url}` + "discover.html", "_self", false);
      break;
    case "js-friends-tab":
      window.open(`${url}` + "friends.html", "_self", false);
      break;
    case "js-account-tab":
      window.open(`${url}` + "account.html", "_self", false);
      break;
    case "js-login-tab":
      window.open(`${url}` + "login.html", "_self", false);
      break;
    case "js-signup-tab":
      window.open(`${url}` + "signUp.html", "_self", false);
      break;
    case "js-signup-link":
      window.open(`${url}` + "signUp.html", "_self", false);
      break;
    case "js-loginBtn":
      window.open(`${url}` + "login.html", "_self", false);
      break;
    case "js-signupBtn":
      window.open(`${url}` + "signUp.html", "_self", false);
      break;
    default:
      console.log("default was called");
  }
};

document.getElementById("js-navbar-toggle").addEventListener("click", toggleMenu);

navTabs.forEach((link) => {
  link.addEventListener("click", openTab);
});

logo.addEventListener("click", openTab);
