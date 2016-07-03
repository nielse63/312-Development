
export default class URL {

	constructor() {
		// properties
		const protocol = window.location.protocol;
		const host = window.location.host;

		this.isSSL = protocol === 'https';
		this.base = `${protocol}//${host}`;
		this.current = window.location.href;
		this.currentBase = `${protocol}//'${host}${window.location.pathname}`;

		return this;
	}

	getHash( string = this.current ) {
		if ( string.indexOf( '#' ) < 0 ) {
			return '';
		}

		const a = document.createElement( 'a' );
		a.href = string;

		return a.hash;
	}
}
