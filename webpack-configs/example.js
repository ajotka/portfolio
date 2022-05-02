function example() {
    return {
        module: {
            rules: [
                {
                    test: /\.(format1|format2)$/,
                    use: [
                        {
                            loader: 'name-loader',
                        },
                    ],
                },
            ],
        },
    };
}
exports.example = example;
