
// modules
var argv         = require('minimist')(process.argv.slice(2));
var gulp         = require('gulp');
var wiredep      = require('wiredep').stream;
var rename       = require('gulp-rename');
var gulpif       = require('gulp-if');
var del          = require('del');
var fs           = require('fs');
var path         = require('path');
var writeFile    = require('./utils').writeFile;
var gutil        = require('gulp-util');

// global vars
var publicDir = path.resolve(__dirname, '../public/');
var input    = path.resolve(__dirname, '../views/' + (!argv.production ? 'index.dev.html' : 'index.prod.html'));
var output = path.resolve(publicDir, 'index.html');
var attempts = 0;

function setAssets() {
	fs.readFile(output, function(err, data) {
		if (err) {
			if( attempts < 5 ) {
				attempts++;
				setTimeout(setAssets, 500);
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
		var found = string.match( new RegExp('<!--assets-->(.*?)<!--endassets-->') );
		if( ! found || ! found.length || ! found[1] ) {
			return;
		}
		var content = found[1];
		var sources = content.match( new RegExp('"(.*?)"', 'g') );
		if( ! sources || ! sources.length ) {
			return;
		}

		// read assets file
		fs.readFile(path.resolve(__dirname, '../public/assets.json'), function(err, data) {
			if(err) {
				console.log(err);
				return;
			}
			var assets = JSON.parse(data);

			sources.forEach(function(src) {
				src = src.replace(/"/g, '');
				var srcArray = src.split('/');
				var filename = srcArray[srcArray.length - 1];
				var filenameArray = filename.split('.');
				var key = filenameArray[0];
				var fileType = filenameArray[filenameArray.length - 1];

				if( key in assets ) {
					var asset = assets[key];
					if( fileType in asset ) {
						var assetFile = asset[fileType];

						fileContent = fileContent.replace(new RegExp(src, 'g'), assetFile);
					}
				}
			});

			fileContent = fileContent
				.replace(/^\s+<!-- (.*?) -->\n/gm, '');
			writeFile(output, fileContent);

		});
	});
}

// task
gulp.task('views', function() {
	del([
		'public/index.dev.html',
	]).then(function(paths) {
		gulp.src(input)
			.pipe(wiredep())
			.pipe(rename('index.html'))
			.pipe(gulp.dest(publicDir));

		return gulp.src('public/index.html')
			.pipe(gulpif(
				!argv.production,
				setAssets()
			));
	});
});
