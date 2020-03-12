import Canvas from "./common/Canvas";
import Timeline from "./Timeline";
import { map0 } from "./maps";
import World from "./World";
import clone from "./common/clone";
import { getImage } from "./common/common";

export default class Game {
    timeline: Timeline
    time = 0
    // stepsPerFrame = 1 / 10
    stepsPerFrame = 1 / 15
    // stepsPerFrame = 1 / 20
    rewindSpeed = 5

    modification: { time: number, state: World } | null = null

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

    get timeDir() {
        return this.modification !== null ?
            Math.sign( this.modification.time - this.time ) :
            1
    }

    update() {
        this.draw()

        if ( this.modification !== null ) {
            if ( Math.floor( this.time ) == this.modification.time ) {
                // console.log( "rewound" )
                // console.log( { time: this.time, modification: this.modification.time } )
                this.timeline.applyModification( this.modification.time, this.modification.state )
                this.modification = null
            } else {
                this.time = Math.max( 0, this.time + this.rewindSpeed * this.timeDir * this.stepsPerFrame )
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

        if ( this.modification !== null ) {
            let img = getImage( "GuiTimeTravelIndicator" )
            Canvas.context.globalAlpha = 0.5
            Canvas.translate( Canvas.canvas.width / 2, Canvas.canvas.height / 4 )
                .scale( 4 * this.timeDir, 4 )
                .translate( - img.width / 2, - img.height / 2 )
                .image( img, 0, 0 )
        }

    }

    modifyTime( time: number, applyChanges: ( world: World ) => void ) {
        if ( this.modification !== null )
            return
        console.log( "modifying " + JSON.stringify( { time }, null, 2 ) )
        this.modification = this.timeline.getModifiedState( time, applyChanges )
        if ( this.modification == null )
            console.log( "unchanged" )
        console.log()
    }
}