import World from "../World"
import { getImage } from "geode/lib/assets"
import Game from "../Game"
import Canvas from "geode/lib/graphics/Canvas"

export default class Tile {
    static width = 32
    image( world: World, x: number, y: number, fracTime: number ): HTMLImageElement | undefined { return getImage( this.constructor.name ) }
    draw( world: World, x: number, y: number, canvas: Canvas, fracTime: number ) { canvas.image( this.image ) }
}