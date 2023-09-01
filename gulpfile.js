const gulp = require('gulp');
const config = require('./config/gulp.config');


function register(options) {
    return (tasks) => {
        Object.keys(tasks).forEach((task) => {
            const tackOptions = {
                ...options,
                taskName: task,
            };
            gulp.task(task, require(`./tasks/${tasks[task]}`)(tackOptions));
        });
    };
}

register(config)({
    'clean': 'clean',
    'assets': 'assets',
    'build:js': 'build-js',
    'clean:svg': 'clean-svg',
    'clean:svg-symbols': 'clean-svg-symbols',
    'imagemin': 'imagemin',
    'watch': 'watch',
    'serve': 'serve',
    'build:svg': 'build-svg',
    'build:svg-symbols': 'build-svg-symbols',
    'build:styles': 'build-styles',
    'eslint': 'eslint',
    'pug:pages': 'pug',
    'video': 'video',
});

gulp.task(
    'static-assets',
    gulp.series(
        gulp.parallel(
            'assets',
            'build:svg',
            'build:svg-symbols',
            'imagemin',
            'video'
        ),
        'build:styles',
        'build:js'
    )
);

gulp.task('default', gulp.series('static-assets', 'pug:pages'));
gulp.task('prod', gulp.series('clean', 'static-assets', 'pug:pages'));
gulp.task(
    'dev-quick',
    gulp.series(
        'static-assets',
        'serve',
        'pug:pages',
        'watch'
    )
);
gulp.task('dev', gulp.series('clean', 'dev-quick'));
