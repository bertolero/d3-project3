const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const CleanWebpackPlugin = require("clean-webpack-plugin");
//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
//const UglifyJS = require("uglify-es");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = env => {
    return {
        entry: {
            main: "./assets/js/app-polymer.js"
        },
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "[name].js"
        },
        resolve: {
            // see below for an explanation // '[name].[chunkhash].js' put this if you want to get hashed files to cache bust
            //alias: { svelte: path.resolve("node_modules", "svelte") },
            //extensions: [".mjs", ".js", ".svelte"],
            //mainFields: ["svelte", "browser", "module", "main"]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader", "prettier-loader"]
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                        "postcss-loader"
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "styles.css" // 'style.[contenthash].css' put this if you want to get hashed files to cache bust
            }),
            new HtmlWebpackPlugin({
                hash: true,
                template: "./assets/index.html"
            }),
            new WebpackMd5Hash()
        ],
        optimization: {
            splitChunks: {chunks: "all", minSize: 0},
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {},
                        warning: true,
                        mangle: false,
                        output: {
                            beautify: env.NODE_ENV !== "production" ? true : false
                        }
                    }
                })
            ],
            usedExports: true,
            sideEffects: true
        }
    };
};
