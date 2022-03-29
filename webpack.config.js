const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
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
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public/'),
            publicPath: '/' 
        },
        port: 3000,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}