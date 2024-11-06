//Do something
import createCard from "./card.js";
import connectApi from "./connect_api.js";
import replaceSpace from "./tools.js";

const buttonSearch = document.querySelector("button");

buttonSearch.addEventListener("click", () => {
  const input = document.getElementById("searchInput");
  let string = input.value;
  const query = replaceSpace(string);
  input.value = "";
  connectApi(query).then((actors) => {
    for (const actor of actors) {
      const name = actor.name;
      const image = actor.profile_path;
      const id = actor.id;
      const card = createCard(id, name, image);
      const res = document.getElementById("res");
      res.appendChild(card);
    }
  });
});
