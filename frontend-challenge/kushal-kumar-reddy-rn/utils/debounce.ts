export const debounce = <F extends (...args: any[]) => void>(
  fn: F,
  ms = 250
) => {
  let t: any;
  return (...args: Parameters<F>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};
