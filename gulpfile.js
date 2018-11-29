var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

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

// Watch for SCSS
gulp.task('watch-scss', function() {
	console.log('Watching files for changes');
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
	gulp.watch('public/scss/**/*.scss', ['scss']);
});

// Default
gulp.task('default', function() {
	console.log('Running default task');
});