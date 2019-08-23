import Canvas from "../common/Canvas"
import { getImage } from "../common/common"
import VM from "../vm/VM"
import Entity from "./Entity"
import Tile from "../tiles/Tile"
import Game from "../Game";
import World from "../World";
import clone, { deepCompare } from "../common/clone";

export class EntityBot extends Entity {
    vm!: VM
    direction = 1
    timeout = 0

    targetTime: number | null = null

    static create() {
        let result = new EntityBot()

        let source = `
            #def stepcount 10
            #def driveport 0
            #def timetravelport 1
            #def ongroundport 0

            jmp main

            drive:
                in ongroundport bx
                jt bx $-1
                out driveport ax
                loop ix $-4
            end

            main:
                mov 1 ax
                mov 3 ix
                call drive

                out timetravelport 0

                mov 1 ax
                mov 10 ix
                call drive

                // mov 1 ax
                // mov stepcount ix
                // call drive

                // out timetravelport 15

                // loop:
                //     mov -1 ax
                //     mov stepcount ix
                //     call drive

                //     mov 1 ax
                //     mov stepcount ix
                //     call drive
                // jmp loop
        `

        let vm = VM.create( source, 1024, result )
        result.vm = vm

        return result
    }

    on( port: number, message: number ) {
        switch ( port ) {
            case 0: {
                this.drive( message )
                this.timeout = Math.abs( this.dx ) + Math.abs( this.dy )
                break
            }
            case 1: {
                this.targetTime = message
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

    update( game: Game ) {
        super.update( game )
        this.timeout = Math.max( 0, this.timeout - 1 )
        for ( let i = 0; this.timeout == 0 && i < 100; i++ )
            this.vm.step()
        this.move( 0, 1 )
        this.maybeTimeTravel( game )
    }

    maybeTimeTravel( game: Game ) {
        if ( this.targetTime !== null ) {
            let time = this.targetTime
            this.targetTime = null

            game.modifyTime(
                time,
                ( world: World ) => {
                    let copy = clone( this )
                    world.addEntity( copy, copy.x, copy.y )

                    for ( let other of world.entities ) {
                        if ( ( copy !== other ) && deepCompare( copy, other ) ) {
                            world.entities.pop()
                            break
                        }
                    }

                }
            )

            this.world.removeEntity( this )
        }
    }
}