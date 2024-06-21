export const extractTime = (date_string: string) => {
  const date = new Date(date_string);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return [hours, minutes].join(':');
}

export const padZero = (number: number) => {
  return number.toString().padStart(2, '0');
}