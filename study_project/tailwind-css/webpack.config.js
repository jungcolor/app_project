const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true
    },
    plugins: [new HtmlWebpackPlugin({ template: "index.html" })],
    module: {
        rules: [
            {
                test: /\.css/i,
                include: path.resolve(__dirname, "css"),
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                include: path.resolve(__dirname, "image"),
                type: "asset/resource"
            }
        ]
    },
    devServer: {
        static: { directory: path.join(__dirname, 'dist') },
        open: true,
        port: "auto",
    },
    devtool: "source-map",
    mode: "development"
}