import Game from "../Game"
import World from "../World"
import Entity from "./Entity"
import { getImage } from "geode/lib/assets"

export class EntityMover extends Entity {

    direction = 1

    update( world: World ) {
        super.update( world )
        let { x, y } = this
        let { time } = world
        if ( time % 1 != 0 )
            return
        if ( !world.isEmpty( x, y + this.direction ) )
            this.direction *= -1
        this.move( world, 0, this.direction )
    }

    block( world: World ) {
        let { x, y } = this
        world.block( x, y )
    }

    get image(): HTMLImageElement | undefined {
        return getImage(
            this.direction == 1 ?
                "TileDown" :
                "TileUp"
        )
    }

}