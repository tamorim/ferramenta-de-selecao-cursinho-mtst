import { MAPBOX_API_TOKEN, MAPBOX_GEOCODING_API_URL } from "../constants";

export default async function fetchCoordinates(address, proximity, region) {
  const params = new URLSearchParams({
    access_token: MAPBOX_API_TOKEN,
    country: "br",
    language: "pt",
    autocomplete: false,
    limit: 1,
    proximity: proximity ?? "ip",
    region,
    q: address,
  }).toString();

  const response = await fetch(
    `${MAPBOX_GEOCODING_API_URL}?${params}`,
    { mode: "cors", method: "GET" }
  );

  return response.json();
}
