// import Canvas from "./common/Canvas"
import Timeline from "./Timeline"
// import { map0 } from "./maps"
import World from "./World"
import clone, { deepCompare } from "./common/clone"
import JumpTracker from "./JumpTracker"
import { getImage, getJSON } from "geode/lib/assets"
import Canvas from "geode/lib/graphics/Canvas"
import * as ageBeforeBeauty from "./levels/AgeBeforeBeauty.json"
import loadTiledMap from "./loadTiledMap"

type TimeModification = { time: number, modifiedState: World }

export default class Game {
    static instance: Game
    canvas: Canvas

    constructor() {
        Game.instance = this
        this.canvas = new Canvas( "canvas" )
        // let world = map0()
        let world = loadTiledMap( ageBeforeBeauty )
        world.initDraw()
        world.initPlay()
        this.timeline = new Timeline( world, ( world: World ) => world.update() )
    }

    get world() { return this.timeline.state as World }

    update( dt: number ) {
        this.draw()
        this.updateTime( dt )
    }

    draw() {
        let { canvas } = this
        canvas.fitWindow( 2 )
        canvas.smooth( false )
        this.world.draw( this.canvas, this.fracTime )

        if ( this.timeModification !== null ) {
            let img = getImage( "GuiTimeTravelIndicator" )
            canvas.alpha( 0.5 )
                .translate( canvas.width / 2, canvas.height / 4 )
                .scale( 2 * this.timeDirection, 2 )
                .translate( - img.width / 2, - img.height / 2 )
                .image( img, 0, 0 )
        }

    }

    // ==== Time Logic ====

    readonly stepsPerSecond = 4
    readonly rewindSpeed = 5
    private jumpTracker = new JumpTracker()
    private timeModification: TimeModification | null = null
    private timeline: Timeline<World>
    private slowDown = 0
    time = 0

    get speedUp() { return 1 - this.slowDown }
    get fracTime() { return this.time % 1 }
    get timeDirection() {
        return this.timeModification !== null ?
            Math.sign( this.timeModification.time - this.time ) :
            1
    }

    private updateTime( dt: number ) {
        if ( this.timeModification !== null ) {
            if ( Math.floor( this.time ) == this.timeModification.time ) {
                this.timeline.applyModification( this.timeModification.time, this.timeModification.modifiedState )
                this.timeModification = null
                this.slowDown = 1
            } else {
                this.time = Math.max( 0, this.time + this.rewindSpeed * this.timeDirection * this.stepsPerSecond * dt * this.speedUp )
            }
        } else {
            this.time += this.stepsPerSecond * dt * this.speedUp
        }
        let step = Math.floor( this.time )
        this.timeline.gotoTime( step )
        this.slowDown *= Math.pow( 0.1, this.stepsPerSecond * dt )
    }

    private getModifiedWorldState( time, applyChanges: ( world: World ) => void ) {
        let originalState = this.timeline.getState( time )
        let modifiedState = clone( originalState )
        applyChanges( modifiedState )
        let changed = !deepCompare( originalState, modifiedState )
        return changed ? { modifiedState, time } : null
    }

    modifyWorldStateAtTime( time: number, applyChanges: ( world: World ) => void ) {
        if ( this.timeDirection < 0 )
            return // Don't make modifications while rewinding.
        this.timeModification = this.getModifiedWorldState( time, applyChanges )
        if ( this.timeModification == null ) {
            this.jumpTracker.resolveJump( time )
        } else {
            this.jumpTracker.openJump( time )
            this.slowDown = 1
        }
    }
}