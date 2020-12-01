"use strict";

const profilePic = document.getElementById("js-profile-img");
const userName = document.getElementById("js-username");
const userPostNumber = document.getElementById("js-username");
const userfollowers = document.getElementById("js-followers");
const userfollowering = document.getElementById("js-followering");
const postBtn = document.getElementById("js-post-btn");
const discordLink = document.getElementById("js-discord");
const youtubeLink = document.getElementById("js-youtube");
const twitchLink = document.getElementById("js-twitch");

const anonymousUserBanner = () => {};

const registeredUserBanner = () => {};

const moderatorUserBanner = () => {};

const newPost = () => {};

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
