
// modules
var gulp     = require('gulp');
var newer    = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var connect  = require('gulp-connect');

// global vars
var inPath  = 'assets/images/**/*';
var outPath = 'public/images';

// task
gulp.task('images', function() {
	return gulp.src(inPath)
		.pipe(newer(outPath))
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			svgoPlugins: [{
				removeUnknownsAndDefaults: false
			}, {
				cleanupIDs: false
			}]
		}))
		.pipe(gulp.dest(outPath))
		.pipe(connect.reload());
});
