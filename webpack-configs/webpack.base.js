const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');

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
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        // new VueLoaderPlugin()
        new IgnoreEmitPlugin(/\.map$/),
    ]
};

exports.baseConfig = baseConfig;
