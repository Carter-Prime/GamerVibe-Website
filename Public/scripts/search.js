"use strict";
const results = document.querySelector("results");
const form = document.querySelector("#search-form");
const input = document.querySelector("[name=search-field]");
const state = document.querySelector("h3");
let name;

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(input.value);

  doFetch();
});

// async/await fetch
const doFetch = async () => {
  state.innerText = "Loading ...";
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const res = await fetch(url + "/user/search/" + input.value, options);
    if (!res.ok) throw new Error("Data not fetched!");
    const data = await res.json();
    state.innerText = "";
    console.log(data);
    if (data.length === 0) {
      state.innerText = "Nothing found";
    } else {
      publish(data);
      state.innerText = "Results:";
    }
  } catch (err) {
    console.warn(err);
    state.innerText = "Something went wrong ...";
  }
};

// adds search results to html
function publish(data) {
  const empty = `<h2></h2>`;
  results.innerHTML = empty;

  data.forEach((user) => {
    !user.username ? (name = "name not available") : (name = user.username);

    console.log(user.username);

    const html = `<hr>
        <article>
            <header>
                <p>${user.username}</p>
            </header>
        </article>`;
    results.innerHTML += html;
  });
}
