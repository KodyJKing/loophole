import test from "ava"
import Timeline from "./Timeline"
import Vector from "./Vector";

test( "Timeline", t => {
    let v = new Vector( 10, 10 )
    let state = [ v, v ];
    ( state as any ).$dirty = false
    let timeline = new Timeline( state, ( state ) => {
        state[ 0 ].x++
    } )

    for ( let i = 0; i < 100; i++ )
        timeline.step()

    console.log( timeline.state )
    console.log( timeline.getState( 42 ) )

    t.pass()
} )