import Entity from "./Entity"
import { getImage } from "../common/common"
import Tile from "../tiles/Tile"
import Canvas from "../common/Canvas"
import { clamp } from "../common/math/Math"
import { TileThruster } from "../tiles/Tiles"

export default class EntityDoor extends Entity {
    extension: number = 0
    direction = 0
    triggerName = "plateActive"

    drawAfterTranslation( partialSteps ) {
        let sheet = getImage( "EntityDoor" )
        let { push, pop, translate, scale, imageAt, rect } = Canvas
        let { extension, direction } = this

        let w = Tile.width

        // Upper segment.
        imageAt( sheet, 0, 0, 0, 0, w, w * 2 )

        // Moving segment.
        push()
        rect( 0, 0, w, w * 2 )
        let motion = extension + direction * partialSteps
        Canvas.context.clip()
        translate( 0, motion * 20 )
        imageAt( sheet, 0, 0, w, 0, w, w * 2 )
        pop()

        // // Light
        if ( this.world.triggers[ this.triggerName ] )
            imageAt( sheet, 0, 0, w * 2, w, w, w )
        else
            imageAt( sheet, 0, 0, w * 2, 0, w, w )
    }

    block() {
        let { world, extension, x, y } = this
        world.block( x, y )
        if ( extension < 2 )
            world.block( x, y + 1 )
    }

    update() {
        let active = this.world.triggers[ this.triggerName ]
        // let blocked = !world.isEmpty( this.x, this.y + 1 )
        this.extension += this.direction
        this.direction = 0
        if ( active && this.extension < 2 )
            this.direction = 1
        if ( !active && this.extension > 0 )
            this.direction = -1
    }
}