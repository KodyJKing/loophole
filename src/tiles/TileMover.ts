import TileMoving from "./TileMoving";
import World from "../World";
import { getImage } from "../common";

export default class TileMover extends TileMoving {

    dy = -1
    get direction() { return this.dy }

    get image() {
        return this.dy > 0 ? getImage( "TileDown" ) : getImage( "TileUp" )
    }

    free( world: World, x, y ) {
        return world.isEmpty( x, y + this.direction )
    }

    update( world: World, x, y ) {
        if ( !this.free( world, x, y ) )
            this.dy *= -1
        else
            super.update( world, x, y )
    }
}
