// ## Globals
var argv         = require('minimist')(process.argv.slice(2));
var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var bump         = require('gulp-bump');
var del          = require('del');

// custom tasks
require('require-dir')('./tasks');

// CLI options
var enabled = {
	rev           : argv.production,
	maps          : !argv.production,
	failStyleTask : argv.production,
	failJSHint    : argv.production,
	stripJSDebug  : argv.production
};

// ### Watch
gulp.task('watch', function() {
	gulp.watch(['assets/styles/**/*'], ['scss-lint']);
	gulp.watch(['assets/fonts/**/*'], ['fonts']);
	gulp.watch(['assets/images/**/*'], ['images']);
	gulp.watch(['assets/other/**/*'], ['other']);
	gulp.watch(['assets/scripts/**/*'], ['eslint']);
	gulp.watch(['views/index.html'], ['views']);
});

// bump version
gulp.task('bump', function(){
	return gulp.src([
			'./package.json',
		])
		.pipe(bump())
		.pipe(gulp.dest('./'));
});

// ### Build
gulp.task('build', function(callback) {
	var tasks = ['other', 'images'];
	runSequence(
		tasks,
		callback
	);
});

// ### Tetst
gulp.task('test', function(callback) {
	del(['test/results']).then(function() {
		runSequence(
			['eslint', 'scss-lint'],
			callback
		);
	});
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', function() {
	gulp.start('build');
});
