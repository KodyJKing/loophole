import World, { TileLayers } from "./World"
import { TilePanel, TileBackPanel, TileGlassPanel, TileCatwalk, TileLadder, TileRail, TileCrate } from "./tiles/Tiles"
import TileMover from "./tiles/TileMover"
import { forRect } from "./common"
import { EntityBot } from "./entities/EntityBot"

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

    world.addEntity( EntityBot.create(), 5, 8 )

    world.setTile( 6, 12, TileCrate() )
    world.setTile( 7, 11, TileCrate() )
    world.setTile( 7, 12, TileCrate() )
    world.setTile( 8, 10, TileCrate() )
    world.setTile( 8, 11, TileCrate() )
    world.setTile( 8, 12, TileCrate() )

    return world
}