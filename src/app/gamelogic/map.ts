export class Map {

    public map;
    width: number = 31;
    height: number = 28;
    document: Document;

    constructor(document: Document) {
        this.document = document;

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
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
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
            [1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
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
    
            var x = this.map[i][j];
    
            if (this.map[i][j] === 1) {
              this.setAsMap(i, j);
            } else if (this.map[i][j] === 2) {
              this.setAsFood(i, j);
            } else if (this.map[i][j] === 3) {
              this.setAsGate(i, j);
            } else if (this.map[i][j] === 4) {
              this.setAsPacman(i, j);
            } else if (this.map[i][j] === 5) {
              this.setAsPowerup(i, j);
            } else if (this.map[i][j] === 6) {
              this.setAsRedGhost(i, j);
            } else if (this.map[i][j] === 7) {
              this.setAsBlueGhost(i, j);
            } else if (this.map[i][j] === 8) {
              this.setAsGreenGhost(i, j);
            } else if (this.map[i][j] === 9) {
              this.setAsYellowGhost(i, j);
            } else if (this.map[i][j] === 10) {
              this.setAsGate(i, j);
            }
    
          }
        }
      }
    
      setAsPacman(i, j) {
        var div = this.document.getElementById(i + '_' + j);
        div.style.backgroundImage = "url('../../assets/images/pacman/pacmanDown.png')";
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundSize = 'contain';
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
      }
    
      setAsScaredGhost(i, j) {
        var div = this.document.getElementById(i + '_' + j);
        div.style.backgroundImage = "url('../../assets/images/ghosts/scaredGhost.png')";
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundSize = 'contain';
      }
    
      setAsDeadGhost(i, j) {
        var div = this.document.getElementById(i + '_' + j);
        div.style.backgroundImage = "url('../../assets/images/ghosts/deadGhost.png')";
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundSize = 'contain';
      }
    
      setAsBlueGhost(i, j) {
        var div = this.document.getElementById(i + '_' + j);
        div.style.backgroundImage = "url('../../assets/images/ghosts/blueGhostRight.png')";
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundSize = 'contain';
      }
    
      setAsGreenGhost(i, j) {
        var div = this.document.getElementById(i + '_' + j);
        div.style.backgroundImage = "url('../../assets/images/ghosts/greenGhostRight.png')";
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundSize = 'contain';
      }
    
      setAsYellowGhost(i, j) {
        var div = this.document.getElementById(i + '_' + j);
        div.style.backgroundImage = "url('../../assets/images/ghosts/yellowGhostRight.png')";
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundSize = 'contain';
      }
}
