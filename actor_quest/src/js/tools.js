import { URL_API } from "./env.js";
import { TOKEN } from "./env.js";
import * as store from "./storage.js";
import * as elt from "./elements.js";

export function replaceSpace(str) {
  return str.replace(/ /g, "%20");
}

export function getDetails(id) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
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
  store.storeInLocalstorage(actor);
  store.getFromLocalstorage();
}

// fonction de design
export function removeActiveClass() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.classList.remove("active"));
}

export function addActiveClass(card) {
  card.classList.add("active");
}

// fonctions pour recupere et traiter les films
export async function getMovies(id) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
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
    let path = `https://image.tmdb.org/t/p/w200${movies[i].poster_path}`;
    let alt = movies[i].title;
    let titleMovie = movies[i].title;
    let dateMovie = movies[i].release_date;

    let imageMovieCard = elt.createImg({ src: path, alt: alt });
    let titleMovieCard = elt.createH3("", "", titleMovie);
    let dateMovieCard = elt.createP("", "", dateMovie);

    let innerMovieCard = elt.createDiv("innerMovieCard", [
      titleMovieCard,
      dateMovieCard,
    ]);
    let movieCard = elt.createDiv("movieCard", [
      imageMovieCard,
      innerMovieCard,
    ]);
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
  res.replaceChildren();
  const ats = await getActorslist(id_movie);
  console.log(ats);
  for (const at of ats) {
    const name = at.name;
    const image = at.profile_path;
    const id = at.id;
    const card = elt.createCard(id, name, image);
    const res = document.getElementById("res");
    res.appendChild(card);
  }
}

// fonctions pour la recherche
//TODO: amélioré la recherche avec input sup et requete sup et posibilité sup

// fonctions des options
//TODO: traiter les options - pagination - clique sur films pour affichage du cast acteurs - recherche
