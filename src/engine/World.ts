import Canvas from "../Canvas";
import getImage from "../getImage";
import Tile from "./tiles/Tile";

export default class World {
    tiles!: ( Tile | null )[]
    width!: number
    height!: number
    time = 0

    static create( width, height ) {
        let world = new World()
        world.width = width
        world.height = height
        world.tiles = new Array( width * height )
        return world
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

    draw() {
        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                let tile = this.getTile( x, y )
                if ( tile )
                    tile.draw( this, x, y )
            }
        }
    }

    update() {
        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                let tile = this.getTile( x, y )
                if ( tile )
                    tile.update( this, x, y )
            }
        }
        this.time++
    }
}