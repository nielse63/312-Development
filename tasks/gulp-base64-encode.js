
var es    = require('event-stream');
var path  = require('path');
var fs    = require('fs');
var gutil = require('gulp-util');
var mime  = require('mime');

module.exports = function(opts) {

	opts = opts || {};

	if ( ! opts.baseDir ) opts.baseDir = path.dirname(module.parent.filename);
	var datauri = function(file, callback) {
		var reg_exp = /data-uri\([|\ |\'|\"](.*?)[|\ |\'|\"](|\,(.*?))\)/g;
		var isBuffer = file.contents instanceof Buffer;
		var app_path = path.dirname( file.path );
		if (isBuffer) {
			var str = String(file.contents);

			var matches = [],
				found,
				force;
			while (found = reg_exp.exec(str)) {
				matches.push({
					'txt': found[0],
					'url': found[1].trim(),
					'force': found[2].replace(/(\,|\ )/g, '') == 'true' ? true : false
				});
			}

			for (var i = 0, len = matches.length; i < len; i++) {

				// guards
				if (matches[i].url.indexOf('data:image') === 0) {
					continue;
				}

				// vars
				var match = matches[i];
				var filepath = path.normalize(path.join(app_path, match.url));

				// convert
				if (fs.existsSync(filepath)) {
					var size = fs.statSync(filepath).size;

					// File will not be included because of its size
					if (opts.maxSize && size > opts.maxSize && !match.force) {
						if (opts.debug) gutil.log('gulp-inline-base64:', gutil.colors.yellow('file is greater than ' + Math.round(size / 1024) + 'kb > ' + Math.round(opts.maxSize / 1024) + 'kb => skip') + gutil.colors.gray(' (' + filepath + ')'));
						str = str.replace(match.txt, 'url(' + match.url + ')');
					}

					// Else replace by inline base64 version
					else {
						var b = fs.readFileSync(filepath);
						str = str.replace(match.txt, 'url(' + ('data:' + mime.lookup(filepath) + ';base64,' + b.toString('base64')) + ')');
						if (opts.debug) gutil.log('gulp-inline-base64:', gutil.colors.green('converted:') + gutil.colors.gray(' (' + filepath + ')'));
					}
				} else if(match.url.indexOf('<svg') === 0) {
					var b = new Buffer(match.url);
					str = str.replace(match.txt, 'url(' + 'data:image/svg+xml;base64,' + b.toString('base64') + ')');
					if (opts.debug) gutil.log('gulp-inline-base64:', gutil.colors.green('converted:') + gutil.colors.gray(' (' + filepath + ')'));
				} else {
					if (opts.debug) gutil.log('gulp-inline-base64:', gutil.colors.red('file not found => skip') + gutil.colors.gray(' (' + filepath + ')'));
				}
			}
			file.contents = new Buffer(str);
			return callback(null, file);
		}
		callback(null, file);
	};
	return es.map(datauri);
};
