export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function popRandom(arr) {
  const index = randomInt(0, arr.length - 1);
  return arr.splice(index, 1)[0];
}
