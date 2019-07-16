import Canvas from "./Canvas";
import Timeline from "./Timeline";
import { forRect } from "./common";
import { map0 } from "./maps";
import World from "./World";

export default class Game {
    timeline: Timeline
    time = 0
    framesPerStep = 10

    timeDir = 1

    get partialSteps() {
        return ( this.time % this.framesPerStep ) / this.framesPerStep
    }

    constructor() {
        let world = map0()
        this.timeline = new Timeline( world, ( world ) => world.update() )
    }

    get world() {
        return this.timeline.state as World
    }

    update() {
        this.draw()

        // let t = performance.now()
        // let factor = 240 * this.framesPerStep / 2
        // this.time = Math.floor( ( Math.sin( t / factor * 0.25 ) + 1 ) * factor )

        // this.time += this.timeDir
        // if ( this.time <= 0 || this.time >= 24 * this.framesPerStep )
        //     this.timeDir *= -1

        this.time += this.timeDir

        let step = Math.floor( this.time / this.framesPerStep )
        this.timeline.gotoTime( step )
    }

    draw() {
        Canvas.fitWindow()
        Canvas.context.imageSmoothingEnabled = false
        this.world.draw( this.partialSteps )
    }
}