
(function ($) {
	'use strict';

	var _c = window.Clique = {};

	// cache jquery & dom objects
	_c.$     = $;
	_c.$win  = _c.$(window);
	_c.$doc  = _c.$(document);
	_c.$html = _c.$('html');
	_c.$body = _c.$('body');

	// global vars
	_c.showLoading = true;

	// utility methods
	_c.utils = {

		now: Date.now || function () {
			return new Date().getTime();
		},

		uid: function(prefix) {
			return (prefix || 'id') + _c.utils.now() + 'RAND' + Math.ceil(Math.random() * 100000);
		},

		// isJQueryObject: function(obj) {
		// 	return obj instanceof jQuery;
		// },

		prefixFor : function(property) {
			var vendors  = ['Webkit', 'Moz', 'O'],
				prop     = property[0].toUpperCase() + property.slice(1),
				path     = document.createElementNS('http://www.w3.org/2000/svg', 'a'),
				style    = path.style,
				output   = {
					js : '',
					css: '',
				};

			if(prop.toLowerCase() in style) {
				return output;
			} else {
				for (var i = 0; i < vendors.length; i++) {
					if (vendors[i] + prop in style) {
						var vendor = vendors[i].toLowerCase();
						return {
							js : vendor[0].toUpperCase() + vendor.splice(1),
							css: '-' + vendor + '-',
						};
					}
				}
			}
			return output;
		},

		convertSize: function(int) {
			if (int > 1024 * 1024) {
				return (Math.round(int * 100 / (1024 * 1024)) / 100).toString() + 'MB';
			} else  {
				return (Math.round(int * 100 / 1024) / 100).toString() + 'KB';
			}
		},

		debounce : function(fn, wait, immediate) {
			var timeout;
			wait = wait || 0;
			return function() {
				var context = this,
					args = arguments,
					later = function() {
						timeout = null;
						if( ! immediate ) {
							fn.apply( context, args );
						}
					},
					callNow = immediate && ! timeout;
				if( timeout ) {
					window.clearTimeout( timeout );
					timeout = null;
				}
				// console.log(wait);
				timeout = window.setTimeout(later, wait);

				if( callNow ) {
					fn.apply(context, args);
				}
			};
		},

		makeSlug : function(string) {
			string = string ||  window.location.href;

			var a = document.createElement('a');
			a.href = string;

			var path = a.pathname;

			// remove leading slash
			if (path[0] === '/') {
				path = path.substr(1);
			}

			return path.replace(/\/|_/g, '-') // replace underscores & slashes with hyphens
				.toLowerCase()                // convert to lowercase
				.split('.')[0];               // remove extension
		},
	};

	window.Clique = _c;
})(window.jQuery);
