"use strict";

const authenticateLogin = document.getElementById("js-authenticate-login");
const loginForm = document.getElementById("login-form");

const toggleHide = async (event) => {
  event.preventDefault();
  const data = serializeJson(loginForm);
  console.log(data);
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
    sessionStorage.setItem("user", JSON.stringify(json.user));
    //open user profile
    window.open(url + "/home.html", "_self", false);
  }
};

authenticateLogin.addEventListener("click", toggleHide);

//Login submit form
