import { Loader } from "@googlemaps/js-api-loader";

import { GMAPS_API_TOKEN } from "../constants";

const loader = new Loader({
  apiKey: GMAPS_API_TOKEN,
  libraries: ["places", "routes"],
  language: "pt-BR",
  region: "br",
});

let google: Promise<typeof globalThis.google> | null = null;

export default function Google() {
  // TODO: Update how we load google service
  if (!google) {
    google = loader.load();
  }

  return google;
}
