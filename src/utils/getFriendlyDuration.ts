export default function getFriendlyDuration(duration: string) {
  if (!duration) {
    return;
  }

  return `${Math.round(parseFloat(duration) / 60)} minutos`;
}
