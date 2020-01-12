import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  width: number = 31;//17;//31;s
  height: number = 28;//15;//28;
  grid = new Array(this.height); //[[],[]];
  constructor() { }

  ngOnInit() {
    this.initializeGrids();
    this.createGrid();
    window.addEventListener('resize', this.assignSize.bind(this));

    this.test();
  }

  assignSize() {
    var gameField = document.getElementById('gameField');
    var size = window.innerWidth;

    if (size > 940) {
      size = 939;
    }

    if (size < 940) {
      gameField.style.width = size - size / 20 + 'px';
      var children = gameField.children; // document.getElementsByName("gameField"); //

      gameField.style.gridTemplateColumns = `repeat(${this.width}, ${(size - size / 20) / this.width}px)`;
      gameField.style.gridTemplateRows = `repeat(${this.height}, ${(size - size / 20) / this.height}px)`;

      for (let i = 0; i < children.length; i++) {
        const child = (children[i] as HTMLElement);
        child.style.width = '100%';
        child.style.height = '100%';
      }
    }
  }

  createGrid() {
    var gameField = document.getElementById('gameField');

    while (gameField.firstChild) {
      gameField.removeChild(gameField.firstChild);
    }

    // gameField.style.width = window.innerWidth - window.innerWidth / 20 + 'px';
    // gameField.style.gridTemplateColumns = `repeat(${this.width}, ${(window.innerWidth - window.innerWidth / 20) / this.width}px)`;
    // gameField.style.gridTemplateRows = `repeat(${this.height}, ${(window.innerWidth - window.innerWidth / 20) / this.width}px)`;

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.grid[i][j] = 0;
        var newDiv = document.createElement("div");
        newDiv.style.display = 'block';
        newDiv.style.height = '100%';
        newDiv.style.width = '100%';
        //newDiv.style.border = '1px solid lightgray';
        newDiv.setAttribute('id', i + '_' + j);
        gameField.appendChild(newDiv);
      }
    }

    this.assignSize();
  }

  setAsMap(i, j) {
    var div = document.getElementById(i + '_' + j);
    div.style.backgroundColor = '#313eff';
  }

  initializeGrids() {
    for (var i = 0; i < this.height; i++) {
      this.grid[i] = new Array(this.width);
    }
  }

  createMap() {

  }

  test() {
    var div = document.getElementById(0 + '_' + 1);
    div.style.backgroundImage = "url('../../assets/images/redGhostRight.png')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';

    var newDiv = document.getElementById(1 + '_' + 1);
    newDiv.style.backgroundImage = "url('../../assets/images/food.png')";
    newDiv.style.backgroundRepeat = 'no-repeat';
    newDiv.style.backgroundSize = 'contain';
    newDiv.style.width = '40%';
    newDiv.style.height = '40%';
    newDiv.style.margin = 'auto';
    newDiv.style.border = '0px solid lightgray';

  }

}
