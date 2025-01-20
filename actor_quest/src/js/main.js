//Do something
import { createCard } from "./card.js";
import * as api from "./connect_api.js";
import * as tools from "./tools.js";

window.onload = () => {
  const historic = localStorage.getItem("histoActor");
  const histo = document.getElementById("histo");
  if (historic) {
    histo.innerHTML = "";
    tools.getFromLocalstorage();
  }
};

const buttonSearch = document.querySelector("button");

buttonSearch.addEventListener("click", () => {
  const res = document.getElementById("res");
  res.innerHTML = "";
  const input = document.getElementById("searchInput");
  let searchFor = input.value;

  api.connectApi(searchFor).then((actors) => {
    for (const actor of actors) {
      const name = actor.name;
      const image = actor.profile_path;
      const id = actor.id;
      const card = createCard(id, name, image);
      const res = document.getElementById("res");
      res.appendChild(card);
    }
  });
  input.value = "";
});
