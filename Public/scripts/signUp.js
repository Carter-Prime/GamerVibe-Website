"use strict";

const authenticateSignup = document.getElementById("js-authenticate-signup");
const addUserForm = document.getElementById("signup-form");
/**
 * Upon signing up, if successful will automatically login and send the user to their personal feed.
 */
const registerUser = addUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = serializeJson(addUserForm);

  if (data.password === data.password_check) {
    console.log("fetch login");
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url + "/auth/register", fetchOptions);
    const json = await response.json();
    console.log("json response", json);

    if (json.user) {
      // save token
      sessionStorage.setItem("token", json.token);
      sessionStorage.setItem("userId", JSON.stringify(json.user.user_id));
      sessionStorage.setItem("moderatorSince", JSON.stringify(json.user.moderator_since));
      //open user profile
      window.open(url + "/home.html", "_self", false);
    } else {
      alert(json);
    }
  } else {
    alert("passwords do not match try again");
  }
});
