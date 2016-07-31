
// modules
var argv         = require('minimist')(process.argv.slice(2));
var gulp         = require('gulp');
// var wiredep      = require('wiredep').stream;
// var rename       = require('gulp-rename');
var gulpif       = require('gulp-if');
var del          = require('del');
var fs           = require('fs');
var path         = require('path');
var writeFile    = require('./utils').writeFile;
var gutil        = require('gulp-util');

// global vars
var publicDir = path.resolve(__dirname, '../public/');
var input     = path.resolve(__dirname, '../views/index.html');
var output    = path.resolve(publicDir, 'index.html');
var attempts  = 0;

// functions
function getFile() {
	fs.readFile(output, function(err, data) {
		if (err) {
			if( attempts < 5 ) {
				attempts++;
				setTimeout(getFile, 500);
				return;
			}
			console.log('File not found');
			return;
		}

		var file = new gutil.File({
			cwd      : __dirname,
			base     : publicDir,
			path     : output,
			contents : data
		});
		var fileContent = file.contents.toString();
		var string = fileContent.replace(/\s/g, '');
		var found = string.match( new RegExp('<!--bower:js-->(.*?)<!--endbower-->') );
		if( ! found || ! found.length || ! found[1] ) {
			return;
		}
		var content = found[1];
		var sources = content.match( new RegExp('"(.*?)"', 'g') );
		if( ! sources || ! sources.length ) {
			return;
		}
		sources.forEach(function(src) {
			src = src.replace(/"/g, '');
			var bowerInput = path.resolve(__dirname, src);
			var basename = path.basename(bowerInput);
			var distOutput = path.resolve(publicDir, 'dist');
			gulp.src(bowerInput).pipe(gulp.dest(distOutput));
			fileContent = fileContent.replace(new RegExp(src, 'g'), '/dist/' + basename);
		});
		fileContent = fileContent
			.replace(/^\s+<!-- (.*?) -->\n/gm, '');
		writeFile(output, fileContent);
	});
}

// task
gulp.task('views', function() {
	del([
		'public/index.html',
	]).then(function(paths) {
		gulp.src(input)
			.pipe(gulp.dest(publicDir));

		return gulp.src('public/index.html')
			.pipe(gulpif(
				!argv.production,
				getFile()
			));
	});
});
