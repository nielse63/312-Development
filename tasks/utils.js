
// modules
var fs     = require('fs');
var path   = require('path');
var mkdirp = require('mkdirp');

exports.writeFile = function(_path, contents, cb) {
	cb = cb || function(err) {
		if(err) console.log(err);
	};
	mkdirp(path.dirname(_path), function (err) {
		if (err) return cb(err);
		fs.writeFile(_path, contents, cb);
	});
};
