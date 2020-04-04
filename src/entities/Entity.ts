import World from "../World"
import Tile from "../tiles/Tile"
import Game from "../Game"
import { getImage } from "geode/lib/assets"
import Canvas from "geode/lib/graphics/Canvas"

export default class Entity {
    x = 0
    y = 0
    dx = 0
    dy = 0
    layer = 0

    static registeredEntities: { [ name: string ]: any } = {}
    static register( target: Function ) {
        Entity.registeredEntities[ target.name ] = target
    }

    displacementX( fracTime: number ) { return this.dx * Tile.width * ( fracTime - 1 ) }
    displacementY( fracTime: number ) { return this.dy * Tile.width * ( fracTime - 1 ) }
    pixelX( fracTime: number ) { return this.x * Tile.width + this.displacementX( fracTime ) }
    pixelY( fracTime: number ) { return this.y * Tile.width + this.displacementY( fracTime ) }

    initDraw() { }
    initPlay() { }

    move( world: World, dx: number, dy: number ) {
        let { x, y } = this
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

    onGround( world: World ) {
        let { x, y } = this
        return !world.isEmpty( x, y + 1 )
    }

    update( world: World ) {
        this.dx = 0
        this.dy = 0
    }

    block( world: World ) { }

    draw( world: World, canvas: Canvas, fracTime: number ) {
        canvas.push().translate( this.displacementX( fracTime ), this.displacementY( fracTime ) )
        this.drawAfterTranslation( world, canvas, fracTime )
        canvas.pop()
    }

    drawAfterTranslation( world: World, canvas: Canvas, fracTime: number ) {
        canvas.image( this.image )
    }

    get image(): HTMLImageElement | undefined { return getImage( this.constructor.name ) }
}