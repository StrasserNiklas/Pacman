import { Direction } from '../gamelogic/direction.enum';

export class Pacman {

    direction: Direction;
    public lives: number = 3;

    constructor() {
        this.direction = Direction.Down;
    }
}
