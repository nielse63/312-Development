// ## Globals
var argv         = require('minimist')(process.argv.slice(2));
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var changed      = require('gulp-changed');
var concat       = require('gulp-concat');
var flatten      = require('gulp-flatten');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var imagemin     = require('gulp-imagemin');
var jshint       = require('gulp-jshint');
var lazypipe     = require('lazypipe');
var merge        = require('merge-stream');
var cssNano      = require('gulp-cssnano');
var plumber      = require('gulp-plumber');
var rev          = require('gulp-rev');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var includer     = require('gulp-html-ssi');
var connect      = require('gulp-connect');
var postcss      = require('gulp-postcss');
var reporter     = require('postcss-reporter');
var syntax_scss  = require('postcss-scss');
var stylelint    = require('stylelint');
// var inline_base64 = require('gulp-inline-base64');
var base64 = require('./tools/gulp-base64-encode');

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
	// Enable static asset revisioning when `--production`
	rev: argv.production,
	// Disable source maps when `--production`
	maps: !argv.production,
	// Fail styles task on error when `--production`
	failStyleTask: argv.production,
	// Fail due to JSHint warnings only when `--production`
	failJSHint: argv.production,
	// Strip debug statments from javascript when `--production`
	stripJSDebug: argv.production
};

// Path to the compiled assets manifest in the dist directory
var revManifest = path.dist + 'assets.json';

// ### CSS processing pipeline
var cssTasks = function(filename) {
	return lazypipe()
		.pipe(function() {
			return gulpif(!enabled.failStyleTask, plumber());
		})
		.pipe(function() {
			return gulpif(enabled.maps, sourcemaps.init());
		})
		.pipe(function() {
			return gulpif('*.scss', sass({
				outputStyle: 'expanded', // libsass doesn't support expanded yet
				precision: 10,
				includePaths: ['.'],
				errLogToConsole: !enabled.failStyleTask
			}));
		})
		.pipe(base64)
		.pipe(concat, filename)
		.pipe(autoprefixer, {
			browsers: [
				'last 2 versions',
				'android 4',
				'opera 12'
			]
		})
		.pipe(cssNano({
			safe : true,
		}))
		// .pipe(function() {
		// 	console.log(argv.production);
		// 	return gulpif(argv.production, cssNano());
		// })
		// .pipe(function() {
		// 	return gulpif(enabled.rev, rev());
		// })
		.pipe(function() {
			return gulpif(enabled.maps, sourcemaps.write('.', {
				sourceRoot: 'assets/styles/'
			}));
		})();
};

// ### Styles
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
				'last 2 versions',
				'android 4',
				'opera 12'
			]
		}))
		.pipe(gulpif(enabled.rev, cssNano()))
		.pipe(gulpif(enabled.maps, sourcemaps.write('.', {
			sourceRoot: 'assets/styles/'
		})))
		.pipe(gulp.dest('public/styles'));
});

// ### Fonts
gulp.task('fonts', function() {
	return gulp.src(globs.fonts)
		.pipe(flatten())
		.pipe(gulp.dest(path.dist + 'fonts'))
		.pipe(connect.reload());
});

// ### Images
gulp.task('images', function() {
	return gulp.src(globs.images)
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
		}))
		.pipe(gulp.dest(path.dist + 'images'))
		.pipe(connect.reload());
		// .pipe(browserSync.stream());
});

// ### JSHint
gulp.task('jshint', function() {
	return gulp.src([
			'assets/scripts/**/*.js',
			'!assets/scripts/lib/vendor/**/*.js',
		])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(gulpif(enabled.failJSHint, jshint.reporter('fail')));
});

// ### Clean
gulp.task('clean', require('del').bind(null, ['public/']));

// ### Other files
gulp.task('other', function() {
	return gulp.src('assets/other/**/*')
		.pipe(flatten())
		.pipe(gulp.dest(path.dist));
});

// ### Watch
gulp.task('watch', function() {
	// browserSync.init({
	//   files: ['{lib,templates}/**/*.php', '*.php'],
	//   proxy: config.devUrl,
	//   snippetOptions: {
	//     whitelist: ['/wp-admin/admin-ajax.php'],
	//     blacklist: ['/wp-admin/**']
	//   }
	// });
	// connect.server({
	// 	root: __dirname + '/dist',
	// 	livereload: true,
	// 	port: 8888
	// });
	// gulp.watch(['ssi/**/*.html'], ['wiredep', 'htmlSSI']);
	gulp.watch([path.source + 'styles/**/*'], ['styles']);
	// gulp.watch([path.source + 'scripts/**/*'], ['jshint', 'scripts']);
	gulp.watch([path.source + 'fonts/**/*'], ['fonts']);
	gulp.watch([path.source + 'images/**/*'], ['images']);
	gulp.watch([path.source + 'other/**/*'], ['other']);
	// gulp.watch(['bower.json', path.source + 'manifest.json'], ['build']);
});


// ### Build
gulp.task('build', ['clean'], function(callback) {
	runSequence(
		['other', 'styles', 'images', 'fonts'],
		callback
	);
});

// ### Wiredep
gulp.task('wiredep', function() {
	var wiredep = require('wiredep').stream;
	return gulp.src(project.css)
		.pipe(wiredep())
		.pipe(changed(path.source + 'styles', {
			hasChanged: changed.compareSha1Digest
		}))
		.pipe(gulp.dest(path.source + 'styles'));
});

gulp.task("scss-lint", function() {

	// Stylelint config rules
	var stylelintConfig = {
		"plugins": [
			"stylelint-statement-max-nesting-depth"
		],
		"rules": {
			"block-no-empty": true,
			"color-no-invalid-hex": true,
			"declaration-colon-space-after": "always",
			"declaration-colon-space-before": "never",
			"function-comma-space-after": "always",
			"function-url-quotes": "always",
			"media-feature-colon-space-after": "always",
			"media-feature-colon-space-before": "never",
			"media-feature-name-no-vendor-prefix": true,
			"max-empty-lines": 5,
			"number-leading-zero": "always",
			"number-no-trailing-zeros": true,
			"property-no-vendor-prefix": true,
			// "rule-no-duplicate-properties": true,
			// "declaration-block-no-single-line": true,
			// "rule-trailing-semicolon": "always",
			"selector-list-comma-space-before": "never",
			"selector-list-comma-newline-after": "always",
			"selector-no-id": true,
			"string-quotes": "single",
			"value-no-vendor-prefix": true,
			"statement-max-nesting-depth": [4, {
				countAtRules: false
			}],
		}
	};

	var processors = [
		stylelint(stylelintConfig),
		reporter({
			clearMessages : true,
			throwError    : false
		})
	];

	return gulp.src('assets/styles/templates/**/*.scss')
		.pipe(postcss(processors, {
			syntax : syntax_scss
		}));
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', ['clean'], function() {
	gulp.start('build');
});
