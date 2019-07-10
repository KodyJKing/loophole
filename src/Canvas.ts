export default class Canvas {

    static canvas: HTMLCanvasElement
    static context: CanvasRenderingContext2D

    static setup() {
        Canvas.canvas = document.getElementById( "canvas" ) as HTMLCanvasElement
        Canvas.context = Canvas.canvas.getContext( "2d" ) as CanvasRenderingContext2D
        Canvas.context.imageSmoothingEnabled = false
    }

    static resizeCanvas() {
        Canvas.canvas.width = innerWidth
        Canvas.canvas.height = innerHeight
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
        Canvas.context.rect( x, y, w, h )
        return Canvas
    }

    static circle( x, y, r ) {
        Canvas.context.ellipse( x, y, r, r, 0, 0, Math.PI * 2 )
        return Canvas
    }

    static stroke() {
        Canvas.context.stroke()
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

    static image( image, dx, dy ) {
        Canvas.context.drawImage( image, dx, dy )
        return Canvas
    }

    static translate( x, y ) {
        Canvas.context.translate( x, y )
        return Canvas
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