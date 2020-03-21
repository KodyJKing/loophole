import Canvas from "./common/Canvas";
import Tile from "./tiles/Tile";
import Starfield from "./Starfield";
import Entity from "./entities/Entity";
import Game from "./Game";

type TileLayer = ( Tile | null )[]

export enum TileLayers {
    background,
    center,
    foreground
}

export default class World {
    layers!: TileLayer[]
    entities!: Entity[]
    width!: number
    height!: number
    stars!: Starfield
    time = 0

    static create( width, height ) {
        let result = new World()
        result.width = width
        result.height = height
        result.layers = [
            new Array( width * height ),
            new Array( width * height ),
            new Array( width * height )
        ]
        result.entities = []
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

    getTile( x, y, layer = TileLayers.center ) {
        let tiles = this.layers[ layer ]
        if ( this.inBounds( x, y ) )
            return tiles[ this.index( x, y ) ]
        return null
    }

    setTile( x, y, tile: Tile, layer = TileLayers.center ) {
        let tiles = this.layers[ layer ]
        if ( this.inBounds( x, y ) ) {
            tiles[ this.index( x, y ) ] = tile
        }
    }

    remove( x, y, layer = TileLayers.center ) {
        let tiles = this.layers[ layer ]
        tiles[ this.index( x, y ) ] = null
    }

    isEmpty( x, y, layer = TileLayers.center ) {
        return this.getTile( x, y, layer ) == null
    }

    addEntity( entity: Entity, x, y ) {
        this.entities.push( entity )
        entity.world = this
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

    draw( partialSteps ) {
        let { canvas, context: c, push, pop, background, scale, translate } = Canvas
        let { width, height } = canvas

        // background( "#0a0311" )
        background( "#151729" )
        // background( "#434da1" )

        this.stars.draw( this.time + partialSteps )

        const zoom = 4
        let { pixelWidth, pixelHeight } = this
        push().translate( width / 2, height / 2 ).scale( zoom, zoom ).translate( - pixelWidth / 2, - pixelHeight / 2 )
        this.drawTiles( partialSteps, TileLayers.background )
        this.drawTiles( partialSteps, TileLayers.center )
        this.drawEntities( partialSteps )
        this.drawTiles( partialSteps, TileLayers.foreground )
        pop()
    }

    drawTiles( partialSteps, layer = TileLayers.center ) {
        let { push, pop } = Canvas
        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                let tile = this.getTile( x, y, layer )
                if ( tile ) {
                    push().translate( x * Tile.width, y * Tile.width )
                    tile.draw( this, x, y, partialSteps )
                    pop()
                }
            }
        }
    }

    drawEntities( partialSteps ) {
        let { push, pop } = Canvas
        let entityRenderList = this.entities.slice().sort( ( a, b ) => a.layer - b.layer )
        for ( let entity of entityRenderList ) {
            push().translate( entity.x * Tile.width, entity.y * Tile.width )
            entity.draw( partialSteps )
            pop()
        }
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

        for ( let entity of this.entities.slice() )
            entity.update()
    }
}