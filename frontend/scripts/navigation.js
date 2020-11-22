"use strict";
const url = "http://127.0.0.1:61909/GamerVibe-Website/frontend/";

const mainNav = document.getElementById("js-menu");
const navTabs = document.querySelectorAll(".nav-tab");
const loginBtn = document.querySelectorAll(".login-btn");
const signupBtn = document.querySelectorAll(".signUp-btn");
const friendsTab = document.getElementById("js-friends-tab");
const accountTab = document.getElementById("js-account-tab");
const authenticateLogin = document.getElementById("js-authenticate-login");
let showTabs = sessionStorage.getItem("showTabs");

if (showTabs) {
  friendsTab.classList.toggle("hide");
  accountTab.classList.toggle("hide");
}

const toggleMenu = () => {
  mainNav.classList.toggle("show");
};

const openTab = (event) => {
  console.log(event.target.id);
  switch (event.target.id) {
    case "js-search-tab":
      console.log("Search was called");
      break;
    case "js-home-tab":
      console.log("Home was called");
      window.open(`${url}` + "home.html", "_self", false);
      break;
    case "js-discover-tab":
      console.log("Discover was called");
      break;
    case "js-friends-tab":
      console.log("Friends was called");
      break;
    case "js-account-tab":
      console.log("Account was called");
      break;
    case "js-login-tab":
      console.log("Login was called");
      window.open(`${url}` + "login.html", "_self", false);
      break;
    case "js-signup-tab":
      console.log("Sign Up was called");
      window.open(`${url}` + "signUp.html", "_self", false);
      break;
    case "js-signup-link":
      console.log("Sign Up was called");
      window.open(`${url}` + "signUp.html", "_self", false);
      break;
    case "js-loginBtn":
      console.log("Login was called");
      window.open(`${url}` + "login.html", "_self", false);
      break;
    case "js-signupBtn":
      console.log("Signup was called");
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
