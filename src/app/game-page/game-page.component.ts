import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { ScoreBoardService } from '../services/score-board.service';
import { Map } from '../gamelogic/map';
import { Pacman } from '../gamelogic/pacman';
import { Direction } from '../gamelogic/direction.enum';
import { Router } from '@angular/router';
import { Ghost } from '../gamelogic/ghost';
import { GhostType } from '../gamelogic/ghost-type.enum';
import { Key } from 'protractor';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, OnDestroy {
  submitDivTimerId:any;
  scoreMessage: string = '';
  score: number = 0;
  isGameOver: boolean = false; //TODO CALL ASSIGNSIZE WHEN GAME IS OVER!!!!!!!!!!
  gameHasStarted: boolean = false;
  width: number = 31;
  height: number = 28;
  public userHasWon: boolean = false;
  public map: Map;
  public pacman: Pacman;
  public ghosts: Ghost[] = [];
  public redGhost: Ghost;
  public blueGhost: Ghost;
  public yellowGhost: Ghost;
  public greenGhost: Ghost;
  preGameAudio = new Audio("../../assets/audio/beginning.mp3");
  victoryAudio = new Audio("../../assets/audio/victory.mp3");
  defeatAudio = new Audio("../../assets/audio/defeat.mp3");

  @ViewChild('startOverlay', { static: false }) startOverlay: ElementRef;

  constructor(private scoreService: ScoreBoardService, private router: Router) { }

  ngOnDestroy(): void {
    if (this.userHasWon) {
      this.victoryAudio.pause();
      this.victoryAudio.currentTime = 0;
    } else {
      this.defeatAudio.pause();
      this.defeatAudio.currentTime = 0;
    }
  }

  ngOnInit() {
    this.preGameAudio.loop = true;
    var playPromise = this.preGameAudio.play();

    this.gameHasStarted = false;
    window.addEventListener('resize', this.adjustFieldSize.bind(this));
    this.adjustFieldSize();
    this.map = new Map(document, this);
    
    this.pacman = new Pacman(this.map);
    this.pacman.currentX = 1;
    this.pacman.currentY = 1;

    this.map.createGrid();
    this.map.createMap(true);

    this.redGhost = new Ghost(this.map, GhostType.Red, 6);
    this.redGhost.currentX = 1;
    this.redGhost.currentY = 18;
    this.redGhost.direction = Direction.Right;

    this.blueGhost = new Ghost(this.map, GhostType.Blue, 7);
    this.blueGhost.currentX = 23;
    this.blueGhost.currentY = 1;

    this.greenGhost = new Ghost(this.map, GhostType.Green, 8);
    this.greenGhost.currentX = 25;
    this.greenGhost.currentY = 18;

    this.yellowGhost = new Ghost(this.map, GhostType.Yellow, 9);
    this.yellowGhost.currentX = 14;
    this.yellowGhost.currentY = 26;

    this.ghosts.push(this.redGhost);
    this.ghosts.push(this.blueGhost);
    this.ghosts.push(this.greenGhost);
    this.ghosts.push(this.yellowGhost);

    this.setStartOverlay();
  }

  onStartGame() {
    this.preGameAudio.loop = false;
    this.preGameAudio.pause();
    this.preGameAudio.currentTime = 0;
    this.gameHasStarted = true;

    this.pacman.startMoving();
    this.redGhost.startMoving();
    this.blueGhost.startMoving();
    this.yellowGhost.startMoving();
    this.greenGhost.startMoving();

    document.getElementById("startOverlay").style.display = "none";
  }

  setGameOver() {
    this.isGameOver = true;

    //this.pacman.move();
    this.pacman.stopMoving();
    this.pacman.lives = 0;
    this.redGhost.stopMoving();
    this.blueGhost.stopMoving();
    this.yellowGhost.stopMoving();
    this.greenGhost.stopMoving();

    if (this.userHasWon) {
      this.victoryAudio.play();
    } else {
      this.defeatAudio.play();
    }

    //this.setGameoverOverlay();
    //this.adjustFieldSize();
    this.checkForSubmitDiv();

  }

  checkForSubmitDiv() {
    var submitDiv = document.getElementById('submitDiv');

    if (submitDiv != null) {
      this.adjustFieldSize();
      this.setGameoverOverlay();
      clearInterval(this.submitDivTimerId);
    }

    this.submitDivTimerId = setInterval(this.checkForSubmitDiv.bind(this), 50);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyup(e) {
    switch (e.keyCode) {
      case 37: { // left
        this.pacman.setDirection(Direction.Left);
        break;
      }

      case 38: { // up
        this.pacman.setDirection(Direction.Up);
        break;
      }

      case 39: { // right
        this.pacman.setDirection(Direction.Right);
        break;
      }

      case 40: { // down
        this.pacman.setDirection(Direction.Down);
        break;
      }

      default: {
        break;
      }
    }
  }

  onSubmitScore() {
    this.scoreService.add(this.map.mapScore, this.scoreMessage);
    this.isGameOver = false;
    this.scoreMessage = '';
  }

  adjustFieldSize() {
    var gameField = document.getElementById('gameField');
    var size = window.innerWidth;
    var sizeHeight = window.innerHeight;

    if (size > 903) {
      size = 902;
    }

    if (sizeHeight <= size) {
      size = sizeHeight - 15;
    }

    if (this.isGameOver) {
      var submitDiv = document.getElementById('submitDiv');

      if (submitDiv != null) {
        size = size - submitDiv.clientHeight;
      }
    }

    if (size < 903) {
      gameField.style.width = size - size / 20 + 'px';
      //var children = gameField.children; // document.getElementsByName("gameField"); //

      gameField.style.gridTemplateColumns = `repeat(${this.width}, ${(size - size / 20) / this.width}px)`;
      gameField.style.gridTemplateRows = `repeat(${this.height}, ${(size - size / 20) / this.height}px)`;

      if (!this.gameHasStarted) {
        this.setStartOverlay();
      }

      if (this.isGameOver) {
        this.setGameoverOverlay();
        //this.adjustFieldSize();
      }

      // for (let i = 0; i < children.length; i++) {
      //   const child = (children[i] as HTMLElement);
      //   //child.style.width = '100%';
      //   //child.style.height = '100%';
      // }
    }
  }

  setStartOverlay() {
    var field = document.getElementById('gameField');
    var w = field.clientWidth;
    var h = field.clientWidth;
    var overlay = document.getElementById('startOverlay');
    overlay.style.height = h + 'px';
    overlay.style.width = w + 'px';
    overlay.style.marginLeft = ((window.innerWidth - w) / 2) + 'px';
    overlay.style.display = 'block'
    document.getElementById("over").style.display = 'none';
  }

  setGameoverOverlay() {
    var field = document.getElementById('gameField');
    var w = field.clientWidth;
    var h = field.clientWidth;
    var overlay = document.getElementById('over');
    overlay.style.height = h + 'px';
    overlay.style.width = w + 'px';
    overlay.style.marginLeft = ((window.innerWidth - w) / 2) + 'px';
    overlay.style.display = "block";
    document.getElementById("startOverlay").style.display = 'none';
  }
}