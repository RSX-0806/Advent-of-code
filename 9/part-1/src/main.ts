export const lines = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`.split("\n");

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

function touch(x1: number, y1: number, x2: number, y2: number): boolean {
  return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1;
}

function move(direction: number[]): void {
  const [dx, dy] = [...direction];
  head.x += dx;
  head.y += dy;
  if (!touch(head.x, head.y, tail.x, tail.y)) {
    const x =
      head.x === tail.x ? 0 : (head.x - tail.x) / Math.abs(head.x - tail.x);
    const y =
      head.y === tail.y ? 0 : (head.y - tail.y) / Math.abs(head.y - tail.y);
    tail.x += x;
    tail.y += y;
    visible.add(`${tail.x}-${tail.y}`);
  }
}

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

console.log(visible.size);
