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
    stepsPerFrame = 1 / 20

    // targetTime: number | null = null
    modification: { time: number, state: World } | null = null

    // timeDir = 1

    get partialSteps() {
        return this.time % 1
    }

    constructor() {
        let world = map0()
        this.timeline = new Timeline( world, ( world: World ) => world.update( this ) )
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
                this.timeline.applyModification( this.modification.time, this.modification.state )
                this.modification = null
            } else {
                this.time = Math.max( 0, this.time + 5 * this.timeDir * this.stepsPerFrame )
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
            Canvas.translate( Canvas.canvas.width / 2, 2 * Canvas.canvas.height / 3 )
                .scale( 4 * this.timeDir, 4 )
                .translate( - img.width / 2, - img.height / 2 )
                .image( img, 0, 0 )
        }

    }

    modifyTime( time: number, applyChanges: ( world: World ) => void ) {
        this.modification = this.timeline.getModifiedState( time, applyChanges )
    }
}