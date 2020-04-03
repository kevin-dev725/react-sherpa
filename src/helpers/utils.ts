export const debounce = (callback: Function, delay: number) => {
  let debounceTimer: ReturnType<typeof setTimeout>;
  return function(this: Function) {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => callback.apply(context, args), delay);
  };
};
