function createH3(id, classname, content) {
  return createBaliseHtml("h3", { id: id, class: classname }, null, content);
}
function createBaliseHtml(balise, attributes, children, content) {
  const elt = document.createElement(balise);
  for (const key in attributes) {
    console.log(key, attributes[key]);
    img.setAttribute(key, attributes[key]);
  }
  children.forEach((child) => div.appendChild(child));
  if (content) {
    const text = createTextVNode(content);
    elt.appendChild(text);
  }
  return elt;
