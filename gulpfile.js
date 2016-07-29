// ## Globals
var argv         = require('minimist')(process.argv.slice(2));
var browserSync  = require('browser-sync').create();
var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var connect      = require('gulp-connect');
var bump         = require('gulp-bump');
var del          = require('del');

// custom tasks
require('require-dir')('./tasks');

// See https://github.com/austinpray/asset-builder
var manifest = require('asset-builder')('./assets/manifest.json');

// `path` - Paths to base asset directories. With trailing slashes.
// - `path.source` - Path to the source files. Default: `assets/`
// - `path.dist` - Path to the build directory. Default: `dist/`
var path = manifest.paths;

// `config` - Store arbitrary configuration values here.
var config = manifest.config || {};

// `globs` - These ultimately end up in their respective `gulp.src`.
// - `globs.js` - Array of asset-builder JS dependency objects. Example:
//   ```
//   {type: 'js', name: 'main.js', globs: []}
//   ```
// - `globs.css` - Array of asset-builder CSS dependency objects. Example:
//   ```
//   {type: 'css', name: 'main.css', globs: []}
//   ```
// - `globs.fonts` - Array of font path globs.
// - `globs.images` - Array of image path globs.
// - `globs.bower` - Array of all the main Bower files.
var globs = manifest.globs;

// `project` - paths to first-party assets.
// - `project.js` - Array of first-party JS assets.
// - `project.css` - Array of first-party CSS assets.
var project = manifest.getProjectGlobs();

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
	// gulp.watch(['assets/styles/**/*'], ['styles', 'scss-lint']);
	gulp.watch(['assets/fonts/**/*'], ['fonts']);
	gulp.watch(['assets/images/**/*'], ['images']);
	gulp.watch(['assets/other/**/*'], ['other']);
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
