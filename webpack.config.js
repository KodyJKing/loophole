// const webpack = require("webpack")
const path = require("path")
const webroot = path.join(process.cwd(), "./www")
module.exports = {
    entry: "./lib/index.js",
    output: {
        filename: "pack.js",
        path: webroot
    },
    devServer: {
        contentBase: webroot,
        hot: true,
        host: "localhost",
        port: 8080
    }
}