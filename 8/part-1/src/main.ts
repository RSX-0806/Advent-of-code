import { input } from "./input";
export const isVisible = (grid: number[][]): void => {
  let counter = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      const current = grid[x][y];
      if (
        x === 0 ||
        y === 0 ||
        x === grid.length - 1 ||
        y === grid[0].length - 1
      ) {
        counter++;
        continue;
      }

      // scan current row to left
      let left = false;
      for (let k = 0; k < y; k++) {
        if (current > grid[x][k]) {
          left = true;
          continue;
        } else {
          left = false;
          break;
        }
      }

      // scan current row to right
      let right = false;
      for (let k = y + 1; k < grid.length; k++) {
        if (current > grid[x][k]) {
          right = true;
          continue;
        } else {
          right = false;
          break;
        }
      }

      // scan current column to top
      let top = false;
      for (let k = 0; k < x; k++) {
        if (current > grid[k][y]) {
          top = true;
          continue;
        } else {
          top = false;
          break;
        }
      }

      // scan current column to bot
      let bot = false;
      for (let k = x + 1; k <= grid[0].length; k++) {
        if (current > grid[k][y]) {
          bot = true;
          continue;
        } else {
          bot = false;
          break;
        }
      }
      if (top || bot || left || right) counter++;
    }
  }
  console.log("visible trees: ", counter);
};

isVisible(input);
