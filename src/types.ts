export type Row = [
  person: string,
  address: string,
  distance: google.maps.Distance | undefined,
  duration: google.maps.Duration | undefined,
];
