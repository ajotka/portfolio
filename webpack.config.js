const { merge } = require("webpack-merge");
const path = require("path");
const _ = require("lodash");

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
    return config(mode, {
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'main.js',
        },

        resolve: {
            alias: {
                vue$: 'vue/dist/vue.esm.js',
            },
            extensions: ['.web.js', '.mjs', '.js', '.json', '.jsx', '.vue'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },

        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            hot: true,
            port: 3000,
            host: '0.0.0.0',
            disableHostCheck: true,
        },

        devtool: (mode === 'development') ? 'source-map' : false,

        // Here you can extend config in a classic way
        module: {
            rules: [],
        },
    });
}
