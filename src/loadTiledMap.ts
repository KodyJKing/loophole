import { EntityBot } from "./entities/EntityBot"
import EntityDoor from "./entities/EntityDoor"
import EntityPlate from "./entities/EntityPlate"
import { EntityMover } from "./entities/EntityMover"
import Tile from "./tiles/Tile"
import World, { TileLayers } from "./World"

export default function loadTiledMap( _level: any ) {
    let level = _level as TiledLevel
    let { width, height, layers } = level
    let world = World.create( width, height )
    for ( let layer of layers ) {
        if ( layer.data ) {
            let layerId = ( TileLayers as any )[ layer.name ]
            world.layers[ layerId ] = layer.data.map( id => id - 1 )
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
    console.log( world )
    return world
}

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
    }[]
}