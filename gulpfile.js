var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

// File Paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var STYLES_PATH = 'public/css/**/*.css';

// Styles
gulp.task('styles', function() {
	console.log('Starting styles task');

	// Load files as array instead of string, specifying the order 
	// by referencing files that should be loaded first separately
	return gulp.src(['public/css/reset.css', STYLES_PATH])
		.pipe(concat('styles.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Scripts
gulp.task('scripts', function () {
	console.log('Starting scripts task');

	return gulp.src(SCRIPTS_PATH)
		.pipe(uglify())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());

	console.log('Scripts task complete');
});

// Images
gulp.task('images', function() {
	console.log('Starting images task');
});

// Watch
gulp.task('watch', function() {
	console.log('Watching files for changes');
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
	gulp.watch(STYLES_PATH, ['styles']);
});

// Default
gulp.task('default', function() {
	console.log('Running default task');
});