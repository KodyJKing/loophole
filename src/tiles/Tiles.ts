import Tile from "./Tile"
import World from "../World"
import { getImage } from "geode/lib/assets"
import Canvas from "geode/lib/graphics/Canvas"

export class TileGeneric extends Tile {
    name: string
    constructor( name ) {
        super()
        this.name = name
    }
    image( world: World, x: number, y: number, fracTime: number ): HTMLImageElement | undefined { return getImage( this.name ) }
    draw( world: World, x: number, y: number, canvas: Canvas, fracTime: number ) {
        let image = this.image( world, x, y, fracTime )
        if ( !image ) return
        let imageWidth = image.width / Tile.width
        let imageHeight = image.height / Tile.width
        let dx = x % imageWidth
        let dy = y % imageHeight
        canvas.imageSource( dx * Tile.width, dy * Tile.width, Tile.width, Tile.width ).partialImage( image )
    }
}

export const TilePanel = new TileGeneric( "TilePanel" )
export const TileBackPanel = new TileGeneric( "TileBackPanel" )
export const TileGlassPanel = new TileGeneric( "TileGlassPanel" )
export const TileCatwalk = new TileGeneric( "TileCatwalk" )
export const TileRail = new TileGeneric( "TileRail" )
export const TileLadder = new TileGeneric( "TileLadder" )
export const TileCrate = new TileGeneric( "TileCrate" )
export const TileThruster = new TileGeneric( "TileThruster" )