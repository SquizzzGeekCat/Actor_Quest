//Do something
import * as elt from "./elements.js";
import * as api from "./connect_api.js";
import * as tools from "./tools.js";
import * as store from "./storage.js";

window.onload = () => {
  const historic = localStorage.getItem("histoActor");
  const histo = document.getElementById("histo");
  if (historic) {
    histo.innerHTML = "";
    store.getFromLocalstorage();
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
      const card = elt.createCard(id, name, image);
      const res = document.getElementById("res");
      res.appendChild(card);
    }
  });
  input.value = "";
});
