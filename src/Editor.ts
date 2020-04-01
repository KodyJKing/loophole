import World from "./World"
import { map0 } from "./maps"
import Canvas from "geode/lib/graphics/Canvas"
import Input from "geode/lib/Input"
import Tile from "./tiles/Tile"
import Vector2 from "geode/lib/math/Vector2"
import { deserialize } from "./common/serialize"

export default class Editor {
    world: World
    canvas: Canvas

    constructor() {
        this.canvas = new Canvas( "canvas" )
        this.world = map0()
    }

    update( dt: number ) {
        this.draw()
    }

    blockPos( v: Vector2 ) {
        return this.world.screenSpaceToBlockSpace( this.canvas, v ).floor()
    }

    draw() {
        let { canvas, world } = this
        canvas.fitWindow()
        canvas.smooth( false )
        world.draw( canvas, 0 )

        let blockPos = this.blockPos( Input.mouseScreenPosition( canvas ) )
        let worldPos = blockPos.multiply( Tile.width )
        canvas.push()
            .applyMatrix( world.transform( canvas ) )
            .vrect( worldPos, new Vector2( Tile.width, Tile.width ) ).strokeStyle( "#FF6F6F" ).stroke()
            .pop()
    }
}