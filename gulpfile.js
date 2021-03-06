var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var del = require('del');
var zip = require('gulp-zip');

// Handlebars plugins
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');

// Image plugins
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// File Paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var STYLES_PATH = 'public/css/**/*.css';
var TEMPLATES_PATH = 'templates/**/*.hbs';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}'

// Styles
gulp.task('styles', function() {
	console.log('Starting styles task');

	// Load files as array instead of string, specifying the order 
	// by referencing files that should be loaded first separately
	return gulp.src(['public/css/reset.css', STYLES_PATH])
		.pipe(plumber( function(err) {
			console.log('Styles task error: ' + err);
			this.emit('end');
		}))
		// initialize sourcemaps as one of the first tasks
		.pipe(sourcemaps.init())
		// autoprefixer v6.0.0 requires options object
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(concat('styles.css'))
		.pipe(cleanCSS())
		// write sourcemaps just before you write to dest
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Sassy CSS
gulp.task('scss', function() {
	console.log('Starting styles task');

	// Load files as array instead of string, specifying the order 
	// by referencing files that should be loaded first separately
	return gulp.src('public/scss/styles.scss')
		.pipe(plumber( function(err) {
			console.log('Styles task error: ' + err);
			this.emit('end');
		}))
		// initialize sourcemaps as one of the first tasks
		.pipe(sourcemaps.init())
		// autoprefixer v6.0.0 requires options object
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // gulp-sass handles concatenation for us
        .pipe(sass({
        	outputStyle: 'compressed'
        }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Scripts
gulp.task('scripts', function () {
	console.log('Starting scripts task');

	return gulp.src(SCRIPTS_PATH)
		.pipe(plumber( function(err) {
			console.log('Scripts task error:' + err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());

	console.log('Scripts task complete');
});

// Images
gulp.task('images', function() {
	console.log('Starting images task');
	return gulp.src(IMAGES_PATH)
		.pipe(imagemin([
			imagemin.gifsicle(),
			imagemin.jpegtran(),
			imagemin.optipng(),
			imagemin.svgo(),
			imageminPngquant(),
			imageminJpegRecompress()
		]))
		.pipe(gulp.dest(DIST_PATH + '/images'));
});

// Templates
gulp.task('templates', function() {
	console.log('Starting templates task');
	return gulp.src(TEMPLATES_PATH)
		.pipe(handlebars({
			handlebars: handlebarsLib
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'templates',
			noRedeclare: true
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
})

// Watch
gulp.task('watch', ['styles'], function() {
	console.log('Watching files for changes');
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
	gulp.watch(STYLES_PATH, ['styles']);
	gulp.watch(TEMPLATES_PATH, ['templates']);
});

// Watch for SCSS
gulp.task('watch-scss', ['scss'], function() {
	console.log('Watching files for changes');
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
	gulp.watch('public/scss/**/*.scss', ['scss']);
	gulp.watch(TEMPLATES_PATH, ['templates']);
});

// Clean Up Files
gulp.task('clean', function() {
	return del.sync([
		DIST_PATH]);
});

// Export
gulp.task('export', function() {
	return gulp.src('public/**/*')
		.pipe(zip('website.zip'))
		.pipe(gulp.dest('./'))
});

// Default
gulp.task('default', ['clean', 'images', 'templates', 'styles', 'scripts'], function() {
	console.log('Running default task');
});