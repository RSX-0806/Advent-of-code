import { monkeys, Monkey } from "./utils";

const inspectItems = (monkey: Monkey): void => {
  let nextMonkey = 0;
  monkey.items.forEach((worryLevel) => {
    let right = monkey.operation.slice(12);
    const operand = monkey.operation.slice(10, 11);
    const rightOp = right.includes("old") ? worryLevel : Number(right);

    switch (operand) {
      case "-":
        worryLevel -= rightOp;
      case "+":
        worryLevel += rightOp;
      case "/":
        worryLevel = worryLevel / rightOp;
      case "*":
        worryLevel *= rightOp;
    }

    worryLevel = Math.floor(worryLevel / 3);
    nextMonkey =
      worryLevel % monkey.divisible === 0
        ? (nextMonkey = monkey.true)
        : (nextMonkey = monkey.false);
    monkeys[nextMonkey].items.push(worryLevel);
    monkey.inspection++;
  });
};

const round = (size: number): number => {
  for (let i = 0; i < size; i++)
    monkeys.forEach((monkey) => {
      if (monkey.items.length === 0) {
        return;
      }
      inspectItems(monkey);
      monkey.items = [];
    });
  monkeys.sort((a, b) => b.inspection - a.inspection);
  console.log(monkeys);
  return monkeys[0].inspection * monkeys[1].inspection;
};

const monkeyBusiness = round(20);
console.log(monkeyBusiness);
