import { addActiveClass, getDetails, removeActiveClass } from "./tools.js";
import { showDetails, getMovies, showMovies } from "./tools.js";

export default function createCard(id, name, image) {
  let card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  if (image) {
    img.src = `https://image.tmdb.org/t/p/w200${image}`;
  } else {
    img.src = "../src/assert/profil.jpg";
  }
  img.alt = "Photo de profil de l'acteur";
  card.appendChild(img);

  const p = document.createElement("p");
  p.textContent = name;
  card.appendChild(p);

  card.addEventListener("click", async () => {
    const detailActor = await getDetails(id);
    showDetails(detailActor);
    removeActiveClass();
    addActiveClass(card);
    const listMovies = await getMovies(id);
    showMovies(listMovies);
  });
  return card;
}
