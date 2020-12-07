"use strict";

const accountForm = document.getElementById("js-user-account-form");
const accountBtn = document.getElementById("js-account-btn");
const profilePic = document.getElementById("js-profile-pic-upload");
const fnamePara = document.getElementById("first-name-para");
const lnamePara = document.getElementById("last-name-para");
const emailPara = document.getElementById("email-para");
const privacyPara = document.getElementById("privacy-para");

accountBtn.addEventListener("click", async (Event) => {
  console.log("button clicked");
  Event.preventDefault();
  try {
    const data = serializeJson(accountForm);
    console.log("data" + data);

    const putData = new FormData();
    putData.append("profilePic", profilePic.files[0]);
    putData.append("fname", data.fname);
    putData.append("lname", data.lname);
    putData.append("discord", data.discord);
    putData.append("youtube", data.youtube);
    putData.append("twitch", data.twitch);
    putData.append("private", data.private);

    console.log("form data: " + putData);
    const fetchOptions = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: putData,
    };

    const response = await fetch(url + "/user/", fetchOptions);
    const newUserDetails = await response.json();
    getUserByID(newUserDetails.user_id);
    setAccountInfo(newUserDetails.user_id);
  } catch (e) {
    console.log("error message: " + e);
  }
});

const setAccountInfo = async (userId) => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/user/id/` + userId, options);
    const user = await response.json();
    if (user.user_id != null) {
      fnamePara.innerText = user.fname;
      lnamePara.innerText = user.lname;
      emailPara.innerText = user.email;

      if (user.private_acc == 1) {
        privacyPara.innerText = "Account is Private";
      } else if (user.private_acc == 0) {
        privacyPara.innerText = "Account is Public";
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};

if (userType != "anonymous") {
  setAccountInfo(user);
}
