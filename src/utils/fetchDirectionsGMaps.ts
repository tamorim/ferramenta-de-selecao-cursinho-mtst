import Google from "../services/Google";

export default async function fetchDirectionsGMaps(
  origin: string,
  destination: string,
  transportation: string,
) {
  const google = await Google();
  const directionsService =
    new google.maps.DirectionsService() as google.maps.DirectionsService;
  const params = {
    origin: { placeId: origin },
    destination: new google.maps.LatLng(destination[1], destination[0]),
    travelMode: google.maps.TravelMode[transportation],
    unitSystem: google.maps.UnitSystem.METRIC,
    region: "br",
  };

  const response = await new Promise<google.maps.DirectionsResult>(
    (resolve) => {
      directionsService.route(params, (response) => {
        if (!response) {
          return;
        }

        resolve(response);
      });
    },
  );

  const direction = response?.routes[0]?.legs[0];

  if (!direction) {
    return;
  }

  return {
    routes: [
      {
        distance: direction.distance,
        duration: direction.duration,
      },
    ],
  };
}
