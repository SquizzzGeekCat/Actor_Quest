//Do something
import createCard from "./card.js";

const card = createCard(
  "premiers card",
  "Si tu lis ça va te chercher un café ! ça urgent!!"
);

const res = document.getElementById("res");

res.appendChild(card);
//TODO: faire en sorte que le main centraliser les differentes actions
//TODO: add les action du btn
//TODO: cree l'affichage du resultat
//TODO: stocker le json en localstorage juste le nom et id de l'acteur
//TODO: cree la requete pour afficher les films de l'acteur sur le coter
//TODO: cree le btn et le lien pour afficher tous les acteurs d'un film
