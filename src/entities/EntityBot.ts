import VM from "../vm/VM"
import Entity from "./Entity"
import Tile from "../tiles/Tile"
import Game from "../Game"
import World from "../World"
import clone, { deepCompare } from "../common/clone"
import { getImage } from "geode/lib/assets"
import Canvas from "geode/lib/graphics/Canvas"
import Interpreter from "loophole-lang/lib/interpreter/Interpreter"

export class EntityBot extends Entity {
    vm?: VM
    interpreter?: Interpreter
    direction = 1
    timeout = 0

    targetTime?: number
    timeTravelCountdown = 0
    timeTravelDelay = 2
    arivalCountdown = 0

    age = 0

    initPlay() {
        let source = `
            driveN(n) { for (i = 0; i < n; i = i + 1) drive(1) }
            driveN(9)
            sleep(3)
            jump(-7)
            driveN(7)
        `
        this.interpreter = new Interpreter( source )
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
        this.runScript( world )
        this.move( world, 0, 1 )
        this.maybeTimeTravel( world )
        this.timeTravelCountdown--
        this.arivalCountdown--
        this.age++
    }

    runScript( world: World ) {
        if ( !this.interpreter || this.timeout > 0 ) return
        let natives = {
            onGround: () => this.onGround( world ),
            drive: direction => {
                if ( typeof direction != "number" ) return
                this.drive( world, direction )
                this.timeout = 1 + Math.abs( this.dy )
            },
            jump: deltaTime => {
                if ( typeof deltaTime != "number" ) return
                this.targetTime = world.time + deltaTime
                this.timeTravelCountdown = this.timeTravelDelay
                this.timeout = this.timeTravelDelay + 1
            },
            sleep: time => {
                if ( typeof time != "number" ) return
                this.timeout = time
            }
        }
        this.interpreter.setNatives( natives )
        for ( let i = 0; this.timeout == 0 && i < 10000; i++ )
            this.interpreter.step()
        this.interpreter.nativeBindings = undefined
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
                    const logDifferences = false
                    if ( other instanceof EntityBot && ( copy !== other ) && deepCompare( copy, other, logDifferences ) ) {
                        world.entities.pop()
                        break
                    }
                }

            }
        )

        world.removeEntity( this )
    }
}