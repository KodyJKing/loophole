import VM from "../vm/VM"
import Entity from "./Entity"
import Tile from "../tiles/Tile"
import Game from "../Game"
import World from "../World"
import clone, { deepCompare } from "../common/clone"
import { getImage } from "geode/lib/assets"
import Canvas from "geode/lib/graphics/Canvas"

@Entity.register
export class EntityBot extends Entity {
    vm?: VM
    direction = 1
    timeout = 0

    targetTime?: number
    timeTravelCountdown = 0
    timeTravelDelay = 2
    arivalCountdown = 0

    initPlay() {
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
        this.vm = VM.create( source, 1024 )
    }

    drive( world: World, dx: number ) {
        if ( !this.onGround( world ) )
            return
        let { x, y } = this
        this.direction = Math.sign( dx )
        let dy = world.isEmpty( x + this.direction, y ) ? 0 : -1
        this.move( world, this.direction, dy )
    }

    alpha( fracTime: number ) {
        if ( this.targetTime == undefined ) {
            let arivalCountdown = Math.max( this.arivalCountdown - fracTime, 0 )
            return ( 1 - arivalCountdown / this.timeTravelDelay )
        } else {
            let timeTravelCountdown = Math.max( this.timeTravelCountdown - fracTime, 0 )
            return timeTravelCountdown / this.timeTravelDelay
        }
    }

    drawAfterTranslation( world: World, canvas: Canvas, fracTime: number ) {
        let sheet = getImage( "EntityBot" )
        let time = world.time + fracTime
        let frame = ( time / 3 ) % 1 >= 0.5 ? 1 : 0

        canvas.push()
        if ( this.direction == -1 )
            canvas.scale( -1, 1 ).translate( -Tile.width, 0 )

        let a = this.alpha( fracTime )
        canvas.alpha( a )
        canvas.imageSource( 0, frame * Tile.width, Tile.width, Tile.width ).partialImage( sheet )
        let lightness = ( 1 - a ) * a
        canvas.alpha( lightness )
        canvas.composition( "xor" )
        canvas.imageSource( 0, frame * Tile.width, Tile.width, Tile.width ).partialImage( sheet )

        canvas.pop()
    }

    update( world: World ) {
        super.update( world )
        this.timeout = Math.max( 0, this.timeout - 1 )
        this.runVM( world )
        this.move( world, 0, 1 )
        this.maybeTimeTravel( world )
        this.timeTravelCountdown--
        this.arivalCountdown--
    }

    runVM( world: World ) {
        if ( !this.vm ) return
        let input = ( port: number ) => {
            switch ( port ) {
                case 0: return this.onGround( world ) ? 1 : 0
            }
            return 0
        }

        let output = ( port: number, message: number ) => {
            switch ( port ) {
                case 0: {
                    this.drive( world, message )
                    this.timeout = 1 + Math.abs( this.dy )
                    break
                }
                case 1: {
                    this.targetTime = world.time + message
                    this.timeTravelCountdown = this.timeTravelDelay
                    this.timeout = this.timeTravelDelay + 1
                    break
                }
            }
        }

        for ( let i = 0; this.timeout == 0 && i < 100; i++ )
            this.vm.step( input, output )
    }

    maybeTimeTravel( world: World ) {
        if ( this.targetTime == undefined || this.timeTravelCountdown > 1 )
            return

        let time = this.targetTime
        this.targetTime = undefined

        Game.instance.modifyWorldStateAtTime(
            time,
            ( world: World ) => {
                let copy = clone( this )

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

        world.removeEntity( this )
    }
}