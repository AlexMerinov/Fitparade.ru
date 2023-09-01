const gulp = require('gulp');
const bs = require('browser-sync');
const open = require('open');

const emittyState = require('./emitty/state');

module.exports = (config) => () => {
    bs.watch([
        `${config.paths.dist}/**/*`,
        `!${config.paths.dist}/ssr/**/*`,
    ]).on('change', bs.reload);
    open('http://localhost:3000');

    gulp.watch(config.paths.styles, gulp.series('build:styles'));
    gulp.watch(config.paths.pugWatch.pages, gulp.series('pug:pages')).on(
        'all',
        (event, changed) => {
            emittyState.watch['pug:pages'] = changed;
        }
    );
    gulp.watch(config.paths.imagmin, gulp.series('imagemin'));
    gulp.watch(
        [config.paths.svg_sprite, config.paths.svg_sprite_tmpl],
        gulp.series('clean:svg', 'build:svg')
    );
    gulp.watch(
        [
            config.paths.svg_symbols,
            config.paths.svg_symbols_ex_tmpl,
            config.paths.svg_symbols_tmpl,
        ],
        gulp.series('clean:svg-symbols', 'build:svg-symbols')
    );
};
