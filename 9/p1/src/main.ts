import { input } from "./input";

export type Head = {
  code: "H";
  x: number;
  y: number;
};

export type Tail = {
  code: "T";
  x: number;
  y: number;
};

const D = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

const head: Head = {
  code: "H",
  x: 4,
  y: 0,
};

const tail: Tail = {
  code: "T",
  x: 4,
  y: 0,
};

const visible = new Set();

function touch(head: Head, tail: Tail): boolean {
  return Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1;
}

function move(direction: number[]): void {
  const [dx, dy] = [...direction];
  head.x += dx;
  head.y += dy;
  if (!touch(head, tail)) {
    const x =
      head.x === tail.x ? 0 : (head.x - tail.x) / Math.abs(head.x - tail.x);
    const y =
      head.y === tail.y ? 0 : (head.y - tail.y) / Math.abs(head.y - tail.y);
    tail.x += x;
    tail.y += y;
    visible.add(`${tail.x}-${tail.y}`);
  }
}

export function rope(input: string[]): number {
  for (const line of input) {
    const [direction, steps] = line.split(" ");

    if (
      direction === "U" ||
      direction === "D" ||
      direction === "L" ||
      direction === "R"
    ) {
      for (let i = 0; i < Number(steps); i++) {
        move(D[direction]);
      }
    }
  }
  return visible.size;
}

const size = rope(input);
console.log(size);
