// ## Globals
var argv         = require('minimist')(process.argv.slice(2));
var browserSync  = require('browser-sync').create();
var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var connect      = require('gulp-connect');
var postcss      = require('gulp-postcss');
var reporter     = require('postcss-reporter');
var syntax_scss  = require('postcss-scss');
var stylelint    = require('stylelint');

// custom tasks
var requireDir = require('require-dir');
requireDir('./tasks');

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
	gulp.watch([path.source + 'styles/**/*'], ['styles']);
	gulp.watch([path.source + 'fonts/**/*'], ['fonts']);
	gulp.watch([path.source + 'images/**/*'], ['images']);
	gulp.watch([path.source + 'other/**/*'], ['other']);
});

// gulp.task("scss-lint", function() {
// 	// Stylelint config rules
// 	var stylelintConfig = {
// 		"plugins": [
// 			"stylelint-statement-max-nesting-depth"
// 		],
// 		"rules": {
// 			"block-no-empty": true,
// 			"color-no-invalid-hex": true,
// 			"declaration-colon-space-after": "always",
// 			"declaration-colon-space-before": "never",
// 			"function-comma-space-after": "always",
// 			"function-url-quotes": "always",
// 			"media-feature-colon-space-after": "always",
// 			"media-feature-colon-space-before": "never",
// 			"media-feature-name-no-vendor-prefix": true,
// 			"max-empty-lines": 5,
// 			"number-leading-zero": "always",
// 			"number-no-trailing-zeros": true,
// 			"property-no-vendor-prefix": true,
// 			"selector-list-comma-space-before": "never",
// 			"selector-list-comma-newline-after": "always",
// 			"selector-no-id": true,
// 			"string-quotes": "single",
// 			"value-no-vendor-prefix": true,
// 			"statement-max-nesting-depth": [4, {
// 				countAtRules: false
// 			}],
// 		}
// 	};

// 	var processors = [
// 		stylelint(stylelintConfig),
// 		reporter({
// 			clearMessages : true,
// 			throwError    : false
// 		})
// 	];

// 	return gulp.src('assets/styles/templates/**/*.scss')
// 		.pipe(postcss(processors, {
// 			syntax : syntax_scss
// 		}));
// });

// ### Build
gulp.task('build', function(callback) {
	runSequence(
		['other', 'styles', 'images', 'fonts', 'eslint'],
		callback
	);
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', function() {
	gulp.start('build');
});
