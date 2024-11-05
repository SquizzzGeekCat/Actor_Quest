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
  const actor = connectApi(query);
  if (typeof actor != "undefined") {
    const card2 = createCard(actor["name"], actor["id"]);
    res.appendChild(card2);
    console.log(actor);
    return actor;
  } else {
    console.log("Error connecting to the API. Please try again later.");
  }
});

const card = createCard(
  "premiers card",
  "Si tu lis ça va te chercher un café ! ça urgent!!"
);

const res = document.getElementById("res");

res.appendChild(card);
