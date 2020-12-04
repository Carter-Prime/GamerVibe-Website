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

const htmlDecoder = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

const getUserByID = async (userId, hideBtn) => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/user/id/` + userId, options);
    const user = await response.json();
    setProfileBanner(user, hideBtn);
  } catch (e) {
    console.log(e.message);
  }
};

const setProfileBanner = (userInfo) => {
  console.log(userInfo);

  console.log(`${user} and userinfo id ${userInfo.user_id}`);
  if (user == userInfo.user_id) {
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

  // if (userInfo.discord != null) {
  //   const decode = htmlDecoder(user.discord);
  //   discordLink.setAttribute("href", decode);
  // }
  // if (userInfo.youtube != null) {
  //   const decode = htmlDecoder(json.youtube);
  //   youtubeLink.setAttribute("href", decode);
  // }
  // if (userInfo.twitch != null) {
  //   const decode = htmlDecoder(json.twitch);
  //   twitchLink.setAttribute("href", decode);

  postBtn.addEventListener("click", (Event) => {
    Event.preventDefault();
    console.log("post button clicked");
    createPost();
  });

  console.log(`comparing user ${user} with userInfo.user_id ${userInfo.user_id}`);
  if (user == userInfo.user_id) {
    postBtn.classList.remove("hide");
    followBtn.classList.add("hide");
    blockBtn.classList.add("hide");
  } else {
    postBtn.classList.add("hide");
    followBtn.classList.remove("hide");
    blockBtn.classList.remove("hide");
  }
};

if (userType != "anonymous") {
  console.log("calling here " + user);
  getUserByID(user);
}
