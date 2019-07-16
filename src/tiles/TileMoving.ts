import World from "../World";
import Canvas from "../Canvas";
import Tile from "./Tile";

export default class TileMoving extends Tile {
    lastMove = -1
    get dx() { return 0 }
    get dy() { return 1 }

    free( world: World, x, y ) {
        return world.isEmpty( x + this.dx, y + this.dy )
    }

    update( world: World, x, y ) {
        if ( this.lastMove < world.time ) {
            if ( this.free( world, x, y ) ) {
                this.lastMove = world.time
                world.remove( x, y )
                world.setTile( x + this.dx, y + this.dy, this )
            }
        }
    }

    draw( world: World, x, y, partialSteps ) {
        if ( this.free( world, x, y ) ) {
            Canvas.push().translate( this.dx * Tile.width * partialSteps, this.dy * Tile.width * partialSteps )
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
