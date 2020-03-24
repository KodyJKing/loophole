import Canvas from "./common/Canvas";
import Timeline from "./Timeline";
import { map0 } from "./maps";
import World from "./World";
import clone, { deepCompare } from "./common/clone";
import { getImage } from "./common/common";

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

    update() {
        this.draw()
        this.updateTime()
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

    // === Time Logic ===
    readonly stepsPerFrame = 1 / 15
    readonly rewindSpeed = 5
    // private unresolvedJumpTimes: number[] = []
    private timeModification: TimeModification | null = null
    private timeline: Timeline<World>
    time = 0

    get partialSteps() { return this.time % 1 }
    get timeDirection() {
        return this.timeModification !== null ?
            Math.sign( this.timeModification.time - this.time ) :
            1
    }

    private updateTime() {
        if ( this.timeModification !== null ) {
            if ( Math.floor( this.time ) == this.timeModification.time ) {
                // console.log( "rewound" )
                // console.log( { time: this.time, modification: this.modification.time } )
                this.timeline.applyModification( this.timeModification.time, this.timeModification.modifiedState )
                this.timeModification = null
            } else {
                this.time = Math.max( 0, this.time + this.rewindSpeed * this.timeDirection * this.stepsPerFrame )
            }
        } else {
            this.time += this.stepsPerFrame
        }

        let step = Math.floor( this.time )
        this.timeline.gotoTime( step )
    }

    private getModifiedWorldState( time, applyChanges: ( any ) => void ) {
        let originalState = this.timeline.getState( time )
        let modifiedState = clone( originalState )
        applyChanges( modifiedState )
        let changed = !deepCompare( originalState, modifiedState )
        return changed ? { modifiedState, time } : null
    }

    modifyWorldStateAtTime( time: number, applyChanges: ( world: World ) => void ) {
        if ( this.timeModification !== null )
            return

        // this.unresolvedJumpTimes.sort()

        // console.log( "modifying " + JSON.stringify( { time }, null, 2 ) )

        this.timeModification = this.getModifiedWorldState( time, applyChanges )

        // if ( this.timeModification == null ) { // Resolved jump.
        //     let i = this.unresolvedJumpTimes.indexOf( time )
        //     this.unresolvedJumpTimes.splice( i, 1 )
        // } else { // New jump.
        //     this.unresolvedJumpTimes.push( time )
        //     for ( let i = 0; i < this.unresolvedJumpTimes.length; i++ ) {
        //         if ( this.unresolvedJumpTimes[ i ] > time )
        //             this.unresolvedJumpTimes.splice( i, 1 )
        //     }
        // }

        // if ( this.timeJump == null )
        //     console.log( "unchanged" )
        // console.log()

        console.log( this.unresolvedJumpTimes )
    }
}