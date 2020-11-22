"use strict";

const mainNav = document.getElementById("js-menu");

const toggleMenu = () => {
  mainNav.classList.toggle("show");
};

const fetchHome = () => {
  console.log("Home called");
};

const fetchLogin = () => {
  console.log("Login called");
};

const fetchDiscover = () => {
  console.log("Discover called");
};

const fetchSearch = () => {
  console.log("Search called");
};

const fetchFriends = () => {
  console.log("Friends called");
};

const fetchAccount = () => {
  console.log("Account called");
};

const loggedIn = () => {
  const linksExist = document.getElementById("Friends");

  if (linksExist == null) {
    const friendLink = document.createElement("li");
    friendLink.classList.add("nav-links");
    friendLink.id = "Friends";
    friendLink.textContent = "Friends";

    const accountLink = document.createElement("li");
    accountLink.classList.add("nav-links");
    accountLink.id = "Account";
    accountLink.textContent = "Account";

    mainNav.insertBefore(friendLink, mainNav.childNodes[3]);
    mainNav.insertBefore(accountLink, mainNav.childNodes[4]);
    document.querySelector("#Friends").addEventListener("click", fetchFriends);
    document.querySelector("#Account").addEventListener("click", fetchAccount);
  } else {
    console.log("these links already exist");
  }
};

document.getElementById("js-navbar-toggle").addEventListener("click", toggleMenu);

document.querySelector("#Home").addEventListener("click", fetchHome);

document.querySelector("#Login").addEventListener("click", fetchLogin);

document.querySelector("#Discover").addEventListener("click", fetchDiscover);

document.querySelector("#Search").addEventListener("click", fetchSearch);
