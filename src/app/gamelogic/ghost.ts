import { Direction } from '../gamelogic/direction.enum';
import { Map } from '../gamelogic/map';
import { GhostType } from './ghost-type.enum';


export class Ghost {
    public direction: Direction;
    private intervallId: any;// NodeJS.Timer;
    private map: Map;
    public currentX: number = 0;
    public currentY: number = 0;
    public previousX: number = 0;
    public previousY: number = 0;
    private ghostType: GhostType;
    private ghostId: number;
    private previousMapValue: number = 0;
    private wentThroughPortal = false;

    constructor(map: Map, ghostType: GhostType, ghostId: number) {
        this.direction = Direction.Right;
        this.map = map;
        this.ghostType = ghostType;
        this.ghostId = ghostId;
    }

    startMoving() {
        this.intervallId = setInterval(this.move.bind(this), 180);
    }

    stopMoving() {
        clearInterval(this.intervallId);
    }

    checkDetection(value: number, currentY: number, currentX: number) {
        switch (value) {
            case 0:
                this.previousMapValue = value;
                break;

            case 2:
                this.previousMapValue = value;
                break;
            case 4:
                this.map.gamePage.pacman.lives--;

                if (this.map.gamePage.pacman.lives === 0) {
                    //this.stopMoving();
                    this.previousMapValue = 0;
                    this.map.gamePage.userHasWon = false;
                    this.map.gamePage.setGameOver();
                }
                break;

            case 5:
                this.previousMapValue = value;
                break;

            case 6:
                if (this.map.foodGrid[currentY][currentX] === 2) {
                    this.previousMapValue = 2;
                } else if (this.map.foodGrid[currentY][currentX] === 5) {
                    this.previousMapValue = 5;
                }
                break;

            case 7:
                if (this.map.foodGrid[currentY][currentX] === 2) {
                    this.previousMapValue = 2;
                } else if (this.map.foodGrid[currentY][currentX] === 5) {
                    this.previousMapValue = 5;
                }
                break;

            case 8:
                if (this.map.foodGrid[currentY][currentX] === 2) {
                    this.previousMapValue = 2;
                } else if (this.map.foodGrid[currentY][currentX] === 5) {
                    this.previousMapValue = 5;
                }
                break;

            case 9:
                if (this.map.foodGrid[currentY][currentX] === 2) {
                    this.previousMapValue = 2;
                } else if (this.map.foodGrid[currentY][currentX] === 5) {
                    this.previousMapValue = 5;
                }
                break;

            case 10:
                //this.map.setAsPortal(this.currentY, this.currentX);
                this.wentThroughPortal = true;

                if (this.currentY === 1 && this.currentX === 28 && this.direction === Direction.Right) {
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                    this.currentX = 2;
                    this.currentY = 26;
                    this.previousMapValue = this.map.grid[this.currentY][this.currentX];
                    this.map.grid[this.currentY][this.currentX] = this.ghostId;
                } else if (this.currentY === 2 && this.currentX === 29 && this.direction === Direction.Up) {
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                    this.currentX = 1;
                    this.currentY = 25;
                    this.previousMapValue = this.map.grid[this.currentY][this.currentX];
                    this.map.grid[this.currentY][this.currentX] = this.ghostId;
                } else if (this.currentY === 25 && this.currentX === 1 && this.direction === Direction.Down) {
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                    this.currentX = 29;
                    this.currentY = 2;
                    this.previousMapValue = this.map.grid[this.currentY][this.currentX];
                    this.map.grid[this.currentY][this.currentX] = this.ghostId;
                } else if (this.currentY === 26 && this.currentX === 2 && this.direction === Direction.Left) {
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                    this.currentX = 28;
                    this.currentY = 1;
                    this.previousMapValue = this.map.grid[this.currentY][this.currentX];
                    this.map.grid[this.currentY][this.currentX] = this.ghostId;
                }

                //this.previousMapValue = value;
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

    checkDirection() {

        var possibleDirection: Direction[] = [];
        var possibilities = 0;

        var left = this.map.grid[this.currentY][this.currentX - 1];
        var right = this.map.grid[this.currentY][this.currentX + 1];
        var up = this.map.grid[this.currentY - 1][this.currentX];
        var down = this.map.grid[this.currentY + 1][this.currentX];

        if (left === undefined || right === undefined) {
            return;
        }

        if (left !== 1 && left !== 3 && this.direction != Direction.Left && left != 10) {
            possibilities++;
            possibleDirection.push(Direction.Left);
        }

        if (right !== 1 && right !== 3 && this.direction != Direction.Right && right != 10) {
            possibilities++;
            possibleDirection.push(Direction.Right);
        }

        if (up !== 1 && up !== 3 && this.direction != Direction.Up && up != 10) {
            possibilities++;
            possibleDirection.push(Direction.Up);
        }

        if (down !== 1 && down !== 3 && this.direction != Direction.Down && down != 10) {

            possibilities++;
            possibleDirection.push(Direction.Down);
        }

        if (possibilities > 1) {
            var result = Math.floor(Math.random() * (possibilities));
            this.direction = possibleDirection[result];
        }

        // if (possibilities === 1) {
        //     this.direction = possibleDirection[0];
        // } else {
        //     var result = Math.floor(Math.random() * (possibilities));
        //     this.direction = possibleDirection[result];
        // }
    }

    move() {


        this.checkDirection();

        switch (this.direction) {
            case Direction.Left: {
                if (this.map.grid[this.currentY][this.currentX - 1] !== 1 && this.map.grid[this.currentY][this.currentX - 1] !== 3) {

                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                    //this.previousMapValue = this.map.grid[this.currentY][this.currentX - 1];

                    var value = this.map.grid[this.currentY][this.currentX - 1];
                    this.checkDetection(value, this.currentY, this.currentX - 1);

                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else {
                        //this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                        this.map.grid[this.currentY][this.currentX - 1] = this.ghostId;
                        this.currentX--;
                    }




                } else {
                    //this.direction = this.oldDirection;
                }
                break;
            }

            case Direction.Right: {
                if (this.map.grid[this.currentY][this.currentX + 1] !== 1 && this.map.grid[this.currentY][this.currentX + 1] !== 3) {


                    // var value = this.map.grid[this.currentY][this.currentX];
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                    // this.checkDetection(value, this.currentY, this.currentX + 1);
                    var value = this.map.grid[this.currentY][this.currentX + 1];
                    this.checkDetection(value, this.currentY, this.currentX + 1);

                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else {
                        //this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                        this.map.grid[this.currentY][this.currentX + 1] = this.ghostId;
                        this.currentX++;
                    }
                    // this.map.setPrevious(this.previousMapValue, this.currentY, this.currentX);

                    // this.map.setAsGhost(this.ghostType, this.currentY, this.currentX + 1);

                    //this.currentX++;
                } else {
                    //this.direction = this.oldDirection;
                }
                break;
            }

            case Direction.Up: {
                if (this.map.grid[this.currentY - 1][this.currentX] !== 1 && this.map.grid[this.currentY - 1][this.currentX] !== 3) {


                    // var value = this.map.grid[this.currentY - 1][this.currentX]; 
                    // var value = this.map.grid[this.currentY][this.currentX];
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue; // das jetzige is food = 2
                    // this.checkDetection(value, this.currentY, this.currentX);
                    var value = this.map.grid[this.currentY - 1][this.currentX];
                    this.checkDetection(value, this.currentY - 1, this.currentX); // das nächste is pink = 5

                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else {
                        //this.map.grid[this.currentY][this.currentX] = this.previousMapValue; // das jetzige is pink lol
                        this.map.grid[this.currentY - 1][this.currentX] = this.ghostId;
                        this.currentY--;
                    }
                    // this.map.setPrevious(this.previousMapValue, this.currentY, this.currentX);

                    // this.map.setAsGhost(this.ghostType, this.currentY - 1, this.currentX);

                    //this.currentY--;
                } else {
                    //this.direction = this.oldDirection;
                }
                break;
            }

            case Direction.Down: {
                if (this.map.grid[this.currentY + 1][this.currentX] !== 1 && this.map.grid[this.currentY + 1][this.currentX] !== 3) {


                    // var value = this.map.grid[this.currentY + 1][this.currentX]; 
                    // var value = this.map.grid[this.currentY][this.currentX];
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                    // this.checkDetection(value, this.currentY + 1, this.currentX);
                    var value = this.map.grid[this.currentY + 1][this.currentX];
                    this.checkDetection(value, this.currentY + 1, this.currentX);

                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else {
                        //this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                        this.map.grid[this.currentY + 1][this.currentX] = this.ghostId;
                        this.currentY++;
                    }
                    // this.map.setPrevious(this.previousMapValue, this.currentY, this.currentX);

                    // this.map.setAsGhost(this.ghostType, this.currentY + 1, this.currentX);



                    //this.currentY++;
                } else {

                    //this.direction = this.oldDirection;
                }
                break;
            }

            default: {
                break;
            }
        }
    }

    // checkDetection(value: number, currentY: number, currentX: number) {
    //     switch (value) {
    //         case 2:
    //             this.previousMapValue = value;
    //             break;

    //         case 10:
    //             this.map.setAsPortal(this.currentY, this.currentX);

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

    //             this.previousMapValue = value;
    //             break;

    //         case 4:
    //             this.map.gamePage.pacman.lives--;

    //             if (this.map.gamePage.pacman.lives === 0) {
    //                 this.stopMoving();
    //                 this.map.gamePage.setGameOver();
    //             }
    //             break;

    //         case 5:
    //             this.previousMapValue = value;
    //             break;

    //         case 11:
    //             if (this.currentY === 13 && this.currentX === 0) {
    //                 this.currentX = 30;
    //                 this.currentY = 13;
    //                 this.currentX = 
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
    //             if (this.map.grid[this.currentY][this.currentX - 1] !== (1 || 3)) {

    //                 this.map.setAsBackground(this.currentY, this.currentX);
    //                 this.map.grid[this.currentY][this.currentX] = 0; //TODO make happen in setAsBackground...

    //                 var value = this.map.grid[this.currentY][this.currentX - 1] OLD
    //                 var value = this.map.grid[this.currentY][this.currentX]

    //                 this.checkDetection(value, this.currentY, this.currentX - 1);

    //                 this.map.setPrevious(this.previousMapValue, this.currentY, this.currentX);

    //                 this.map.setAsGhost(this.ghostType, this.currentY, this.currentX - 1);

    //                 this.currentX--;
    //             } else {
    //                 this.direction = this.oldDirection;
    //             }
    //             break;
    //         }

    //         case Direction.Right: {
    //             if (this.map.grid[this.currentY][this.currentX + 1] !== (1 || 3)) {


    //                 var value = this.map.grid[this.currentY][this.currentX];

    //                 this.checkDetection(value, this.currentY, this.currentX + 1);

    //                 this.map.setPrevious(this.previousMapValue, this.currentY, this.currentX);

    //                 this.map.setAsGhost(this.ghostType, this.currentY, this.currentX + 1);

    //                 this.currentX++;
    //             } else {
    //                 this.direction = this.oldDirection;
    //             }
    //             break;
    //         }

    //         case Direction.Up: {
    //             if (this.map.grid[this.currentY - 1][this.currentX] !== (1 || 3)) {


    //                 var value = this.map.grid[this.currentY - 1][this.currentX]; OLD
    //                 var value = this.map.grid[this.currentY][this.currentX];

    //                 this.checkDetection(value, this.currentY, this.currentX);

    //                 this.map.setPrevious(this.previousMapValue, this.currentY, this.currentX);

    //                 this.map.setAsGhost(this.ghostType, this.currentY - 1, this.currentX);

    //                 this.currentY--;
    //             } else {
    //                 this.direction = this.oldDirection;
    //             }
    //             break;
    //         }

    //         case Direction.Down: {
    //             if (this.map.grid[this.currentY + 1][this.currentX] !== (1 || 3)) {


    //                 var value = this.map.grid[this.currentY + 1][this.currentX]; OLD
    //                 var value = this.map.grid[this.currentY][this.currentX];

    //                 this.checkDetection(value, this.currentY + 1, this.currentX);

    //                 this.map.setPrevious(this.previousMapValue, this.currentY, this.currentX);

    //                 this.map.setAsGhost(this.ghostType, this.currentY + 1, this.currentX);



    //                 this.currentY++;
    //             } else {

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
