import Canvas from "../Canvas";
import World from "../World";
import Tile from "./Tile";
import TileMoving from "./TileMoving";
import { getImage } from "../common";

export class TileBot extends TileMoving {
    drawInternal( world: World, x, y, partialSteps ) {
        let sheet = getImage( "TileBotSheet" )
        let time = world.time + partialSteps
        let frame = ( time / 3 ) % 1 >= 0.5 ? 1 : 0
        Canvas.imageAt( sheet, 0, 0, 0, frame * Tile.width, Tile.width, Tile.width )
    }
}