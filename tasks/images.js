
// modules
const gulp = require('gulp')
const newer = require('gulp-newer')
const imagemin = require('gulp-imagemin')
const connect = require('gulp-connect')

// global vars
const inPath = 'assets/images/**/*'
const outPath = 'public/images'

// task
gulp.task('images', () => gulp.src(inPath)
		.pipe(newer(outPath))
		.pipe(imagemin({
  progressive: true,
  interlaced: true,
  svgoPlugins: [{
    removeUnknownsAndDefaults: false,
  }, {
    cleanupIDs: false,
  }],
}))
		.pipe(gulp.dest(outPath))
		.pipe(connect.reload()))
