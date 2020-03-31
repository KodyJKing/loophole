import World from "../World"
import { getImage } from "geode/lib/assets"
import Game from "../Game"
import Canvas from "geode/lib/graphics/Canvas"

export default class Tile {
    static width = 32
    update( world: World, x: number, y: number ) { }
    image( world: World, x: number, y: number, partialSteps: number ): HTMLImageElement | undefined { return getImage( this.constructor.name ) }
    draw( world: World, x: number, y: number, canvas: Canvas, partialSteps: number ) { canvas.image( this.image ) }
}