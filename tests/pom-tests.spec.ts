import { test, expect} from '@playwright/test'
import { Console } from 'console';
import { forEach } from 'cypress/types/lodash'
import { GameBoardPage } from '../src/pageobjects/game-board-page'

export const url = 'http://localhost:4200/'

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto(url)
});

test('verify successful navigation', async ({ page }) => {
  // Assertions use the expect API.
  await expect(page).toHaveURL(url)
});

test('verify default number of cells', async ({ page }) => {
    const gameBoardPage : GameBoardPage = new GameBoardPage(page)

    let expectedNumCells = '100'
    let actualNumCells = (await gameBoardPage.countCells()).toString()
 
    // expect numCells to be 100;
    await expect(expectedNumCells).toMatch(actualNumCells)
  });