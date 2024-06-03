export function getPaddedNum(num: number): string {
  return (num < 10) ? `0${num}` : `${num}`;
}

export function getFormattedDate(date: Date) {
  const parsedDate = new Date(date);
  const day = getPaddedNum(parsedDate.getDate());
  const month = getPaddedNum(parsedDate.getMonth() + 1);
  const formattedDate = `${day}.${month}.${parsedDate.getFullYear()}`;

  return formattedDate;
}
