export function getRunTimePlayer(runTime: number): string {
  const hours = Math.trunc(runTime / 60);
  const minutes = runTime % 60;
  return `${hours}h ${minutes}m`;
}
