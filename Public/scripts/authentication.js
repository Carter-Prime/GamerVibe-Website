"use strict";

const url = "https://localhost:8000";
//const url = "https://10.114.32.110/app/";

const headTitle = document.getElementById("head-title");
const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("userId"));
const userModeratorStatus = JSON.parse(sessionStorage.getItem("moderatorSince"));

let userType = null;

/* handles authentication access to specific webpages. If tried to access without account 
redirects to landing page.*/

if (user == null) {
  if (
    headTitle.innerText == "GamerVibe Home" ||
    headTitle.innerText == "GamerVibe Account" ||
    headTitle.innerText == "GamerVibe Friends"
  ) {
    window.open(url + "/index.html", "_self", false);
  } else {
    userType = "anonymous";
    console.log("user type is: " + userType);
  }
}
