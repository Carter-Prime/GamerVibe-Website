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
    const res = await fetch(
      `https://api.tvmaze.com/search/shows?q=${input.value}`
    );
    if (!res.ok) throw new Error("Data not fetched!");
    const data = await res.json();
    state.innerText = "";
    publish(data);
  } catch (err) {
    console.warn(err);
    state.innerText = "Something went wrong ...";
  }
};


// adds search results to html
function publish(data) {
  const empty = `<h2></h2>`;
  results.innerHTML = empty;

  data.forEach((movie) => {
    !movie.show.name
      ? (name = "name not available")
      : (name = movie.show.name);

    console.log(movie.show.name);

    const html = `<hr>
        <article>
            <header>
                <p>${movie.show.name}</p>
            </header>
        </article>`;
    results.innerHTML += html;
  });
}

