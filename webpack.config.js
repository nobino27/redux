var path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, "public"),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]!image-webpack-loader'
            }
        ]
    }
}