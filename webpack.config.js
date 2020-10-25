const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "index.js"
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.join(__dirname, "./src/index.html"), filename: "index.html" }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader","css-loader"] },
            { test: /\.js$/, exclude: /(node_modules)/, use: "babel-loader" },
            { test: /\.scss/, use: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.vue$/, use: ["vue-loader"] }
        ]
    },
    devServer: {
        host: "localhost",
        port: 8080,
        open: true
    }
}