
// modules
var gulp    = require('gulp');
var newer   = require('gulp-newer');
var flatten = require('gulp-flatten');

// task
gulp.task('other', function() {
	return gulp.src([
		'assets/other/**/*'
	])
	.pipe(newer('public/'))
	.pipe(flatten())
	.pipe(gulp.dest('public/'));
});
