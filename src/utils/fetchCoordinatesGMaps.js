import { GMAPS_API_TOKEN } from "../constants";
import Google from "../services/Google";

export default async function fetchCoordinatesGMaps(address) {
  const google = await Google();
  const map = new google.maps.Map(document.createElement('div'));
  const placesService = new google.maps.places.PlacesService(map);
  const params = { query: address, fields: ["place_id"] };

  const results = await new Promise((resolve) => {
    placesService.findPlaceFromQuery(params, (results) => resolve(results));
  });
  const placeId = results?.[0]?.place_id;

  if (!placeId) {
    return;
  }

  return placeId;
}
