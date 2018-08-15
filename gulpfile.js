// ==== MODULES ==== //
const gulp = require('gulp');
/* JS */
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
/* JS Modules */
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
/* CSS */
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sassGlob = require('gulp-sass-glob');
const gulpStylelint = require('gulp-stylelint');
/* Image */
const imagemin = require('gulp-imagemin');
/* Other */
const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const args = require('yargs').argv;
const gulpif = require('gulp-if');
const gulp_remove_logging = require('gulp-remove-logging');

// ==== Config ==== //

// Project paths
const domain = '';
// Proxy domain

const src = './src/';
// Source path

const dest = './public/';
// Destination path

const modules = './node_modules/'; // npm packages

/**
 * Env config
 */
const isProduction = args.env === 'production';
const isDevelopment = args.env === 'development';
console.log(`ENV: ${args.env}`);

gulp.task('default', () => {
    runSequence(
        ['css', 'js', 'images'], ['fonts'],
    );
});

gulp.task('css-lint', () => gulp.src(`${src}css/5_components/**`)
    .pipe(gulpStylelint({
        reporters: [
            { formatter: 'string', console: true },
        ],
    }).on('error', () => {
        console.log('CSS Lint failed');
    })));

gulp.task('css', ['css-lint'], () => gulp.src(`${src}css/main.scss`)
    .pipe(sassGlob())
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(sass({
        precision: 6,
    }))
    .on('error', function (err) {
        console.log(err.message);
        this.emit('end');
    })
    .pipe(postcss([autoprefixer()]))
    .pipe(gulpif(isProduction, cssnano()))
    .pipe(gulpif(isDevelopment, sourcemaps.write('/')))
    .pipe(gulp.dest(`${dest}css`)));

gulp.task('js', () => runSequence('js-vendor', 'js-scripts', 'js-build', () => {
    console.log('JS finish.');
}));

gulp.task('js-vendor', () => gulp.src([
    `${src}js/vendor/*`,
    // src + modules +  'jquery/dist/jquery.min.js',
]).pipe(concat('vendor.js'))
    .pipe(gulp.dest(`${src}js/temp`)));

gulp.task('js-scripts', () => {
    gulp.src([
        `${src}js/components/*.js`,
        `${src}js/main.js`,
    ]).pipe(jshint())
        .pipe(jshint.reporter('default'));

    return browserify({
        entries: `${src}js/main.js`,
        extensions: ['.js'],
        debug: true,
    })
        .transform(babelify, { presets: ['es2015'] })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulpif(isDevelopment, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulpif(isProduction, gulp_remove_logging()))
        .pipe(concat('modules.js'))
        .pipe(gulpif(isDevelopment, sourcemaps.write('./')))
        .pipe(gulp.dest(`${src}js/temp`));
});

gulp.task('js-build', () => gulp.src([
    `${src}js/temp/vendor.js`,
    `${src}js/temp/modules.js`,
]).pipe(concat('scripts.js'))
    .pipe(gulpif(isDevelopment, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest(`${dest}js`)));

gulp.task('images', () => gulp.src([`${src}img/**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)`, '!'])
    .pipe(changed(`${dest}img/`))
    .pipe(imagemin({
        optimizationLevel: 7,
        progressive: true,
        interlaced: true,
    }))
    .pipe(gulp.dest(`${dest}img`)));

gulp.task('fonts', () => gulp.src([`${src}fonts/**/*(*.ttf|*.eot|*.woff|*.woff2|*.svg)`,'!'])
    .pipe(gulp.dest(`${dest}fonts`)));

gulp.task('sync', ['default'], () => {
    if (domain) {
        browserSync.init({
            proxy: domain,
            watchOptions: {
                debounceDelay: 1000,
            },
        });
    } else {
        browserSync.init({
            server: {
                baseDir: 'public',
                watchOptions: {
                    debounceDelay: 1000,
                },
            },
        });
    }
    gulp.watch(`${src}css/**`, () => {
        runSequence('css', () => {
            browserSync.reload();
        });
    });

    gulp.watch([`${src}js/*.js`, `${src}js/components/*.js`], () => {
        runSequence('js-scripts', 'js-build', () => {
            browserSync.reload();
        });
    });

    gulp.watch('public/*.html').on('change', browserSync.reload);
});
