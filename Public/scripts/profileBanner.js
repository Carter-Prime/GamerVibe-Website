"use strict";

const profilePic = document.getElementById("js-profile-img");
const userName = document.getElementById("js-username");
const userPostNumber = document.getElementById("js-posts");
const userFollowers = document.getElementById("js-followers");
const userFollowering = document.getElementById("js-following");
const postBtn = document.getElementById("js-post-btn");
const discordLink = document.getElementById("js-discord-link");
const youtubeLink = document.getElementById("js-youtube-link");
const twitchLink = document.getElementById("js-twitch-link");
const profileDetail = document.getElementById("js-profile-details");

const htmlDecoder = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

const displayUser = async (userId) => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/user/id/` + userId, options);
    const json = await response.json();
    if (user != userId) {
      postBtn.classList.toggle("hide");
    }
    userName.innerText = json.username;
    if (json.discord != null) {
      const decode = htmlDecoder(user.discord);
      discordLink.setAttribute("href", decode);
    }
    if (json.youtube != null) {
      const decode = htmlDecoder(json.youtube);
      youtubeLink.setAttribute("href", decode);
    }
    if (json.twitch != null) {
      const decode = htmlDecoder(json.twitch);
      twitchLink.setAttribute("href", decode);
    }
  } catch (e) {
    console.log(e.message);
  }
};

const setUserFollowering = async () => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/user/following/`, options);
    const followingList = await response.json();
    userFollowering.innerText = `${followingList.length} Following`;
  } catch (e) {
    console.log(e.message);
  }
};

const setUserFollowers = async () => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/user/followers`, options);
    const followersList = await response.json();
    userFollowers.innerText = `${followersList.length} Followers`;
  } catch (e) {
    console.log(e.message);
  }
};

const setNumberOfPosts = async () => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/user/posts`, options);
    const userPostList = await response.json();
    userPostNumber.innerText = `${userPostList.length} Posts`;
  } catch (e) {
    console.log(e.message);
  }
};

if (userType != "anonymous") {
  if (userType === "moderator") {
    console.log("extra stuff as moderator");
  }
  if (userType === "registered") {
    console.log("extra stuff as registered user");
  }
  displayUser(user);
  setUserFollowering();
  setUserFollowers();
  setNumberOfPosts();
}
