import clone, { deepCompare } from "./clone";

function maybeClone( value, doClone ) {
    return doClone ? clone( value ) : value
}
export default class Timeline {
    state: any
    snapshots: any[]
    time: number
    snapshotInterval: number
    update: ( any ) => void

    modifications: { [ name: number ]: any }

    constructor( state = {}, update: ( any ) => void ) {
        this.state = state
        this.snapshots = [ clone( state ) ]
        this.time = 0
        this.snapshotInterval = 1000
        this.update = update

        this.modifications = {}
    }

    getUpdated( state, time ) {
        if ( this.modifications[ time ] )
            state = clone( this.modifications[ time ] )
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
        if ( this.modifications[ time ] )
            return clone( this.modifications[ time ] )

        let snapshotIndex = Math.floor( time / this.snapshotInterval )
        let currentTime = snapshotIndex * this.snapshotInterval
        let remainingTime = time - currentTime
        let snapshot = clone( this.snapshots[ snapshotIndex ] )

        for ( let i = 0; i < remainingTime; i++ )
            snapshot = this.getUpdated( snapshot, ++currentTime )

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

    modifyState( time, applyChanges: ( any ) => void ): boolean {
        let originalState = this.getState( time )
        let modifiedState = clone( originalState )
        applyChanges( modifiedState )
        let changed = !deepCompare( originalState, modifiedState )
        if ( changed ) {
            this.modifications[ time ] = modifiedState
            this.clearAfterModification( time )
        }
        return changed
    }

    clearAfterModification( time ) {
        for ( let key of Object.keys( this.modifications ) ) {
            let otherTime = parseInt( key, 10 )
            if ( otherTime > time )
                delete this.modifications[ otherTime ]
        }
        this.rewindTo( time )
    }
}