export default class JumpTracker {
    private openJumps: { [ name: number ]: number } = {}
    private totalOpenJumps = 0

    get isResolved() {
        return this.totalOpenJumps == 0
    }

    openJump( t: number ) {
        this.openJumps[ t ] = ( this.openJumps[ t ] ?? 0 ) + 1
        this.totalOpenJumps++
    }

    resolveJump( t: number ) {
        let result = ( this.openJumps[ t ] ?? 0 ) - 1
        if ( result <= 0 )
            delete this.openJumps[ t ]
        else
            this.openJump[ t ] = result
        this.totalOpenJumps--
    }

    forgetAfter( t: number ) {
        for ( let k in this.openJumps ) {
            let u = parseInt( k )
            if ( u <= t ) continue
            this.totalOpenJumps -= this.openJumps[ u ]
            delete this.openJumps[ u ]
        }
    }
}