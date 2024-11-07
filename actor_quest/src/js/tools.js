import { URL_API } from "./env.js";
import { TOKEN } from "./env.js";

export default function replaceSpace(str) {
  return str.replace(/ /g, "%20");
}

export function storeInLocalstorage(actor) {
  const data = JSON.stringify(actor);
  localStorage.setItem("actor", data);
  console.log("actor is pack in local Storage");
}

export function getFromLocalstorage() {
  const actor = localStorage.getItem("actor");
  if (actor) {
    return JSON.parse(actor);
  } else {
    return null;
  }
}

export function getDetails(id) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  return fetch(`${URL_API}person/${id}?api_key=${TOKEN}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function showDetails(actor) {
  const detail = document.querySelector("#show");
  detail.innerHTML = `
  <div id="infosActor">
    <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" alt="${actor.name}">
    <h2>${actor.name}</h2>
    <p>${actor.birthday}</p>
    <p>${actor.place_of_birth}</p>
    <p>${actor.biography}</p>
    </div>`;
}

export function removeActiveClass() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.classList.remove("active"));
}

export function addActiveClass(card) {
  card.classList.add("active");
}

export async function getMovies(id) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const data = await fetch(
    `${URL_API}person/${id}/movie_credits?api_key=${TOKEN}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => data.cast)
    .catch((error) => console.error(error));
  return data;
}

export function showMovies(movies) {
  console.log("type of movies : ", typeof movies);
  const moviesContainer = document.querySelector("#movies");
  moviesContainer.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    console.log(movies[i]);
    moviesContainer.innerHTML += `
    <div class="movieCard">
      <img src="https://image.tmdb.org/t/p/w200${movies[i].poster_path}" alt="${movies[i].title}">
      <div class="infosFilm">
        <span>${movies[i].title}</span>
        <p>${movies[i].release_date}</p>
      </div>
    </div>`;
  }
}
