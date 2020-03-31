import Game from "./Game";

window.onload = () => {
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