import Tile from "../tiles/Tile"
import Entity from "./Entity"
import { EntityBot } from "./EntityBot"
import { getImage } from "geode/lib/assets"
import Game from "../Game"
import Canvas from "geode/lib/graphics/Canvas"
import World from "../World"

@Entity.register
export default class EntityPlate extends Entity {
    active = false
    layer = 1
    triggerName = "plateActive"

    setActive( world: World, value: boolean ) {
        this.active = value
        world.triggers[ this.triggerName ] = value
    }

    update( world: World ) {
        let active = false
        for ( let entity of world.entities ) {
            if ( entity.x == this.x && entity.y == this.y && entity instanceof EntityBot ) {
                active = true
                break
            }
        }
        this.setActive( world, active )
    }

    drawAfterTranslation( world: World, canvas: Canvas, fracTime: number ) {
        let sheet = getImage( "EntityPlate" )
        let frame = this.active ? 1 : 0
        canvas.imageSource( 0, frame * Tile.width, Tile.width, Tile.width ).partialImage( sheet )
    }
}
