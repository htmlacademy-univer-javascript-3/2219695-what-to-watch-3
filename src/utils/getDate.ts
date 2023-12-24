export function getDate(date: string): string {
  const newDate = new Date(Date.parse(date));
  const year = newDate.getFullYear();
  const month = newDate.toLocaleString('en', { month: 'long' });
  const day = newDate.getUTCDate();

  return `${month} ${day}, ${year}`;
}
