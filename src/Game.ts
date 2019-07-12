import Canvas from "./Canvas";
import World from "./engine/World";
import { TilePanel, TileMover, TileBot } from "./engine/tiles/Tiles";
import Timeline from "./engine/Timeline";

export default class Game {
    timeline: Timeline
    frames = 0
    framesPerStep = 20

    timeDir = 1

    get partialSteps() {
        return ( this.frames % this.framesPerStep ) / this.framesPerStep
    }

    constructor() {
        let world = this.setupWorld()
        this.timeline = new Timeline( world, ( world ) => world.update() )
    }

    setupWorld() {
        let world = World.create( 23, 15 )
        for ( let x = 0; x < world.width; x++ ) {
            world.setTile( x, 0, new TilePanel() )
            world.setTile( x, world.height - 1, new TilePanel() )
            world.setTile( x, world.height - 2, new TilePanel() )
            world.setTile( x, world.height - 3, new TilePanel() )
        }

        for ( let y = 0; y < world.height; y++ ) {
            world.setTile( 0, y, new TilePanel() )
            world.setTile( world.width - 1, y, new TilePanel() )
        }

        let mid = Math.floor( world.width / 2 )

        world.setTile( mid - 2, 7, new TileMover() )
        world.setTile( mid, 9, new TileMover() )
        world.setTile( mid + 2, 11, new TileMover() )

        world.setTile( 3, 1, new TileBot() )

        return world
    }

    get world() {
        return this.timeline.state as World
    }

    update() {
        this.draw()

        // let t = performance.now()
        // let factor = 24 * this.framesPerStep / 2
        // this.frames = Math.floor( ( Math.sin( t / factor * 0.5 ) + 1 ) * factor )

        this.frames += this.timeDir
        if ( this.frames <= 0 || this.frames >= 24 * this.framesPerStep )
            this.timeDir *= -1

        let step = Math.floor( this.frames / this.framesPerStep )
        this.timeline.gotoTime( step )
    }

    draw() {
        Canvas.fitWindow()
        Canvas.context.imageSmoothingEnabled = false
        this.world.draw( this.partialSteps )
    }
}