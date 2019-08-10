import test from "ava"
import Timeline from "./Timeline"
import Vector from "./Vector"

test( "Timeline", t => {
    // let v = new Vector( 10, 10 )
    // let state = [ v, v ];
    // ( state as any ).$dirty = false
    // let timeline = new Timeline( state, ( state ) => {
    //     state[ 0 ].x++
    // } )

    // for ( let i = 0; i < 100; i++ )
    //     timeline.step()

    // let changed = timeline.modifyState( 10, ( state: Vector[] ) => {
    //     state[ 0 ].x = -99
    // } )

    // t.assert( changed )
    // t.assert(
    //     timeline.getState( 10 )[ 0 ].x == -99
    // )
    // t.assert(
    //     timeline.getState( 11 )[ 0 ].x == -98
    // )

    t.pass()
} )