
// modules
var gulp    = require('gulp');
var newer   = require('gulp-newer');
var flatten = require('gulp-flatten');
var connect = require('gulp-connect');

// global vars
var inPath = 'assets/fonts/**/*';

// task
gulp.task('fonts', function() {
	return gulp.src(inPath)
		.pipe(newer(inPath))
		.pipe(flatten())
		.pipe(gulp.dest('public/fonts'))
		.pipe(connect.reload());
});
