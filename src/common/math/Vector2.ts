export default class Vector2 {
    x: number
    y: number
    constructor( x: number, y: number ) {
        this.x = x
        this.y = y
    }
    get length() { return Math.sqrt( this.x * this.x + this.y * this.y ) }
    get lengthSquared() { return this.x * this.x + this.y * this.y }
    get angle() { return Math.atan2( this.y, this.x ) }
    unit() { return this.multiply( 1 / this.length ) }
    leftNormal() { return new Vector2( -this.y, this.x ) }
    rightNormal() { return new Vector2( this.y, -this.x ) }
    negate() { return new Vector2( -this.x, -this.y ) }
    add( other: Vector2 ) { return new Vector2( this.x + other.x, this.y + other.y ) }
    subtract( other: Vector2 ) { return new Vector2( this.x - other.x, this.y - other.y ) }
    dot( other: Vector2 ) { return this.x * other.x + this.y * other.y }
    cross( other: Vector2 ) { return this.x * other.y - this.y * other.x }
    complexProduct( other: Vector2 ) {
        let x = this.x * other.x - this.y * other.y
        let y = this.x * other.y + this.y * other.x
        return new Vector2( x, y )
    }
    complexQuotient( other: Vector2 ) {
        let lengthSquared = other.lengthSquared
        let x = this.x * other.x + this.y * other.y
        let y = this.y * other.x - this.x * other.y
        return new Vector2( x / lengthSquared, y / lengthSquared )
    }
    complexExponential() {
        let magnitude = Math.exp( this.x )
        return new Vector2( magnitude * Math.cos( this.y ), magnitude * Math.sin( this.y ) )
    }
    multiply( scale: number ) { return new Vector2( this.x * scale, this.y * scale ) }
    divide( divisor: number ) { return new Vector2( this.x / divisor, this.y / divisor ) }
    lerp( other: Vector2, t: number ) { return this.multiply( 1 - t ).add( other.multiply( t ) ) }
    static polar( angle, length ) {
        return new Vector2( Math.cos( angle ) * length, Math.sin( angle ) * length )
    }
    static random( length ) {
        let angle = Math.random() * 2 * Math.PI
        return Vector2.polar( angle, length )
    }
}
