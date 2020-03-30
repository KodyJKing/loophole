import World from "./World"
import Canvas from "./common/Canvas"
import { map0 } from "./maps"

export default class Editor {
    world: World

    constructor() {
        this.world = map0()
    }

    update( dt: number ) {
        this.draw()
    }

    draw() {
        Canvas.fitWindow()
        Canvas.context.imageSmoothingEnabled = false
        this.world.draw( 0 )
    }
}