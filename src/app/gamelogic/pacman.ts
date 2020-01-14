import { Direction } from '../gamelogic/direction.enum';
import { Map } from '../gamelogic/map';

export class Pacman {

    public direction: Direction;
    private oldDirection: Direction;
    public lives: number = 100;
    public lastDemandedDirection: Direction;
    private map: Map;
    private intervallId: any;
    public currentX: number = 0;
    public currentY: number = 0;
    public previousX: number = 0;
    public previousY: number = 0;

    constructor(map: Map) {
        this.direction = Direction.Right;
        this.oldDirection = this.direction;
        this.map = map;
        this.lastDemandedDirection = this.direction;
    }

    setDirection(dir: Direction) {
        this.oldDirection = this.direction;
        this.direction = dir;
    }

    startMoving() {
        this.intervallId = setInterval(this.move.bind(this), 180);
    }

    stopMoving() {
        clearInterval(this.intervallId);
    }

    checkDetection(value: number, currentY: number, currentX: number) {

        var foodValue = this.map.foodGrid[currentY][currentX];
        var secValue = this.map.grid[currentY][currentX];

        if ((foodValue === 2 && secValue != 6 ||
            (foodValue === 2 && secValue != 7) ||
            (foodValue === 2 && secValue != 8) ||
            (foodValue === 2 && secValue != 9))) {
            value = 2;
        }

        switch (value) {
            case 2:
                var foodValue = this.map.foodGrid[currentY][currentX];

                if (foodValue === 2) {
                    this.map.mapScore = this.map.mapScore + 5;
                    this.map.foodGrid[currentY][currentX] = 0;
                    this.map.foodCount--;

                    if (this.map.foodCount === 0) { // AUF 0!!!!!
                        this.stopMoving();
                        this.map.gamePage.userHasWon = true;
                        this.map.gamePage.setGameOver();
                    }
                }

                this.map.grid[currentY][currentX] = 0;
                break;

            case 6:
                //this.updateLives();
                break;

            case 7:
                //this.updateLives();
                break;

            case 8:
                //this.updateLives();
                break;

            case 9:
                //this.updateLives();
                break;

            case 10:
                while (true) {
                    var randomX = Math.floor(Math.random() * 29) + 1;
                    var randomY = Math.floor(Math.random() * 27) + 1;

                    if (this.map.grid[randomY][randomX] === 2) {
                        this.map.grid[this.currentY][this.currentX] = 0;
                        this.map.foodCount--;

                        if (this.map.foodCount === 0) {
                            this.stopMoving();
                            this.map.gamePage.userHasWon = true;
                            this.map.gamePage.setGameOver();
                        }
                        this.currentX = randomX;
                        this.currentY = randomY;
                        break;
                    }
                }

                break;

            case undefined:
                if (this.currentY === 13 && this.currentX === 0) {
                    this.map.grid[this.currentY][this.currentX] = 0;
                    this.currentX = 30;
                    this.currentY = 13;
                    //this.currentX = 
                } else if (this.currentY === 13 && this.currentX === 30) {
                    this.map.grid[this.currentY][this.currentX] = 0;
                    this.currentX = 0;
                    this.currentY = 13;
                }
                break;
        }
    }

    updateLives() {
        this.lives--;

        if (this.lives === 0) {
            this.stopMoving();
            this.map.gamePage.userHasWon = false;
            this.map.gamePage.setGameOver();
        }
    }

    move() {
        switch (this.direction) {
            case Direction.Left: {
                if (this.map.grid[this.currentY][this.currentX - 1] !== 1 && this.map.grid[this.currentY][this.currentX - 1] !== 3) {

                    var value = this.map.grid[this.currentY][this.currentX - 1];
                    this.checkDetection(value, this.currentY, this.currentX - 1);

                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = 4;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = 4;
                    } else {
                        this.map.grid[this.currentY][this.currentX] = 0;
                        this.map.grid[this.currentY][this.currentX - 1] = 4;
                        this.currentX--;
                    }
                } else {
                    // if (this.lives === 1) {
                    //     if (this.map.grid[this.currentY][this.currentX - 1] === (6 || 7 || 8 || 9)) {
                    //         this.updateLives();
                    //     }
                    // }

                    this.direction = this.oldDirection;
                }
                break;
            }

            case Direction.Right: {

                var value = this.map.grid[this.currentY][this.currentX + 1];

                if (value !== 1 && value !== 3) {
                    var value = this.map.grid[this.currentY][this.currentX + 1];
                    this.checkDetection(value, this.currentY, this.currentX + 1);

                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = 4;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = 4;
                    } else {
                        this.map.grid[this.currentY][this.currentX] = 0;
                        this.map.grid[this.currentY][this.currentX + 1] = 4;
                        this.currentX++;
                    }
                    // } else if (value === 6 || value === 7 || value === 8 || value === 9) {
                    //     this.updateLives();
                } else {
                    this.direction = this.oldDirection;
                }
                break;
            }

