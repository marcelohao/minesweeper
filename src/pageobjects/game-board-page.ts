import { type Page } from '@playwright/test';

export class GameBoardPage {
    readonly page: Page;

    constructor(page: Page) {
      this.page = page;
    }
  
    async countCells(){

      let numCells = await this.page.evaluate(() => {return window.GameService.cells.length})
  
        return numCells;
    }
  
  }