const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

const baseConfig = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { modules: false, useBuiltIns: 'usage', corejs: 3 }]],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            ['@babel/plugin-proposal-class-properties'],
                            ['@babel/plugin-transform-runtime', { regenerator: true }],
                        ],
                    },
                },
            },
            // {
            //     test: /\.vue$/,
            //     exclude: /(node_modules|bower_components)/,
            //     loader: 'vue-loader',
            // },
            {
                test: /\.(gif|png|webp|jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/img/[hash].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
            },
        ],
    },
    plugins: [
        // new VueLoaderPlugin()
        new IgnoreEmitPlugin(/\.map$/),
        new ImageminWebpWebpackPlugin()
    ]
};

exports.baseConfig = baseConfig;
