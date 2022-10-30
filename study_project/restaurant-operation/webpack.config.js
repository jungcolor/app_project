const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./js/main.js",
    mode: "development",
    output: {
        filename: "[name].[id].[hash].bundle.js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html",
            chunks: ["main"]
        })
    ]
}