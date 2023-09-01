const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const emitty = require('@emitty/core').configure();
const pugParser = require('@emitty/language-pug').parse;
const through2 = require('through2');
const typograf = require('gulp-typograf');

const emittyState = require('./emitty/state');

function getFilter(taskName) {
    return through2.obj(function (file, _encoding, callback) {
        emitty.filter(file.path, emittyState.watch[taskName]).then((result) => {
            if (result) {
                this.push(file);
            }
            callback();
            return result;
        });
    });
}
emitty.language({
    extensions: ['.pug'],
    parser: pugParser,
});

const onError = $.notify.onError(
    'Line: <%= error.lineNumber %>: <%= error.message %>\n<%= error.fileName %> title: <%= error.plugin %>'
);

module.exports = (config) => () => {
    return gulp
        .src(config.paths.pug[config.pugMode])
        .pipe($.plumber({ errorHandler: onError }))
        .pipe($.if(emittyState.isWatchMode, getFilter(config.taskName)))
        .pipe($.pug({
            data: {
                isDevelopment: config.isDevelopment,
            },
        }))
        .pipe($.prettier())
        .pipe(typograf({
            locale: ['ru', 'en-US'],
            disableRule: 'ru/other/phone-number',
            safeTags: [
                ['<no-typography>', '</no-typography>']
            ],
        }))
        .pipe(gulp.dest(`${config.output.pug[config.pugMode]}`));
};
