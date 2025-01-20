import { URL_API } from "./env.js";
import { TOKEN } from "./env.js";

export default function replaceSpace(str) {
  return str.replace(/ /g, "%20");
}

export function storeInLocalstorage(actor) {
  let histo = JSON.parse(localStorage.getItem("histoActor")) || [];
  if (!histo.includes(actor)) {
    histo.push(actor);
    localStorage.setItem("histoActor", JSON.stringify(histo));
    console.log("actor is pack in histoActor in the local Storage");
  } else {
    console.log("actor is already in histoActor in the local Storage");
  }
}

export function getFromLocalstorage() {
  const actors = localStorage.getItem("histoActor");
  if (actors) {
    const listActors = JSON.parse(actors);
    listActors.forEach((actor) => {
      showHisto(actor);
    });
  } else {
    return null;
  }
}

export function removeFromLocalstorage() {
  localStorage.removeItem("histoActor");
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
  storeInLocalstorage(actor);
  getFromLocalstorage();
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
  movies.sort(function (a, b) {
    return new Date(b.release_date) - new Date(a.release_date);
  });

  const moviesContainer = document.querySelector("#movies");
  moviesContainer.replaceChildren();
  for (let i = 0; i < movies.length; i++) {
    let movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");
    let imageMovieCard = document.createElement("img");
    imageMovieCard.src = `https://image.tmdb.org/t/p/w200${movies[i].poster_path}`;
    imageMovieCard.alt = movies[i].title;
    let innerMovieCard = document.createElement("div");
    innerMovieCard.classList.add("innerMovieCard");
    let titleMovieCard = document.createElement("span");
    titleMovieCard.textContent = movies[i].title;
    let dateMovieCard = document.createElement("p");
    dateMovieCard.textContent = movies[i].release_date;
    innerMovieCard.appendChild(titleMovieCard);
    innerMovieCard.appendChild(dateMovieCard);
    movieCard.appendChild(imageMovieCard);
    movieCard.appendChild(innerMovieCard);
    moviesContainer.appendChild(movieCard);

    movieCard.addEventListener("click", () => {
      addActiveClass(movieCard);
      showActorslist(id_movie);
    });
  }
}

function showActorslist(id_movie) {
  const actorsContainer = document.querySelector("#actors");
  actorsContainer.innerHTML = "";
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(
    `${URL_API}movie/${id_movie}/credits?api_key=${TOKEN}`,
    requestOptions
  ).then((response) => response.json());
}

// fonctions pour l'historique
function showHisto(actor) {
  const histo = document.querySelector("#histo");
  histo.innerHTML += `
  <div class="histoActor">
    <p>${actor.name}</p>
  </div>`;
}
