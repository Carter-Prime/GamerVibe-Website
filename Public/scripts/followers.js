"use strict";

const createBlockList = (list) => {
  if (window.location.pathname === "/followers.html") {
    blockedUserListBtn.classList.add("hide");
  }
  mainBody.innerHTML = "";
  const newCard = document.createElement("div");
  newCard.classList.add("card-detail");

  const backSpan = document.createElement("span");
  backSpan.classList.add("icon", "blocked-back-btn");
  backSpan.setAttribute("id", "js-back-btn");
  backSpan.innerHTML = `<i class="fas fa-arrow-left fa-2x"></i><p>Back</p>`;

  backSpan.addEventListener("click", (Event) => {
    Event.preventDefault();
    getFollowerPosts();
    blockedUserListBtn.classList.remove("hide");
  });

  newCard.append(backSpan);

  for (let i = 0; i < list.length; i++) {
    console.log(list[i]);
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item-div");

    const newHeader = document.createElement("h3");
    newHeader.classList.add("account-labels");
    newHeader.innerText = list[i].BlockedUsername;

    const unblockSpan = document.createElement("span");
    unblockSpan.setAttribute("id", "js-unblock-btn");
    unblockSpan.innerHTML = `<i class="fas fa-check"></i><p>Unblock</p>`;

    itemDiv.append(newHeader, unblockSpan);
    newCard.append(itemDiv);

    unblockSpan.addEventListener("click", async (Event) => {
      Event.stopImmediatePropagation();
      Event.preventDefault();
      console.log(list[i]);
    });
  }
  mainBody.append(newCard);
};

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
    if (blockedUserList != null) {
      createBlockList(blockedUserList);
    }
  } catch (e) {
    console.log(e.message);
  }
});

// bannedUserListBtn.addEventListener("click", async (Event) => {
//   Event.preventDefault();
//   console.log("block list button pressed");
//   try {
//     const options = {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token"),
//       },
//     };

//     const response = await fetch(url + "/ban/", options);
//     const blockedUserList = await response.json();
//     console.log("blocked user list: " + JSON.stringify(blockedUserList, null, 1));
//     if (blockedUserList != null) {
//     }
//   } catch (e) {
//     console.log(e.message);
//   }
// });

getFollowerPosts();
