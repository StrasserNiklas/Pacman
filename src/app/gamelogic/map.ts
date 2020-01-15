import { Direction } from '../gamelogic/direction.enum';
import { GamePageComponent } from '../game-page/game-page.component';
import { GhostType } from './ghost-type.enum';
import { Pacman } from './pacman';
import { Ghost } from './ghost';

export class Map {

  foodCount: number = 0;
  public grid;
  public foodGrid;
  width: number = 31;
  height: number = 28;
  document: Document;
  gamePage: GamePageComponent;
  public mapScore = 0;
  foodWasHit: boolean = false;
  foodAudio = new Audio("assets/audio/food.mp3");
  deathAudio = new Audio("assets/audio/death.mp3");
  private ghostHit: boolean = false;
  private intervallId: any;
  public pacman: Pacman;
  public ghosts: Ghost[] = [];
  public redGhost: Ghost;
  public blueGhost: Ghost;
  public yellowGhost: Ghost;
  public greenGhost: Ghost;
  public eatGhostsMode: boolean = false;
  public eatGhostsModeTimer: number = 0;

  constructor(document: Document, gamePage: GamePageComponent) {
    this.document = document;
    this.gamePage = gamePage;

    // 0 = nothing
    // 1 = wall
    // 2 = food
    // 3 = gate
    // 4 = pacman
    // 5 = ghost power up
    // 6 = red
    // 7 = blue
    // 8 = green
    // 9 = yellow
    // 10 = teleportation
    // 11 = door
    this.grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 10, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1, 1, 3, 3, 3, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
      [11, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 11],
      [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
      [1, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 0, 0, 1, 2, 1, 2, 2, 2, 1],
      [1, 1, 1, 2, 1, 0, 1, 2, 2, 2, 1, 0, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1],
      [0, 0, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 0, 1, 2, 5, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
      [1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.foodGrid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 10, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1, 1, 3, 3, 3, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
      [11, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 11],
      [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
      [1, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 0, 0, 1, 2, 1, 2, 2, 2, 1],
      [1, 1, 1, 2, 1, 0, 1, 2, 2, 2, 1, 0, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1],
      [0, 0, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 0, 1, 2, 5, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
      [1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
  }

  public setupGame() {
    this.foodAudio.loop = true;
    this.deathAudio.loop = false;

    this.pacman = new Pacman(this);
    this.pacman.currentX = 1;
    this.pacman.currentY = 1;

    this.createGrid();
    this.createMap(true);

    this.redGhost = new Ghost(this, GhostType.Red, 6);
    this.redGhost.currentX = 1;
    this.redGhost.currentY = 18;
    this.redGhost.direction = Direction.Right;

    this.blueGhost = new Ghost(this, GhostType.Blue, 7);
    this.blueGhost.currentX = 23;
    this.blueGhost.currentY = 1;

    this.greenGhost = new Ghost(this, GhostType.Green, 8);
    this.greenGhost.currentX = 25;
    this.greenGhost.currentY = 18;

    this.yellowGhost = new Ghost(this, GhostType.Yellow, 9);
    this.yellowGhost.currentX = 14;
    this.yellowGhost.currentY = 26;

    this.ghosts.push(this.redGhost);
    this.ghosts.push(this.blueGhost);
    this.ghosts.push(this.greenGhost);
    this.ghosts.push(this.yellowGhost);
  }

  public startGame() {
    this.intervallId = setInterval(this.moveElements.bind(this), 150);
  }

  private moveElements() {
    this.ghostHit = false;

    if (this.eatGhostsModeTimer === 0) {
      this.eatGhostsMode = false;
    } else {
      this.eatGhostsModeTimer--;
    }

    this.pacman.move();
    this.createMap(false);
    this.checkHit(this.ghostHit);
    this.checkFoodHit();

    if (this.foodCount === 0) {
      this.gamePage.setGameOver();
    }

    for (let ghost of this.ghosts) {
      ghost.move();

      if (ghost.collisionReset > 0) {
        ghost.collisionReset--;
      }

      if (ghost.deathReset === 0) {
        ghost.isDead = false;
      } else {
        ghost.deathReset--;
      }
    }

    this.checkHit(this.ghostHit);

  }

  public stopGame() {
    clearInterval(this.intervallId);
  }

  checkHit(ghostHit: boolean) {

    if (ghostHit) {
      return;
    }

    for (let ghost of this.ghosts) {
      if (!ghostHit) {
        if (!ghost.isDead) {
          if (!this.eatGhostsMode) {
            if (this.pacman.currentX === ghost.currentX
              && this.pacman.currentY === ghost.currentY
              && ghost.collisionReset === 0) {
              ghost.collisionReset = 15;
              this.ghostHit = true;
              this.deathAudio.play();
              this.updateLives();
            }
          } else {
            if (this.pacman.currentX === ghost.currentX
              && this.pacman.currentY === ghost.currentY
              && ghost.collisionReset === 0) {
              ghost.deathReset = 15;
              this.mapScore = this.mapScore + 100;
              //this.ghostHit = true;
              ghost.isDead = true;
              this.deathAudio.play();
              //this.updateLives();
            }
          }
        }
      }
    }
  }

  checkFoodHit() {
    var foodValue = this.foodGrid[this.pacman.currentY][this.pacman.currentX];

    if (foodValue === 2) {
      if (!this.foodWasHit) {
        this.foodWasHit = true;
        //this.foodAudio.loop = true;
        this.foodAudio.play();
      }

      this.mapScore = this.mapScore + 5;
      this.foodGrid[this.pacman.currentY][this.pacman.currentX] = 0;
      this.decreaseFoodCount();
    } else if (foodValue === 5) {
      this.eatGhostsMode = true;
      this.eatGhostsModeTimer = 15;
      this.foodGrid[this.pacman.currentY][this.pacman.currentX] = 0;
    } else {
      if (this.foodWasHit) {
        this.foodAudio.loop = false;
        this.foodAudio.pause();
        this.foodWasHit = false;
      }
    }

    //this.grid[this.pacman.currentY][this.pacman.currentX] = 0; //TODO MAybe need this
  }

  decreaseFoodCount() {
    this.foodCount--;

    if (this.foodCount === 0) { //TODO muss 0 sein
      this.foodAudio.loop = false;
      this.foodAudio.pause();
      this.foodWasHit = false;
      this.gamePage.userHasWon = true;
      this.gamePage.setGameOver();
    }
  }

  updateLives() {
    this.pacman.lives--;
    this.mapScore = this.mapScore - 20;

    if (this.pacman.lives === 0) {
      this.foodAudio.loop = false;
      this.foodAudio.pause();
      this.foodWasHit = false;
      this.gamePage.userHasWon = false;
      this.gamePage.setGameOver();
    }
  }

  createGrid() {
    var gameField = this.document.getElementById('gameField');

    while (gameField.firstChild) {
      gameField.removeChild(gameField.firstChild);
    }

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        var newDiv = document.createElement("div");
        newDiv.style.display = 'block';
        newDiv.style.height = '100%';
        newDiv.style.width = '100%';
        newDiv.style.zIndex = '-1000';
        newDiv.setAttribute('id', i + '_' + j);
        gameField.appendChild(newDiv);
      }
    }
  }

  createMap(initial: boolean) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.foodCount < 10) {
          if (this.foodGrid[i][j] == 0) {
            this.setAsBackground(i, j);
          };
        }

        if (initial) {
          if (this.foodGrid[i][j] === 2) {
            this.foodCount++;
          }
        }

        if (this.grid[i][j] === 0) { // war vorher normales grid
          this.setAsBackground(i, j);
        } else if (this.grid[i][j] === 1) {
          this.setAsMap(i, j);
        } else if (this.grid[i][j] === 2) {
          this.setAsFood(i, j);
        } else if (this.grid[i][j] === 3) {
          this.setAsGate(i, j);
        } else if (this.grid[i][j] === 4) {
          this.setAsPacman(i, j, this.pacman.direction);
        } else if (this.grid[i][j] === 5) {
          this.setAsPowerup(i, j);
        } else if (this.grid[i][j] === 6) {
          this.setAsRedGhost(i, j);
        } else if (this.grid[i][j] === 7) {
          this.setAsBlueGhost(i, j);
        } else if (this.grid[i][j] === 8) {
          this.setAsGreenGhost(i, j);
        } else if (this.grid[i][j] === 9) {
          this.setAsYellowGhost(i, j);
        } else if (this.grid[i][j] === 10) {
          this.setAsPortal(i, j);
        }
      }
    }
  }

