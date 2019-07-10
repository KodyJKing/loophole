import Tile from "./Tile";
import World from "../World";
import getImage from "../../getImage";
import Canvas from "../../Canvas";
import Game from "../../Game";

export class TilePanel extends Tile { }

export class TileMover extends Tile {
    lastMove = -1
    direction = -1
    get image() {
        return this.direction > 0 ? getImage( "TileDown" ) : getImage( "TileUp" )
    }
    free( world: World, x, y ) {
        return world.isEmpty( x, y + this.direction )
    }
    update( world: World, x, y ) {
        if ( this.lastMove < world.time ) {
            if ( this.free( world, x, y ) ) {
                this.lastMove = world.time
                world.remove( x, y )
                world.setTile( x, y + this.direction, this )
            } else {
                this.direction *= -1
            }
        }
    }
    draw( world: World, x, y, partialSteps ) {
        if ( this.free( world, x, y ) ) {
            Canvas.push().translate( 0, this.direction * 32 * partialSteps )
            super.draw( world, x, y, partialSteps )
            Canvas.pop()
        } else {
            super.draw( world, x, y, partialSteps )
        }
    }
}