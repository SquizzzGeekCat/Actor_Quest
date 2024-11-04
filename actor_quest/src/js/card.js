export default function createCard(title, desc) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
    `;
  return card;
}
