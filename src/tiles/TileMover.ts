import TileMoving from "./TileMoving";
import World from "../World";
import { getImage } from "../common";

export default class TileMover extends TileMoving {

    _dy = -1
    get dy() { return this._dy }

    get image() {
        return this.dy > 0 ? getImage( "TileDown" ) : getImage( "TileUp" )
    }

    update( world: World, x, y ) {
        if ( !this.free( world, x, y ) )
            this._dy *= -1
        else
            super.update( world, x, y )
    }
}
