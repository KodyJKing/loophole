import { EntityBot } from "./entities/EntityBot"
import EntityDoor from "./entities/EntityDoor"
import EntityPlate from "./entities/EntityPlate"
import { EntityMover } from "./entities/EntityMover"
import Tile from "./tiles/Tile"
import World, { TileLayers } from "./World"
import { TilePanel, TileBackPanel, TileCatwalk, TileCrate, TileGlassPanel, TileLadder, TileRail, TileThruster } from "./tiles/Tiles"

export default function loadTiledMap( level: any ) {
    level = level as TiledLevel
    let { width, height, layers } = level
    let world = World.create( width, height )
    for ( let layer of layers ) {
        if ( layer.data ) {
            let layerId = ( TileLayers as any )[ layer.name ]
            let i = 0
            for ( let y = 0; y < height; y++ ) {
                for ( let x = 0; x < width; x++ ) {
                    let id = layer.data[ i++ ]
                    if ( id != 0 )
                        world.setTile( x, y, tileTypes[ id - 1 ], layerId )
                }
            }
        } else {
            for ( let obj of layer.objects ) {
                let entity = new ( entityTable[ obj.type ] )()
                if ( obj.properties )
                    for ( let property of obj.properties )
                        if ( entity.hasOwnProperty( property.name ) )
                            entity[ property.name ] = property.value
                let x = ( obj.x - obj.width * 0.5 ) / Tile.width
                let y = ( obj.y - obj.height * 0.5 ) / Tile.width
                world.addEntity( entity, x, y )
            }
        }
    }
    return world
}

const tileTypes = [
    TileBackPanel,
    TileCatwalk,
    TileCrate,
    TileGlassPanel,
    TileLadder,
    TilePanel,
    TileRail,
    TileThruster
]
const entityTable: { [ name: string ]: any } = {}
const entityTypes = [
    EntityBot,
    EntityDoor,
    EntityPlate,
    EntityMover,
]
for ( let entityType of entityTypes )
    entityTable[ entityType.name ] = entityType

type TiledLevel = {
    height: number
    width: number
    layers: {
        data: number[]
        objects: {
            type: string
            x: number, y: number
            width: number, height: number
            properties?: {
                name: string
                type: "int" | "float" | "string" // ...
                value: any
            }[]
        }[]
        name: string
    }[],
    tilesets: {

    }[]
}