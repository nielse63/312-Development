
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
var manifest     = require('asset-builder')('./assets/manifest.json');
var base64       = require('./gulp-base64-encode');

// global vars
var path    = manifest.paths;
var project = manifest.getProjectGlobs();

// CLI options
var enabled = {
	failStyleTask : argv.production,
};

// Task: Wiredep
gulp.task('wiredep', function() {
	return gulp.src(project.css)
		.pipe(wiredep())
		.pipe(changed(path.source + 'styles', {
			hasChanged: changed.compareSha1Digest
		}))
		.pipe(gulp.dest(path.source + 'styles'));
});

//Task: Styles
gulp.task('styles', ['wiredep'], function() {
	gulp.src(project.css)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.'],
			errLogToConsole: !enabled.failStyleTask
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
		.pipe(gulpif(enabled.failStyleTags, cssNano()))
		.pipe(sourcemaps.write('.', {
			sourceRoot: 'assets/styles/'
		}))
		.pipe(gulp.dest('public/styles'));
});
