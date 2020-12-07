"use strict";

const accountForm = document.getElementById("js-user-account-form");
const accountBtn = document.getElementById("js-account-btn");
const profilePic = document.getElementById("js-profile-pic-upload");

accountBtn.addEventListener("click", async (Event) => {
  console.log("button clicked");
  Event.preventDefault();
  try {
    const data = serializeJson(accountForm);

    const putData = new FormData();
    putData.append("profilePic", profilePic.files[0]);

    console.log(data);
    const fetchOptions = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: putData,
      data,
    };

    const response = await fetch(url + "/user/", fetchOptions);
    const json = await response.json();
    getUserByID(json.user_id);

    console.log("response json: " + JSON.stringify(json));
  } catch (e) {
    console.log("error message: " + e);
  }
});
