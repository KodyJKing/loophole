import Entity from "./Entity"
import Tile from "../tiles/Tile"
import { getImage } from "geode/lib/assets"
import Game from "../Game"
import Canvas from "geode/lib/graphics/Canvas"

export default class EntityDoor extends Entity {
    extension: number = 0
    direction = 0
    triggerName = "plateActive"

    drawAfterTranslation( canvas: Canvas, partialSteps: number ) {
        let sheet = getImage( "EntityDoor" )
        let { extension, direction } = this

        let w = Tile.width

        // Upper segment.
        canvas.imageSource( 0, 0, w, w * 2 ).partialImage( sheet )

        // Moving segment.
        canvas.push()
        canvas.rect( 0, 0, w, w * 2 )
        let motion = extension + direction * partialSteps
        canvas.context.clip()
        canvas.translate( 0, motion * 20 )
        canvas.imageSource( w, 0, w, w * 2 ).partialImage( sheet )
        canvas.pop()

        // // Light
        if ( this.world.triggers[ this.triggerName ] )
            canvas.imageSource( w * 2, w, w, w ).partialImage( sheet )
        else
            canvas.imageSource( w * 2, 0, w, w ).partialImage( sheet )
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