"use strict";

const authenticateLogin = document.getElementById("js-authenticate-login");
const loginForm = document.getElementById("login-form");

const toggleHide = async (event) => {
  event.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + "auth/login", fetchOptions);
  const json = await response.json();
  console.log("login response", json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem("token", json.token);
    sessionStorage.setItem("user", json.user.email);
    console.log(sessionStorage.getItem("token"));
    console.log(json.user.email);
    //open user profile
    window.open(`${url}` + "userProfile.html", "_self", false);
  }
};

authenticateLogin.addEventListener("click", toggleHide);

//Login submit form
