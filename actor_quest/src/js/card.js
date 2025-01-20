import * as tools from "./tools.js";

function createCard(id, name, image) {
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
    const detailActor = await tools.getDetails(id);
    tools.showDetails(detailActor);
    tools.removeActiveClass();
    tools.addActiveClass(card);
    const listMovies = await tools.getMovies(id);
    tools.showMovies(listMovies);
  });
  return card;
}

function createLi(name) {
  const li = document.createElement("li");
  li.classList = "";
  li.textContent = name;
  return li;
}

export { createCard, createLi };
