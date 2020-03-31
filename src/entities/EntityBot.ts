import VM from "../vm/VM"
import Entity from "./Entity"
import Tile from "../tiles/Tile"
import Game from "../Game"
import World from "../World"
import clone, { deepCompare } from "../common/clone"
import { getImage } from "geode/lib/assets"

export class EntityBot extends Entity {
    vm!: VM
    direction = 1
    timeout = 0

    targetTime: number | null = null
    timeTravelCountdown = 0
    timeTravelDelay = 2
    arivalCountdown = 0

    static create() {
        let result = new EntityBot()

        let source = `
            #def driveport 0
            #def timetravelport 1
            #def ongroundport 0

            jmp main

            drive:
                in ongroundport bx
                jf bx $-1
                out driveport ax
                loop ix $-4
            end

            wait:
                mov 100 cx
                loop cx $-0
            end

            main:
                mov 1 ax
                mov 7 ix
                call drive

                call wait

                out timetravelport -5

                mov 1 ax
                mov 5 ix
                call drive
        `

        let vm = VM.create( source, 1024, result )
        result.vm = vm

        return result
    }

    on( port: number, message: number ) {
        switch ( port ) {
            case 0: {
                this.drive( message )
                // this.timeout = Math.abs( this.dx ) + Math.abs( this.dy )
                this.timeout = 1 + Math.abs( this.dy )
                break
            }
            case 1: {
                this.targetTime = this.world.time + message
                this.timeTravelCountdown = this.timeTravelDelay
                this.timeout = this.timeTravelDelay + 1
                break
            }
        }
    }

    in( port: number ) {
        let { world, x, y } = this
        switch ( port ) {
            case 0: return this.onGround() ? 1 : 0
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

    alpha( partialSteps ) {
        if ( this.targetTime == null ) {
            let arivalCountdown = Math.max( this.arivalCountdown - partialSteps, 0 )
            return ( 1 - arivalCountdown / this.timeTravelDelay )
        } else {
            let timeTravelCountdown = Math.max( this.timeTravelCountdown - partialSteps, 0 )
            return timeTravelCountdown / this.timeTravelDelay
        }
    }

    drawAfterTranslation( partialSteps ) {
        let { world, x, y } = this
        let sheet = getImage( "EntityBot" )
        let time = world.time + partialSteps
        let frame = ( time / 3 ) % 1 >= 0.5 ? 1 : 0

        let canvas = Game.instance.canvas
        canvas.push()
        if ( this.direction == -1 )
            canvas.scale( -1, 1 ).translate( -Tile.width, 0 )

        let a = this.alpha( partialSteps )
        canvas.alpha( a )
        canvas.imageSource( 0, frame * Tile.width, Tile.width, Tile.width ).partialImage( sheet )
        let lightness = ( 1 - a ) * a
        canvas.alpha( lightness )
        canvas.composition( "xor" )
        canvas.imageSource( 0, frame * Tile.width, Tile.width, Tile.width ).partialImage( sheet )

        canvas.pop()
    }

    update() {
        super.update()
        this.timeout = Math.max( 0, this.timeout - 1 )
        for ( let i = 0; this.timeout == 0 && i < 100; i++ )
            this.vm.step()
        this.move( 0, 1 )
        this.maybeTimeTravel()
        this.timeTravelCountdown--
        this.arivalCountdown--
    }

    maybeTimeTravel() {
        if ( this.targetTime == null || this.timeTravelCountdown > 1 )
            return

        let time = this.targetTime
        this.targetTime = null

        Game.instance.modifyWorldStateAtTime(
            time,
            ( world: World ) => {
                let thisWorld = this.world;
                ( this as any ).world = null
                let copy = clone( this )
                this.world = thisWorld

                copy.arivalCountdown = this.timeTravelDelay

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