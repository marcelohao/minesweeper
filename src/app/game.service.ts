import { Injectable } from '@angular/core';
import { Cell } from './cell.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gamestate: 'run' | 'lose' | 'win' = 'run';
  cellWidth = 32;
  cellHeight = 32;
  gridWidth = 10;
  gridHeight = 10;
  timerStarted = false;
  time = 0;
  bombs = 10;
  flags = 0;
  cells: Cell[] = [];
  timeInterval: any;
  settingsVisible = false;

  constructor() { }

  newGame() {
    this.gamestate = 'run';
    this.cells = [];
    this.flags = 0;
    for (let i=0; i<this.gridWidth * this.gridHeight; i++) {
      this.cells.push({
        clicked: false,
        value: 0,
        flag: 0,
      });
    }
    this.restartTimer();
    this.placeBombs();
    this.calculateValues();
  }

  startTimer() {
    if (this.timerStarted) return;
    this.timerStarted = true;
    this.timeInterval = setInterval(() => {
      this.time += 1;
    }, 1000);
  }

  restartTimer() {
    this.timerStarted = false;
    this.time = 0;
    this.stopTimer();
  }

  stopTimer() {
    clearInterval(this.timeInterval);
  }

  placeBombs() {
    let bombsPlaced = 0;
    while (bombsPlaced < this.bombs) {
      let rx = Math.floor(Math.random() * this.gridWidth);
      let ry = Math.floor(Math.random() * this.gridHeight);
      let i = rx + (ry * this.gridWidth);
      if (this.cells[i].value == 0) {
        this.cells[i].value = -1;
        bombsPlaced += 1;
      }
    }
  }

  calculateValues() {
    for (let i=0; i<this.gridWidth * this.gridHeight; i++) {
      if (this.cells[i].value == -1) continue;
      let adjacentBombs = 0;
      let x = i % this.gridWidth;
      let y = Math.floor(i / this.gridWidth);
      for (let offx = -1; offx <= 1; offx++) {
        for (let offy = -1; offy <= 1; offy++) {
          let adjacentCell = this.getCell(x + offx, y + offy);
          if (adjacentCell && adjacentCell.value == -1) {
            adjacentBombs += 1;
          }
        }
      }
      this.cells[i].value = adjacentBombs;
    }
  }

  getCell(x: number, y: number): Cell | null {
    if (x <= -1 || x >= this.gridWidth || y <= -1 || y >= this.gridHeight) {
      return null;
    }
    else {
      let i = x + (y * this.gridWidth);
      return this.cells[i];
    }
  }

  onCellFlag(i: number) {
    let x = i % this.gridWidth;
    let y = Math.floor(i / this.gridWidth);
    if (x <= -1 || x >= this.gridWidth || y <= -1 || y >= this.gridHeight) return;
    this.cells[i].flag = (this.cells[i].flag + 1) % 3;
    this.calculateFlags();
  }

  calculateFlags() {
    this.flags = 0;
    this.cells.map(cell => {
      this.flags += cell.flag == 1 ? 1 : 0;
    });
  }

  onCellClick(i: number) {
    let x = i % this.gridWidth;
    let y = Math.floor(i / this.gridWidth);
    this.clickCell(x, y);
  }

  clickCell(x: number, y: number) {
    if (x <= -1 || x >= this.gridWidth || y <= -1 || y >= this.gridHeight) return;
    let i = x + y * this.gridWidth;
    if (this.cells[i].clicked) return;
    this.cells[i].clicked = true;
    this.checkIfWin();
    if (this.cells[i].value == 0) {
      setTimeout(() => {
        for (let offx = -1; offx <= 1; offx++) {
          for (let offy = -1; offy <= 1; offy++) {
            this.clickCell(x + offx, y + offy);
          }
        }
      }, 10);
    }
    else if (this.cells[i].value == -1) {
      this.cells[i].value = 3;
      this.endGame();
    }
  }

  checkIfWin() {
    let clicked = 0;
    this.cells.map(cell => {
      if (cell.clicked) {
        clicked++
      };
    });
    if (clicked == this.cells.length - this.bombs) {
      this.gamestate = 'win';
      this.stopTimer();
      this.revealBombs();
    }
  }

  endGame() {
    this.gamestate = 'lose';
    this.stopTimer();
    this.revealBombs();
  }

  revealBombs() {
    this.cells.map(cell => {
      if (cell.value == -1) {
        cell.clicked = true;
      }
    });
  }
}
