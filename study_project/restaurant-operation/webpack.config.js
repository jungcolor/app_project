const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./js/main.ts",
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
    ],
    devServer: {
        static: "./dist",
        port: 3030
    },
    resolve: {
        extensions: [".ts", "js"]
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
}