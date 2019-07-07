import Stylesheets from "@krisnye/glass-platform/ui/html/Stylesheets"
import HtmlContext from "@krisnye/glass-platform/ui/html/HtmlContext"
import Context from "@krisnye/glass-platform/ui/Context"
import Key, { ModelKey } from "@krisnye/glass-platform/data/Key"
import Model from "@krisnye/glass-platform/data/Model"
import State from "@krisnye/glass-platform/data/State"
import invoke from "@krisnye/glass-platform/server/invoke"

import Store from "@krisnye/glass-platform/data/Store";

Stylesheets.add(t => `
    .Game {
        position: absolute;
        top: 0px;
        left: 0px;
        background: #0a0311;
        overflow: hidden;
        image-rendering: pixelated;
    }
`)

let images: {[name: string]: HTMLImageElement} = {}
function getImage(name: string, extension = "png") {
    if (images[name])
        return images[name]
    let img = new Image()
    img.src = "/assets/" + name + "." + extension
    images[name] = img
    return img
}

let looping = false
function maybeStartGameLoop() {
    if (looping) return;
    looping = true
    requestAnimationFrame(gameLoop)
}

function gameLoop() {
    let canvas = document.getElementById("Game") as HTMLCanvasElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let ctx = canvas.getContext("2d")

    if (ctx != null) {
        ctx.imageSmoothingEnabled = false
        render(ctx)
    }

    requestAnimationFrame(gameLoop)
}

function render(ctx: CanvasRenderingContext2D) {
    ctx.rect(0, 0, 100, 100)
    ctx.fillStyle = "white"
    ctx.fill()

    ctx.save()
        ctx.scale(2, 2)
        let panel = getImage("panel")
        for (let i = 0; i < 10; i++)
            ctx.drawImage(panel, 32 * i, 0)
    ctx.restore()

}

Context.bind(c => {
    let store = Store.default
    let { render, end, div, canvas, span, iframe, h1, button, text } = HtmlContext(c)

    canvas({ class: "Game", id: "Game" })
    end()

    maybeStartGameLoop()
})