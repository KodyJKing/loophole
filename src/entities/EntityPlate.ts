import Tile from "../tiles/Tile"
import Entity from "./Entity"
import { EntityBot } from "./EntityBot"
import { getImage } from "geode/lib/assets"
import Game from "../Game"
import Canvas from "geode/lib/graphics/Canvas"

export default class EntityPlate extends Entity {
    active = false
    layer = 1
    triggerName = "plateActive"

    update() {
        this.active = false
        this.world.triggers[ this.triggerName ] = false
        for ( let entity of this.world.entities ) {
            if ( entity.x == this.x && entity.y == this.y && entity instanceof EntityBot ) {
                this.active = true
                this.world.triggers[ this.triggerName ] = true
                break
            }
        }
    }

    drawAfterTranslation( canvas: Canvas, partialSteps: number ) {
        let sheet = getImage( "EntityPlate" )
        let frame = this.active ? 1 : 0
        canvas.imageSource( 0, frame * Tile.width, Tile.width, Tile.width ).partialImage( sheet )
    }
}
