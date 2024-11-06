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
    <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" alt="${actor.name}">
    <h1>${actor.name}</h1>
    <p>${actor.birthday}</p>
    <p>${actor.place_of_birth}</p>
    <p>${actor.biography}</p>
    <ul>`;
}
