const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const selectedTheme = "paperbits";

module.exports = {
    mode: "development",
    target: "web",
    entry: {
        "assets/styles/theme": [`./src/themes/${selectedTheme}/styles/styles.scss`],
        "assets/scripts/theme": ["./src/startup.runtime.ts"]
    },
    output: {
        filename: "./[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { url: false, minimize: true, sourceMap: true } },
                    { loader: "postcss-loader", options: { sourceMap: true, options: { plugins: () => [autoprefixer] } } },
                    { loader: "sass-loader", options: { sourceMap: true } }
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader?exportAsEs6Default"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.liquid$/,
                loader: "raw-loader"
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" }),
        new CopyWebpackPlugin([
            { from: `./src/config.runtime.json`, to: `./assets/config.json` }
        ])
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".html", ".scss"]
    }
};