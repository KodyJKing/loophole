import TileMoving from "./TileMoving";
import World from "../World";
import { getImage } from "../common";

export default class TileMover extends TileMoving {
    motionY = 1

    get image() {
        return this.motionY > 0 ? getImage( "TileDown" ) : getImage( "TileUp" )
    }

    update() {
        super.update()
        let { world, x, y } = this
        if ( !world.isEmpty( x, y + this.motionY ) )
            this.motionY *= -1
        this.move( 0, this.motionY )
    }
}
