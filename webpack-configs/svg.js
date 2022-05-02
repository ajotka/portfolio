const SpritePlugin = require('svg-sprite-loader/plugin');

function svg({ svg: svgConfig }) {

    const svgoLoader =
        {
            loader: 'svgo-loader',
            options: {
                plugins: [
                    { name: "removeUselessDefs", active: false },
                    { name: "cleanupIDs", active: false },
                ],
            },
        };

    return {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    include: svgConfig.src,
                    oneOf: [
                        {
                            resourceQuery: /inline/,
                            use: [
                                'svg-url-loader',
                                'svg-transform-loader',
                                svgoLoader,
                            ],
                        },
                        {
                            use: [
                                {
                                    loader: 'svg-sprite-loader',
                                    options: {
                                        esModule: false,
                                        extract: true,
                                        outputPath: svgConfig.outputPath,
                                        publicPath: svgConfig.publicPath,
                                    },
                                },
                                'svg-transform-loader',
                                svgoLoader,
                            ],
                        },
                    ],
                },
            ],
        },
        plugins: [
            new SpritePlugin({ plainSprite: false })
        ]
    };
}
exports.svg = svg;
