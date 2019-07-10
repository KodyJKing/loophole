import Canvas from "./Canvas";
import World from "./engine/World";
import Tile from "./engine/tiles/Tile";
import { TilePanel, TileMover } from "./engine/tiles/Tiles";
import Timeline from "./engine/Timeline";

export default class Game {
    timeline: Timeline
    t = 0

    timeDir = 1

    constructor() {
        let world = World.create( 19, 19 )
        for ( let i = 0; i < 19; i++ ) {
            world.setTile( i, 0, new TilePanel() )
            world.setTile( i, world.height - 1, new TilePanel() )
            world.setTile( 0, i, new TilePanel() )
            world.setTile( world.width - 1, i, new TilePanel() )
        }
        world.setTile( 9, 17, new TileMover() )

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

        if ( ( ++this.t ) % 4 == 0 ) {
            this.timeline.gotoTime( timeline.time + this.timeDir )
            if ( timeline.time <= 0 || timeline.time > 24 )
                this.timeDir *= -1
        }

        push()
        translate( ( width - pixelWidth ) / 2, ( height - pixelHeight ) / 2 )
        this.world.draw()
        pop()
    }
}