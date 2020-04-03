export const saveToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value);
}

export const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}
