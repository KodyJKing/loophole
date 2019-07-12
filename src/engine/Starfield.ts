import { markStatic } from "./Timeline";
import Canvas from "../Canvas";

class Star {
    x: number
    y: number
    z: number
    phase: number
    constructor( x, y, z, phase ) {
        this.x = x
        this.y = y
        this.z = z
        this.phase = phase
    }
}

export default class Starfield {
    stars!: Star[]

    static create() {
        let result = new Starfield()
        markStatic( result )
        result.stars = []
        for ( let i = 0; i < 1000; i++ )
            result.stars.push( new Star( Math.random(), Math.random(), Math.random() * 8, Math.random() ) )
        return result
    }

    draw( time ) {
        let { canvas, push } = Canvas
        let { width, height } = canvas
        for ( let star of this.stars ) {
            let { x, y, z, phase } = star
            x *= width
            y *= height
            x = ( x - ( time / ( 1 + z ) ) * 200 + width ) % width
            let angle = ( time + phase ) * Math.PI * 2 * 0.5
            let w = 8 / ( z + 1 )
            let alpha = ( Math.cos( time + phase * Math.PI * 2 ) + 1 ) / 2
            push()
                .translate( x, y )
                .rotate( angle )
                .fillStyle( "rgba(255, 255, 255, " + alpha + ")" )
                .rect( -w, -w, w * 2, w * 2 )
                .fill()
                .pop()
        }
    }
}