"use strict";

const toggleHide = () => {
  friendsTab.classList.toggle("hide");
  accountTab.classList.toggle("hide");
  if (showTabs) {
    sessionStorage.setItem("showTabs", false);
  } else {
    sessionStorage.setItem("showTabs", true);
  }
};

authenticateLogin.addEventListener("click", toggleHide);
