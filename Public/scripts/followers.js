"use strict";

const blockedUserListBtn = document.getElementById("js-blocked-list-btn");

getFollowerPosts();

blockedUserListBtn.addEventListener("click", async (Event) => {
  Event.preventDefault();
  console.log("block list button pressed");
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    const response = await fetch(url + "/block/", options);
    const blockedUserList = await response.json();
    console.log("blocked user list: " + JSON.stringify(blockedUserList, null, 1));
    if (blockedUserList != null) {
    }
  } catch (e) {
    console.log(e.message);
  }
});
