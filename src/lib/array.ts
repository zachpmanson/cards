import { randomInt } from "./numbers";

export function randomizeArray(arr: any[]) {
  let array = [...arr];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function randomChoice<T>(arr: T[]): T {
  const n = randomInt(0, arr.length - 1);
  return arr[n];
}

export function generateRange(len: number) {
  return new Array(len).fill(0).map((_, i) => i);
}

export function sort<T>(arr: T[], sortFunc: (a: T, b: T) => -1 | 1) {
  return [...arr].sort(sortFunc);
}
