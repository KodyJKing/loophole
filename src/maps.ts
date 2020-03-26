import World, { TileLayers } from "./World"
import { TilePanel, TileBackPanel, TileGlassPanel, TileCatwalk, TileLadder, TileRail, TileCrate, TileThruster } from "./tiles/Tiles"
import { forRect } from "./common/common"
import { EntityBot } from "./entities/EntityBot"
import { EntityMover } from "./entities/EntityMover"
import EntityPlate from "./entities/EntityPlate"
import EntityDoor from "./entities/EntityDoor"

export function map0() {
    let world = World.create( 23, 15 )
    for ( let x = 0; x < world.width; x++ ) {
        world.setTile( x, 0, TilePanel() )
        world.setTile( x, world.height - 1, TilePanel() )
        world.setTile( x, world.height - 2, TilePanel() )
    }

    for ( let y = 0; y < world.height; y++ ) {
        world.setTile( 0, y, TilePanel() )
        world.setTile( world.width - 1, y, TilePanel() )
    }

    for ( let x = 1; x < world.width - 1; x++ ) {
        if ( x == 3 ) continue
        world.setTile( x, 7, TileCatwalk() )
        world.setTile( x, 6, TileRail(), TileLayers.foreground )
    }


    forRect( 0, 0, world.width, world.height, ( x, y ) => {
        world.setTile( x, y, TileBackPanel(), TileLayers.background )
    } )

    forRect( 2, 2, 21, 7, ( x, y ) => {
        world.setTile( x, y, TileGlassPanel(), TileLayers.background )
    } )
    forRect( 2, 8, 21, 12, ( x, y ) => {
        world.setTile( x, y, TileGlassPanel(), TileLayers.background )
    } )

    for ( let y = 7; y < world.height - 2; y++ ) {
        world.setTile( 3, y, TileLadder() )
    }

    world.addEntity( EntityBot.create(), 5, 12 )

    world.addEntity( new EntityPlate(), 12, 12 )

    world.addEntity( new EntityDoor, 14, 11 )
    for ( let i = 10; i >= 7; i-- )
        world.setTile( 14, i, TilePanel() )
    for ( let i = 15; i < world.width; i++ )
        world.setTile( i, 7, TilePanel() )

    // world.addEntity( new EntityMover(), 19, 12 )

    world.setTile( 6, 12, TileCrate() )
    world.setTile( 7, 11, TileCrate() )
    world.setTile( 7, 12, TileCrate() )
    world.setTile( 8, 10, TileCrate() )
    world.setTile( 8, 11, TileCrate() )
    world.setTile( 8, 12, TileCrate() )

    // for ( let y = 0; y < 3; y++ ) {
    //     world.setTile( 0, y, TileThruster() )
    //     world.setTile( 1, y, TileThruster() )
    //     world.remove( 0, y, TileLayers.background )
    //     world.remove( 1, y, TileLayers.background )
    // }

    return world
}