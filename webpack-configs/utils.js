const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const webpack = require("webpack");

function validateConfig(config) {
    if (config.browserSync !== undefined) {
        if (typeof config.browserSync !== 'boolean') {
            throw new Error('Invalid option for browserSync, boolean should be passed.');
        }
    }
    if (config.jquery !== undefined) {
        if (config.jquery !== 'external' && config.jquery !== 'internal') {
            throw new Error("Invalid option for jquery, 'internal' | 'external' should be passed.");
        }
    }
}
function utils({ utils: utilsConfig }) {
    validateConfig(utilsConfig);
    const config = {};
    if (utilsConfig.browserSync) {
        config.plugins = config.plugins || [];
        config.plugins.push(new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:3100/',
        }, {
            reload: false,
        }));
    }
    if (utilsConfig.jquery === 'external') {
        config.externals = {
            jQuery: 'jQuery',
            $: 'jQuery',
        };
    }
    else if (utilsConfig.jquery === 'internal') {
        config.plugins = config.plugins || [];
        config.plugins.push(new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }));
    }
    return config;
}
exports.utils = utils;
