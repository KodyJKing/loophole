import Canvas from "./common/Canvas"
import Timeline from "./Timeline"
import { map0 } from "./maps"
import World from "./World"
import clone, { deepCompare } from "./common/clone"
import { getImage } from "./common/common"
import JumpTracker from "./common/JumpTracker"

type TimeModification = { time: number, modifiedState: World }

export default class Game {
    static instance: Game

    constructor() {
        Game.instance = this
        let world = map0()
        this.timeline = new Timeline( world, ( world: World ) => world.update() );
        ( window as any ).timeline = this.timeline
    }

    get world() { return this.timeline.state as World }

    update( dt: number ) {
        this.draw()
        this.updateTime( dt )
    }

    draw() {
        Canvas.fitWindow()
        Canvas.context.imageSmoothingEnabled = false
        this.world.draw( this.partialSteps )

        if ( this.timeModification !== null ) {
            let img = getImage( "GuiTimeTravelIndicator" )
            Canvas.context.globalAlpha = 0.5
            Canvas.translate( Canvas.canvas.width / 2, Canvas.canvas.height / 4 )
                .scale( 4 * this.timeDirection, 4 )
                .translate( - img.width / 2, - img.height / 2 )
                .image( img, 0, 0 )
        }

    }

    // ==== Time Logic ====

    readonly stepsPerFrame = 1 / 15
    readonly stepsPerSecond = 4
    readonly rewindSpeed = 5
    private jumpTracker = new JumpTracker()
    private timeModification: TimeModification | null = null
    private timeline: Timeline<World>
    private slowDown = 0
    time = 0

    get speedUp() { return 1 - this.slowDown }
    get partialSteps() { return this.time % 1 }
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