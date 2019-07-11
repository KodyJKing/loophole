import Tile from "./Tile";
import World from "../World";
import getImage from "../../getImage";
import Canvas from "../../Canvas";
import Game from "../../Game";
import { ELOOP } from "constants";
import { throws } from "assert";

export class TilePanel extends Tile { }

export class TileMoving extends Tile {
    lastMove = -1
    get direction() { return 1 }
    free( world: World, x, y ) {
        return world.isEmpty( x, y + this.direction )
    }
    update( world: World, x, y ) {
        if ( this.lastMove < world.time ) {
            if ( this.free( world, x, y ) ) {
                this.lastMove = world.time
                world.remove( x, y )
                world.setTile( x, y + this.direction, this )
            }
        }
    }
    draw( world: World, x, y, partialSteps ) {
        if ( this.free( world, x, y ) ) {
            Canvas.push().translate( 0, this.direction * Tile.width * partialSteps )
            this.drawInternal( world, x, y, partialSteps )
            Canvas.pop()
        } else {
            this.drawInternal( world, x, y, partialSteps )
        }
    }
    drawInternal( world: World, x, y, partialSteps ) {
        super.draw( world, x, y, partialSteps )
    }
}

export class TileMover extends TileMoving {
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

export class TileBot extends TileMoving {
    drawInternal( world: World, x, y, partialSteps ) {
        let sheet = getImage( "TileBotSheet" )
        let time = world.time + partialSteps
        let frame = ( time / 3 ) % 1 >= 0.5 ? 1 : 0
        Canvas.imageAt( sheet, 0, 0, 0, frame * Tile.width, Tile.width, Tile.width )
    }
}