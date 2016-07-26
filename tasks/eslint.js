
// modules
var gulp   = require('gulp');
var eslint = require('gulp-eslint');
var fs     = require('fs');
var path   = require('path');
var mkdirp = require('mkdirp');
var del    = require('del');

// global vars
var outPath = 'test/results/eslint';

// task
gulp.task('eslint', function() {

	function writeFile(_path, contents, cb) {
		mkdirp(path.dirname(_path), function (err) {
			if (err) return cb(err);
			fs.writeFile(_path, contents, cb);
		});
	}

	del(['test/results/eslint']).then(function(paths) {
		return gulp.src([
			'./app-client.js',
			'./app-server.js',
			'./app.js',
			'actions/**/*.js',
			'components/**/*.js',
			'dispatcher/**/*.js',
			'stores/scripts/**/*.js',
			'assets/scripts/**/*.js',
			'!./public',
			'!assets/scripts/lib/vendor/*.js',
			'!node_modules',
			'!bower_components'
		])
		.pipe(eslint({
			fix : true
		}))
		.pipe(eslint.result(result => {
			if( ! result.errorCount ) {
				return;
			}

			var basename = result.filePath
				.replace(path.resolve(__dirname, '../'), '')
				.replace(/\/_/, '/')
				.replace(/\.js$/, '');
			var content = [];

			result.messages.forEach(function(message, i) {
				if( message.severity < 2 ) {
					return;
				}
				content.push([
					'Location: ' + message.line + ':'+  message.column,
					'Offender: ' + message.source.trim(),
					'Error:    ' + message.message,
					'Rule:     ' + message.ruleId,
					'============================='
				].join('\n') + '\n');
			});
			var outputFile = path.join(outPath, basename + '.txt');
			writeFile(outputFile, content.join('\n'), function(err) {
				if(err) console.log(err);
			})
		}))
		.pipe(eslint.failAfterError());
	});
});
