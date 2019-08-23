import { isValueType } from "./clone";
import Vector from "./Vector";

const idToType = [] as Function[]
const _typeToId = new Map<Function, number>()
let idCounter = 0

function typeToId( o: object ) {
    let id = _typeToId.get( o.constructor )
    if ( id === undefined ) {
        id = idCounter++
        _typeToId.set( o.constructor, id )
        idToType[ id ] = o.constructor
    }
    return id
}

export function serialize( object ) {
    JSON.stringify( object, ( key, value ) => {
        if ( isValueType( value ) ) return value
        if ( value.constructor == undefined ) return value
        let $typeId = typeToId( value )
        return Object.assign( { $typeId }, value )
    } )
}