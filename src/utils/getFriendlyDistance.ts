export default function getFriendlyDistance(distance: string) {
  if (!distance) {
    return;
  }

  return `${Math.round(parseFloat(distance) / 1000)}km`;
}
