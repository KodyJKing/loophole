import Tile from "./Tile"
import { getImage } from "../common"
import Canvas from "../Canvas";
import World from "../World";

export class TileGeneric extends Tile {
    name: string
    constructor( name ) {
        super()
        this.name = name
    }
    image( world: World, x, y, partialSteps ): HTMLImageElement | undefined { return getImage( this.name ) }
    draw( world: World, x, y, partialSteps ) {
        let { imageAt } = Canvas
        let image = this.image( world, x, y, partialSteps )
        if ( !image ) return
        let imageWidth = image.width / Tile.width
        let imageHeight = image.height / Tile.width
        let dx = x % imageWidth
        let dy = y % imageHeight
        imageAt(
            image,
            0, 0,
            dx * Tile.width, dy * Tile.width,
            Tile.width, Tile.width
        )
    }
}

export const TilePanel = () => new TileGeneric( "TilePanel" )
export const TileBackPanel = () => new TileGeneric( "TileBackPanel" )
export const TileGlassPanel = () => new TileGeneric( "TileGlassPanel" )
export const TileCatwalk = () => new TileGeneric( "TileCatwalk" )
export const TileRail = () => new TileGeneric( "TileRail" )
export const TileLadder = () => new TileGeneric( "TileLadder" )
export const TileCrate = () => new TileGeneric( "TileCrate" )
export const TileThruster = () => new TileGeneric( "TileThruster" )