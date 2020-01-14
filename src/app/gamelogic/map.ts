import { Direction } from '../gamelogic/direction.enum';
import { GamePageComponent } from '../game-page/game-page.component';
import { GhostType } from './ghost-type.enum';

export class Map {

  foodCount: number = 0;
  public grid;
  public foodGrid;
  width: number = 31;
  height: number = 28;
  document: Document;
  gamePage: GamePageComponent;
  public mapScore = 0;
  //grid = new Array(this.height);

  constructor(document: Document, gamePage: GamePageComponent) {
    this.document = document;
    this.gamePage = gamePage;
    //this.initializeGrid();

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
      [1, 5, 1, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 5, 1],
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
      [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1],
      [1, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.foodGrid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 10, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
      [1, 5, 1, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 5, 1],
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
      [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1],
      [1, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
  }

  

  checkHit() {

  }

  // initializeGrid() {
  //     for (var i = 0; i < this.height; i++) {
  //       this.grid[i] = new Array(this.width);
  //     }
  //   }

  createGrid() {
    var gameField = this.document.getElementById('gameField');

    while (gameField.firstChild) {
      gameField.removeChild(gameField.firstChild);
    }

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        //this.grid[i][j] = 0;
        var newDiv = document.createElement("div");
        newDiv.style.display = 'block';
        newDiv.style.height = '100%';
        newDiv.style.width = '100%';
        newDiv.style.zIndex = '-1000';
        //newDiv.style.border = '1px solid lightgray';
        newDiv.setAttribute('id', i + '_' + j);
        gameField.appendChild(newDiv);
      }
    }

    //this.assignSize();
  }

  createMap(initial: boolean) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.grid[i][j] === 0) {
          this.setAsBackground(i, j);
        } else if (this.grid[i][j] === 1) {
          this.setAsMap(i, j);
        } else if (this.grid[i][j] === 2) {
          if (initial) {
            this.foodCount++;
          }

          this.setAsFood(i, j);
        } else if (this.grid[i][j] === 3) {
          this.setAsGate(i, j);
        } else if (this.grid[i][j] === 4) {
          this.setAsPacman(i, j, this.gamePage.pacman.direction);
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

  setPrevious(value: number, i, j) {
    switch (value) {
      case 0:
        this.setAsBackground(i, j);
        break;

      case 2:
        this.setAsFood(i, j);
        break;

      case 5:
        this.setAsPowerup(i, j);
        break;

      case 6:
        this.setAsBackground(i, j);
        break;

      case 7:
        this.setAsBackground(i, j);
        break;

      case 8:
        this.setAsBackground(i, j);
        break;

      case 9:
        this.setAsBackground(i, j);
        break;

      case 10:
        this.setAsPortal(i, j);
        break;
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
        div.style.backgroundImage = "url('../../assets/images/pacman/pacmanLeft.png')";
        break;
      }

      case Direction.Right: {
        div.style.backgroundImage = "url('../../assets/images/pacman/pacmanRight.png')";
        break;
      }

      case Direction.Up: {
        div.style.backgroundImage = "url('../../assets/images/pacman/pacmanUp.png')";
        break;
      }

      case Direction.Down: {
        div.style.backgroundImage = "url('../../assets/images/pacman/pacmanDown.png')";
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
    div.style.backgroundImage = "url('../../assets/images/portal.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
  }

  setAsFood(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('../../assets/images/food.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '40%';
    div.style.height = '40%';
    div.style.margin = 'auto';
  }

  setAsPowerup(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('../../assets/images/powerup.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
  }

  setAsGate(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundColor = '#9e0000';
  }

  setAsGhost(type: GhostType, i, j) {
    switch (type) {
      case GhostType.Blue:
        this.setAsBlueGhost(i, j);
        this.grid[i][j] = 7;
        break;

      case GhostType.Red:
        this.setAsRedGhost(i, j);
        this.grid[i][j] = 6;
        break;

      case GhostType.Green:
        this.setAsGreenGhost(i, j);
        this.grid[i][j] = 8;
        break;

      case GhostType.Yellow:
        this.setAsYellowGhost(i, j);
        this.grid[i][j] = 9;
        break;
    }
  }

  setAsRedGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('../../assets/images/ghosts/redGhostRight.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }

  setAsScaredGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('../../assets/images/ghosts/scaredGhost.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }

  setAsDeadGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('../../assets/images/ghosts/deadGhost.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }

  setAsBlueGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('../../assets/images/ghosts/blueGhostRight.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }

  setAsGreenGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('../../assets/images/ghosts/greenGhostRight.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }

  setAsYellowGhost(i, j) {
    var div = this.document.getElementById(i + '_' + j);
    div.style.backgroundImage = "url('../../assets/images/ghosts/yellowGhostRight.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.width = '100%';
    div.style.height = '100%';
  }
}

// this.grid = [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 10, 1],
//   [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
//   [1, 5, 1, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 5, 1],
//   [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
//   [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//   [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
//   [1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1, 1, 3, 3, 3, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
//   [11, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 11],
//   [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
//   [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
//   [1, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 8, 2, 2, 2, 2, 1],
//   [1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
//   [1, 2, 2, 2, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 0, 0, 1, 2, 1, 2, 2, 2, 1],
//   [1, 1, 1, 2, 1, 0, 1, 2, 2, 2, 1, 0, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1],
//   [0, 0, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 0, 1, 2, 5, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
//   [1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
//   [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1, 2, 2, 2, 1],
//   [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1],
//   [1, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];