import Canvas from "../Canvas"
import World from "../World"
import Tile from "./Tile"
import TileMoving from "./TileMoving"
import { getImage } from "../common"
import VM from "../vm/VM"
import assemble from "../vm/assemble"

export class TileBot extends TileMoving {
    vm!: VM
    direction = 1

    static create() {
        let result = new TileBot()

        let source = `
            loop0:
                IN 0 R0
                JT R0 continue

                    MOV 5 R1
                    loop1:
                        SUB R1 1 R1
                        EQ R1 0 R2
                        OUT 0 1
                        JF R2 loop1

                    MOV 5 R1
                    loop2:
                        SUB R1 1 R1
                        EQ R1 0 R2
                        OUT 0 -1
                        JF R2 loop2

                continue:
                JF 0 loop0
        `

        let vm = VM.create( assemble( source ), 1024, 16 )
        vm.addPeripheral( result )
        result.vm = vm

        return result
    }

    on( port: number, message: number ) {
        switch ( port ) {
            case 0: this.drive( message )
        }
    }

    in( port: number ) {
        let { world, x, y } = this
        switch ( port ) {
            case 0: return world.isEmpty( x, y + 1 ) ? 1 : 0
        }
        return 0
    }

    drive( dx: number ) {
        this.direction = Math.sign( dx )
        this.move( this.direction, 0 )
    }

    drawInternal( partialSteps ) {
        let { world, x, y } = this
        let sheet = getImage( "TileBotSheet" )
        let time = world.time + partialSteps
        let frame = ( time / 3 ) % 1 >= 0.5 ? 1 : 0

        let { push, pop, translate, scale, imageAt } = Canvas
        push()
        if ( this.direction == -1 ) {
            scale( -1, 1 )
            translate( -Tile.width, 0 )
        }
        imageAt( sheet, 0, 0, 0, frame * Tile.width, Tile.width, Tile.width )
        pop()
    }

    update() {
        super.update()
        this.move( 0, 1 )
        if ( this.vm.running() )
            this.vm.step()
    }
}