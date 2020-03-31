import World from "../World"
import { getImage } from "geode/lib/assets"
import Game from "../Game"

export default class Tile {
    static width = 32
    update( world: World, x, y ) { }
    image( world: World, x, y, partialSteps ): HTMLImageElement | undefined { return getImage( this.constructor.name ) }
    draw( world: World, x, y, partialSteps ) { Game.instance.canvas.image( this.image ) }
}