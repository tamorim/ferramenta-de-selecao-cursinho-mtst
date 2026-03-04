import { Loader } from "@googlemaps/js-api-loader";

import { GMAPS_API_TOKEN } from "../constants";

const loader = new Loader({
  apiKey: GMAPS_API_TOKEN,
  libraries: ["places", "routes"],
  language: "pt-BR",
  region: "br",
});

let google = null;

export default function Google() {
  if (!google) {
    google = loader.load();
  }

  return google;
}
