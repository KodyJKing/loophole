import Canvas from "../Canvas"
import { getImage } from "../common"
import VM from "../vm/VM"
import assemble from "../vm/assemble"
import Entity from "./Entity"
import Tile from "../tiles/Tile"

export class EntityBot extends Entity {
    vm!: VM
    direction = 1

    static create() {
        let result = new EntityBot()

        let source = `
            %DEF stepCount 10
            %DEF drivePort 0
            loop:
                IN 0 R0
                JT R0 continue

                MOV stepCount R1
                    SUB R1 1 R1
                    EQ R1 0 R2
                    OUT drivePort 1
                JF R2 $-3

                MOV stepCount R1
                    SUB R1 1 R1
                    EQ R1 0 R2
                    OUT drivePort -1
                JF R2 $-3
                
            continue:
            JMP loop
        `

        let vm = VM.create( assemble( source ), 1024, 16 )
        vm.setIO( result )
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
            case 0: return this.onGround() ? 0 : 1
        }
        return 0
    }

    drive( dx: number ) {
        if ( !this.onGround() )
            return
        let { world, x, y } = this
        this.direction = Math.sign( dx )
        let dy = world.isEmpty( x + this.direction, y ) ? 0 : -1
        this.move( this.direction, dy )
    }

    drawAfterTranslation( partialSteps ) {
        let { world, x, y } = this
        let sheet = getImage( "EntityBot" )
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
        for ( let i = 0; i < 5; i++ )
            if ( this.vm.running() )
                this.vm.step()
    }
}