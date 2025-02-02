import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { ScoreBoardService } from '../services/score-board.service';
import { Map } from '../gamelogic/map';
import { Direction } from '../gamelogic/direction.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, OnDestroy {
  controlDivTimerId: any;
  submitDivTimerId: any;
  scoreMessage: string = '';
  isGameOver: boolean = false;
  gameHasStarted: boolean = false;
  mobileControlsToggled: boolean = false;
  public userHasWon: boolean = false;
  width: number = 31;
  height: number = 28;
  public map: Map;
  preGameAudio = new Audio("assets/audio/beginning.mp3");
  victoryAudio = new Audio("assets/audio/victory.mp3");
  defeatAudio = new Audio("assets/audio/defeat.mp3");

  @ViewChild('startOverlay', { static: false }) startOverlay: ElementRef;

  constructor(private scoreService: ScoreBoardService, private router: Router) { }

  ngOnInit() {
    this.preGameAudio.loop = true;
    var playPromise = this.preGameAudio.play();
    this.gameHasStarted = false;
    window.addEventListener('resize', this.adjustFieldSize.bind(this));
    this.adjustFieldSize();
    this.map = new Map(document, this);
    this.map.setupGame();
    this.setStartOverlay();
  }

  onStartGame() {
    this.preGameAudio.loop = false;
    this.preGameAudio.pause();
    this.preGameAudio.currentTime = 0;
    this.gameHasStarted = true;
    this.map.startGame();
    document.getElementById("startOverlay").style.display = "none";
  }

  setGameOver() {
    this.isGameOver = true;

    if (this.map.foodCount === 0) {
      this.userHasWon = true;
    }

    if (this.userHasWon) {
      this.victoryAudio.play();
    } else {
      this.defeatAudio.play();
    }

    this.getSubmitDiv();
    this.adjustFieldSize();

  }

  onSubmitScore() {
    this.scoreService.add(this.map.mapScore, this.scoreMessage);
    this.isGameOver = false;
    //this.ngOnDestroy();
    //this.scoreMessage = '';
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.adjustFieldSize.bind(this));

    if (this.userHasWon) {
      this.victoryAudio.pause();
      this.victoryAudio.currentTime = 0;
    } else {
      this.defeatAudio.pause();
      this.defeatAudio.currentTime = 0;
    }
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

    if (this.mobileControlsToggled) {
      var controlsDiv = document.getElementById('mobileControls');

      if (controlsDiv != null) {
        size = size - controlsDiv.clientHeight;
      }
    }

    if (size < 903) {
      gameField.style.width = size - size / 20 + 'px';
      gameField.style.gridTemplateColumns = `repeat(${this.width}, ${(size - size / 20) / this.width}px)`;
      gameField.style.gridTemplateRows = `repeat(${this.height}, ${(size - size / 20) / this.height}px)`;

      if (this.isGameOver) {
        this.setMessageOverlay(this.userHasWon);
      }

      if (!this.gameHasStarted) {
        this.setStartOverlay();
      }

      if (!this.userHasWon && this.isGameOver) {
        this.setGameLostOverlay();
      }
      else if (this.userHasWon && this.isGameOver) {
        this.setGameWonOverlay();
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyup(e) {
    switch (e.keyCode) {
      case 37: { // left
        if (this.map.grid[this.map.pacman.currentY][this.map.pacman.currentX - 1] !== 1 
          && this.map.grid[this.map.pacman.currentY][this.map.pacman.currentX - 1] !== 3) {
            this.map.pacman.direction = Direction.Left;//setDirection(Direction.Left);
          } else {
            this.map.pacman.requestedDirection = Direction.Left;
          }

        break;
      }

      case 38: { // up
        if (this.map.grid[this.map.pacman.currentY - 1][this.map.pacman.currentX] !== 1 
          && this.map.grid[this.map.pacman.currentY - 1][this.map.pacman.currentX] !== 3) {
            this.map.pacman.direction = Direction.Up;//setDirection(Direction.Up);
          } else {
            this.map.pacman.requestedDirection = Direction.Up;
          }

        break;
      }

      case 39: { // right
        if (this.map.grid[this.map.pacman.currentY][this.map.pacman.currentX + 1] !== 1 
          && this.map.grid[this.map.pacman.currentY][this.map.pacman.currentX + 1] !== 3) {
            this.map.pacman.direction = Direction.Right;//setDirection(Direction.Left);
          } else {
            this.map.pacman.requestedDirection = Direction.Right;
          }

        break;
      }

      case 40: { // down
        if (this.map.grid[this.map.pacman.currentY + 1][this.map.pacman.currentX] !== 1 
          && this.map.grid[this.map.pacman.currentY + 1][this.map.pacman.currentX] !== 3) {
            this.map.pacman.direction = Direction.Down;//setDirection(Direction.Up);
          } else {
            this.map.pacman.requestedDirection = Direction.Down;
          }

        break;
      }
    }
  }

  toggleMobileControls() {
    if (this.mobileControlsToggled) {
      this.mobileControlsToggled = false;
      this.getControlsDiv(false);
    } else {
      this.mobileControlsToggled = true;
      this.getControlsDiv(true);
      //this.adjustFieldSize();
    }
  }

  getControlsDiv(alive:boolean) {

    if (alive) {
      this.controlDivTimerId = setInterval(this.checkFortControlsDivAlive.bind(this), 50);
    } else {
      this.controlDivTimerId = setInterval(this.checkFortControlsDivDead.bind(this), 50);
    }

    
  }

  checkFortControlsDivAlive() {
    var controlDiv = document.getElementById('mobileControls');

    if (controlDiv != null) {
      var gameField = document.getElementById('scoreDiv');
      var gameHeight = gameField.clientHeight;
      var size = window.innerWidth;
      var sizeHeight = window.innerHeight;

      var remaining = sizeHeight -  size;

      var height = controlDiv.clientHeight;
      var width = controlDiv.clientWidth;

      if (remaining <= height) {
        this.adjustFieldSize();
      }

      
      clearInterval(this.submitDivTimerId);
    }
  }

  checkFortControlsDivDead() {
    var controlDiv = document.getElementById('mobileControls');

    if (controlDiv === null) {
      this.adjustFieldSize();
      clearInterval(this.submitDivTimerId);
    }
  }

  getSubmitDiv() {
    this.submitDivTimerId = setInterval(this.checkForSubmitDiv.bind(this), 50);
  }

  checkForSubmitDiv() {
    var submitDiv = document.getElementById('submitDiv');

    if (submitDiv != null) {
      if (this.userHasWon) {
        this.setGameWonOverlay();
        this.setMessageOverlay(this.userHasWon);

      } else {
        this.setGameLostOverlay();
        this.setMessageOverlay(this.userHasWon);
      }

      this.adjustFieldSize();

      clearInterval(this.submitDivTimerId);
    }
  }

  setMessageOverlay(userWon: boolean) {
    var field = document.getElementById('gameField');
    var controls = document.getElementById('controlsDiv');
    var messageOverlay = document.getElementById('gameOverMessage');
    var controlHeight = controls.clientHeight;
    var width = window.innerWidth;

    var left = (width - messageOverlay.clientWidth) / 2;

    if (width < 448) {
      var top = (field.clientHeight / 2) + (controlHeight) - (controlHeight / 8);
    } else {
      var top = (field.clientHeight / 2);
    }

    if (userWon) {
      messageOverlay.textContent = 'You won!';
    } else {
      messageOverlay.textContent = 'You lost!';
    }

    messageOverlay.style.top = top + 'px';
    messageOverlay.style.left = left + 'px';
    messageOverlay.style.display = 'block'
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
    document.getElementById("wonOverlay").style.display = 'none';
  }

  setGameWonOverlay() {
    var field = document.getElementById('gameField');
    var w = field.clientWidth;
    var h = field.clientWidth;
    var overlay = document.getElementById('wonOverlay');
    overlay.style.height = h + 'px';
    overlay.style.width = w + 'px';
    overlay.style.marginLeft = ((window.innerWidth - w) / 2) + 'px';
    overlay.style.display = "block";
    document.getElementById("over").style.display = 'none';
    document.getElementById("startOverlay").style.display = 'none';
  }

  setGameLostOverlay() {
    var field = document.getElementById('gameField');
    var w = field.clientWidth;
    var h = field.clientWidth;
    var overlay = document.getElementById('over');
    overlay.style.height = h + 'px';
    overlay.style.width = w + 'px';
    overlay.style.marginLeft = ((window.innerWidth - w) / 2) + 'px';
    overlay.style.display = "block";
    document.getElementById("startOverlay").style.display = 'none';
    document.getElementById("wonOverlay").style.display = 'none';
  }
}