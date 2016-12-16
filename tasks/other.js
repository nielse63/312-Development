
// modules
const gulp = require('gulp')
const newer = require('gulp-newer')
const flatten = require('gulp-flatten')

// task
gulp.task('other', () => gulp.src([
  'assets/other/**/*',
])
	.pipe(newer('public/'))
	.pipe(flatten())
	.pipe(gulp.dest('public/')))
