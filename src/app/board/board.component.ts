import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  animations: [
    trigger('gradientOverlay', [
      transition(':enter', [
        style({
          backgroundPosition: '110% 110%'
        }),
        animate('1000ms ease-in-out', style({
          backgroundPosition: '-10% -10%'
        }))
      ])
    ]),
    trigger('stateOverlay', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('200ms 1000ms', style({
          opacity: 1
        }))
      ])
    ])
  ]
})
export class BoardComponent {

  constructor(public gameService: GameService) {
    gameService.newGame();
  }

  getBoardStyle() {
    return {
      'grid-template-columns': `repeat(${this.gameService.gridWidth}, ${this.gameService.cellWidth}px)`,
      'grid-template-rows': `repeat(${this.gameService.gridHeight}, ${this.gameService.cellHeight}px)`,
    }
  }
}
