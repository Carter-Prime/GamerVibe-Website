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

/**
 *
 * @param {*} input escaped url address to be decoded
 *  Decodes escaped url links and returns a clean url.
 */
const htmlDecoder = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

/**
 *
 * @param {*} userId user Id to be fetched
 *  Fetches user data and calls setProfileBanner based on the response information
 */
const getUserByID = async (userId) => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/user/id/` + userId, options);
    const user = await response.json();
    if (user != null) {
      setProfileBanner(user);
    }
  } catch (e) {
    console.log(e.message);
  }
};

/**
 *
 * @param {*} userInfo a array of information on a user
 *
 *  Sets the profile banner with the information from the server. This includes usernames,
 *  profile pictures, media links and follower information.
 */
const setProfileBanner = (userInfo) => {
  /**
   *  Checks that the user requested is the currently logged in account, and shows
   *  buttons appropriately.
   */
  if (user == userInfo.user_id) {
    postBtn.classList.remove("hide");
    followBtn.classList.add("hide");
    blockBtn.classList.add("hide");
  } else {
    postBtn.classList.add("hide");
    followBtn.classList.remove("hide");
    blockBtn.classList.remove("hide");

    isFollower(userInfo.user_id, followBtn);

    followBtn.addEventListener("click", async (Event) => {
      Event.preventDefault();
      console.log("follow btn is clicked" + Event.target.innerText);
      const data = userInfo.user_id;
      console.log(data);
      if (Event.target.innerText == "Follow") {
        try {
          const options = {
            method: "POST",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: data,
            }),
          };

          const response = await fetch(url + "/follow/", options);
          const followPosts = await response.json();
          if (followPosts != null) {
            followBtn.innerText = "un-Follow";
            getUserByID(userInfo.user_id);
          }
        } catch (e) {
          console.log(e.message);
        }
      } else {
        try {
          const options = {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: data,
            }),
          };

          const response = await fetch(url + "/follow/", options);
          const unfollowPosts = await response.json();
          if (unfollowPosts != null) {
            followBtn.innerText = "Follow";
            getUserByID(userInfo.user_id);
          }
        } catch (e) {
          console.log(e.message);
        }
      }
    });
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
};

if (userType != "anonymous") {
  getUserByID(user);
}
