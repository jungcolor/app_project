const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.ts",
    },
    output: {
        filename: "[name].[hash].[chunkhash].bundle.js",
        path: path.resolve(__dirname, '../dist'),
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