import { TOKEN } from "./dotenv.js";
import { URL_API } from "./dotenv.js";
//let string = "johnny depp";
//const query = replaceSpace(string);

function connectApi(query) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `${URL_API}person?query=${query}&include_adult=false&language=en_US&api_key=${TOKEN}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function replaceSpace(str) {
  return str.replace(/ /g, "%20");
}

const buttonSearch = document.querySelector("button");

buttonSearch.addEventListener("click", () => {
  const input = document.getElementById("searchInput");
  let string = input.value;
  const query = replaceSpace(string);
  input.value = "";
  try {
    const actor = connectApi(query);
    console.log("API request sent successfully");
    return actor;
  } catch {
    alert("Error connecting to the API. Please try again later.");
  }
});
