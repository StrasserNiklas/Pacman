import { Direction } from '../gamelogic/direction.enum';

export class Map {

    public grid;
    width: number = 31;
    height: number = 28;
    document: Document;
    public mapScore = 0;
    //grid = new Array(this.height);

    constructor(document: Document) {
        this.document = document;
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
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
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
            [0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 6, 0, 0, 0, 0, 8, 0, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 0, 0, 7, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 9, 0, 1, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 0, 0, 1, 2, 1, 2, 2, 2, 1],
            [1, 1, 1, 2, 1, 0, 1, 2, 2, 2, 1, 0, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1],
            [0, 0, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 0, 1, 2, 5, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1, 2, 2, 2, 1],
            [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
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
            //newDiv.style.border = '1px solid lightgray';
            newDiv.setAttribute('id', i + '_' + j);
            gameField.appendChild(newDiv);
          }
        }
    
        //this.assignSize();
      }

    createMap() {
        for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
    
            var x = this.grid[i][j];
    
            if (this.grid[i][j] === 1) {
              this.setAsMap(i, j);
            } else if (this.grid[i][j] === 2) {
              this.setAsFood(i, j);
            } else if (this.grid[i][j] === 3) {
              this.setAsGate(i, j);
            } else if (this.grid[i][j] === 4) {
              this.setAsPacman(i, j, Direction.Right);
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
              this.setAsGate(i, j);
            }
    
          }
        }
      }

      setAsBackground(i, j) {
        var div = this.document.getElementById(i + '_' + j);
        div.style.backgroundColor = '';
        div.style.backgroundImage = 'none';
      }
    
      setAsPacman(i, j, direction: Direction ) {
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
