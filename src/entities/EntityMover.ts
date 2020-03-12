import Game from "../Game";
import World from "../World";
import Entity from "./Entity";
import { getImage } from "../common/common";

export class EntityMover extends Entity {

    direction = 1

    update( game: Game ) {
        super.update( game )
        let { world, x, y } = this
        let { time } = world
        if ( time % 1 != 0 )
            return
        if ( !world.isEmpty( x, y + this.direction ) )
            this.direction *= -1
        this.move( 0, this.direction )
    }

    get image(): HTMLImageElement | undefined {
        return getImage(
            this.direction == 1 ?
                "TileDown" :
                "TileUp"
        )
    }

}