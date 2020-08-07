export default function nonEnumerable( obj, key ) {
    Object.defineProperty( obj, key, {
        enumerable: false,
        writable: false
    } )
}
