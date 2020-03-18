import Canvas from "./common/Canvas";
import Timeline from "./Timeline";
import { map0 } from "./maps";
import World from "./World";
import clone from "./common/clone";
import { getImage } from "./common/common";

export default class Game {
    timeline: Timeline<World>
    time = 0
    stepsPerFrame = 1 / 15
    rewindSpeed = 5

    timeJump: { time: number, state: World } | null = null

    get partialSteps() {
        return this.time % 1
    }

    constructor() {
        let world = map0()
        this.timeline = new Timeline( world, ( world: World ) => world.update( this ) );
        ( window as any ).timeline = this.timeline
    }

    get world() {
        return this.timeline.state as World
    }

    get timeDirection() {
        return this.timeJump !== null ?
            Math.sign( this.timeJump.time - this.time ) :
            1
    }

    update() {
        this.draw()

        if ( this.timeJump !== null ) {
            if ( Math.floor( this.time ) == this.timeJump.time ) {
                // console.log( "rewound" )
                // console.log( { time: this.time, modification: this.modification.time } )
                this.timeline.applyModification( this.timeJump.time, this.timeJump.state )
                this.timeJump = null
            } else {
                this.time = Math.max( 0, this.time + this.rewindSpeed * this.timeDirection * this.stepsPerFrame )
            }
        } else {
            this.time += this.stepsPerFrame
        }

        let step = Math.floor( this.time )
        this.timeline.gotoTime( step )
    }

    draw() {
        Canvas.fitWindow()
        Canvas.context.imageSmoothingEnabled = false
        this.world.draw( this.partialSteps )

        if ( this.timeJump !== null ) {
            let img = getImage( "GuiTimeTravelIndicator" )
            Canvas.context.globalAlpha = 0.5
            Canvas.translate( Canvas.canvas.width / 2, Canvas.canvas.height / 4 )
                .scale( 4 * this.timeDirection, 4 )
                .translate( - img.width / 2, - img.height / 2 )
                .image( img, 0, 0 )
        }

    }

    modifyTime( time: number, applyChanges: ( world: World ) => void ) {
        if ( this.timeJump !== null )
            return
        console.log( "modifying " + JSON.stringify( { time }, null, 2 ) )
        this.timeJump = this.timeline.getModifiedState( time, applyChanges )
        if ( this.timeJump == null )
            console.log( "unchanged" )
        console.log()
    }
}