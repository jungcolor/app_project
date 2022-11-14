const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/App.ts",
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
            },
            {
                test: /\.css/i,
                include: path.resolve(__dirname, "./src/css"),
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            app: ["index"]
        }),
        // new HtmlWebpackPlugin({
        //     filename: "postList.html",
        //     template: "./src/posts/postList/postList.html",
        //     chunks: ["postList"]
        // }),
        // new HtmlWebpackPlugin({
        //     filename: "postWrite.html",
        //     template: "./src/posts/postWrite/postWrite.html",
        //     chunks: ["postWrite"]
        // })
    ],
    devServer: {
        static: { directory: path.join(__dirname, "../dist") },
        open: true,
        port: "auto"
    },
    mode: "development",
    devtool: "source-map"
}