import { Direction } from '../gamelogic/direction.enum';
import { Map } from '../gamelogic/map';
import { GhostType } from './ghost-type.enum';


export class Ghost {
    private ghostType: GhostType;
    private ghostId: number;
    private previousMapValue: number = 0;
    private intervallId: any;
    private map: Map;
    public currentX: number = 0;
    public currentY: number = 0;
    public direction: Direction;
    public collisionReset: number = 0;
    public deathReset: number = 0;
    public isDead: boolean = false;
    public ghostOutOfCell: number = 0;

    constructor(map: Map, ghostType: GhostType, ghostId: number) {
        this.direction = Direction.Right;
        this.map = map;
        this.ghostType = ghostType;
        this.ghostId = ghostId;
        this.previousMapValue = 0;
    }

    checkDetection(value: number, currentY: number, currentX: number) {
        switch (value) {
            case 0:
                this.previousMapValue = value;
                break;

            case 2:
                this.previousMapValue = value;
                break;

            case 3:
                this.previousMapValue = value;
                break;

            case 5:
                this.previousMapValue = value;
                break;

            case 6:
                if (this.map.foodGrid[currentY][currentX] === 2) {
                    this.previousMapValue = 2;
                } else if (this.map.foodGrid[currentY][currentX] === 5) {
                    this.previousMapValue = 5;
                } else {
                    this.previousMapValue = 0;
                }
                break;

            case 7:
                if (this.map.foodGrid[currentY][currentX] === 2) {
                    this.previousMapValue = 2;
                } else if (this.map.foodGrid[currentY][currentX] === 5) {
                    this.previousMapValue = 5;
                } else {
                    this.previousMapValue = 0;
                }
                break;

            case 8:
                if (this.map.foodGrid[currentY][currentX] === 2) {
                    this.previousMapValue = 2;
                } else if (this.map.foodGrid[currentY][currentX] === 5) {
                    this.previousMapValue = 5;
                } else {
                    this.previousMapValue = 0;
                }
                break;

            case 9:
                if (this.map.foodGrid[currentY][currentX] === 2) {
                    this.previousMapValue = 2;
                } else if (this.map.foodGrid[currentY][currentX] === 5) {
                    this.previousMapValue = 5;
                } else {
                    this.previousMapValue = 0;
                }
                break;

            case 10:
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
                break;

            case undefined:
                if (this.currentY === 13 && this.currentX === 0) {
                    this.map.grid[this.currentY][this.currentX] = 0;
                    this.currentX = 30;
                    this.currentY = 13;
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
    }

    move() {
        this.checkDirection();

        if (this.ghostOutOfCell > 0) {
            this.direction = Direction.Up;
            this.ghostOutOfCell--;
        }

        switch (this.direction) {
            case Direction.Left: {
                if (this.map.grid[this.currentY][this.currentX - 1] !== 1 && this.map.grid[this.currentY][this.currentX - 1] !== 3) {
                    
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;

                    var value = this.map.grid[this.currentY][this.currentX - 1];
                    this.checkDetection(value, this.currentY, this.currentX - 1);

                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else {
                        this.map.grid[this.currentY][this.currentX - 1] = this.ghostId;
                        this.currentX--;
                    }
                }
                break;
            }

            case Direction.Right: {
                if (this.map.grid[this.currentY][this.currentX + 1] !== 1 && this.map.grid[this.currentY][this.currentX + 1] !== 3) {
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                    var value = this.map.grid[this.currentY][this.currentX + 1];
                    this.checkDetection(value, this.currentY, this.currentX + 1);

                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else {
                        this.map.grid[this.currentY][this.currentX + 1] = this.ghostId;
                        this.currentX++;
                    }
                }
                break;
            }

            case Direction.Up: {
                if (this.map.grid[this.currentY - 1][this.currentX] !== 1 && this.map.grid[this.currentY - 1][this.currentX] !== 3) {
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                    var value = this.map.grid[this.currentY - 1][this.currentX];
                    this.checkDetection(value, this.currentY - 1, this.currentX);
                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else {
                        this.map.grid[this.currentY - 1][this.currentX] = this.ghostId;
                        this.currentY--;
                    }
                } else {
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                    var value = this.map.grid[this.currentY - 1][this.currentX];
                    this.checkDetection(value, this.currentY - 1, this.currentX);
                    this.map.grid[this.currentY - 1][this.currentX] = this.ghostId;
                    this.currentY--;
                }
                break;
            }

            case Direction.Down: {
                if (this.map.grid[this.currentY + 1][this.currentX] !== 1 && this.map.grid[this.currentY + 1][this.currentX] !== 3) {
                    this.map.grid[this.currentY][this.currentX] = this.previousMapValue;
                    var value = this.map.grid[this.currentY + 1][this.currentX];
                    this.checkDetection(value, this.currentY + 1, this.currentX);

                    if (value === 10) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else if (value === undefined) {
                        this.map.grid[this.currentY][this.currentX] = this.ghostId;
                    } else {
                        this.map.grid[this.currentY + 1][this.currentX] = this.ghostId;
                        this.currentY++;
                    }
                }
                break;
            }
        }
    }
}
