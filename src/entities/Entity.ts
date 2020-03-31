import World from "../World"
import Tile from "../tiles/Tile"
import Game from "../Game"
import { getImage } from "geode/lib/assets"
import Canvas from "geode/lib/graphics/Canvas"

export default class Entity {
    world!: World
    x = 0
    y = 0
    dx = 0
    dy = 0
    layer = 0

    displacementX( partialSteps: number ) { return this.dx * Tile.width * ( partialSteps - 1 ) }
    displacementY( partialSteps: number ) { return this.dy * Tile.width * ( partialSteps - 1 ) }
    pixelX( partialSteps: number ) { return this.x * Tile.width + this.displacementX( partialSteps ) }
    pixelY( partialSteps: number ) { return this.y * Tile.width + this.displacementY( partialSteps ) }

    move( dx: number, dy: number ) {
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

    onGround() {
        let { world, x, y } = this
        return !world.isEmpty( x, y + 1 )
    }

    update() {
        this.dx = 0
        this.dy = 0
    }

    block() { }

    draw( canvas: Canvas, partialSteps: number ) {
        canvas.push().translate( this.displacementX( partialSteps ), this.displacementY( partialSteps ) )
        this.drawAfterTranslation( canvas, partialSteps )
        canvas.pop()
    }

    drawAfterTranslation( canvas: Canvas, partialSteps: number ) {
        canvas.image( this.image )
    }

    get image(): HTMLImageElement | undefined { return getImage( this.constructor.name ) }
}
