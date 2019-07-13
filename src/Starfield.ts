import { markStatic } from "./Timeline";
import { modulus } from "./common";
import Canvas from "./Canvas";

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
        for ( let i = 0; i < 1000; i++ ) {
            // The cross section of the viewing frustum grows quadratically with z.
            // So z should be quadratically distributed.
            // Taking the cuberoot of a uniform random number yeilds a quadratic distribution.
            // https://en.wikipedia.org/wiki/Inverse_transform_sampling
            let z = Math.random() ** ( 1 / 3 ) * 16
            result.stars.push( new Star( Math.random(), Math.random(), z, Math.random() ) )
        }
        return result
    }

    draw( time ) {
        let { canvas, push, fillStyle } = Canvas
        let { width, height } = canvas
        for ( let star of this.stars ) {
            let { x, y, z, phase } = star
            x *= width
            y *= height
            x = modulus( x - ( time / ( 1 + z ) ) * 200, width )
            let angle = ( time + phase ) * Math.PI * 2 * 0.25
            let w = 24 / ( z + 1 )
            let alpha = ( Math.cos( time + phase * Math.PI * 2 ) + 1 ) / 2

            // push()
            //     .translate( x, y )
            //     .rotate( angle )
            //     .fillStyle( "rgba(255, 255, 255, " + alpha + ")" )
            //     .rect( -w, -w, w * 2, w * 2 )
            //     .fill()
            //     .pop()

            fillStyle( "rgba(255, 255, 255, " + alpha + ")" )
                .rect( x - w, y - w, w * 2, w * 2 )
                .fill()
        }
    }
}