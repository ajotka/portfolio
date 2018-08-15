const magicImporter = require('node-sass-magic-importer');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const path = require('path');

const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
    mode: IS_PROD ? 'production' : 'development',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js',
    },

    resolve: {
        extensions: ['.web.js', '.mjs', '.js', '.json', '.jsx'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	    alias: {
	      'webpack-hot-client/client': path.resolve(__dirname, 'src'),
	    },
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: { importer: magicImporter() },
                },
            ],
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader?name=./img/[hash].[ext]',
                {
                    loader: 'image-webpack-loader',
                    options: { disable: !IS_PROD },
                },
            ],
        },
        {
            test: /\.(woff|woff2|eot|ttf|svg)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                    	limit: 8000
                    }
                },
            ],
        }],
    },

    serve: {
        content: 'public',
        clipboard: false,
        open: true,
        port: 4000,
        add: (app, middleware) => {
            middleware.webpack().then(() => {
                middleware.content().then(() => {
                    app.use(
                        convert(
                            proxy('/', {
                                target: 'http://localhost:4000',
                                changeOrigin: true,
                            }),
                        ),
                    );
                });
            });
        },
    },
};
