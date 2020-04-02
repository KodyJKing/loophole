import Tile from "./tiles/Tile"
import Starfield from "./Starfield"
import Entity from "./entities/Entity"
import Matrix3 from "geode/lib/math/Matrix3"
import Game from "./Game"
import Canvas from "geode/lib/graphics/Canvas"
import Input from "geode/lib/Input"
import Vector2 from "geode/lib/math/Vector2"
import { playSound } from "geode/lib/audio"

type TileLayer = ( number | undefined )[]

export enum TileLayers {
    background,
    center,
    foreground
}

const zoom = 2
export default class World {
    layers!: TileLayer[]
    entities!: Entity[]
    blocked!: boolean[]
    triggers!: { [ name: string ]: boolean }
    width!: number
    height!: number
    stars!: Starfield
    time = 0

    static create( width: number, height: number ) {
        let result = new World()
        result.width = width
        result.height = height
        result.layers = [
            new Array( width * height ),
            new Array( width * height ),
            new Array( width * height )
        ]
        result.entities = []
        return result
    }

    initDraw() {
        this.stars = Starfield.create()
        this.triggers = {}
        for ( let entity of this.entities )
            entity.initDraw()
    }

    initPlay() {
        let { width, height } = this
        this.blocked = new Array( width * height )
        for ( let i = 0; i < this.blocked.length; i++ ) this.blocked[ i ] = false
        for ( let entity of this.entities )
            entity.initPlay()
    }

    get pixelWidth() {
        return this.width * Tile.width
    }

    get pixelHeight() {
        return this.height * Tile.width
    }

    transform( canvas: Canvas ) {
        let { width, height } = canvas
        let { pixelWidth, pixelHeight } = this
        return Matrix3.transformation( - pixelWidth / 2, - pixelHeight / 2, 0, zoom, zoom, width / 2, height / 2 )
    }

    screenSpaceToBlockSpace( canvas: Canvas, v: Vector2 ) {
        return this.transform( canvas ).inverse().multiplyVec2( v ).divide( Tile.width )
    }

    blockSpaceToScreenSpace( canvas: Canvas, v: Vector2 ) {
        return this.transform( canvas ).multiplyVec2( v.multiply( Tile.width ) )
    }

    inBounds( x, y ) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height
    }

    index( x, y ) {
        return y * this.width + x
    }

    getTile( x, y, layer = TileLayers.center ) {
        if ( !this.inBounds( x, y ) )
            return undefined
        let tiles = this.layers[ layer ]
        let id = tiles[ this.index( x, y ) ]
        if ( id == undefined ) return undefined
        return Tile.registeredTiles[ id ]
    }

    setTile( x, y, tile: Tile, layer = TileLayers.center ) {
        let tiles = this.layers[ layer ]
        if ( this.inBounds( x, y ) ) {
            tiles[ this.index( x, y ) ] = tile.id
        }
    }

    remove( x, y, layer = TileLayers.center ) {
        let tiles = this.layers[ layer ]
        tiles[ this.index( x, y ) ] = undefined
    }

    isAir( x, y, layer = TileLayers.center ) {
        return this.getTile( x, y, layer ) == undefined
    }

    block( x, y ) {
        this.blocked[ this.index( x, y ) ] = true
    }

    isEmpty( x, y ) {
        return this.isAir( x, y ) && !this.blocked[ this.index( x, y ) ]
    }

    addEntity( entity: Entity, x: number, y: number ) {
        this.entities.push( entity )
        entity.x = x
        entity.y = y
    }

    removeEntity( entity: Entity ) {
        let index = this.entities.indexOf( entity )
        if ( index > -1 ) {
            this.entities[ index ] = this.entities[ this.entities.length - 1 ]
            this.entities.pop()
        }
    }

    draw( canvas: Canvas, fracTime: number ) {
        // canvas.background( "#0a0311" )
        // canvas.background( "#434da1" )
        canvas.background( "#151729" )

        this.stars.draw( canvas, this.time + fracTime )

        let transform = this.transform( canvas )

        canvas.push().applyMatrix( transform )
        this.drawTiles( canvas, fracTime, TileLayers.background )
        this.drawTiles( canvas, fracTime, TileLayers.center )
        this.drawEntities( canvas, fracTime )
        this.drawTiles( canvas, fracTime, TileLayers.foreground )
        canvas.pop()
    }

    drawTiles( canvas: Canvas, fracTime: number, layer = TileLayers.center ) {
        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                let tile = this.getTile( x, y, layer )
                if ( tile ) {
                    canvas.push().translate( x * Tile.width, y * Tile.width )
                    tile.draw( this, x, y, canvas, fracTime )
                    canvas.pop()
                }
            }
        }
    }

    drawEntities( canvas: Canvas, fracTime: number ) {
        let entityRenderList = this.entities.slice().sort( ( a, b ) => a.layer - b.layer )
        for ( let entity of entityRenderList ) {
            canvas.push().translate( entity.x * Tile.width, entity.y * Tile.width )
            entity.draw( this, canvas, fracTime )
            canvas.pop()
        }
    }

    update() {
        this.time++
        // for ( let y = 0; y < this.height; y++ ) {
        //     for ( let x = 0; x < this.width; x++ ) {
        //         let tile = this.getTile( x, y )
        //         if ( tile )
        //             tile.update( this, x, y )
        //     }
        // }
        let currentEntities = this.entities.slice()
        for ( let entity of currentEntities )
            entity.block( this )
        for ( let entity of currentEntities )
            entity.update( this )
        for ( let i = 0; i < this.blocked.length; i++ )
            this.blocked[ i ] = false
    }
}