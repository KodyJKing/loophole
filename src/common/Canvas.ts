import Matrix3 from "./math/Matrix3"

export default class Canvas {

    static canvas: HTMLCanvasElement
    static context: CanvasRenderingContext2D

    static setup() {
        Canvas.canvas = document.getElementById( "canvas" ) as HTMLCanvasElement
        Canvas.context = Canvas.canvas.getContext( "2d" ) as CanvasRenderingContext2D
    }

    static fitWindow() {
        Canvas.canvas.style.width = innerWidth + "px"
        Canvas.canvas.style.height = innerHeight + "px"
        Canvas.canvas.width = innerWidth * 2
        Canvas.canvas.height = innerHeight * 2
    }

    static background( style ) {
        let { canvas, context: c } = Canvas
        c.fillStyle = style
        c.fillRect( 0, 0, canvas.width, canvas.height )
        return Canvas
    }

    static line( x1, y1, x2, y2 ) {
        let { context: c } = Canvas
        c.beginPath()
        c.moveTo( x1, y1 )
        c.lineTo( x2, y2 )
        c.closePath()
        return Canvas
    }

    static rect( x, y, w, h ) {
        let { context: c } = Canvas
        c.beginPath()
        c.rect( x, y, w, h )
        c.closePath()
        return Canvas
    }

    static circle( x, y, r ) {
        let { context: c } = Canvas
        c.beginPath()
        c.ellipse( x, y, r, r, 0, 0, Math.PI * 2 )
        c.closePath()
        return Canvas
    }

    static stroke() {
        Canvas.context.stroke()
        return Canvas
    }

    static fill() {
        Canvas.context.fill()
        return Canvas
    }

    static strokeStyle( style ) {
        Canvas.context.strokeStyle = style
        return Canvas
    }

    static fillStyle( style ) {
        Canvas.context.fillStyle = style
        return Canvas
    }

    static image( image, dx = 0, dy = 0 ) {
        Canvas.context.drawImage( image, dx, dy )
        return Canvas
    }

    static imageAt( image, dx, dy, sx, sy, sw, sh ) {
        Canvas.context.drawImage( image, sx, sy, sw, sh, dx, dy, sw, sh )
        return Canvas
    }


    static translate( x, y ) {
        // Canvas.context.translate( Math.round( x ), Math.round( y ) )
        Canvas.context.translate( x, y )
        return Canvas
    }

    static rotate( angle ) {
        Canvas.context.rotate( angle )
        return Canvas
    }

    static scale( x, y ) {
        Canvas.context.scale( x, y )
        return Canvas
    }

    static transform( mat: Matrix3 ) {
        let { m11, m12, m13, m21, m22, m23 } = mat
        Canvas.context.transform( m11, m21, m12, m22, m13, m23 )
    }

    static push() {
        Canvas.context.save()
        return Canvas
    }

    static pop() {
        Canvas.context.restore()
        return Canvas
    }
}