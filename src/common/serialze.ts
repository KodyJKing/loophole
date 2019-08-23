import { isValueType } from "./clone";

const namespace = new Map<string, any>()

export function serialize( object, space?: number ) {
    return JSON.stringify( object, ( key, value ) => {
        if ( isValueType( value ) ) return value
        if ( value.constructor == undefined || value.constructor == Object ) return value
        let $type = value.constructor.name
        namespace.set( $type, value.constructor )
        return Object.assign( { $type }, value )
    }, space )
}

export function deserialize( object ) {
    return JSON.parse( object, ( key, value ) => {
        if ( value.$type === undefined )
            return value
        let type = namespace.get( value.$type )
        delete value.$type
        let instance = new type()
        Object.assign( instance, value )
        return instance
    } )
}

export function serialClone( object ) {
    return deserialize( serialize( object ) )
}