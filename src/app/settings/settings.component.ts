import { Component, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormControl } from '@angular/forms';
import { trigger, style, animate, transition, query, animateChild, group } from '@angular/animations';
import { GameService } from '../game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  animations: [
    trigger('modal', [
      transition(':enter', [
        group([
          query('@overlay', animateChild()),
          query('@container', animateChild())
        ])
      ]),
      transition(':leave', [
        group([
          query('@overlay', animateChild()),
          query('@container', animateChild())
        ])
      ])
    ]),
    trigger('overlay', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('100ms', style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate('100ms', style({
          opacity: 0
        })),
      ])
    ]),
    trigger('container', [
      transition(':enter', [
        style({
          marginTop: '100px'
        }),
        animate('100ms', style({
          marginTop: '0px'
        })),
      ]),
      transition(':leave', [
        style({
          marginTop: '0px'
        }),
        animate('100ms', style({
          marginTop: '-100px'
        })),
      ]),
    ])
  ],
})
export class SettingsComponent implements AfterViewChecked {
  width = new FormControl(this.gameService.gridWidth);
  height = new FormControl(this.gameService.gridHeight);
  bombs = new FormControl(this.gameService.bombs);

  constructor(
    private cdr: ChangeDetectorRef,
    public gameService: GameService
  ) { }

  saveSettings() {
    this.gameService.settingsVisible = false;
    this.gameService.gridWidth = this.width.value!;
    this.gameService.gridHeight = this.height.value!;
    this.gameService.bombs = this.bombs.value!;
    this.gameService.newGame();
  }

  getMaxBombs() {
    return Math.floor(this.width.value! * this.height.value! * 0.9);
  }

  ngAfterViewChecked() {
    this.bombs.setValue(Math.min(this.getMaxBombs(), this.bombs.value!));
    this.cdr.detectChanges();
  }
}
