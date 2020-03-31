import Tile from "./Tile"
import World from "../World"
import { getImage } from "geode/lib/assets"
import Game from "../Game"

export class TileGeneric extends Tile {
    name: string
    constructor( name ) {
        super()
        this.name = name
    }
    image( world: World, x, y, partialSteps ): HTMLImageElement | undefined { return getImage( this.name ) }
    draw( world: World, x, y, partialSteps ) {
        let image = this.image( world, x, y, partialSteps )
        if ( !image ) return
        Game.instance.canvas.image( image )
        // let imageWidth = image.width / Tile.width
        // let imageHeight = image.height / Tile.width
        // let dx = x % imageWidth
        // let dy = y % imageHeight
        // Game.instance.canvas.partialImage(
        //     image,
        //     dx * Tile.width, dy * Tile.width,
        //     Tile.width, Tile.width
        // )
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