            case Direction.Up: {
                if (this.map.grid[this.currentY - 1][this.currentX] !== 1 && this.map.grid[this.currentY - 1][this.currentX] !== 3) {
                    var value = this.map.grid[this.currentY - 1][this.currentX];

                    this.checkDetection(value, this.currentY, this.currentX);
                    this.map.grid[this.currentY][this.currentX] = 0;

                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = 4;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = 4;
                    } else {
                        this.map.grid[this.currentY][this.currentX] = 0;
                        this.map.grid[this.currentY - 1][this.currentX] = 4;
                        this.currentY--;
                    }
                } else {
                    // if (this.lives === 1) {
                    //     if (this.map.grid[this.currentY - 1][this.currentX] === (6 || 7 || 8 || 9)) {
                    //         this.updateLives();
                    //     }
                    // }

                    this.direction = this.oldDirection;
                }
                break;
            }

            case Direction.Down: {
                if (this.map.grid[this.currentY + 1][this.currentX] !== 1 && this.map.grid[this.currentY + 1][this.currentX] !== 3) {
                    var value = this.map.grid[this.currentY + 1][this.currentX];

                    this.checkDetection(value, this.currentY + 1, this.currentX);

                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = 4;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = 4;
                    } else {
                        this.map.grid[this.currentY][this.currentX] = 0;
                        this.map.grid[this.currentY + 1][this.currentX] = 4;
                        this.currentY++;
                    }
                } else {
                    // if (this.lives === 1) {
                    //     if (this.map.grid[this.currentY + 1][this.currentX] === (6 || 7 || 8 || 9)) {
                    //         this.updateLives();
                    //     }
                    // }

                    this.direction = this.oldDirection;
                }
                break;
            }

            default: {
                break;
            }
        }

        this.map.createMap(false);
    }

    // checkDetection(value: number, currentY: number, currentX: number) {
    //     switch (value) { 
    //         case 2:
    //             this.map.mapScore = this.map.mapScore + 5;
    //             this.map.setAsBackground(this.currentY, this.currentX);
    //             this.map.grid[this.currentY][this.currentX] = 0;
    //             this.map.foodCount--;

    //             if (this.map.foodCount === 0) { // AUF 0!!!!!
    //                 this.stopMoving();
    //                 this.map.gamePage.userHasWon = true; 
    //                 this.map.gamePage.setGameOver();
    //             }
    //             break;

    //         case 6:
    //             //this.updateLives();
    //             break;

    //             case 7:
    //             //this.updateLives();
    //             break;

    //             case 8:
    //             //this.updateLives();
    //             break;

    //             case 9:
    //             //this.updateLives();
    //             break;

    //         case 10:
    //             //this.map.setAsPortal(this.currentY, this.currentX);

    //             if (currentY === 1 && currentX === 29 && this.direction === Direction.Right) {
    //                 this.currentX = 2;
    //                 this.currentY = 26;
    //             } else if (currentY === 2 && currentX === 29 && this.direction === Direction.Up) {
    //                 this.currentX = 1;
    //                 this.currentY = 25;
    //             } else if (currentY === 26 && currentX === 1 && this.direction === Direction.Down) {
    //                 this.currentX = 29;
    //                 this.currentY = 2;
    //             } else if (currentY === 26 && currentX === 1 && this.direction === Direction.Left) {
    //                 this.currentX = 28;
    //                 this.currentY = 1;
    //             }

    //             break;

    //         case 11:
    //             if (this.currentY === 13 && this.currentX === 0) {
    //                 this.currentX = 30;
    //                 this.currentY = 13;
    //                 //this.currentX = 
    //             } else if (this.currentY === 13 && this.currentX === 30) {
    //                 this.currentX = 0;
    //                 this.currentY = 13;
    //             }
    //             break;
    //     }
    // }

    // move() {
    //     switch (this.direction) {
    //         case Direction.Left: {
    //             if (this.map.grid[this.currentY][this.currentX - 1] !== 1 && this.map.grid[this.currentY][this.currentX - 1] !== 3) {
    //                 this.map.setAsBackground(this.currentY, this.currentX);
    //                 //this.map.grid[this.currentY][this.currentX] = 0; //TODO make happen in setAsBackground...

    //                 //var value = this.map.grid[this.currentY][this.currentX - 1] OLD
    //                 var value = this.map.grid[this.currentY][this.currentX]

    //                 this.checkDetection(value, this.currentY, this.currentX - 1);

    //                 if (value === 10) {
    //                     this.map.setAsPacman(this.currentY, this.currentX, Direction.Left);
    //                 } else {
    //                     this.map.setAsPacman(this.currentY, this.currentX - 1, Direction.Left);
    //                 }


    //                 this.currentX--;
    //             } else {
    //                 if (this.lives === 1) {


    //                     if (this.map.grid[this.currentY][this.currentX - 1] === (6 || 7 || 8 || 9)) {
    //                         this.updateLives();
    //                     }
    //                 }

    //                 this.direction = this.oldDirection;
    //             }
    //             break;
    //         }

    //         case Direction.Right: {
    //             if (this.map.grid[this.currentY][this.currentX + 1] !== 1 && this.map.grid[this.currentY][this.currentX + 1] !== 3) {
    //                 this.map.setAsBackground(this.currentY, this.currentX);

    //                 //var value = this.map.grid[this.currentY][this.currentX + 1]; OLD
    //                 var value = this.map.grid[this.currentY][this.currentX];

    //                 this.checkDetection(value, this.currentY, this.currentX + 1);

    //                 if (value === 10) {
    //                     this.map.setAsPacman(this.currentY, this.currentX, Direction.Right);
    //                 } else {
    //                     this.map.setAsPacman(this.currentY, this.currentX + 1, Direction.Right);
    //                 }


    //                 this.currentX++;
    //             } else if () { // SDCHAUNE OB HIER EIN GHOST IST!!!!
    //                 if (this.lives === 1) {

    //                     var val = this.map.grid[this.currentY][this.currentX + 1];

    //                     if (val === (6 || 7 || 8 || 9)) {
    //                         this.updateLives();
    //                     }
    //                 }

    //             } else {

    //                 this.direction = this.oldDirection;
    //             }
    //             break;
    //         }

    //         case Direction.Up: {
    //             if (this.map.grid[this.currentY - 1][this.currentX] !== 1 && this.map.grid[this.currentY - 1][this.currentX] !==  3) {
    //                 this.map.setAsBackground(this.currentY, this.currentX);

    //                 //var value = this.map.grid[this.currentY - 1][this.currentX]; OLD
    //                 var value = this.map.grid[this.currentY][this.currentX];

    //                 this.checkDetection(value, this.currentY, this.currentX);

    //                 if (value === 10) {
    //                     this.map.setAsPacman(this.currentY, this.currentX, Direction.Up);
    //                 } else {
    //                     this.map.setAsPacman(this.currentY - 1, this.currentX, Direction.Up);
    //                 }


    //                 this.currentY--;
    //             } else {
    //                 if (this.lives === 1) {
    //                     if (this.map.grid[this.currentY - 1][this.currentX] === (6 || 7 || 8 || 9)) {
    //                         this.updateLives();
    //                     }
    //                 }

    //                 this.direction = this.oldDirection;
    //             }
    //             break;
    //         }

    //         case Direction.Down: {
    //             if (this.map.grid[this.currentY + 1][this.currentX] !== 1 && this.map.grid[this.currentY + 1][this.currentX] !== 3) {
    //                 this.map.setAsBackground(this.currentY, this.currentX);

    //                 //var value = this.map.grid[this.currentY + 1][this.currentX]; OLD
    //                 var value = this.map.grid[this.currentY][this.currentX];

    //                 this.checkDetection(value, this.currentY + 1, this.currentX);

    //                 if (value === 10) {
    //                     this.map.setAsPacman(this.currentY, this.currentX, Direction.Down);
    //                 } else {
    //                     this.map.setAsPacman(this.currentY + 1, this.currentX, Direction.Down);
    //                 }


    //                 this.currentY++;
    //             } else {
    //                 if (this.lives === 1) {
    //                     if (this.map.grid[this.currentY + 1][this.currentX] === (6 || 7 || 8 || 9)) {
    //                         this.updateLives();
    //                     }
    //                 }

    //                 this.direction = this.oldDirection;
    //             }
    //             break;
    //         }

    //         default: {
    //             break;
    //         }
    //     }
    // }
}
