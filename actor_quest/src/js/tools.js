import { URL_API } from "./env.js";
import { TOKEN } from "./env.js";

//fonctions pour transformer entrer user en string utilisable dans l'URL
export default function replaceSpace(str) {
  return str.replace(/ /g, "%20");
}
// functions de local storage
export function storeInLocalstorage(actor) {
  let histo = JSON.parse(localStorage.getItem("histoActor")) || [];
  if (histo.length > 0) {
    for (let i = 0; i < histo.length; i++) {
      if (histo[i].name === actor.name) {
        console.log("actor is ALREADY added to local storage");
        return;
      } else {
        histo.push(actor);
        localStorage.setItem("histoActor", JSON.stringify(histo));
        console.log("actor is ADDED in the local Storage");
        return;
      }
    }
  } else {
    histo.push(actor);
    localStorage.setItem("histoActor", JSON.stringify(histo));
    console.log("actor is ADDED in the local Storage");
    return;
  }
}

export function getFromLocalstorage() {
  document.querySelector("#histo ul").innerHTML = "";
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
//TODO: a placer lors du chargement de la page
export function chargeHisto() {
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
//function qui supprime l'historique de nav de l'app
export function removeHisto() {
  localStorage.removeItem("histoActor");
  document.querySelector("#histo ul").innerHTML = "";
}

// fonctions pour recupere les details des acteurs
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
  storeInLocalstorage(actor);
  getFromLocalstorage();
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
  const moviesContainer = document.querySelector("#movies");
  moviesContainer.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
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

// fonctions pour l'historique
function createLi(name) {
  const li = document.createElement("li");
  li.classList = "histolink";
  console.log(name);
  li.textContent = name;
  return li;
}
function showHisto(actor) {
  const histo = document.querySelector("#listActorsInHistorique");
  const li = createLi(actor.name);
  console.log(li);
  console.log(histo);
  histo.appendChild(li);
}

// fonctions pour la recherche
//TODO: amélioré la recherche avec input sup et requete sup et posibilité sup

// fonctions des options
//TODO: traiter les options - pagination - clique sur films pour affichage du cast acteurs - recherche
