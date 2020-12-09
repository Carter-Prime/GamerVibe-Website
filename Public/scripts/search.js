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

form_users.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(input.value);
  doFetchUsers();
});

form_tags.addEventListener("click", (evt) => {
  evt.preventDefault();
  console.log(input.value);
  doFetchTags();
});

// async/await fetch tags
const doFetchTags = async () => {
  state.innerText = "Loading ...";
  state_posts.innerText = "";
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const res = await fetch(url + "/search/tagname/" + input.value, options);
    if (!res.ok) throw new Error("Data not fetched!");
    const data = await res.json();
    state.innerText = "";
    console.log(data);
    if (data.length === 0) {
      state.innerText = "Nothing found";
    } else {
      publishTags(data);
      state.innerText = "Results:";
    }
  } catch (err) {
    console.warn(err);
    state.innerText = "Something went wrong ...";
  }
};

// async/await users
const doFetchUsers = async () => {
  state.innerText = "Loading ...";
  state_posts.innerText = "";
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const res = await fetch(url + "/search/user/" + input.value, options);
    if (!res.ok) throw new Error("Data not fetched!");
    const data = await res.json();
    state.innerText = "";
    console.log(data);
    if (data.length === 0) {
      state.innerText = "Nothing found";
    } else {
      publishUsers(data);
      state.innerText = "Results:";
    }
  } catch (err) {
    console.warn(err);
    state.innerText = "Something went wrong ...";
  }
};

function publishUsers(data) {
  results.innerHTML = "";

  data.forEach((user) => {
    !user.username
      ? (tagname = "name not available")
      : (tagname = user.username);
    console.log(user.username);

    const p = document.createElement("p");
    p.classList.add("result-item");
    p.innerText = user.username;
    results.appendChild(p);

    p.addEventListener("click", async () => {
      state_posts.innerText = "Loading ...";
      posts_body.innerHTML = '';
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
        console.log(data);
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

function publishTags(data) {
  const empty = `<h2></h2>`;
  results.innerHTML = empty;

  data.forEach((item) => {
    !item.tag ? (tagname = "name not available") : (tagname = item.tag);
    console.log(item.tag);

    const p = document.createElement("p");
    p.classList.add("result-item");
    p.innerText = item.tag;
    results.appendChild(p);

    p.addEventListener("click", async () => {
      posts_body.innerHTML = '';
      state_posts.innerText = "Loading ...";
      try {
        const options = {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };
        const res = await fetch(url + "/search/tag/" + item.tag, options);
        if (!res.ok) throw new Error("Data not fetched!");
        const data = await res.json();
        state_posts.innerText = "";
        console.log(data);
        if (data.length === 0) {
          state_posts.innerText = `No public posts found for tag ${item.tag}`;
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
