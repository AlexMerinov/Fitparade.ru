const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = (config) => {
    return () => {
        return gulp.src([ `./${config.paths.dist}/${config.output.svg_symbols}/*` ])
            .pipe($.clean())
    } 
};
