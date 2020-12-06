"use strict";
const results = document.querySelector("results");
const form_tags = document.querySelector("#search-form-tags");
const form_users = document.querySelector("#search-form-users");
const input = document.querySelector("[name=search-field]");
const state = document.querySelector("h3");
let name;
let tagname;

form_users.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(input.value);
  doFetchUsers();
});

form_tags.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(input.value);
  doFetchTags();
});

// async/await fetch tags
const doFetchTags = async () => {
  state.innerText = "Loading ...";
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const res = await fetch(url + "/post/search/tag/" + input.value, options);
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
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const res = await fetch(url + "/user/search/name/" + input.value, options);
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

// adds search results to html
function publishUsers(data) {
  const empty = `<h2></h2>`;
  results.innerHTML = empty;

  data.forEach((user) => {
    !user.username ? (name = "name not available") : (name = user.username);

    console.log(user.username);

    const html = `<hr>
        <article>
            <header>
                <a href="${url}/user/${user.username}">${user.username}</a>
            </header>
        </article>`;
    results.innerHTML += html;
  });
}

function publishTags(data) {
  const empty = `<h2></h2>`;
  results.innerHTML = empty;

  data.forEach((item) => {
    !item.tag ? (tagname = "name not available") : (tagname = item.tag);

    console.log(item.tag);

    const html = `<hr>
        <article>
            <header>
                <a href="${url}/tag/${item.tag}">${item.tag}</a>
            </header>
        </article>`;
    results.innerHTML += html;
  });
}
