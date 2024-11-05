import { TOKEN } from "./dotenv.js";
import { URL_API } from "./dotenv.js";
//let string = "johnny depp";
//const query = replaceSpace(string);

export default function connectApi(query) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `${URL_API}person?query=${query}&include_adult=false&language=en_US&api_key=${TOKEN}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((data) => {
      const jsonData = JSON.parse(data);
      const actor = jsonData.results[0];
      console.log(actor);
    })
    .catch((error) => console.error(error));
}
