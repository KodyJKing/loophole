import World from "../World";
import Canvas from "../Canvas";
import Tile from "./Tile";

export default class TileMoving extends Tile {
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

            // // Motion blur
            // for ( let i = 0; i < 5; i++ ) {
            //     Canvas.push().translate( 0, this.direction * Tile.width * ( partialSteps - 0.1 * i ) )
            //     Canvas.context.globalAlpha = 0.05
            //     this.drawInternal( world, x, y, partialSteps )
            //     Canvas.pop()
            // }

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
