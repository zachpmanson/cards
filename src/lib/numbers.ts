export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function popRandom<T>(arr: T[]): T {
  const index = randomInt(0, arr.length - 1);
  return arr.splice(index, 1)[0];
}
