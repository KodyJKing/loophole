import test from "ava"
import clone, { deepCompare } from "./clone";
import { randomNumberGenerator, RandomNumberGenerator } from "./common";

test( "deepCompare", t => {


    t.assert(
        deepCompare(
            { a: { id: 0 }, b: { id: 0 } },
            { a: { id: 0 }, b: { id: 0 } }
        )
    )

    t.assert(
        !deepCompare(
            { a: { id: 0 }, b: { id: 1 } },
            { a: { id: 0 }, b: { id: 0 } }
        )
    )

    // These are topologically different.
    // If two paths lead to the same vertex in one graph,
    // the same must be true of those paths in the other graph.
    let repeatedVertex = { id: 0 }
    t.assert(
        !deepCompare(
            { a: { id: 0 }, b: { id: 0 } },
            { a: repeatedVertex, b: repeatedVertex }
        )
    )

    let makeCycle = () => {
        let a = { nextA: {} }
        let b = { nextB: a }
        a.nextA = b
        return a
    }

    let cycleA = makeCycle()
    let cycleB = makeCycle()
    t.assert(
        deepCompare(
            cycleA,
            cycleB
        )
    )

    t.assert(
        !deepCompare(
            cycleA,
            cycleB.nextA
        )
    )

} )

test( "random graphs", t => {

    let rng = randomNumberGenerator()

    for ( let i = 0; i < 100; i++ ) {
        let seed = rng( 0, Number.MAX_SAFE_INTEGER ) | 0
        let a = randomGraph( 100, randomNumberGenerator( seed ) )
        let b = randomGraph( 100, randomNumberGenerator( seed ) )
        t.assert( deepCompare( a, b ) )
        let cloneA = clone( a, a )
        let cloneB = clone( b, b )
        t.assert( deepCompare( cloneA, cloneB ) )
    }

    function randomGraph( length = 0, random: RandomNumberGenerator ) {
        let vertices = [] as any[]
        const randomVertex = () => vertices[ random( 0, length ) | 0 ]
        for ( let i = 0; i < length; i++ ) vertices[ i ] = []
        for ( let v of vertices ) {
            v.push( randomVertex() )
            v.push( randomVertex() )
        }
        let root = randomVertex()
        return root
    }

} )
