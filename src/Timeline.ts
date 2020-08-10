import clone from "./common/clone"

// Responsible for calculating, storing amd retrieving game state at arbitrary time.
export default class Timeline<T> {
    state: T
    time: number = 0
    readonly snapshotInterval: number = 1
    private snapshots: { [ name: number ]: T }
    update: ( T ) => void

    constructor( state, update: ( T ) => void ) {
        this.state = state
        this.snapshots = { [ 0 ]: clone( state ) }
        this.update = update
    }

    private getUpdatedState( state: T, time ) {
        if ( this.snapshots[ time ] )
            state = clone( this.snapshots[ time ] )
        else
            this.update( state )
        return state
    }

    private step() {
        this.time++
        this.state = this.getUpdatedState( this.state, this.time )
        if ( this.time % this.snapshotInterval == 0 )
            this.snapshot()
    }

    private snapshot() {
        let prev = this.snapshots[ this.time - this.snapshotInterval ]
        this.snapshots[ this.time ] = clone( this.state, prev )
        // console.log( "Snapshot count: " + this.snapshots.length )
    }

    getState( time = 0 ): T {
        if ( this.snapshots[ time ] )
            return clone( this.snapshots[ time ] )

        let snapshotNumber = Math.floor( time / this.snapshotInterval )
        let lastSnapshotTime = snapshotNumber * this.snapshotInterval
        let remainingTime = time - lastSnapshotTime
        let snapshot = clone( this.snapshots[ lastSnapshotTime ] || this.snapshots[ lastSnapshotTime ] )

        for ( let i = 0; i < remainingTime; i++ )
            snapshot = this.getUpdatedState( snapshot, ++lastSnapshotTime )

        return snapshot
    }

    rewindTo( time ) {
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

    // Goes back to given time and sets state to given state.
    applyModification( time, state ) {
        for ( let key in this.snapshots ) {
            let otherTime = parseInt( key, 10 )
            if ( otherTime > time )
                delete this.snapshots[ otherTime ]
        }
        this.snapshots[ time ] = state
        this.rewindTo( time )
    }

}