import { inputLines } from "./input";

export const isFullyContained = (seq: string): boolean => {
  const candid = seq.match(/\d{1,4}/g);
  if (candid) {
    const firstPair = [Number(candid[0]), Number(candid[1])];
    const secondPair = [Number(candid[2]), Number(candid[3])];
    if (
      (firstPair[0] <= secondPair[0] && firstPair[1] >= secondPair[1]) ||
      (firstPair[0] >= secondPair[0] && firstPair[1] <= secondPair[1])
    ) {
      return true;
    }
  }
  return false;
};

let counter = 0;
for (const line of inputLines) {
  console.log(line);
  isFullyContained(line) ? counter++ : counter;
}

console.log(counter)