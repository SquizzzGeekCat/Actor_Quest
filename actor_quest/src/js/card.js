export default function createCard(id, name, image) {
  console.log("id dans create card " + id);
  console.log("name dans create card " + name);
  console.log("image dans create card " + image);
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${image}" alt="Photo de profil de l'acteur">
        <p>${name}</p>
    `;
  return card;
}
