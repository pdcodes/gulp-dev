var gulp = require('gulp');
var uglify = require('gulp-uglify');

// Styles
gulp.task('styles', function() {
	console.log('Starting styles task');
});

// Scripts
gulp.task('scripts', function () {
	console.log('starting scripts task');

	return gulp.src('site-files/public/scripts/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('site-files/public/dist'));

	console.log('scripts task complete');
});

// Images
gulp.task('images', function() {
	console.log('Starting images task');
});

// Default
gulp.task('default', function() {
	console.log('Running default task');
});