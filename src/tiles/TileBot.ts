import Canvas from "../Canvas"
import World from "../World"
import Tile from "./Tile"
import TileMoving from "./TileMoving"
import { getImage } from "../common"
import VM from "../vm/VM"
import assemble from "../vm/assemble"

export class TileBot extends TileMoving {
    vm!: VM

    _dx!: number
    get dx() { return this._dx }
    set dx( x: number ) { this._dx = x }

    static create() {
        let result = new TileBot()
        result.dx = 0

        let source = `
            loop:
            OUT 0 1
            OUT 0 -1
            JF 0 loop
        `

        let vm = VM.create( assemble( source ), 1024, 16 )
        vm.addPeripheral( result )
        result.vm = vm

        return result
    }

    on( port: number, message: number ) {
        switch ( port ) {
            case 0: this.dx = message
        }
    }

    in( port: number ) {
        switch ( port ) {
            case 0: return 0
        }
        return 0
    }

    drawInternal( world: World, x, y, partialSteps ) {
        let sheet = getImage( "TileBotSheet" )
        let time = world.time + partialSteps
        let frame = ( time / 3 ) % 1 >= 0.5 ? 1 : 0
        Canvas.imageAt( sheet, 0, 0, 0, frame * Tile.width, Tile.width, Tile.width )
    }

    update( world: World, x, y ) {
        super.update( world, x, y )
        if ( this.vm.running() )
            this.vm.step()
    }
}