import { getDetails } from "./tools.js";
import { showDetails } from "./tools.js";

export default function createCard(id, name, image) {
  console.log("id dans create card " + id);
  console.log("name dans create card " + name);
  console.log("image dans create card " + image);
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
  });
  return card;
}
