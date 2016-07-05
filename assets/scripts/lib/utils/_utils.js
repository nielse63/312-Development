
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

	isArray(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}

	prefixFor(property) {
		const vendors = ['Webkit', 'Moz', 'O'];
		const prop = property[0].toUpperCase() + property.slice(1);
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'a');
		const style = path.style;
		const output = {
			js  : '',
			css : '',
		};

		if (prop.toLowerCase() in style) {
			return output;
		}
		for (let i = 0; i < vendors.length; i++) {
			const vendor = vendors[i].toLowerCase();
			if (vendor + prop in style) {
				return {
					js  : vendor[0].toUpperCase() + vendor.splice(1),
					css : '-' + vendor + '-',
				};
			}
		}
		return output;
	}

	convertSize(int) {
		if (int > 1024 * 1024) {
			return (Math.round(int * 100 / (1024 * 1024)) / 100).toString() + 'MB';
		}
		return (Math.round(int * 100 / 1024) / 100).toString() + 'KB';
	}

	debounce(fn, delay, immediate) {
		let timeout;
		let wait = delay || 0;
		return function(...args) {
			const context = this;
			const later = function() {
				timeout = null;
				if (! immediate) {
					fn.apply(context, args);
				}
			};
			const callNow = immediate && ! timeout;
			if (timeout) {
				window.clearTimeout(timeout);
				timeout = null;
			}
			timeout = window.setTimeout(later, wait);

			if (callNow) {
				fn.apply(context, args);
			}
		};
	}

	makeSlug(string) {
		const a = document.createElement('a');
		a.href = string || window.location.href;
		let path = a.pathname;

		// remove leading slash
		if (path[0] === '/') {
			path = path.substr(1);
		}

		return path.replace(/\/|_/g, '-')
	.toLowerCase()
	.split('.')[0];
	}

	openWindow(url, w, h) {
		const width = _c.utils.isUndefined(w) ? 600 : w;
		const height = _c.utils.isUndefined(h) ? 600 : h;
		const left = window.innerWidth / 2 - width / 2;
		const top = window.innerHeight / 2 - height / 2;
		return window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=' + height + ',width=' + width + ',left=' + left + ',top=' + top);
	}
}
