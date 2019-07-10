import Tile from "./Tile";
import World from "../World";
import getImage from "../../getImage";

export class TilePanel extends Tile { }

export class TileMover extends Tile {
    lastMove = -1
    direction = -1
    get image() {
        return this.direction > 0 ? getImage( "TileDown" ) : getImage( "TileUp" )
    }
    update( world: World, x, y ) {
        if ( this.lastMove < world.time ) {
            if ( world.isEmpty( x, y + this.direction ) ) {
                this.lastMove = world.time
                world.remove( x, y )
                world.setTile( x, y + this.direction, this )
            } else {
                this.direction *= -1
            }
        }
    }
}