const { merge } = require("webpack-merge");
const path = require("path");
const _ = require("lodash");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlValidatePlugin = require('html-validate-webpack-plugin');

// Configuration files
const webpack_base = require("./webpack-configs/webpack.base");
const styles = require("./webpack-configs/styles");
const svg = require("./webpack-configs/svg");
const utils = require("./webpack-configs/utils");

// Default options for all configuration files
// key name is equal to configuration export name
const defaultOptions = {
    styles: {
        extractToFile: false,
        postcss: true,
        scss: true,
    },
    svg: {
        src: path.resolve(__dirname, 'src/icons'),
        outputPath: '/',
        publicPath: '/',
    },
    utils: {
        browserSync: false,
        jquery: 'internal',
    },
};

// Merge all configs into one
// - Order is important!
// - Your custom config should be in 'userConfig' as param
// - If you want to add another generic config, look ./configs/example.js
function config(mode, userConfig) {
    return merge(
        webpack_base.baseConfig,
        { mode },
        svg.svg(defaultOptions),
        styles.styles(defaultOptions, mode),
        utils.utils(defaultOptions),
        userConfig
    );
}

module.exports = (env, argv) => {
    const mode = _.get(argv, 'mode', 'development');

    const dynamicPlugins = [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'public/img'),
                },
                {
                    from: path.resolve(__dirname, 'src/public'),
                    to: path.resolve(__dirname, 'public'),
                },
            ],
        }),
    ];

    if (mode === 'development') {
        dynamicPlugins.push(new HtmlValidatePlugin());
    }

    return config(mode, {
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'main.js',
            assetModuleFilename: 'assets/[name][ext][query]',
        },

        resolve: {
            extensions: ['.js', '.json'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },

        devServer: {
            allowedHosts: "all",
            historyApiFallback: true,
            host: '0.0.0.0',
            hot: true,
            port: 3000,
            static: {
                directory: path.join(__dirname, 'public'),
            },
        },

        devtool: (mode === 'development') ? 'source-map' : false,

        // Here you can extend config in a classic way
        module: {
            rules: [],
        },

        plugins: dynamicPlugins,

    });
}
