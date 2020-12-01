"use strict";

const profilePic = document.getElementById("js-profile-img");
const userName = document.getElementById("js-username");
const userPostNumber = document.getElementById("js-posts");
const userfollowers = document.getElementById("js-followers");
const userfollowering = document.getElementById("js-following");
const postBtn = document.getElementById("js-post-btn");
const discordLink = document.getElementById("js-discord");
const youtubeLink = document.getElementById("js-youtube");
const twitchLink = document.getElementById("js-twitch");

const setUserFollowering = async () => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/user/following/`, options);
    const followingList = await response.json();
    console.log("length is: " + followingList.length);
    userfollowering.innerText = `${followingList.length} Following`;
  } catch (e) {
    console.log(e.message);
  }
};

const displayUser = async (userId) => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/user/id/` + userId, options);
    const user = await response.json();
    console.log("The user is: " + user.username);
    userName.innerText = user.username;
  } catch (e) {
    console.log(e.message);
  }
};

if (userType === "moderator") {
  displayUser(user);
  setUserFollowering();
} else if (userType === "registered") {
  displayUser(user);
  setUserFollowering();
} else {
}
