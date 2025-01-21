import * as elt from "./elements.js";

// fonctions pour l'historique
function showHisto(listActors) {
  const histo = document.querySelector("#histo");
  histo.innerHTML = "";
  const ul = document.createElement("ul");
  histo.appendChild(ul);
  for (const actor of listActors) {
    const li = elt.createLi("", actor.name);
    ul.appendChild(li);
  }
}

function storeInLocalstorage(actor) {
  let histo = JSON.parse(localStorage.getItem("histoActor")) || [];
  const idActor = histo.some(({ id }) => id === actor.id);
  if (!idActor) {
    if (histo.length >= 3) {
      histo.shift();
      histo.push(actor);
      localStorage.setItem("histoActor", JSON.stringify(histo));
      console.log("actor is replace in histoActor in the local Storage");
    } else {
      histo.push(actor);
      localStorage.setItem("histoActor", JSON.stringify(histo));
      console.log("actor is pack in histoActor in the local Storage");
    }
  } else {
    console.log("actor is already pack");
  }
}

function getFromLocalstorage() {
  const actors = localStorage.getItem("histoActor");
  if (actors) {
    const listActors = JSON.parse(actors);
    showHisto(listActors);
    const btnErraseHisto = elt.createButton(
      { type: "button", class: "btnErrase" },
      "Effacer l'historique"
    );
    btnErraseHisto.addEventListener("click", () => {
      removeFromLocalstorage();
      histo.innerHTML = ""; // Effacer le contenu de l'historique
      btnErraseHisto.remove();
    });
    // const btnErase = document.querySelector(".btnErrase");
    // if (!btnErase) {
    //   const btnErraseHisto = elt.createButton(
    //     { type: "button", class: "btnErrase" },
    //     "Effacer l'historique"
    //   );
    //   btnErraseHisto.addEventListener("click", () => {
    //     removeFromLocalstorage();
    //     histo.innerHTML = ""; // Effacer le contenu de l'historique
    //     btnErraseHisto.remove();
    //   });
    // } else {
    //   btnErraseHisto.addEventListener("click", () => {
    //     removeFromLocalstorage();
    //     histo.innerHTML = ""; // Effacer le contenu de l'historique
    //     btnErraseHisto.remove();
    //   });
    // }
    //todo: voir si pas plus simple de cree le btn en dur et de le passer a disabled quand pas historique
    //todo: pour le moment affiche autant de button que de rechagement de localstore
    const search = document.getElementById("search");
    search.appendChild(btnErraseHisto);
  } else {
    return null;
  }
}

function removeFromLocalstorage() {
  localStorage.removeItem("histoActor");
}

export {
  getFromLocalstorage,
  removeFromLocalstorage,
  showHisto,
  storeInLocalstorage,
}; //
