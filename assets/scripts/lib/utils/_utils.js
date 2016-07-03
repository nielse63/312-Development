
export default class Utils {

	constructor() {
		this.now = Date.now || function() {
			return new Date().getTime();
		};

		return this;
	}

	uid(prefix) {
		return (prefix || 'id') + this.now() + 'RAND' + Math.ceil(Math.random() * 100000);
	}

	isUndefined(obj) {
		return obj === void 0;
	}

	isString(obj) {
		return Object.prototype.toString.call(obj) === '[object String]';
	}

	prefixFor(property) {
		var vendors = ['Webkit', 'Moz', 'O'],
			prop = property[0].toUpperCase() + property.slice(1),
			path = document.createElementNS('http://www.w3.org/2000/svg', 'a'),
			style = path.style,
			output = {
				js  : '',
				css : '',
			};

		if (prop.toLowerCase() in style) {
			return output;
		} else {
			for (var i = 0; i < vendors.length; i++) {
				if (vendors[i] + prop in style) {
					var vendor = vendors[i].toLowerCase();
					return {
						js  : vendor[0].toUpperCase() + vendor.splice(1),
						css : '-' + vendor + '-',
					};
				}
			}
		}
		return output;
	}

	convertSize(int) {
		if (int > 1024 * 1024) {
			return (Math.round(int * 100 / (1024 * 1024)) / 100).toString() + 'MB';
		} else {
			return (Math.round(int * 100 / 1024) / 100).toString() + 'KB';
		}
	}

	debounce(fn, wait, immediate) {
		var timeout;
		wait = wait || 0;
		return function() {
			var context = this,
				args = arguments,
				later = function() {
					timeout = null;
					if (! immediate) {
						fn.apply(context, args);
					}
				},
				callNow = immediate && ! timeout;
			if (timeout) {
				window.clearTimeout(timeout);
				timeout = null;
			}
			// console.log(wait);
			timeout = window.setTimeout(later, wait);

			if (callNow) {
				fn.apply(context, args);
			}
		};
	}

	makeSlug(string) {
		string = string || window.location.href;

		var a = document.createElement('a');
		a.href = string;

		var path = a.pathname;

		// remove leading slash
		if (path[0] === '/') {
			path = path.substr(1);
		}

		return path.replace(/\/|_/g, '-')
			.toLowerCase()
			.split('.')[0];
	}

	openWindow(url, width, height) {
		width = _c.utils.isUndefined(width) ? 600 : width;
		height = _c.utils.isUndefined(height) ? 600 : height;
		var left = _c.$win.width() / 2 - width / 2, top = _c.$win.height() / 2 - height / 2;
		return window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=' + height + ',width=' + width + ',left=' + left + ',top=' + top);
	}
	}
