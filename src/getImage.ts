const cache = {}
export default function getImage( name: string, extension = "png" ) {
    if ( cache[ name ] )
        return cache[ name ]
    let img = new Image()
    img.src = "/assets/" + name + "." + extension
    cache[ name ] = img
    return img
}