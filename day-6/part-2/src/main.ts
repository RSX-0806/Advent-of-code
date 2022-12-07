import { dataStream } from "./input";

export const total = (seq: string): number => seq.length;

export const isUnique = (seq: string): boolean => new Set(seq).size === seq.length;

export const device = (seq: string): number => {
  for (let i = 0; i < seq.length; i += 1) {
    const s = seq.slice(i, i + 14);
    if (isUnique(s)) {
      console.log(s);
      return total(seq.slice(0, s.length + i));
    }
    continue;
  }
  return 0;
};

console.log(device(dataStream));
