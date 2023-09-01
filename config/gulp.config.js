const inlineSvg = require('postcss-inline-svg');
const flexbugs = require('postcss-flexbugs-fixes');
const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');

// const { isDevelopment, apiConfig, resourcesConfig } = require('./constants');
const { isDevelopment } = require('./constants');

const PREPROCESSOR = 'sass';
const STYLES_FOLDER = 'styles';
const DIST = 'public';

let config = {
    tasks: 'tasks',
    preprocessor: PREPROCESSOR,
    isDevelopment,
    // apiConfig,
    // resourcesConfig,
    postcssConfig: [
        autoprefixer(),
        assets({
            baseUrl: '/',
            loadPaths: ['images/'],
        }),
        inlineSvg(),
        flexbugs(),
    ],
    pugMode: 'pages',
    paths: {
        // FONTS
        fonts: 'fonts/*.*',
        // STYLES
        stylesFolder: STYLES_FOLDER,
        indexStyle: PREPROCESSOR === 'sass' ? [`${STYLES_FOLDER}/index.scss`] : [`${STYLES_FOLDER}/index.less`],
        styles: PREPROCESSOR === 'sass'
            ? [`${STYLES_FOLDER}/**/*.scss`, `${STYLES_FOLDER}/**/*.css`]
            : [
                `${STYLES_FOLDER}/**.less`,
                `${STYLES_FOLDER}/layout/**.less`,
                `${STYLES_FOLDER}/pages/**.less`,
                `${STYLES_FOLDER}/plugins/**.less`,
                `${STYLES_FOLDER}/service/**.less`,
            ],
        // PUG
        pug: {
            pages: ['pug/*.pug', '!pug/_*.pug'],
        },
        pugWatch: {
            pages: 'pug/**/*.pug',
        },
        // ESLINT
        js: 'js/**/*.{js,jsx,ts,tsx}',
        // IMG
        imagmin: 'images/**/*',
        // SVG
        svg_sprite: 'svg-sprite/**/*.svg',
        svg_sprite_tmpl: 'styles/service/sprite-template.mustache',
        svg_symbols: 'svg-symbols/**/*.svg',
        svg_symbols_tmpl: 'styles/service/symbol-template.mustache',
        svg_symbols_ex_tmpl: 'styles/service/symbol-example-template.mustache',
        // VIDEO
        video: 'video/**/*',
        // DIST
        dist: DIST,
    },
    output: {
        js: 'js',
        css: 'css',
        images: 'images',
        svg_sprite: 'sprite',
        svg_symbols: 'sprite-symbols',
        sprite_styles: 'styles/service',
        fonts: 'css/fonts',
        video: 'video',
        // PUG
        pug: {
            pages: DIST,
        },
        // SSR
        ssr: `ssr-components`,
    },
};

module.exports = config;
