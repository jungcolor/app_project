const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.ts",
        postList: "./src/posts/postList/postList.ts",
        postWrite: "./src/posts/postWrite/postWrite.ts"
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].[hash].bundle.js",
        clean: true
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "postList.html",
            template: "./src/posts/postList/postList.html",
            chunks: ["postList"]
        }),
        new HtmlWebpackPlugin({
            filename: "postWrite.html",
            template: "./src/posts/postWrite/postWrite.html",
            chunks: ["postWrite"]
        })
    ],
    devServer: {
        static: { directory: path.join(__dirname, "../dist") },
        open: true,
        port: "auto"
    },
    mode: "development",
    devtool: "source-map"
}