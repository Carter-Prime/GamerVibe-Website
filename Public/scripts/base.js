"use strict";

const mainNav = document.getElementById("js-menu");
const navToggleBtn = document.getElementById("js-navbar-toggle");
const searchTab = document.getElementById("js-search-tab");
const homeTab = document.getElementById("js-home-tab");
const discoverTab = document.getElementById("js-discover-tab");
const followersTab = document.getElementById("js-followers-tab");
const accountTab = document.getElementById("js-account-tab");
const loginTab = document.getElementById("js-login-tab");
const logoutTab = document.getElementById("js-logout-tab");
const signupTab = document.getElementById("js-signup-tab");
const loggedInTab = document.querySelectorAll(".loggedInTab");
const profileContainer = document.getElementById("js-profile-container");
const likeBtn = document.getElementById("js-like-btn");

// selects navigation tabs to be toggled if a user is logged in.
const toggleLoggedInTabs = () => {
  loggedInTab.forEach((element) => {
    element.classList.toggle("hide");
  });
};

/**
 *  Toggle the menu for mobile and smaller screens
 */
const toggleMenu = () => {
  mainNav.classList.toggle("show");
};

/**
 *  Hides profile banner for anonymous users
 */
const toggleProfileBanner = () => {
  if (profileContainer) {
    profileContainer.style.display = "none";
  }
};

/**
 * test to see if user is banned, if true automatically logs the user out next time a
 * page is refreshed
 */
const isBanned = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    const response = await fetch(url + "/ban/", options);
    const isBanned = await response.json();
    if (isBanned == true) {
      logout();
    }
  } catch (e) {
    console.log(e.message);
  }
};

/**
 *  Logout of current user removing access token from server and client, along with session data.
 */
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
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("moderator_since");
    sessionStorage.removeItem("clickedPostUserId");

    alert(json.message);
    window.open(url + "/index.html", "_self", false);
  } catch (e) {
    console.log(e.message);
  }
};

/**
 *  Check to see type of user that is logged in and their access level. Will toggle tabs as appropriate.
 *  Also checks to make sure the account is not banned.
 */
if (user != null) {
  if (userModeratorStatus == null) {
    userType = "registered";
  } else {
    userType = "moderator";
  }
  toggleLoggedInTabs();
  isBanned();
} else {
  toggleProfileBanner();
}

navToggleBtn.addEventListener("click", toggleMenu);

/**
 *  Asks for confirmation before login out current user from website
 */
logoutTab.addEventListener("click", (Event) => {
  Event.preventDefault();
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    logout();
  }
});
