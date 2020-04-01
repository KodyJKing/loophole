import Game from "./Game";
// import Editor from "./Editor";

window.onload = () => {
    // let game = new Editor()
    let game = new Game()
    // let game = window.location.search.slice( 1 ) == "edit" ? new Editor() : new Game()
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