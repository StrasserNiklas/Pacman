import { Direction } from '../gamelogic/direction.enum';
import { Map } from '../gamelogic/map';

export class Pacman {
    private map: Map;
    public direction: Direction;
    public requestedDirection: Direction;
    public lives: number = 3;
    public currentX: number = 0;
    public currentY: number = 0;

    constructor(map: Map) {
        this.direction = Direction.Right;
        this.requestedDirection = undefined;
        this.map = map;
    }

    checkDetection(value: number, currentY: number, currentX: number) {
        switch (value) {
            case 10:
                if (this.map.foodCount > 0) {
                    while (true) {
                        var randomX = Math.floor(Math.random() * 29) + 1;
                        var randomY = Math.floor(Math.random() * 27) + 1;

                        if (this.map.grid[randomY][randomX] === 2) {
                            this.map.grid[this.currentY][this.currentX] = 0;
                            this.currentX = randomX;
                            this.currentY = randomY;
                            break;
                        }
                    }
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

    checkRequestedDirection() {
        switch (this.requestedDirection) {
            case Direction.Left:
                if (this.map.grid[this.currentY][this.currentX - 1] !== 1 && this.map.grid[this.currentY][this.currentX - 1] !== 3) {
                    this.direction = Direction.Left;
                    this.requestedDirection = undefined;
                }
                break;

            case Direction.Right:
                if (this.map.grid[this.currentY][this.currentX + 1] !== 1 && this.map.grid[this.currentY][this.currentX + 1] !== 3) {
                    this.direction = Direction.Right;
                    this.requestedDirection = undefined;
                }
                break;

            case Direction.Up:
                if (this.map.grid[this.currentY - 1][this.currentX] !== 1 && this.map.grid[this.currentY - 1][this.currentX] !== 3) {
                    this.direction = Direction.Up;
                    this.requestedDirection = undefined;
                }
                break;

            case Direction.Down:
                if (this.map.grid[this.currentY + 1][this.currentX ] !== 1 && this.map.grid[this.currentY + 1][this.currentX] !== 3) {
                    this.direction = Direction.Down;
                    this.requestedDirection = undefined;
                }
                break;
        }
    }

    move() {
        this.checkRequestedDirection();

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
                    this.direction = this.requestedDirection;
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
                } else {
                    this.direction = this.requestedDirection;
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
                    this.direction = this.requestedDirection;
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
                    this.direction = this.requestedDirection;
                }
                break;
            }
        }
    }
}
