import { TOKEN } from "./env.js";
import { URL_API } from "./env.js";

export default function connectApi(query) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    `${URL_API}search/person?query=${query}&page=1&include_adult=false&language=en_US&api_key=${TOKEN}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      const filteredActors = data.results.filter((actor) => {
        return actor.known_for_department == "Acting";
      });
      console.log(filteredActors);
      return filteredActors;
    })
    .catch((error) => console.error(error));
}
