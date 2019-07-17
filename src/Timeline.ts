// import { TileGeneric } from "./tiles/Tiles";

function isValueType( object ) {
    return typeof object != "object" || object === null
}

function clone( cur, prev: any = undefined, cloned = new Map() ) {
    if ( isValueType( cur ) )
        return cur

    // let unchanged = ( cur.$static === true ) || ( cur.$dirty === false )
    // if ( unchanged && prev != undefined ) {
    //     // console.log( "Clean, don't copy " + prev.constructor.name )
    //     return prev
    // }

    if ( cloned.has( cur ) ) {
        // console.log( "Already copied or copying " + cur.constructor.name )
        return cloned.get( cur )
    }

    let result = new cur.constructor()
    let deepEqual = ( prev != undefined )
    cloned.set( cur, result )
    for ( let key of Object.keys( cur ) ) {
        // if ( key == "$dirty" ) continue
        let curVal = cur[ key ]
        let prevVal = prev ? prev[ key ] : undefined
        let clonedVal = clone( curVal, prevVal, cloned )
        result[ key ] = clonedVal
        if ( clonedVal != prevVal ) {
            deepEqual = false
            // if ( cur instanceof TileGeneric ) {
            //     console.log( "TileGeneric has changed " + key )
            // }
        }
    }

    if ( deepEqual ) {
        // console.log( "Discovered deep equality, disgard copy of " + cur.constructor.name )
        return prev
    }

    return result
}

// export function markStatic( object ) {
//     object.$static = true
// }

// export function markDirty( object, value ) {
//     object.$dirty = value
// }

export default class Timeline {
    state: any
    snapshots: any[]
    time: number
    snapshotInterval: number
    update: ( any ) => void

    constructor( state = {}, update: ( any ) => void ) {
        this.state = state
        this.snapshots = [ clone( state ) ]
        this.time = 0
        this.snapshotInterval = 100
        this.update = update
    }

    step() {
        this.time++
        this.update( this.state )
        if ( this.time % this.snapshotInterval == 0 )
            this.snapshot()
    }

    getState( time = 0, doClone = true ) {
        let snapshotIndex = Math.floor( time / this.snapshotInterval )
        let remainingTime = time - snapshotIndex * this.snapshotInterval
        let snapshot = this.snapshots[ snapshotIndex ]
        if ( doClone )
            snapshot = clone( snapshot )
        for ( let i = 0; i < remainingTime; i++ )
            this.update( snapshot )
        return snapshot
    }

    rewindTo( time ) {
        this.state = this.getState( time )
        this.time = time
        let snapshotIndex = Math.floor( time / this.snapshotInterval )
        this.snapshots.length = snapshotIndex + 1
    }

    gotoTime( time ) {
        if ( time >= this.time ) {
            while ( this.time < time )
                this.step()
        } else {
            this.rewindTo( time )
        }
    }

    snapshot() {
        let prev = this.snapshots[ this.snapshots.length - 1 ]
        this.snapshots.push( clone( this.state, prev ) )
        // console.log( "Snapshot count: " + this.snapshots.length )
    }
}