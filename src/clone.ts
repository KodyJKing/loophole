function isValueType( object ) {
    return typeof object != "object" || object === null
}

export function markStatic( object ) {
    object.$static = true
}

export function markDirty( object, value ) {
    object.$dirty = value
}

export default function clone( cur, prev: any = undefined, cloned = new Map() ) {
    if ( isValueType( cur ) )
        return cur

    let unchanged = ( cur.$static === true ) || ( cur.$dirty === false )
    if ( unchanged && prev != undefined ) {
        // console.log( "Clean, don't copy " + prev.constructor.name )
        return prev
    }

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