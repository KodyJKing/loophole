import World from "../World";
import Canvas from "../Canvas";
import Tile from "./Tile";

export default class TileMoving extends Tile {
    dx = 0
    dy = 0

    move( dx, dy ) {
        let { world, x, y } = this
        dx = world.isEmpty( x + dx, y ) ? dx : 0
        dy = world.isEmpty( x, y + dy ) ? dy : 0
        this.dx += dx
        this.dy += dy
        world.remove( x, y )
        world.setTile( x + dx, y + dy, this )
    }

    update() {
        this.dx = 0
        this.dy = 0
    }

    draw( partialSteps ) {
        Canvas.push().translate( this.dx * Tile.width * ( partialSteps - 1 ), this.dy * Tile.width * ( partialSteps - 1 ) )
        this.drawInternal( partialSteps )
        Canvas.pop()
    }

    drawInternal( partialSteps ) {
        super.draw( partialSteps )
    }
}
