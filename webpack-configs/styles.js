const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postCSSImport = require('postcss-import');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

function styles({ styles: stylesConfig }, mode) {
    const sassLoader = {
        loader: 'sass-loader',
        options: {
            sourceMap: true, // has to be true for font generator
        },
    };
    const autoprefixerLoader = stylesConfig.postcss ? {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    postCSSImport,
                    cssnano,
                    autoprefixer,
                ]
            }
        },
    } : {};
    const fileRegex = stylesConfig.scss ? /\.(sa|sc|c)ss$/ : /\.css$/;
    const loaders = [
        stylesConfig.extractToFile
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1 // This option should be set to work with encode-query loader
            }
        },
        autoprefixerLoader,
        'svg-transform-loader/encode-query',
        {
            loader: 'resolve-url-loader',
        },
    ];
    const plugins = [];
    if (stylesConfig.scss) {
        loaders.push(sassLoader);
    }
    if (stylesConfig.extractToFile) {
        plugins.push(new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }));
    }
    return {
        plugins,
        module: {
            rules: [
                {
                    test: fileRegex,
                    use: loaders,
                },
            ],
        },
    };
}
exports.styles = styles;
