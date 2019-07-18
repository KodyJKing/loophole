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
    if ( unchanged && prev != undefined )
        return prev

    if ( cloned.has( cur ) )
        return cloned.get( cur )

    let result = new cur.constructor()
    let deepEqual = ( prev != undefined )
    cloned.set( cur, result )
    for ( let key of Object.keys( cur ) ) {
        if ( key == "$dirty" ) continue
        let curVal = cur[ key ]
        let prevVal = prev ? prev[ key ] : undefined
        let clonedVal = clone( curVal, prevVal, cloned )
        result[ key ] = clonedVal
        if ( clonedVal != prevVal )
            deepEqual = false
    }

    if ( deepEqual )
        return prev

    return result
}