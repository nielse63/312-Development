
export default class URL {

	                    constructor() {
		// properties
		                    this.isSSL = window.location.protocol === 'https';
		                    this.base = window.location.protocol + '//' + window.location.host;
		                    this.current = window.location.href;
		                    this.currentBase = window.location.protocol + '//' + window.location.host + window.location.pathname;

		                    return this;
	}

	                    getHash(string) {
		                    string = string || this.current;

		                    if (string.indexOf('#') < 0) {
			                    return '';
		}

		                    var a = document.createElement('a');
		                    a.href = string;

		                    return a.hash;
	}
}
