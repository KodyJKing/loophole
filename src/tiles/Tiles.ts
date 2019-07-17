import Tile from "./Tile"
import { getImage } from "../common"
import Canvas from "../Canvas";

export class TileGeneric extends Tile {
    name: string
    constructor( name ) {
        super()
        this.name = name
    }
    get image(): HTMLImageElement | undefined { return getImage( this.name ) }
    draw( partialSteps ) {
        let { x, y, image } = this
        let { imageAt } = Canvas
        if ( !image ) return
        let imageWidth = image.width / Tile.width
        let imageHeight = image.height / Tile.width
        if ( imageWidth != 1 )
            console.log( "Image width: " + imageWidth )
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