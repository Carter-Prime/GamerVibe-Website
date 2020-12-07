"use strict";

const userInfoPanel = document.getElementById("user-info");
const profileDetailsPannel = document.getElementById("profile-details");
const userName = document.getElementById("js-username");
const userPostNumber = document.getElementById("js-posts");
const userFollowers = document.getElementById("js-followers");
const userFollowering = document.getElementById("js-following");
const postBtn = document.getElementById("js-post-btn");
const followBtn = document.getElementById("js-follow-btn");
const discordLink = document.getElementById("js-discord-link");
const youtubeLink = document.getElementById("js-youtube-link");
const twitchLink = document.getElementById("js-twitch-link");
const profileDetail = document.getElementById("js-profile-details");
const blockBtn = document.getElementById("js-block-btn");
const banBtn = document.getElementById("js-ban-btn");

const htmlDecoder = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

const getUserByID = async (userId) => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/user/id/` + userId, options);
    const user = await response.json();
    console.log("get user id called: " + user.user_id);
    if (user.user_id != null) {
      setProfileBanner(user);
    }
  } catch (e) {
    console.log(e.message);
  }
};

const setProfileBanner = (userInfo) => {
  console.log("set profile called: userinfo: " + userInfo.user_id + " logged in user id: " + user);

  // comparing session user id with clicked user information and toggles UI elements visibility
  if (user == userInfo.user_id) {
    postBtn.classList.remove("hide");
    followBtn.classList.add("hide");
    blockBtn.classList.add("hide");
  } else {
    postBtn.classList.add("hide");
    followBtn.classList.remove("hide");
    blockBtn.classList.remove("hide");
  }

  // extra features are visible for moderator accounts only
  if (userType == "moderator" && user != userInfo.user_id) {
    banBtn.classList.remove("hide");
  } else {
    banBtn.classList.add("hide");
  }

  if (document.getElementById("js-profile-img") != null) {
    document.getElementById("js-profile-img").remove();
  }

  const img = document.createElement("img");
  img.src = url + "/profile-pics/" + userInfo.imagename;
  img.alt = userInfo.imagename;
  img.setAttribute("id", "js-profile-img");

  userInfoPanel.append(img);

  userName.innerText = userInfo.username;
  userPostNumber.innerText = `${userInfo.posts} Posts`;
  userFollowers.innerText = `${userInfo.followers} Followers`;
  userFollowering.innerText = `${userInfo.following} Following`;

  if (userInfo.discord != null) {
    const decode = htmlDecoder(userInfo.discord);
    discordLink.setAttribute("href", decode);
  }
  if (userInfo.youtube != null) {
    const decode = htmlDecoder(userInfo.youtube);
    youtubeLink.setAttribute("href", decode);
  }
  if (userInfo.twitch != null) {
    const decode = htmlDecoder(userInfo.twitch);
    twitchLink.setAttribute("href", decode);
  }
  postBtn.addEventListener("click", (Event) => {
    Event.preventDefault();
    createPost();
  });

  // listener to block an account of a user can be done my moderator or registered user
  blockBtn.addEventListener("click", (Event) => {
    Event.stopImmediatePropagation();
    Event.preventDefault();
    console.log("block button pressed");
  });

  // listener to ban an account of a user can be done my moderator
  banBtn.addEventListener("click", (Event) => {
    Event.stopImmediatePropagation();
    Event.preventDefault();
    console.log("ban button pressed");
  });

  // followBtn.addEventListener("click"),
  //   async (Event) => {
  //     Event.preventDefault();
  //   };
};

if (userType != "anonymous") {
  getUserByID(user);
}
