"use strict";

const username = document.getElementById("username");

const setProfile = () => {
  username.innerText = user.username;
};

setProfile();

console.log(JSON.parse(sessionStorage.getItem("user")));
