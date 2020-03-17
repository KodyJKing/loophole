import clone, { deepCompare } from "./common/clone"

function maybeClone( value, doClone ) {
    return doClone ? clone( value ) : value
}
export default class Timeline {
    state: any
    snapshots: { [ name: number ]: any }
    time: number
    snapshotInterval: number
    update: ( any ) => void

    constructor( state = {}, update: ( any ) => void ) {
        this.state = state
        this.snapshots = { "0": clone( state ) }
        this.time = 0
        this.snapshotInterval = 100
        this.update = update
    }

    getUpdated( state, time ) {
        if ( this.snapshots[ time ] )
            state = clone( this.snapshots[ time ] )
        else
            this.update( state )
        return state
    }

    step() {
        this.time++
        this.state = this.getUpdated( this.state, this.time )
        if ( this.time % this.snapshotInterval == 0 )
            this.snapshot()
    }

    getState( time = 0 ) {
        if ( this.snapshots[ time ] )
            return clone( this.snapshots[ time ] )

        let snapshotNumber = Math.floor( time / this.snapshotInterval )
        let lastSnapshotTime = snapshotNumber * this.snapshotInterval
        let remainingTime = time - lastSnapshotTime
        let snapshot = clone( this.snapshots[ lastSnapshotTime ] || this.snapshots[ lastSnapshotTime ] )

        for ( let i = 0; i < remainingTime; i++ )
            snapshot = this.getUpdated( snapshot, ++lastSnapshotTime )

        return snapshot
    }

    rewindTo( time ) {
        debugger
        for ( let key in this.snapshots ) {
            let otherTime = parseInt( key, 10 )
            if ( otherTime > time )
                delete this.snapshots[ otherTime ]
        }
        this.state = this.getState( time )
        this.time = time
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
        let prev = this.snapshots[ this.time - this.snapshotInterval ]
        this.snapshots[ this.time ] = clone( this.state, prev )
        // console.log( "Snapshot count: " + this.snapshots.length )
    }

    getModifiedState( time, applyChanges: ( any ) => void ) {
        let originalState = this.getState( time )
        let modifiedState = clone( originalState )
        applyChanges( modifiedState )
        let changed = !deepCompare( originalState, modifiedState )
        return changed ? { state: modifiedState, time } : null
    }

    applyModification( time, state ) {
        this.snapshots[ time ] = state
        this.rewindTo( time )
    }

}