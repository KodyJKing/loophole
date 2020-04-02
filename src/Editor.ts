import World from "./World"
import { map0 } from "./maps"
import Canvas from "geode/lib/graphics/Canvas"
import Input from "geode/lib/Input"
import Tile from "./tiles/Tile"
import Vector2 from "geode/lib/math/Vector2"
import GMath from "geode/lib/math/GMath"

export default class Editor {
    readonly stepsPerSecond = 4
    world: World
    canvas: Canvas
    time = 0

    selection = 0
    selectionSmooth = 0
    selectionFadeCooldown = 0
    selectionWheelAlpha = 0

    constructor() {
        this.canvas = new Canvas( "canvas" )
        this.canvas.canvas.addEventListener( "contextmenu", e => e.preventDefault() )
        this.world = map0()
        this.world.initDraw()

        window.addEventListener( "wheel", e => {
            this.selectionFadeCooldown = 1
            this.selection -= Math.sign( e.deltaY )
        } )

    }

    get targetLayer() {
        return Input.buttons.Shift ? 2 : Input.buttons.Control ? 0 : 1
    }

    update( dt: number ) {
        let { world, canvas } = this
        this.time += dt * this.stepsPerSecond
        world.time = Math.floor( this.time )

        this.selectionFadeCooldown -= dt
        if ( this.selectionFadeCooldown < 0 )
            this.selectionWheelAlpha = GMath.lerp( this.selectionWheelAlpha, 0, 0.05 )
        else
            this.selectionWheelAlpha = GMath.lerp( this.selectionWheelAlpha, 1, 0.1 )
        this.selectionSmooth = GMath.lerp( this.selectionSmooth, this.selection, 0.1 )

        let blockPos = this.blockPos( Input.mouseScreenPosition( canvas ) )
        let { x, y } = blockPos
        if ( Input.buttons.Mouse0 )
            world.setTile( x, y, this.selectedTile, this.targetLayer )
        if ( Input.buttons.Mouse1 )
            this.selection = world.getTile( x, y, this.targetLayer )?.id ?? this.selection
        if ( Input.buttons.Mouse2 )
            world.remove( x, y, this.targetLayer )

        this.draw()
    }

    blockPos( v: Vector2 ) {
        return this.world.screenSpaceToBlockSpace( this.canvas, v ).floor()
    }

    draw() {
        let { canvas, world } = this
        canvas.fitWindow()
        canvas.smooth( false )

        canvas.push()
        world.draw( canvas, this.time % 1 )
        canvas.pop()

        let blockPos = this.blockPos( Input.mouseScreenPosition( canvas ) )
        let worldPos = blockPos.multiply( Tile.width )
        canvas.push()
        canvas.applyMatrix( world.transform( canvas ) )
        canvas.vrect( worldPos, new Vector2( Tile.width, Tile.width ) ).strokeStyle( "#FF6F6F" ).stroke()
        canvas.vtranslate( worldPos )
        canvas.alpha( Math.sin( this.time ) * 0.25 + 0.75 )
        this.selectedTile.draw( world, 0, 0, canvas, 0 )
        canvas.pop()

        let layer = this.targetLayer
        let layerName = [ "background", "middle", "foreground" ][ layer ]
        if ( layer != 1 )
            canvas.fillStyle( "#FF6F6F" ).text( layerName, 5, 20, 100, "20px impact" )
        // canvas.fillStyle( "#FF6F6F" ).text( layerName, 5, 20, 100, "20px impact" )

        this.drawSelectionBar()
    }

    drawSelectionBar() {
        let { canvas, world } = this
        let padding = 40
        let stride = Tile.width * 1.5
        canvas.push()
        canvas.alpha( this.selectionWheelAlpha )
        canvas.translate( canvas.width / 2, 0 ).scale( 2, 2 ).translate( 0, stride / 2 )
        canvas.rect( 0, 0, stride * 9, stride, true ).fillStyle( "#4a473d" ).fill().clip()
        for ( let i = -4; i <= 4; i++ ) {
            let j = Math.round( this.selectionSmooth )
            let k = GMath.modulus( i + j, Tile.registeredTiles.length )
            let dx = this.selectionSmooth - j
            let tile = Tile.registeredTiles[ k ]
            canvas.push().translate( ( i - dx ) * stride - Tile.width / 2, - Tile.width / 2 )
            tile.draw( world, 0, 0, canvas, 0 )
            canvas.pop()
        }
        canvas.rect( 0, 0, stride - 5, stride - 5, true ).strokeStyle( "#FF6F6F" ).stroke()
        canvas.pop()
    }

    get selectedTile() {
        return Tile.registeredTiles[ this.selectionIndex ]
    }

    get selectionIndex() {
        return GMath.modulus( this.selection, Tile.registeredTiles.length )
    }
}