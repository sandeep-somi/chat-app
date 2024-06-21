export const extractTime = (date_string: string) => {
  const date = new Date(date_string);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return [hours, minutes].join(':');
}

export const padZero = (number: number) => {
  return number.toString().padStart(2, '0');
}

export const throttle = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any[] | null = null;

  return (...args: any[]) => {
    if (timeoutId === null) {
      func(...args);
      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (lastArgs) {
          func(...lastArgs);
          lastArgs = null;
        }
      }, delay);
    } else {
      lastArgs = args;
    }
  };
};


export const debounce = <F extends (...args: any[]) => void>(func: F, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};