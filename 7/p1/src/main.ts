// export class MyFileSystem {
//   path: string = "/";
//   constructor(path?: string) {
//     if (path) this.path = path;
//   }
//   isDir(p: string): boolean {
//     const pattern = new RegExp(/[a-zA-Z]+/g);
//     return false;
//   }
//   pwd(): string {
//     return this.path;
//   }

//   cd(p?: string): string {
//     if (p === undefined || p == "/") this.path = "/";
//     if (p === "..") {
//       const pattern = new RegExp(/\b\/[a-zA-z]+\b$/g);
//       //   const pattern = new RegExp(/(?<!\.)\b[a-zA-Z]+\b(?!\.)/g);
//       const currentPath = this.path.match(pattern);
//       if (currentPath) {
//         this.path = this.path.slice(
//           0,
//           this.path.length - currentPath[0].length
//         );
//       }
//     }
//     return this.path;
//   }
// }

// const fs = new MyFileSystem("/home/abc/dfg/ertj");
// console.log(fs.pwd());
// console.log(fs.cd('..'));
import { input } from "./input";

export function walk(lines: string[]): void {
  const stack = [{ amount: 0, name: "/" }];
  let threshold = 100000;
  let total = 0;

  for (let i = 0; i < lines.length; i++) {
    // if (i === 13) break;
    // console.log(lines[i]);
    if (lines[i] === "$ cd /" || lines[i] == "$ ls") continue;

    if (lines[i].match(/\$ cd [a-z]+/g)) {
      const name = lines[i].split(" ")[2];
      stack.push({ amount: 0, name });
      continue;
    } else if (lines[i].match(/\$ cd [.]{2}/g)) {
      const dir = stack.pop();
      if (dir) {
        if (dir.amount <= threshold) total += dir.amount;
        stack[stack.length - 1].amount += dir?.amount;
      }
      continue;
    }

    let [amount, name] = lines[i].split(" ");
    // console.log(amount, name);
    if (Number(amount)) {
      let last = stack.length - 1;
      stack[last].amount += Number(amount);
      continue;
    }
  }
  console.log("Total = ", total);
}

walk(input);
/**
 *  - /
 *      - a/
 *          - e/
 *              - i + size
 *          - f + size
 *          - g + size
 *          - g + size
 *
 *      - b.txt + size
 *      - c.dat + size
 *      - d/
 *          - j + size
 *          - d.log + size
 *          - d.ext + size
 *          - k + size
 */
