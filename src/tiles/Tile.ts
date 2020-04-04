import World from "../World"
import { getImage } from "geode/lib/assets"
import Canvas from "geode/lib/graphics/Canvas"

export default class Tile {
    static width = 32
    name!: string
    id!: number
    constructor( name: string, id: number ) {
        this.name = name
        this.id = id
    }
    image( world: World, x: number, y: number, fracTime: number ): HTMLImageElement | undefined {
        return getImage( this.name )
    }
    draw( world: World, x: number, y: number, canvas: Canvas, fracTime: number ) {
        canvas.image( this.image( world, x, y, fracTime ) )
    }
}