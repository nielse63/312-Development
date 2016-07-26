
// modules
var gulp      = require('gulp');
var fs        = require('fs');
var path      = require('path');
var mkdirp    = require('mkdirp');
var del       = require('del');
var scsslint  = require('gulp-scss-lint');
var styles    = require('./styles');
var writeFile = require('./utils').writeFile;

// global vars
var outputFile = 'test/results/scss-lint/report.txt';
var inFiles = [
	'assets/styles/**/*.scss',
	'!assets/styles/common/types/*.scss',
	'!bower_components'
];

gulp.task('scss-lint', function() {

	String.prototype.ctrim = String.prototype.ctrim || function(what) {
		what = what || /^\s+|\s+$/g;
		return this.replace(new RegExp(what), '');
	}

	var myCustomReporter = function(file) {
		var report = file.scsslint;
		if( report.success ) {
			return;
		}

		var basename = path.basename(file.path);
		var content = [
			[
				'\n',
				basename,
				'=============================',
				'\n'
			].join('\r')
		];
		report.issues.forEach(function(issue) {
			content.push([
				'Location: ' + issue.line + ':'+  issue.column,
				'Error:    ' + issue.reason,
				'Rule:     ' + issue.linter,
			].join('\r'));
		});

		var outputContent = content
			.join('\n=======\n')
			.ctrim('\n=======') + '\n=======\n\n';

		writeFile(outputFile, outputContent, function(err) {
			if(err) console.log(err);
		});
	};

	del(['test/results/scss-lint']).then(function(paths) {
		return gulp.src(inFiles)
			.pipe(scsslint({
				config: '.scsslint.yml',
				customReport: myCustomReporter
				// customReport : scssLintStylish,
				// reporterOutputFormat: 'Checkstyle',
				// reporterOutput: 'test/results/scss-lint/report.txt'
			}))
			// .pipe(scsslint({
			// 	'reporterOutput': 'test/results/scss-lint/report.json'
			// }));
	});
});
