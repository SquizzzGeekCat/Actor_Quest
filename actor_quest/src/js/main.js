//Do something
import createCard from "./card.js";

const card = createCard(
  "premiers card",
  "Si tu lis ça va te chercher un café ! ça urgent!!"
);

const res = document.getElementById("res");

res.appendChild(card);
