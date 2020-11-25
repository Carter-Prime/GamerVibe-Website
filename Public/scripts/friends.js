"use strict";

/* Checks status of user if they have a token or not. This will redirect if they try to access 
   this tab via url without a token */

if (sessionStorage.getItem("token")) {
  console.log("you are logged in and can see everything");
} else {
  console.log("you are not logged in and will be routed to the next page");
  window.open(url + "/index.html", "_self", false);
}
