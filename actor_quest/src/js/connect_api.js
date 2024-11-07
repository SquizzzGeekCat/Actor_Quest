import { TOKEN } from "./env.js";
import { URL_API } from "./env.js";
import replaceSpace from "./tools.js";

export default function connectApi(searchFor) {
  const query = replaceSpace(searchFor);
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
      const actorFilter = data.results.filter((actor) => {
        return actor.known_for_department === "Acting";
      });
      console.log(actorFilter);
      return actorFilter;
    })
    .catch((error) => console.error(error));
}
