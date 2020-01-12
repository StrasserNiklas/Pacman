import { Component, OnInit } from '@angular/core';
import { ScoreBoardService } from '../services/score-board.service';
import { Map } from '../gamelogic/map';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  scoreMessage: string = '';
  score: number = 0;
  isGameOver: boolean = false; //TODO CALL ASSIGNSIZE WHEN GAME IS OVER!!!!!!!!!!
  width: number = 31;//17;//31;s
  height: number = 28;//15;//28;
  grid = new Array(this.height);
  map: Map;

  constructor(private scoreService: ScoreBoardService) { }

  ngOnInit() {
    this.initializeGrids();
    window.addEventListener('resize', this.assignSize.bind(this));
    this.assignSize();
    this.map = new Map(document);
    this.map.createGrid();
    this.map.createMap();
  }

  onKey(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 37: { // left
        console.log('left');
        break;
      }

      case 38: { // up
        console.log('up');
        break;
      }

      case 39: { // right
        console.log('right');
        break;
      }

      case 40: { // down
        console.log('down');
        break;
      }

      default: {
        break;
      }
    }
  }

  onSubmitScore() {
    this.scoreService.add(this.score, this.scoreMessage);
    this.isGameOver = false;
    this.scoreMessage = '';
  }

  initializeGrids() {
    for (var i = 0; i < this.height; i++) {
      this.grid[i] = new Array(this.width);
    }
  }

  assignSize() {
    var gameField = document.getElementById('gameField');
    var size = window.innerWidth;
    var sizeHeight = window.innerHeight;

    if (size > 903) {
      size = 902;
    }

    if (sizeHeight < size) {
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
      var children = gameField.children; // document.getElementsByName("gameField"); //

      gameField.style.gridTemplateColumns = `repeat(${this.width}, ${(size - size / 20) / this.width}px)`;
      gameField.style.gridTemplateRows = `repeat(${this.height}, ${(size - size / 20) / this.height}px)`;

      // for (let i = 0; i < children.length; i++) {
      //   const child = (children[i] as HTMLElement);
      //   //child.style.width = '100%';
      //   //child.style.height = '100%';
      // }
    }
  }

}

// createGrid() {
  //   var gameField = document.getElementById('gameField');

  //   while (gameField.firstChild) {
  //     gameField.removeChild(gameField.firstChild);
  //   }

  //   for (let i = 0; i < this.height; i++) {
  //     for (let j = 0; j < this.width; j++) {
  //       this.grid[i][j] = 0;
  //       var newDiv = document.createElement("div");
  //       newDiv.style.display = 'block';
  //       newDiv.style.height = '100%';
  //       newDiv.style.width = '100%';
  //       //newDiv.style.border = '1px solid lightgray';
  //       newDiv.setAttribute('id', i + '_' + j);
  //       gameField.appendChild(newDiv);
  //     }
  //   }

  //   //this.assignSize();
  // }

// createMap() {
//   for (let i = 0; i < this.height; i++) {
//     for (let j = 0; j < this.width; j++) {

//       var x = this.map.map[i][j];

//       if (this.map.map[i][j] === 1) {
//         this.setAsMap(i, j);
//       } else if (this.map.map[i][j] === 2) {
//         this.setAsFood(i, j);
//       } else if (this.map.map[i][j] === 3) {
//         this.setAsGate(i, j);
//       } else if (this.map.map[i][j] === 4) {
//         this.setAsPacman(i, j);
//       } else if (this.map.map[i][j] === 5) {
//         this.setAsPowerup(i, j);
//       } else if (this.map.map[i][j] === 6) {
//         this.setAsRedGhost(i, j);
//       } else if (this.map.map[i][j] === 7) {
//         this.setAsBlueGhost(i, j);
//       } else if (this.map.map[i][j] === 8) {
//         this.setAsGreenGhost(i, j);
//       } else if (this.map.map[i][j] === 9) {
//         this.setAsYellowGhost(i, j);
//       } else if (this.map.map[i][j] === 10) {
//         this.setAsGate(i, j);
//       }

//     }
//   }
// }

// setAsPacman(i, j) {
//   var div = document.getElementById(i + '_' + j);
//   div.style.backgroundImage = "url('../../assets/images/pacman/pacmanDown.png')";
//   div.style.backgroundRepeat = 'no-repeat';
//   div.style.backgroundSize = 'contain';
// }

// setAsMap(i, j) {
//   var div = document.getElementById(i + '_' + j);
//   div.style.backgroundColor = '#0918e2';
// }

// setAsFood(i, j) {
//   var div = document.getElementById(i + '_' + j);
//   div.style.backgroundImage = "url('../../assets/images/food.png')";
//   div.style.backgroundRepeat = 'no-repeat';
//   div.style.backgroundSize = 'contain';
//   div.style.width = '40%';
//   div.style.height = '40%';
//   div.style.margin = 'auto';
// }

// setAsPowerup(i, j) {
//   var div = document.getElementById(i + '_' + j);
//   div.style.backgroundImage = "url('../../assets/images/powerup.png')";
//   div.style.backgroundRepeat = 'no-repeat';
//   div.style.backgroundSize = 'contain';
// }

// setAsGate(i, j) {
//   var div = document.getElementById(i + '_' + j);
//   div.style.backgroundColor = '#9e0000';
// }

// setAsRedGhost(i, j) {
//   var div = document.getElementById(i + '_' + j);
//   div.style.backgroundImage = "url('../../assets/images/ghosts/redGhostRight.png')";
//   div.style.backgroundRepeat = 'no-repeat';
//   div.style.backgroundSize = 'contain';
// }

// setAsScaredGhost(i, j) {
//   var div = document.getElementById(i + '_' + j);
//   div.style.backgroundImage = "url('../../assets/images/ghosts/scaredGhost.png')";
//   div.style.backgroundRepeat = 'no-repeat';
//   div.style.backgroundSize = 'contain';
// }

// setAsDeadGhost(i, j) {
//   var div = document.getElementById(i + '_' + j);
//   div.style.backgroundImage = "url('../../assets/images/ghosts/deadGhost.png')";
//   div.style.backgroundRepeat = 'no-repeat';
//   div.style.backgroundSize = 'contain';
// }

// setAsBlueGhost(i, j) {
//   var div = document.getElementById(i + '_' + j);
//   div.style.backgroundImage = "url('../../assets/images/ghosts/blueGhostRight.png')";
//   div.style.backgroundRepeat = 'no-repeat';
//   div.style.backgroundSize = 'contain';
// }

// setAsGreenGhost(i, j) {
//   var div = document.getElementById(i + '_' + j);
//   div.style.backgroundImage = "url('../../assets/images/ghosts/greenGhostRight.png')";
//   div.style.backgroundRepeat = 'no-repeat';
//   div.style.backgroundSize = 'contain';
// }

// setAsYellowGhost(i, j) {
//   var div = document.getElementById(i + '_' + j);
//   div.style.backgroundImage = "url('../../assets/images/ghosts/yellowGhostRight.png')";
//   div.style.backgroundRepeat = 'no-repeat';
//   div.style.backgroundSize = 'contain';
// }
