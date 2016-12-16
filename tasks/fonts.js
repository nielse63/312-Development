
// modules
const gulp = require('gulp')
const newer = require('gulp-newer')
const flatten = require('gulp-flatten')
const connect = require('gulp-connect')

// global vars
const inPath = 'assets/fonts/**/*'

// task
gulp.task('fonts', () => gulp.src(inPath)
		.pipe(newer(inPath))
		.pipe(flatten())
		.pipe(gulp.dest('public/fonts'))
		.pipe(connect.reload()))
