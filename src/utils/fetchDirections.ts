import { MAPBOX_API_TOKEN, MAPBOX_DIRECTIONS_API_URL } from "../constants";

export default async function fetchDirections(
  coordinates: Array<[lat: string, lng: string]>,
  transportation: string,
) {
  const transportationPath =
    transportation === "foot" ? "mapbox/walking" : "mapbox/driving";
  const coordinatesPath = encodeURIComponent(
    coordinates.map((coordinate) => coordinate.join(",")).join(";"),
  );
  const params = new URLSearchParams({
    access_token: MAPBOX_API_TOKEN,
    overview: "full",
    annotations: "distance,duration",
  }).toString();

  const response = await fetch(
    `${MAPBOX_DIRECTIONS_API_URL}/${transportationPath}/${coordinatesPath}?${params}`,
    { mode: "cors", method: "GET" },
  );

  return response.json();
}
