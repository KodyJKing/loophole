import Game from "./Game";
import Canvas from "./Canvas";

window.onload = () => {
    Canvas.setup()
    let game = new Game()
    function loop() {
        Canvas.resizeCanvas()
        game.update()
        requestAnimationFrame( loop )
    }
    loop()
}