"use strict";

const url = "https://localhost:8000";
//const url = "https://10.114.32.110/app/";

const mainNav = document.getElementById("js-menu");
const navToggleBtn = document.getElementById("js-navbar-toggle");
const searchTab = document.getElementById("js-search-tab");
const homeTab = document.getElementById("js-home-tab");
const discoverTab = document.getElementById("js-discover-tab");
const friendsTab = document.getElementById("js-friends-tab");
const accountTab = document.getElementById("js-account-tab");
const loginTab = document.getElementById("js-login-tab");
const logoutTab = document.getElementById("js-logout-tab");
const signupTab = document.getElementById("js-signup-tab");
const loggedInTab = document.querySelectorAll(".loggedInTab");

const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));

// selects navigation tabs to be toggled if a user is logged in.
const toggleLoggedInTabs = () => {
  loggedInTab.forEach((element) => {
    element.classList.toggle("hide");
  });
};

//  Logs out user and removes user and token
const logout = async () => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(url + "/auth/logout", options);
    const json = await response.json();
    console.log(json);
    // remove token
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    alert(json.message);
    window.location.href = "/"
  } catch (e) {
    console.log(e.message);
  }
};

//test to see if users are logged in
if (user) {
  console.log("you are logged in and can see everything");
  toggleLoggedInTabs();
} else {
  console.log("you are not logged in");
}

// Toggle function for mobiles and smaller screens
const toggleMenu = () => {
  mainNav.classList.toggle("show");
};

//event listeners
navToggleBtn.addEventListener("click", toggleMenu);

logoutTab.addEventListener("click", logout);
