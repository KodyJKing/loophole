function isValueType( object ) {
    return typeof object != "object" || object === null
}

function clone( cur, prev: any = undefined, cloned = new Map() ) {
    if ( isValueType( cur ) )
        return cur

    if ( cur.$dirty === false && prev != undefined )
        return prev

    if ( cloned.has( cur ) )
        return cloned.get( cur )

    let result = new cur.constructor()
    for ( let key in cur ) {
        if ( key == "$dirty" ) continue
        let curVal = cur[ key ]
        let prevVal = prev ? prev[ key ] : undefined
        result[ key ] = clone( curVal, prevVal, cloned )
    }

    cloned.set( cur, result )

    return result
}

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
        this.snapshotInterval = 10
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
        if ( time > this.time ) {
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