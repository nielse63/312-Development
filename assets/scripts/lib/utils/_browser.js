
export default class Browser {

	constructor() {
		// properties
		this.userAgent = ( window.navigator.userAgent || window.navigator.vendor || window.opera ).toLowerCase();

		// init
		this.init();
		return this;
	}

	// init
	init() {
		this.defineProperties();
		this.setHTMLClasses();
	}

	// private functions
	test( rgx ) {
		return rgx.test( this.userAgent );
	}

	uamatches( key ) {
		return this.userAgent.indexOf( key ) > -1;
	}

	version( versionType, versionFull ) {
		const type = versionType;
		let array = versionFull.split( '.' );

		type.version = versionFull;

		if ( array.length > 0 ) {
			array = array.reverse();
			type.major = array.pop();
			if ( array.length > 0 ) {
				type.minor = array.pop();
				if ( array.length > 0 ) {
					array = array.reverse();
					type.patch = array.join( '.' );
				} else {
					type.patch = '0';
				}
			} else {
				type.minor = '0';
			}
		} else {
			type.major = '0';
		}
	}

	defineProperties() {
		this.browser = this.detectBrowser();
	}

	setHTMLClasses() {
		let classes = [];

		classes.push( this.browser.name );
		classes.push( _c.support.hasTouch ? 'touch' : 'no-touch' );
		_c.$html.addClass( classes.join( ' ' ) );
	}

	detectBrowser() {
		let browser = {};

		if ( !this.test( /opera|webtv/ ) && ( this.test( /msie\s([\d\w\.]+)/ ) || this.uamatches( 'trident' ) ) ) {
			browser.engine = 'trident';
			browser.name = 'ie';
			if ( !window.addEventListener && document.documentMode && document.documentMode === 7 ) {
				this.version( browser, '8.compat' );
			} else if ( this.test( /trident.*rv[ :](\d+)\./ ) ) {
				this.version( browser, RegExp.$1 );
			} else {
				this.version( browser, this.test( /trident\/4\.0/ ) ? '8' : RegExp.$1 );
			}
		} else if ( this.uamatches( 'edge' ) ) {
			browser.engine = 'gecko';
			browser.name = 'edge';
			this.version( browser, this.test( /edge\/([\d\w\.]+)/ ) ? RegExp.$1 : '' );
		} else if ( this.uamatches( 'firefox' ) ) {
			browser.engine = 'gecko';
			browser.name = 'firefox';
			this.version( browser, this.test( /firefox\/([\d\w\.]+)/ ) ? RegExp.$1 : '' );
		} else if ( this.uamatches( 'gecko/' ) ) {
			browser.engine = 'gecko';
		} else if ( this.uamatches( 'opera' ) || this.uamatches( 'opr' ) ) {
			browser.name = 'opera';
			browser.engine = 'presto';
			this.version( browser, this.test( /version\/([\d\.]+)/ ) ? RegExp.$1 : this.test( /opera(\s|\/)([\d\.]+)/ ) ? RegExp.$2 : '' );
		} else if ( this.uamatches( 'konqueror' ) ) {
			browser.name = 'konqueror';
		} else if ( this.uamatches( 'chrome' ) ) {
			browser.engine = 'webkit';
			browser.name = 'chrome';
			this.version( browser, this.test( /chrome\/([\d\.]+)/ ) ? RegExp.$1 : '' );
		} else if ( this.uamatches( 'iron' ) ) {
			browser.engine = 'webkit';
			browser.name = 'iron';
		} else if ( this.uamatches( 'crios' ) ) {
			browser.name = 'chrome';
			browser.engine = 'webkit';
			this.version( browser, this.test( /crios\/([\d\.]+)/ ) ? RegExp.$1 : '' );
		} else if ( this.uamatches( 'applewebkit/' ) ) {
			browser.name = 'safari';
			browser.engine = 'webkit';
			this.version( browser, this.test( /version\/([\d\.]+)/ ) ? RegExp.$1 : '' );
		} else {
			if ( this.uamatches( 'mozilla/' ) ) {
				browser.engine = 'gecko';
			}
		}

		return browser;
	}
}
