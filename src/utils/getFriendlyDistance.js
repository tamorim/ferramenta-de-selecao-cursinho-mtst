export default function getFriendlyDistance(distance) {
  if (!distance) {
    return;
  }

  return `${Math.round(parseFloat(distance) / 1000)}km`;
}
