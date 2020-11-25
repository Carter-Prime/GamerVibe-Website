"use strict";

const authenticateSignup = document.getElementById("js-authenticate-signup");
const addUserForm = document.getElementById("signup-form");

const registerUser = async () => {
  const data = serializeJson(addUserForm);
  console.log(data);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + "/auth/register", fetchOptions);
  const json = await response.json();
  console.log("user add response", json);

  // save token
  sessionStorage.setItem("token", json.token);
  sessionStorage.setItem("user", JSON.stringify(json.user));
  //open user profile
  window.open(url + "/home.html", "_self", false);
};
authenticateSignup.addEventListener("click", registerUser);
