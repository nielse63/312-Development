
// modules
var argv         = require('minimist')(process.argv.slice(2));
var gulp         = require('gulp');
var changed      = require('gulp-changed');
var sourcemaps   = require('gulp-sourcemaps');
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var gulpif       = require('gulp-if');
var cssNano      = require('gulp-cssnano');
var wiredep      = require('wiredep').stream;
var base64       = require('./gulp-base64-encode');

// global vars
var inputPath = 'assets/styles/main.scss';

// Task: Wiredep
gulp.task('wiredep', function() {
	return gulp.src(inputPath)
		.pipe(wiredep())
		.pipe(changed('assets/styles', {
			hasChanged: changed.compareSha1Digest
		}))
		.pipe(gulp.dest('assets/styles'));
});

//Task: Styles
gulp.task('styles', ['wiredep'], function() {
	gulp.src(inputPath)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.'],
			errLogToConsole: !argv.production
		}))
		.pipe(base64())
		.pipe(concat('app.css'))
		.pipe(autoprefixer({
			browsers: [
				'> 1%',
				'last 5 versions',
				'android 4',
				'opera 12',
				'ie 10'
			]
		}))
		.pipe(gulpif(argv.production, cssNano()))
		.pipe(gulpif(!argv.production, sourcemaps.write('.', {
			sourceRoot: 'assets/styles/'
		})))
		.pipe(gulp.dest('public/styles'));
});
