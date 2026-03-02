export default function getFriendlyDuration(duration) {
  if (!duration) {
    return;
  }

  return `${Math.round(parseFloat(duration) / 60)} minutos`;
}
