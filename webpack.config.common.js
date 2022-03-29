const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            // JS & TS Rules (included jsx & tsx)
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/env',
                        "@babel/preset-react",
                        "@babel/typescript"
                    ]
                }
            },
            // Css Rule
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // Sass Rule
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    output: {
        filename: './main.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            inject: true,
            template: path.resolve(__dirname, "src", "index.html"),
        }),
    ],
};
