import { input } from "./input";

export function walk(lines: string[]): void {
  const stack = [{ amount: 0, name: "/" }];
  let threshold = 100000;
  let total = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "$ cd /" || lines[i] == "$ ls") continue;

    if (lines[i].match(/\$ cd [a-z]+/g)) {
      const name = lines[i].split(" ")[2];
      stack.push({ amount: 0, name });
    } else if (lines[i].match(/\$ cd [.]{2}/g)) {
      const dir = stack.pop();
      if (dir) {
        if (dir.amount <= threshold) total += dir.amount;
        stack[stack.length - 1].amount += dir?.amount;
      }
    }

    let [amount, _] = lines[i].split(" ");
    if (Number(amount)) {
      let last = stack.length - 1;
      stack[last].amount += Number(amount);
    }
  }
  console.log("Total = ", total);
}

walk(input);
