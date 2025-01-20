import { URL_API } from "./env.js";
import { TOKEN } from "./env.js";
import { createCard, createLi } from "./card.js";

export function replaceSpace(str) {
  return str.replace(/ /g, "%20");
}

export function storeInLocalstorage(actor) {
  let histo = JSON.parse(localStorage.getItem("histoActor")) || [];
  const idActor = histo.some(({ id }) => id === actor.id);
  if (!idActor) {
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
    showHisto(listActors);
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

    let id_movie = movies[i].id;
    movieCard.addEventListener("click", async () => {
      addActiveClass(movieCard);
      showActorslist(id_movie);
    });
  }
}

export async function getActorslist(id_movie) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const data = await fetch(
    `${URL_API}movie/${id_movie}/credits?api_key=${TOKEN}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      return data.cast;
    })
    .catch((error) => console.error(error));
  return data;
}

export async function showActorslist(id_movie) {
  const res = document.getElementById("res");
  res.innerHTML = "";
  const ats = await getActorslist(id_movie);
  console.log(ats);
  for (const at of ats) {
    const name = at.name;
    const image = at.profile_path;
    const id = at.id;
    const card = createCard(id, name, image);
    const res = document.getElementById("res");
    res.appendChild(card);
  }
}

// fonctions pour l'historique
export function showHisto(listActors) {
  const histo = document.querySelector("#histo");
  histo.innerHTML = "";
  const ul = document.createElement("ul");
  histo.appendChild(ul);
  for (const actor of listActors) {
    const li = createLi(actor.name);
    ul.appendChild(li);
  }
}
