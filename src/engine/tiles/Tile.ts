import World from "../World";
import getImage from "../../getImage";
import Canvas from "../../Canvas";
import Game from "../../Game";


export default class Tile {
    static width = 32
    update( world: World, x, y ) { }
    get image(): HTMLImageElement | undefined { return getImage( this.constructor.name ) }
    draw( world: World, x, y, partialSteps ) { Canvas.image( this.image, x * Tile.width, y * Tile.width ) }
}