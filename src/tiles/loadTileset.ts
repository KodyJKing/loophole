import path from "path"
import { getImage } from "geode/lib/assets"
import Tile from "./Tile"

export default function loadTileset( tileSet: TiledTileSet ) {
    let result: Tile[] = []
    for ( let tile of tileSet.tiles ) {
        let imageFile = path.basename( tile.image )
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