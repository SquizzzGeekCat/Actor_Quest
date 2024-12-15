//Do something
import createCard from "./card.js";
import connectApi from "./connect_api.js";

const buttonSearch = document.querySelector("button");

buttonSearch.addEventListener("click", () => {
  const res = document.getElementById("res");
  res.innerHTML = "";
  const input = document.getElementById("searchInput");
  let searchFor = input.value;

  connectApi(searchFor).then((actors) => {
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