  setAsBackground(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundColor = '';
    div.style.backgroundImage = 'none';
  }

  setAsPacman(i, j, direction: Direction) {
    var div = this.document.getElementById(i + '_' + j);

    switch (direction) {
      case Direction.Left: {
        div.style.backgroundImage = "url('assets/images/pacman/pacmanLeft.png')";
        break;
      }

      case Direction.Right: {
        div.style.backgroundImage = "url('assets/images/pacman/pacmanRight.png')";
        break;
      }

      case Direction.Up: {
        div.style.backgroundImage = "url('assets/images/pacman/pacmanUp.png')";
        break;
      }

      case Direction.Down: {
        div.style.backgroundImage = "url('assets/images/pacman/pacmanDown.png')";
        break;
      }
    }

    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }

  setAsMap(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundColor = '#0918e2';
  }

  setAsPortal(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('assets/images/portal.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
  }

  setAsFood(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('assets/images/food.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '40%';
    div.style.height = '40%';
    div.style.margin = 'auto';
  }

  setAsPowerup(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('assets/images/powerup.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
  }

  setAsGate(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundColor = '#9e0000';
  }

  setAsScaredGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('assets/images/ghosts/scaredGhost.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }

  setAsDeadGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('assets/images/ghosts/deadGhost.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }

  setAsBlueGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);

    if (this.blueGhost != undefined && this.blueGhost.collisionReset > 0 || this.eatGhostsMode) {
      div.style.backgroundImage = "url('assets/images/ghosts/scaredGhost.png')";
    } else if (this.blueGhost != undefined && this.blueGhost.isDead) {
      div.style.backgroundImage = "url('assets/images/ghosts/deadGhost.png')";

    } else if (this.yellowGhost != undefined) {

      switch (this.blueGhost.direction) {
        case Direction.Left: {
          div.style.backgroundImage = "url('assets/images/ghosts/blueGhostLeft.png')";
          break;
        }

        case Direction.Right: {
          div.style.backgroundImage = "url('assets/images/ghosts/blueGhostRight.png')";
          break;
        }

        case Direction.Up: {
          div.style.backgroundImage = "url('assets/images/ghosts/blueGhostUp.png')";
          break;
        }

        case Direction.Down: {
          div.style.backgroundImage = "url('assets/images/ghosts/blueGhostDown.png')";
          break;
        }
      }

      //div.style.backgroundImage = "url('assets/images/ghosts/yellowGhostRight.png')"; // yellowGhostRight
    } else {
      div.style.backgroundImage = "url('assets/images/ghosts/blueGhostRight.png')"; // blueGhostRight
    }

    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }

  setAsRedGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);

    if (this.redGhost != undefined && this.redGhost.collisionReset > 0 || this.eatGhostsMode) {
      div.style.backgroundImage = "url('assets/images/ghosts/scaredGhost.png')";
    } else if (this.redGhost != undefined && this.redGhost.isDead) {
      div.style.backgroundImage = "url('assets/images/ghosts/deadGhost.png')";

    } else if (this.redGhost != undefined) {

      switch (this.redGhost.direction) {
        case Direction.Left: {
          div.style.backgroundImage = "url('assets/images/ghosts/redGhostLeft.png')";
          break;
        }

        case Direction.Right: {
          div.style.backgroundImage = "url('assets/images/ghosts/redGhostRight.png')";
          break;
        }

        case Direction.Up: {
          div.style.backgroundImage = "url('assets/images/ghosts/redGhostUp.png')";
          break;
        }

        case Direction.Down: {
          div.style.backgroundImage = "url('assets/images/ghosts/redGhostDown.png')";
          break;
        }
      }

      //div.style.backgroundImage = "url('assets/images/ghosts/yellowGhostRight.png')"; // yellowGhostRight
    } else {
      div.style.backgroundImage = "url('assets/images/ghosts/redGhostRight.png')";
    }

    //div.style.backgroundImage = "url('assets/images/ghosts/redGhostRight.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }

  setAsGreenGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);

    if (this.greenGhost != undefined && this.greenGhost.collisionReset > 0 || this.eatGhostsMode) {
      div.style.backgroundImage = "url('assets/images/ghosts/scaredGhost.png')";
    } else if (this.greenGhost != undefined && this.greenGhost.isDead) {
      div.style.backgroundImage = "url('assets/images/ghosts/deadGhost.png')";

    }  else if (this.yellowGhost != undefined) {

      switch (this.greenGhost.direction) {
        case Direction.Left: {
          div.style.backgroundImage = "url('assets/images/ghosts/greenGhostLeft.png')";
          break;
        }

        case Direction.Right: {
          div.style.backgroundImage = "url('assets/images/ghosts/greenGhostRight.png')";
          break;
        }

        case Direction.Up: {
          div.style.backgroundImage = "url('assets/images/ghosts/greenGhostUp.png')";
          break;
        }

        case Direction.Down: {
          div.style.backgroundImage = "url('assets/images/ghosts/greenGhostDown.png')";
          break;
        }
      }

      //div.style.backgroundImage = "url('assets/images/ghosts/yellowGhostRight.png')"; // yellowGhostRight
    } else {
      div.style.backgroundImage = "url('assets/images/ghosts/greenGhostRight.png')"; // greenGhostRight
    }

    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }

  setAsYellowGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);

    if (this.yellowGhost != undefined && this.yellowGhost.collisionReset > 0 || this.eatGhostsMode) {
      div.style.backgroundImage = "url('assets/images/ghosts/scaredGhost.png')";
    } else if (this.yellowGhost != undefined && this.yellowGhost.isDead) {
      div.style.backgroundImage = "url('assets/images/ghosts/deadGhost.png')";

    }  else if (this.yellowGhost != undefined) {

      switch (this.yellowGhost.direction) {
        case Direction.Left: {
          div.style.backgroundImage = "url('assets/images/ghosts/yellowGhostLeft.png')";
          break;
        }

        case Direction.Right: {
          div.style.backgroundImage = "url('assets/images/ghosts/yellowGhostRight.png')";
          break;
        }

        case Direction.Up: {
          div.style.backgroundImage = "url('assets/images/ghosts/yellowGhostUp.png')";
          break;
        }

        case Direction.Down: {
          div.style.backgroundImage = "url('assets/images/ghosts/yellowGhostDown.png')";
          break;
        }
      }

      //div.style.backgroundImage = "url('assets/images/ghosts/yellowGhostRight.png')"; // yellowGhostRight
    } else {
      div.style.backgroundImage = "url('assets/images/ghosts/yellowGhostRight.png')";
    }


    //div.style.backgroundImage = "url('assets/images/ghosts/yellowGhostRight.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }
}

