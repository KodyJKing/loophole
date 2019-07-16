import World from "./World";
import { TilePanel, TileBackPanel, TileGlassPanel, TileCatwalk, TileLadder } from "./tiles/Tiles";
import TileMover from "./tiles/TileMover";
import { TileBot } from "./tiles/TileBot";
import { forRect } from "./common";

export function map0() {
    let world = World.create( 23, 15 )
    for ( let x = 0; x < world.width; x++ ) {
        world.setTile( x, 0, TilePanel )
        world.setTile( x, world.height - 1, TilePanel )
        world.setTile( x, world.height - 2, TilePanel )
    }

    for ( let y = 0; y < world.height; y++ ) {
        world.setTile( 0, y, TilePanel )
        world.setTile( world.width - 1, y, TilePanel )
    }

    for ( let x = 1; x < world.width - 1; x++ ) {
        if ( x == 3 ) continue
        world.setTile( x, 7, TileCatwalk )
    }


    let mid = Math.floor( world.width / 2 )

    world.setTile( mid - 2, 8, new TileMover() )
    world.setTile( mid, 9, new TileMover() )
    world.setTile( mid + 2, 10, new TileMover() )


    forRect( 0, 0, world.width, world.height, ( x, y ) => {
        world.setTile( x, y, TileBackPanel, true )
    } )

    forRect( 2, 2, 21, 7, ( x, y ) => {
        world.setTile( x, y, TileGlassPanel, true )
    } )
    forRect( 2, 8, 21, 12, ( x, y ) => {
        world.setTile( x, y, TileGlassPanel, true )
    } )

    for ( let y = 7; y < world.height - 2; y++ ) {
        world.setTile( 3, y, TileLadder )
    }

    world.setTile( 5, 1, TileBot.create() )

    return world
}