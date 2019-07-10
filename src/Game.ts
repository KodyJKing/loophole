import Canvas from "./Canvas";
import World from "./engine/World";
import Tile from "./engine/tiles/Tile";
import { TilePanel, TileMover } from "./engine/tiles/Tiles";
import Timeline from "./engine/Timeline";

export default class Game {
    timeline: Timeline
    frames = 0
    framesPerStep = 100

    timeDir = 1

    get partialSteps() {
        return ( this.frames % this.framesPerStep ) / this.framesPerStep
    }

    constructor() {
        let world = World.create( 19, 19 )
        for ( let i = 0; i < 19; i++ ) {
            world.setTile( i, 0, new TilePanel() )
            world.setTile( i, world.height - 1, new TilePanel() )
            world.setTile( i, world.height - 2, new TilePanel() )
            world.setTile( 0, i, new TilePanel() )
            world.setTile( world.width - 1, i, new TilePanel() )
        }
        world.setTile( 7, 10, new TileMover() )
        world.setTile( 9, 13, new TileMover() )
        world.setTile( 11, 16, new TileMover() )

        this.timeline = new Timeline( world, ( world ) => world.update() )
    }

    get world() {
        return this.timeline.state as World
    }

    update() {
        let { canvas, context: c, background, line, strokeStyle, image, push, pop, translate } = Canvas
        let { width, height } = canvas
        let { world, timeline } = this
        let { pixelWidth, pixelHeight } = world
        background( "#0a0311" )

        this.world.draw( this.partialSteps )

        let t = performance.now()
        this.frames = Math.floor( ( Math.sin( t / 500 ) + 1 ) * 12 * this.framesPerStep )

        // this.frames += this.timeDir
        // if ( this.frames <= 0 || this.frames >= 24 * this.framesPerStep )
        //     this.timeDir *= -1

        let step = Math.floor( this.frames / this.framesPerStep )
        this.timeline.gotoTime( step )

    }
}