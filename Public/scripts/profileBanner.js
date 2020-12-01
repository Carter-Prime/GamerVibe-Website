"use strict";

const username = document.getElementById("username");

const setProfile = () => {
  if (userType === "moderator") {
    username.innerText = `This person is a moderator ${user.username}`;
  } else if (userType === "registered") {
    username.innerText = `This person is registered ${user.username}`;
  } else {
    username.innerText = `This person is an anonymous user`;
  }
};

setProfile();

const anonymousUserBanner = () => {};

const registeredUserBanner = () => {};

const moderatorUserBanner = () => {};
