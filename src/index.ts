import Game from "./Game";
import Canvas from "./Canvas";

window.onload = () => {
    let game = new Game()
    Canvas.setup()
    function loop() {
        Canvas.resizeCanvas()
        game.update()
        requestAnimationFrame( loop )
    }
    loop()
}