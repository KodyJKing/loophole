import Canvas from "../Canvas"
import { getImage } from "../common"
import VM from "../vm/VM"
import Entity from "./Entity"
import Tile from "../tiles/Tile"

export class EntityBot extends Entity {
    vm!: VM
    direction = 1
    yield = false

    static create() {
        let result = new EntityBot()

        let source = `
            #def stepcount 10
            #def driveport 0
            #def ongroundport 0

            jmp loop

            drive: // ax = drive direction, bx = distance
                out driveport ax
                sub bx 1 bx
                eq bx 0 cx
                jf cx $-3
            end

            loop:
                in ongroundport ax
                jt ax continue

                mov 1 ax
                mov stepcount bx
                call drive

                mov -1 ax
                mov stepcount bx
                call drive

                continue:
            jmp loop
        `

        let vm = VM.create( source, 1024, result )
        result.vm = vm

        return result
    }

    on( port: number, message: number ) {
        switch ( port ) {
            case 0: {
                this.drive( message )
                this.yield = true
                break
            }
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
        this.yield = false
        for ( let i = 0; !this.yield && i < 10; i++ )
            this.vm.step()
    }
}