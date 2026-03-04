import Google from "../services/Google";

export default async function fetchCoordinatesGMaps(address: string) {
  const google = await Google();
  const map = new google.maps.Map(document.createElement("div"));
  const placesService = new google.maps.places.PlacesService(
    map,
  ) as google.maps.places.PlacesService;

  const params = { query: address, fields: ["place_id"] };
  const results = await new Promise<google.maps.places.PlaceResult[]>(
    (resolve) => {
      placesService.findPlaceFromQuery(params, (results) => {
        if (!results) {
          return;
        }

        resolve(results);
      });
    },
  );

  const placeId = results?.[0]?.place_id;

  if (!placeId) {
    return;
  }

  return placeId;
}
