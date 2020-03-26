import Canvas from "../common/Canvas"
import Tile from "../tiles/Tile"
import Entity from "./Entity"
import { EntityBot } from "./EntityBot"
import { getImage } from "../common/common"

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

    drawAfterTranslation( partialSteps ) {
        let sheet = getImage( "EntityPlate" )
        let frame = this.active ? 1 : 0
        Canvas.imageAt( sheet, 0, 0, 0, frame * Tile.width, Tile.width, Tile.width )
    }
}
