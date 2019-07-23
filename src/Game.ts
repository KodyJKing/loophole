import Canvas from "./Canvas";
import Timeline from "./Timeline";
import { map0 } from "./maps";
import World from "./World";
import clone from "./clone";

export default class Game {
    timeline: Timeline
    time = 0
    stepsPerFrame = 1 / 20

    targetTime: number | null = null
    get seeking() { return this.targetTime !== null }

    timeDir = 1

    get partialSteps() {
        return this.time % 1 //( this.time % this.framesPerStep ) / this.framesPerStep
    }

    constructor() {
        let world = map0()
        this.timeline = new Timeline( world, ( world: World ) => world.update( this ) )
    }

    get world() {
        return this.timeline.state as World
    }

    update() {
        this.draw()

        let t = performance.now()
        let factor = 10 / this.stepsPerFrame / 2
        this.time = Math.floor( ( Math.sin( t / factor * 1 / 16 ) + 1 ) * factor )

        // this.time += this.timeDir * this.stepsPerFrame
        // if ( this.time <= 0 || this.time >= 10 )
        //     this.timeDir *= -1
        // this.time = Math.max( 0, this.time )

        // this.time += this.timeDir * this.stepsPerFrame

        // if ( this.targetTime !== null ) {
        //     if ( this.time == this.targetTime )
        //         this.targetTime = null
        //     else {
        //         let timeDir = Math.sign( this.targetTime - this.time )
        //         this.time = Math.max( 0, this.time + 4 * timeDir )
        //     }
        // } else {
        //     this.time++
        // }

        let step = Math.floor( this.time )
        this.timeline.gotoTime( step )
    }

    draw() {
        Canvas.fitWindow()
        Canvas.context.imageSmoothingEnabled = false
        this.world.draw( this.partialSteps )
    }

    modifyTime( time: number, applyChanges: ( world: World ) => void ) {
        let changed = this.timeline.modifyState( time, applyChanges )
        if ( changed )
            this.time = time
    }
}