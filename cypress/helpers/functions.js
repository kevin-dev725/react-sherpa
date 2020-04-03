import { words } from './variables';

export const generateRandomString = (strLength = 8) => {
  let string = '';
  for (let i = 0; i <= strLength; i++) {
    string += words[~~(Math.random() * words.length)] + ' ';
  }
  return string.trim();
};
