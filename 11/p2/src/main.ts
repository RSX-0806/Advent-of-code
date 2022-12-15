import { monkeys, Monkey, lcm } from "./utils";

const inspectItems = (monkey: Monkey, manageableLvl: number): void => {
  let throwIndex = 0;
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

    worryLevel %= manageableLvl;
    throwIndex =
      worryLevel % monkey.divisible === 0
        ? (throwIndex = monkey.isTrue)
        : (throwIndex = monkey.isFalse);
    monkeys[throwIndex].items.push(worryLevel);
    monkey.inspection++;
  });
};

const round = (size: number): number => {
  const divisors: number[] = [];
  monkeys.forEach((m) => divisors.push(m.divisible));
  const manageableLvl = divisors.reduce(lcm);
  for (let i = 0; i < size; i++)
    monkeys.forEach((monkey) => {
      if (monkey.items.length === 0) {
        return;
      }
      inspectItems(monkey,manageableLvl);
      monkey.items = [];
    });
  monkeys.sort((a, b) => b.inspection - a.inspection);
  return monkeys[0].inspection * monkeys[1].inspection;
};


const monkeyBusiness = round(10000);
console.log(monkeyBusiness);
