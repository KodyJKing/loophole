import { isValueType } from "./clone"

const namespace = new Map<string, any>()
export function serializeClass( constructor: Function ) {
    namespace.set( constructor.name, constructor )
}

const allowedFields = new Set<string>()
export function serializeField( target: any, field: string ) {
    let path = target.constructor.name + "." + field
    allowedFields.add( path )
}

function shouldCopy( type: string, field: string ) {
    if ( !namespace.has( type ) ) return true
    return allowedFields.has( type + "." + field )
}

export function serialize( object, space?: number ) {
    let visited = new Map<Object, number>()
    let types: string[] = []
    let objects: any[] = []
    function _serialize( value ) {
        if ( isValueType( value ) ) return value
        if ( visited.has( value ) ) return { ref: visited.get( value ) }
        let id = visited.size
        let type = value.constructor.name
        let object = Array.isArray( value ) ? [] : {}
        types.push( type )
        objects.push( object )
        visited.set( value, id )
        for ( let key in value )
            if ( shouldCopy( type, key ) )
                object[ key ] = _serialize( value[ key ] )
        return { ref: id }
    }
    _serialize( object )
    return JSON.stringify( { types, objects }, null, space )
}

export function deserialize( json: string ) {
    let { types, objects } = JSON.parse( json )
    for ( let i = 0; i < types.length; i++ ) {
        let type = types[ i ]
        if ( !namespace.has( type ) ) continue
        let typed = new ( namespace.get( type ) )
        Object.assign( typed, objects[ i ] )
        objects[ i ] = typed
    }
    for ( let object of objects ) {
        for ( let key in object ) {
            let value = object[ key ]
            if ( isValueType( value ) ) continue
            object[ key ] = objects[ value.ref ]
        }
    }
    return objects[ 0 ]
}