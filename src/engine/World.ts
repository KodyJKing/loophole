import Canvas from "../Canvas";
import Tile from "./tiles/Tile";
import Starfield from "./Starfield";

export default class World {
    tiles!: ( Tile | null )[]
    width!: number
    height!: number
    stars!: Starfield
    time = 0

    static create( width, height ) {
        let result = new World()
        result.width = width
        result.height = height
        result.tiles = new Array( width * height )
        result.stars = Starfield.create()
        return result
    }

    get pixelWidth() {
        return this.width * Tile.width
    }

    get pixelHeight() {
        return this.height * Tile.width
    }

    inBounds( x, y ) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height
    }

    index( x, y ) {
        return y * this.width + x
    }

    getTile( x, y ) {
        if ( this.inBounds( x, y ) )
            return this.tiles[ this.index( x, y ) ]
        return null
    }

    setTile( x, y, v ) {
        if ( this.inBounds( x, y ) )
            this.tiles[ this.index( x, y ) ] = v
    }

    remove( x, y ) {
        this.tiles[ this.index( x, y ) ] = null
    }

    isEmpty( x, y ) {
        return this.getTile( x, y ) == null
    }

    draw( partialSteps ) {
        let { canvas, push, pop, background } = Canvas
        let { width, height } = canvas
        // background( "#0a0311" )
        background( "#151729" )
        // background( "#434da1" )
        this.stars.draw( this.time + partialSteps )
        push().translate( width / 2, height / 2 )
        this.drawTiles( partialSteps )
        pop()

    }

    drawTiles( partialSteps ) {
        const zoom = 4

        let { push, pop } = Canvas
        let { pixelWidth, pixelHeight } = this

        push().scale( zoom, zoom ).translate( - pixelWidth / 2, - pixelHeight / 2 )
        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                let tile = this.getTile( x, y )
                if ( tile ) {
                    push().translate( x * 32, y * 32 )
                    tile.draw( this, x, y, partialSteps )
                    pop()
                }
            }
        }
        pop()
    }

    update() {
        this.time++
        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                let tile = this.getTile( x, y )
                if ( tile )
                    tile.update( this, x, y )
            }
        }
    }
}