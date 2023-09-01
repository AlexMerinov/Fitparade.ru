/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

// const path = require('path');
const { webpack } = require('webpack-stream');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// const { isDevelopment, apiConfig, resourcesConfig } = require('./constants');
const { isDevelopment} = require('./constants');

console.log(`env is ${isDevelopment ? 'development' : 'production'}`);
const pluginsProd = [
    // new UglifyJSPlugin({
    //     sourceMap: false
    // }),
    // new webpack.optimize.OccurrenceOrderPlugin(true),
];
const pluginsDev = [
    new BundleAnalyzerPlugin({
        openAnalyzer: false,
    }),
];
const plugins = isDevelopment ? pluginsDev : pluginsProd;

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    watch: isDevelopment,
    target: 'web',
    entry: {
        index: './js/index',
    },
    devtool: isDevelopment ? 'eval' : 'hidden-source-map', // settings source-map
    output: {
        publicPath: '/js/',
        path: `${__dirname} + '/../public/js/`,
        filename: 'bundle.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    filename: 'vendors.bundle.js',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                },
            },
            chunks: 'all',
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEVELOPMENT: JSON.stringify(isDevelopment),
            // API_ROOT: isDevelopment
            //     ? JSON.stringify(apiConfig.dev)
            //     : JSON.stringify(apiConfig.prod),
            // STATIC_ROOT: isDevelopment
            //     ? JSON.stringify(resourcesConfig.dev)
            //     : JSON.stringify(resourcesConfig.prod),
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'commons',
        //     filename: 'commons.js',
        //     minChunks: 2,
        // }),
        ...plugins,
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
};