// setAsGhost(type: GhostType, i, j) {
  //   switch (type) {
  //     case GhostType.Blue:
  //       this.setAsBlueGhost(i, j);
  //       this.grid[i][j] = 7;
  //       break;

  //     case GhostType.Red:
  //       this.setAsRedGhost(i, j);
  //       this.grid[i][j] = 6;
  //       break;

  //     case GhostType.Green:
  //       this.setAsGreenGhost(i, j);
  //       this.grid[i][j] = 8;
  //       break;

  //     case GhostType.Yellow:
  //       this.setAsYellowGhost(i, j);
  //       this.grid[i][j] = 9;
  //       break;
  //   }
  // }

  // setPrevious(value: number, i, j) {
  //   switch (value) {
  //     case 0:
  //       this.setAsBackground(i, j);
  //       break;

  //     case 2:
  //       this.setAsFood(i, j);
  //       break;

  //     case 5:
  //       this.setAsPowerup(i, j);
  //       break;

  //     case 6:
  //       this.setAsBackground(i, j);
  //       break;

  //     case 7:
  //       this.setAsBackground(i, j);
  //       break;

  //     case 8:
  //       this.setAsBackground(i, j);
  //       break;

  //     case 9:
  //       this.setAsBackground(i, j);
  //       break;

  //     case 10:
  //       this.setAsPortal(i, j);
  //       break;
  //   }

  // }

    // initializeGrid() {
  //     for (var i = 0; i < this.height; i++) {
  //       this.grid[i] = new Array(this.width);
  //     }
  //   }