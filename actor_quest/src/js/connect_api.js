import { TOKEN } from "./env.js";
import { URL_API } from "./env.js";
//let string = "johnny depp";
//const query = replaceSpace(string);

export default function connectApi(query) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `${URL_API}person?query=${query}&page=1&include_adult=false&language=en_US&api_key=${TOKEN}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((data) => {
      const jsonData = JSON.parse(data);
      const actors = jsonData.results;
      const filteredActors = actors.filter((actor) => {
        return actor.known_for_department == "Acting";
      });
      console.log(filteredActors);
    })
    .catch((error) => console.error(error));
}
