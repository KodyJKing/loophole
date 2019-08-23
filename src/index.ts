import Game from "./Game";
import Canvas from "./common/Canvas";

window.onload = () => {
    Canvas.setup()
    let game = new Game()
    function loop() {
        game.update()
        requestAnimationFrame( loop )
    }
    loop()
}