"use strict";

const authenticateLogin = document.getElementById("js-authenticate-login");
const loginForm = document.getElementById("login-form");
const signUpLink = document.getElementById("js-signup-link");

//Login submit form

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + "/auth/login", fetchOptions);
  const json = await response.json();
  console.log("login response", json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem("token", json.token);
    sessionStorage.setItem("userId", JSON.stringify(json.user.user_id));
    sessionStorage.setItem("moderatorSince", JSON.stringify(json.user.moderator_since));
    //open user profile
    window.open(url + "/home.html", "_self", false);
  }
});

signUpLink.addEventListener("click", () => {
  window.open(url + "/signUp.html", "_self", false);
});
