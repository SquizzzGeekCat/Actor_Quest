import * as tools from "./tools.js";

function createCard(id, name, image) {
  let card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  if (image) {
    img.src = `https://image.tmdb.org/t/p/w200${image}`;
  } else {
    img.src = "../src/assert/profil.jpg";
  }
  img.alt = "Photo de profil de l'acteur";
  card.appendChild(img);

  const p = document.createElement("p");
  p.textContent = name;
  card.appendChild(p);

  card.addEventListener("click", async () => {
    const detailActor = await tools.getDetails(id);
    tools.showDetails(detailActor);
    tools.removeActiveClass();
    tools.addActiveClass(card);
    const listMovies = await tools.getMovies(id);
    tools.showMovies(listMovies);
  });
  return card;
}

function createLi(classlist, name) {
  const li = document.createElement("li");
  li.classList = classlist;
  li.textContent = name;
  return li;
}

function createDiv(classname, children) {
  return createBaliseHtml("div", { class: classname }, children, "");
}

function createP(id, classname, content) {
  return createBaliseHtml("p", { id: id, class: classname }, [], content);
}
function createImg(attributes) {
  const img = document.createElement("img");
  for (const key in attributes) {
    console.log(key, attributes[key]);
    img.setAttribute(key, attributes[key]);
  }
  if (!attributes.src) {
    img.setAttribute("src", "../src/assert/profil.jpg");
  }
  if (!attributes.alt) {
    img.setAttribute("alt", "Photo de profil de l'acteur");
  }
  return img;
}

function createH2(id, classname, content) {
  return createBaliseHtml("h2", { id: id, class: classname }, [], content);
}

function createH3(id, classname, content) {
  return createBaliseHtml("h3", { id: id, class: classname }, [], content);
}
function createBaliseHtml(balise, attributes, children, content) {
  const elt = document.createElement(balise);

  for (const key in attributes) {
    console.log(key, attributes[key]);
    elt.setAttribute(key, attributes[key]);
  }
  if (children) {
    children.forEach((child) => elt.appendChild(child));
  }

  if (content) {
    const text = document.createTextNode(content);
    elt.appendChild(text);
  }
  return elt;
}

export {
  createCard,
  createLi,
  createDiv,
  createH2,
  createH3,
  createImg,
  createP,
};
