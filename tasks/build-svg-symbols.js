const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const chalk = require('chalk');
const log = console.log;

module.exports = (config) => () => {
    return gulp
        .src(`${config.paths.svg_symbols}`)
        .pipe(
            $.plumber({
                errorHandler: ({ message }) =>
                    log(chalk.red(`Error: ${message}`)),
            })
        )
        .pipe(
            $.if(
                (file) => file.basename[0] !== '_',
                $.imagemin(
                    [
                        $.imagemin.svgo({
                            plugins: [
                                { removeDoctype: false },
                                { removeStyleElement: true },
                                { removeDimensions: true },
                                {
                                    removeAttrs: {
                                        preserveCurrentColor: true,
                                        attrs: ['(style|color|stroke|fill)'],
                                    },
                                },
                            ],
                        }),
                    ],
                    {
                        verbose: true,
                    }
                ),
                $.imagemin(
                    [
                        $.imagemin.svgo({
                            plugins: [
                                { removeDoctype: false },
                                { removeDimensions: true },
                            ],
                        }),
                    ],
                    {
                        verbose: true,
                    }
                )
            )
        )
        .pipe(
            $.svgSprite({
                mode: {
                    symbol: {
                        dest: '.',
                        sprite: `${config.output.svg_symbols}.svg`,
                        example: config.isDevelopment
                            ? {
                                  dest: 'example.html',
                                  template: config.paths.svg_symbols_ex_tmpl,
                              }
                            : false,
                        render: {
                            scss: {
                                dest: `${config.output.svg_symbols}.scss`,
                                template: config.paths.svg_symbols_tmpl,
                            },
                        },
                    },
                },
                svg: {
                    xmlDeclaration: false,
                    doctypeDeclaration: false,
                },
            })
        )
        .pipe($.plumber.stop())
        .pipe(
            gulp.dest((file) => {
                if (file.extname === '.scss') {
                    return `${config.output.sprite_styles}/`;
                }
                return `${config.paths.dist}/${config.output.images}/${config.output.svg_symbols}/`;
            })
        );
};
