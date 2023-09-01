const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = (config) => () => {
    return gulp
        .src(`${config.paths.svg_sprite}`)
        .pipe(
            $.plumber({
                errorHandler: $.notify.onError((err) => ({
                    title: "Hey guy, error occured in durring SVG, let's repair it",
                    message: err.message,
                })),
            })
        )
        .pipe(
            $.imagemin([$.imagemin.svgo()], {
                verbose: true,
            })
        )
        .pipe(
            $.svgSprite({
                shape: {
                    spacing: {
                        padding: 2,
                    },
                },
                mode: {
                    css: {
                        dest: '.',
                        sprite: `${config.output.svg_sprite}.svg`,
                        prefix: '@mixin svg-%s',
                        mixin: 'svg-common',
                        bust: true,
                        dimensions: true,
                        example: config.isDevelopment
                            ? {
                                  dest: 'example.html',
                              }
                            : false,
                        render:
                            config.preprocessor === 'sass'
                                ? {
                                      scss: {
                                          dest: `${config.output.svg_sprite}.scss`,
                                          template: config.paths.svg_sprite_tmpl,
                                      },
                                  }
                                : {
                                      less: {
                                          dest: `${config.output.svg_sprite}.less`,
                                      },
                                  },
                    },
                },
                svg: {
                    xmlDeclaration: false,
                    doctypeDeclaration: false,
                },
                variables: {
                    pathToSprite: `../${config.output.images}/${config.output.svg_sprite}/`,
                },
            })
        )
        .pipe(
            gulp.dest((file) => {
                if (file.extname === '.scss' || file.extname === '.less') {
                    return `${config.output.sprite_styles}/`;
                }
                return `${config.paths.dist}/${config.output.images}/${config.output.svg_sprite}/`;
            })
        );
};
