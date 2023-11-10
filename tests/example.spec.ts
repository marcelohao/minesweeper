import { test, expect} from '@playwright/test'
import { Console } from 'console';
import { forEach } from 'cypress/types/lodash';

export const url = 'http://localhost:4200/'

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto(url);
});

test('verify successful navigation', async ({ page }) => {
  // Assertions use the expect API.
  await expect(page).toHaveURL(url);
});

test('verify Minesweeper in page title', async ({ page }) => {
  
  // Expect title to contain "Minesweeper"
  await expect(page).toHaveTitle(/Minesweeper/);
});

test('verify default cell count', async ({ page }) => {
  
  let numCells = await page.evaluate(() => {return window.GameService.cells.length})
  
  // expect numCells to be 100;
  await expect(numCells.toString()).toMatch('100');
});

test('verify default game state is run', async ({ page }) => {
  
  let expectedState = 'run'
  let actualState = await page.evaluate(() => {return window.GameService.gamestate})

  await expect(expectedState).toMatch(actualState);
});

test('count default bombs', async ({ page }) => {
  
  let expectedNumBombs = '10'
  let cells = await page.evaluate(() => {return window.GameService.cells})
  let actualNumBombs:number = 0

  cells.forEach(item => {
    if (item.value == -1){
      actualNumBombs++;
    }
})

  await expect(expectedNumBombs).toMatch(actualNumBombs.toString());
});

test('count default bombs again', async ({ page }) => {
  
});