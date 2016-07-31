
// modules
var gulp      = require('gulp');
var eslint    = require('gulp-eslint');
var fs        = require('fs');
var path      = require('path');
var mkdirp    = require('mkdirp');
var del       = require('del');
var writeFile = require('./utils').writeFile;

// global vars
var outputFile = 'test/results/eslint.txt';

// task
gulp.task('eslint', function() {

	String.prototype.ctrim = String.prototype.ctrim || function(what) {
		what = what || /^\s+|\s+$/g;
		return this.replace(new RegExp(what), '');
	}

	del.sync([outputFile]);

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
			.replace(/\/_/, '/');
		var content = [[
			'\n',
			basename,
			'=============================',
			'\n'
		].join('\r')];

		result.messages.forEach(function(message, i) {
			if( message.severity < 2 ) {
				return;
			}
			content.push([
				'Location: ' + message.line + ':'+  message.column,
				'Offender: ' + message.source.trim(),
				'Error:    ' + message.message,
				'Rule:     ' + message.ruleId,
			].join('\r'));
		});

		var outputContent = content
			.join('\n=======\n')
			.ctrim('\n=======') + '\n=======\n\n';

		writeFile(outputFile, outputContent, function(err) {
			if(err) console.log(err);
		}, true);
	}))
	.pipe(eslint.failAfterError());
});
