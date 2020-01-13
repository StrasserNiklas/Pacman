import { Direction } from '../gamelogic/direction.enum';
import { Map } from '../gamelogic/map';

export class Pacman {

    public direction: Direction;
    private oldDirection: Direction;
    public lives: number = 3;
    public lastDemandedDirection: Direction;
    private map: Map;
    private intervallId: any;// NodeJS.Timer;
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
        this.intervallId = setInterval(this.move.bind(this), 250);
    }

    checkDetection(value: number, currentY: number, currentX: number) {
        switch (value) { //TODO AUSLAGERN !!!!!!!
            case 2:
                this.map.mapScore = this.map.mapScore + 5;
                this.map.setAsBackground(this.currentY, this.currentX);
                this.map.grid[this.currentY][this.currentX] = 0;
                this.map.foodCount--;
                break;

            case 10:
                this.map.mapScore = this.map.mapScore + 100;
                //this.map.setAsPortal(this.currentY, this.currentX);

                if (currentY === 1 && currentX === 29 && this.direction === Direction.Right) {
                    this.currentX = 2;
                    this.currentY = 26;
                } else if (currentY === 2 && currentX === 29 && this.direction === Direction.Up) {
                    this.currentX = 1;
                    this.currentY = 25;
                } else if (currentY === 26 && currentX === 1 && this.direction === Direction.Down) {
                    this.currentX = 29;
                    this.currentY = 2;
                } else if (currentY === 26 && currentX === 1 && this.direction === Direction.Left) {
                    this.currentX = 28;
                    this.currentY = 1;
                } 
                
                

                this.map.grid[this.currentY][this.currentX] = 0;
                break;
        }
    }

    move() {
        switch (this.direction) {
            case Direction.Left: {
                if (this.map.grid[this.currentY][this.currentX - 1] !== 1) {
                    this.map.setAsBackground(this.currentY, this.currentX);
                    //this.map.grid[this.currentY][this.currentX] = 0; //TODO make happen in setAsBackground...

                    var value = this.map.grid[this.currentY][this.currentX - 1]

                    this.checkDetection(value, this.currentY, this.currentX - 1);

                    if (value === 10) {
                        this.map.setAsPacman(this.currentY, this.currentX, Direction.Left);
                    } else {
                        this.map.setAsPacman(this.currentY, this.currentX - 1, Direction.Left);
                    }

                    
                    this.currentX--;
                } else {
                    this.direction = this.oldDirection;
                }
                break;
            }

            case Direction.Right: {
                if (this.map.grid[this.currentY][this.currentX + 1] !== 1) {
                    this.map.setAsBackground(this.currentY, this.currentX);
                    
                    var value = this.map.grid[this.currentY][this.currentX + 1];

                    this.checkDetection(value, this.currentY, this.currentX + 1);

                    if (value === 10) {
                        this.map.setAsPacman(this.currentY, this.currentX, Direction.Right);
                    } else {
                        this.map.setAsPacman(this.currentY, this.currentX + 1, Direction.Right);
                    }

                    
                    this.currentX++;
                } else {
                    this.direction = this.oldDirection;
                }
                break;
            }

            case Direction.Up: {
                if (this.map.grid[this.currentY - 1][this.currentX] !== 1) {
                    this.map.setAsBackground(this.currentY, this.currentX);

                    var value = this.map.grid[this.currentY - 1][this.currentX];

                    this.checkDetection(value, this.currentY, this.currentX);

                    if (value === 10) {
                        this.map.setAsPacman(this.currentY, this.currentX, Direction.Up);
                    } else {
                        this.map.setAsPacman(this.currentY - 1, this.currentX, Direction.Up);
                    }

                    
                    this.currentY--;
                } else {
                    this.direction = this.oldDirection;
                }
                break;
            }

            case Direction.Down: {
                if (this.map.grid[this.currentY + 1][this.currentX] !== 1) {
                    this.map.setAsBackground(this.currentY, this.currentX);

                    var value = this.map.grid[this.currentY + 1][this.currentX];

                    this.checkDetection(value, this.currentY + 1, this.currentX);

                    if (value === 10) {
                        this.map.setAsPacman(this.currentY, this.currentX, Direction.Down);
                    } else {
                        this.map.setAsPacman(this.currentY + 1, this.currentX, Direction.Down);
                    }

                    
                    this.currentY++;
                } else {
                    this.direction = this.oldDirection;
                }
                break;
            }

            default: {
                break;
            }
        }
    }
}
