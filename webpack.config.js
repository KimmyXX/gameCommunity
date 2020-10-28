const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: "development",
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "index.js",
        chunkFilename: "[name].js"
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.join(__dirname, "./src/index.html"), filename: "index.html" }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[name].css" })
    ],
    module: {
        rules: [
            { test: /\.css$/, use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader", "postcss-loader"] },
            { test: /\.js$/, exclude: /(node_modules)/, use: "babel-loader" },
            { test: /\.scss/, use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader", "postcss-loader" , "sass-loader"] },
            { test: /\.vue$/, use: ["vue-loader"] },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: "file-loader",
                    options: { outputPath: "./img", name: "[name].[ext]" }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: { loader: "file-loader", options: { outputPath: "./fonts" } }
            },
        ]
    },
    devServer: {
        host: "localhost",
        port: 8080,
        open: true
    }
}