// export const lines = `R 5
// U 8
// L 8
// D 3
// R 17
// D 10
// L 25
// U 20`.split("\n");

import { input, grid } from "./input";

export type Head = {
  code: "H";
  x: number;
  y: number;
};

export type Tail = {
  code: string;
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
  x: 15,
  y: 11,
};

const tail: Tail = {
  code: "T",
  x: 15,
  y: 11,
};

const visible = new Set();

function touch(head: Head, tail: Tail): boolean {
  return Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1;
}

let seq = 1;
function move(direction: number[]): [Head, Tail] {
  const [dx, dy] = [...direction];
  head.x += dx;
  head.y += dy;
  tail.code = `${seq}`;
  if (!touch(head, tail)) {
    const x =
      head.x === tail.x ? 0 : (head.x - tail.x) / Math.abs(head.x - tail.x);
    const y =
      head.y === tail.y ? 0 : (head.y - tail.y) / Math.abs(head.y - tail.y);
    grid[tail.x][tail.y] = `${seq}`;
    tail.x += x;
    tail.y += y;
    visible.add(`${tail.x}-${tail.y}`);
  }
  return [head, tail];
}

export function rope(input: string[], grid: string[][]): void {
  for (const line of input) {
    const [direction, steps] = line.split(" ");

    if (
      direction === "U" ||
      direction === "D" ||
      direction === "L" ||
      direction === "R"
    ) {
      for (let i = 0; i < Number(steps); i++) {
        const [h, t] = move(D[direction]);
        grid[h.x][h.y] = h.code;
        grid[t.x][t.y] = t.code;
        for (let i = 0; i < grid.length; i++) {
          console.log(JSON.stringify(grid[i].reduce((a, b) => a + b)));
          // for(let j = 0; j < grid[0].length; j++) {
          // }
        }
        console.log("++++++++++++++++++++++++++");
      }
    }
  }
}
// 21x26

// rope(["R 5"], grid);
// console.log(visible.size);

interface Node<T> {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
}

const createNode = <T>(value: T): Node<T> => ({ value });

const createLinkedList = <T>(length: number, item: T): Node<T> => {
  const head = createNode(item);
  const nodes = Array.from<T>({ length });
  const linkedList = nodes.reduce(
    ([head, node]) => {
      node.next = createNode(item);
      node.next.prev = node;
      return [head, node.next];
    },
    [head, head]
  )[0];

  return linkedList;
};

const linkedListIterator = <T>(
  head: Node<T>,
  fn: (next: Node<T>) => T | undefined
) => {
  const res: (T | undefined)[] = [];
  let node: Node<T> | undefined = head;
  while (node) {
    res.push(fn(node));
    node = node.next;
  }
  return res;
};


const linked = createLinkedList(5, createNode(1));

console.log(linked);
