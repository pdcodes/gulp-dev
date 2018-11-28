var gulp = require('gulp');
var uglify = require('gulp-uglify');

// File Paths
var SCRIPTS_PATH = 'site-files/public/scripts/**/*.js';

// Styles
gulp.task('styles', function() {
	console.log('Starting styles task');
});

// Scripts
gulp.task('scripts', function () {
	console.log('Starting scripts task');

	return gulp.src(SCRIPTS_PATH)
		.pipe(uglify())
		.pipe(gulp.dest('site-files/public/dist'));

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
	gulp.watch(SCRIPTS_PATH, ['scripts']);
});

// Default
gulp.task('default', function() {
	console.log('Running default task');
});