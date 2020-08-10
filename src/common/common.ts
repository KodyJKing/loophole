export function modulus( n, m ) {
    return ( ( n % m ) + m ) % m
}

export function forRect( x0, y0, x1, y1, action ) {
    for ( let y = y0; y < y1; y++ )
        for ( let x = x0; x < x1; x++ )
            action( x, y )
}

export function forRectInclusive( x0, y0, x1, y1, action ) {
    forRect( x0, y0, x1 + 1, y1 + 1, action )
}

export function swap( array: any[], i = 0, j = 0 ) {
    let tmp = array[ i ]
    array[ i ] = array[ j ]
    array[ j ] = tmp
}

export function shuffle( array: any[], random: RandomNumberGenerator ) {
    for ( let i = array.length - 1; i >= 0; i-- ) {
        let j = ( random() * i ) | 0
        swap( array, i, j )
    }
}

export type RandomNumberGenerator = ( min?, max?) => number
export function randomNumberGenerator( seed = Number.MAX_SAFE_INTEGER ): RandomNumberGenerator {
    let x = seed
    let coef = 1 / ( 1 << 31 )
    return function random( min = 0, max = 1 ) {
        x ^= x << 13
        x ^= x >> 7
        x ^= x << 17
        let r = Math.abs( x * coef )
        return min + r * ( max - min )
    }
}