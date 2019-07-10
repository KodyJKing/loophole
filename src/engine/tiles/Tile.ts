import World from "../World";
import getImage from "../../getImage";
import Canvas from "../../Canvas";


export default class Tile {
    static width = 32
    update( world: World, x, y ) { }
    get image(): HTMLImageElement | undefined { return getImage( this.constructor.name ) }
    draw( world: World, x, y ) { Canvas.image( this.image, x * Tile.width, y * Tile.width ) }
}