export const input = `Monkey 0:
  Starting items: 65, 58, 93, 57, 66
  Operation: new = old * 7
  Test: divisible by 19
    If true: throw to monkey 6
    If false: throw to monkey 4

Monkey 1:
  Starting items: 76, 97, 58, 72, 57, 92, 82
  Operation: new = old + 4
  Test: divisible by 3
    If true: throw to monkey 7
    If false: throw to monkey 5

Monkey 2:
  Starting items: 90, 89, 96
  Operation: new = old * 5
  Test: divisible by 13
    If true: throw to monkey 5
    If false: throw to monkey 1

Monkey 3:
  Starting items: 72, 63, 72, 99
  Operation: new = old * old
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 4

Monkey 4:
  Starting items: 65
  Operation: new = old + 1
  Test: divisible by 2
    If true: throw to monkey 6
    If false: throw to monkey 2

Monkey 5:
  Starting items: 97, 71
  Operation: new = old + 8
  Test: divisible by 11
    If true: throw to monkey 7
    If false: throw to monkey 3

Monkey 6:
  Starting items: 83, 68, 88, 55, 87, 67
  Operation: new = old + 2
  Test: divisible by 5
    If true: throw to monkey 2
    If false: throw to monkey 1

Monkey 7:
  Starting items: 64, 81, 50, 96, 82, 53, 62, 92
  Operation: new = old + 5
  Test: divisible by 7
    If true: throw to monkey 3
    If false: throw to monkey 0`;

export interface Monkey {
  items: number[];
  operation: string;
  divisible: number;
  isTrue: number;
  isFalse: number;
  inspection: number;
}

const parseItems = (monkey: string): number[] => {
  const pattern = new RegExp(/Starting items: (\d+,?\s?){1,}/g);
  const itemsLine = monkey.match(pattern);
  const items = [];
  if (itemsLine) {
    const parse = itemsLine[0].match(/\d+/g)?.map((i) => Number(i));
    if (parse) items.push(...parse);
  }
  return items;
};

const parseOperation = (monkey: string): string => {
  const pattern = new RegExp(/(\w*) = (\w*|\d*) [+*\-\/] (\w*|\d*)/g);
  const opLine = monkey.match(pattern);
  let operation = "";
  if (opLine) {
    operation = opLine[0];
  }
  return operation;
};

const parseDivisible = (monkey: string): number => {
  const pattern = new RegExp(/by (\d*)/g);
  const divLine = monkey.match(pattern);
  let divisible = 0;
  if (divLine) {
    divisible = Number(divLine[0].split(" ")[1]);
  }
  return divisible;
};

const parseTrueFalse = (monkey: string): number[] => {
  const pattern = new RegExp(/monkey (\d+)/g);
  const res = monkey.match(pattern);
  const trueFalse = [];
  if (res) {
    trueFalse.push(Number(res[0].split(" ")[1]));
    trueFalse.push(Number(res[1].split(" ")[1]));
  }
  return trueFalse;
};

const parseMonkeys = (monkeys: string): Monkey[] => {
  const pattern = new RegExp(/\n\n/g);
  const matchedMonkeys = monkeys.split(pattern);
  const monkeysObj: Monkey[] = [];
  for (const monkey of matchedMonkeys) {
    const items = parseItems(monkey);
    const operation = parseOperation(monkey);
    const divisible = parseDivisible(monkey);
    const [TRUE, FALSE] = parseTrueFalse(monkey);

    monkeysObj.push({
      items,
      operation,
      divisible,
      isTrue: TRUE,
      isFalse: FALSE,
      inspection: 0,
    });
  }
  return monkeysObj;
};

// great-common divisor of 2 numbers
const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);

// least-common multiple of 2 numbers
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export const monkeys = parseMonkeys(input);
