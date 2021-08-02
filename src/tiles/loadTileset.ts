import { getImage } from "geode/lib/assets"
import Tile from "./Tile"

function basename( path: string ) {
    let parts = path.split( /[\\\/.]/g )
    return parts[ parts.length - 2 ]
}

export default function loadTileset( tileSet: TiledTileSet ) {
    let result: Tile[] = []
    for ( let tile of tileSet.tiles ) {
        let imageFile = basename( tile.image )
        let name = imageFile.split( "." )[ 0 ]
        let image = getImage( imageFile )
        result.push( new Tile( name, result.length ) )
    }
    return result
}

type TiledTileSet = {
    tiles: {
        image: string
    }[]
}