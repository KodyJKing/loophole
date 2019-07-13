import Tile from "./Tile";
import World from "../World";
import Canvas from "../Canvas";
import { getImage } from "../common";

export class TileGeneric extends Tile {
    name: string
    yOffset: number
    constructor( name, yOffset = 0 ) {
        super()
        this.name = name
        this.yOffset = yOffset
    }
    get image(): HTMLImageElement | undefined { return getImage( this.name ) }
    draw( world: World, x, y, partialSteps ) {
        let { push, pop } = Canvas
        push().translate( 0, this.yOffset )
        super.draw( world, x, y, partialSteps )
        pop()
    }
}

export const TilePanel = new TileGeneric( "TilePanel" )
export const TileBackPanel = new TileGeneric( "TileBackPanel" )
export const TileGlassPanel = new TileGeneric( "TileGlassPanel" )
export const TileCatwalk = new TileGeneric( "TileCatwalk", -22 )
export const TileLadder = new TileGeneric( "TileLadder" )