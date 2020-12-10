"use strict";
const results = document.querySelector("results");
const form_tags = document.querySelector("#search-form-tags");
const form_users = document.querySelector("#search-form-users");
const input = document.querySelector("[name=search-field]");
const posts_body = document.querySelector("#js-main-body");
const state = document.querySelector("h3");
const state_posts = document.querySelector("h4");
let name;
let tagname;

// Submit listener on search forms (two forms, 1 input)
form_users.addEventListener("submit", (evt) => {
  evt.preventDefault();
  results.innerHTML = "";
  doFetch("user");
});

form_tags.addEventListener("click", (evt) => {
  evt.preventDefault();
  results.innerHTML = "";
  doFetch("tag");
});

// Fetch tags with tagname
const doFetch = async (what) => {
  state.innerText = "Loading ...";
  state_posts.innerText = "";
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const res = await fetch(
      url + "/search/" + what + "/" + input.value,
      options
    );
    if (!res.ok) throw new Error("Data not fetched!");
    const data = await res.json();
    state.innerText = "";
    if (data.length === 0) {
      state.innerText = "Nothing found";
    } else {
      if (what == "tag") {
        publishTags(data);
      } else {
        publishUsers(data, what);
      }
      state.innerText = "Results:";
    }
  } catch (err) {
    console.warn(err);
    state.innerText = "Something went wrong ...";
  }
};

/**
 * @param {*} data list of search results of users
 *  Creates and populates search items and appends to html
 */
function publishUsers(data) {
  results.innerHTML = ""; //clear previous search

  data.forEach((user) => {
    const item = document.createElement("p");
    item.classList.add("result-item");
    item.innerText = user.username;
    results.appendChild(item);

    item.addEventListener("click", async () => {
      state_posts.innerText = "Loading ...";
      posts_body.innerHTML = "";
      try {
        const options = {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };
        const res = await fetch(
          url + "/search/username/" + user.username,
          options
        );
        if (!res.ok) throw new Error("Data not fetched!");
        const data = await res.json();
        state_posts.innerText = "";
        if (data.length === 0) {
          state_posts.innerText = `User ${user.username} has no public posts`;
        } else {
          createDiscoverCards(data);
        }
      } catch (err) {
        console.warn(err);
        state_posts.innerText = "Something went wrong ...";
      }
    });
  });
}

/**
 * @param {*} data list of search results of tags
 *  Creates and populates search items and appends to html
 */
function publishTags(data) {
  results.innerHTML = "";

  data.forEach((result) => {
    const item = document.createElement("p");
    item.classList.add("result-item");
    item.innerText = result.tag;
    results.appendChild(item);

    item.addEventListener("click", async () => {
      posts_body.innerHTML = "";
      state_posts.innerText = "Loading ...";
      try {
        const options = {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };
        const res = await fetch(url + "/search/tagname/" + result.tag, options);
        if (!res.ok) throw new Error("Data not fetched!");
        const data = await res.json();
        state_posts.innerText = "";
        if (data.length === 0) {
          state_posts.innerText = `No public posts found for tag ${result.tag}`;
        } else {
          createDiscoverCards(data);
        }
      } catch (err) {
        console.warn(err);
        state_posts.innerText = "Something went wrong ...";
      }
    });
  });
}
