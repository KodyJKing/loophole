import World from "../World";
import Canvas from "../Canvas";
import { getImage } from "../common";

export default class Tile {
    static width = 32
    world!: World
    x = 0
    y = 0
    lastUpdated = -1
    update() { this.lastUpdated = this.world.time }
    get image(): HTMLImageElement | undefined { return getImage( this.constructor.name ) }
    draw( partialSteps ) { Canvas.image( this.image ) }
}