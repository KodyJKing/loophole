import Game from "./Game";
import Canvas from "./common/Canvas";

window.onload = () => {
    Canvas.setup()
    let game = new Game()
    let time = performance.now()
    function loop() {
        let oldTime = time
        time = performance.now()
        let dt = time - oldTime
        game.update( Math.min( dt / 1000, 0.25 ) )
        requestAnimationFrame( loop )
    }
    loop()
}