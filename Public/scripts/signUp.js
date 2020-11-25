"use strict";

const authenticateSignup = document.getElementById("js-authenticate-signup");
const addUserForm = document.getElementById("signup-form");

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
    // save token
    if (json.user) {
      sessionStorage.setItem("token", json.token);
      sessionStorage.setItem("user", JSON.stringify(json.user));
      //open user profile
      window.open(url + "/home.html", "_self", false);
    } else {
      alert(json);
    }
  } else {
    alert("passwords do not match try again");
  }
});
