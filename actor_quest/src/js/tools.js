export default function replaceSpace(str) {
  return str.replace(/ /g, "%20");
}

export function storeInLocalstorage(actor) {
  const data = JSON.stringify(actor);
  localStorage.setItem("actor", data);
  console.log("actor is pack in local Storage");
}

export function getFromLocalstorage() {
  const actor = localStorage.getItem("actor");
  if (actor) {
    return JSON.parse(actor);
  } else {
    return null;
  }
}
