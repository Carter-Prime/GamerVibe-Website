"use strict";

const getUserPosts = async () => {
  try {
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 20,
      }),
    };

    const response = await fetch(url + "/posts/discover", options);
    const discoverPosts = await response.json();

    createDiscoverCards(discoverPosts);
    if (userType != "anonymous") {
      getUserByID(user);
    }
  } catch (e) {
    console.log(e.message);
  }
};
