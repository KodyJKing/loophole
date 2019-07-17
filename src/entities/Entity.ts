import World from "../World"
import Canvas from "../Canvas"
import { getImage } from "../common"
import Tile from "../tiles/Tile"

export default class Entity {
    world!: World
    x = 0
    y = 0
    dx = 0
    dy = 0

    move( dx, dy ) {
        let { world, x, y } = this
        let blocked = !world.isEmpty( x + dx, y + dy )
        let blockedX = !world.isEmpty( x + dx, y )
        let blockedY = !world.isEmpty( x, y + dy )
        let blockedXY = blockedX && blockedY
        if ( blocked || blockedXY ) dx = 0
        if ( blocked || blockedXY ) dy = 0
        this.dx += dx
        this.dy += dy
        this.x += dx
        this.y += dy
    }

    update() {
        this.dx = 0
        this.dy = 0
    }

    draw( partialSteps ) {
        Canvas.push().translate( this.dx * Tile.width * ( partialSteps - 1 ), this.dy * Tile.width * ( partialSteps - 1 ) )
        this.drawAfterTranslation( partialSteps )
        Canvas.pop()
    }

    drawAfterTranslation( partialSteps ) {
        Canvas.image( this.image )
    }

    get image(): HTMLImageElement | undefined { return getImage( this.constructor.name ) }
}
