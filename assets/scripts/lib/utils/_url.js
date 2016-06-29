
(function(_c, factory) {
	'use strict';

	if( ! _c ) {
		throw new Error('The URL module requires the Utility module');
	}

	factory(_c);

})(window.Clique, function(_c) {
	'use strict';

	// url object
	_c.url = {

		// properties
		isSSL: window.location.protocol === 'https',
		base: window.location.protocol + '//' + window.location.host,
		current: window.location.href,
		currentBase: window.location.protocol + '//' + window.location.host + window.location.pathname,

		// methods
		getHash: function(string) {
			string = string || this.current;

			if (string.indexOf('#') < 0) {
				return '';
			}

			var a = document.createElement('a');
			a.href = string;

			return a.hash;
		},
	};
});
