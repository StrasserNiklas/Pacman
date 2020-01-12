import { Direction } from '../gamelogic/direction.enum';

export class Ghost {
    public direction: Direction;

    constructor() {
        this.direction = Direction.Down;
    }
}
