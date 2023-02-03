//webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    devServer: {
        static: path.join(__dirname, './src'),
        port: 3001,
        hot: 'only',
        compress: true,
        open: true,
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
};
