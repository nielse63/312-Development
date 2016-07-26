
import Utils from './_utils';
import Support from './_support';
import Browser from './_browser';
import Events from './_events';
import ScrollMagic from 'scrollmagic';

export default class Clique {

	constructor() {

		// set object properties
		this.init();

		return this;
	}

	init() {

		// set initial object on window
		this.loaded = false;
		window._c = this;

		// cache jQuery
		this.$ = $ || window.$ || window.jQuery;

		// cache dom objects
		this.$win = this.$(window);
		this.$doc = this.$(document);
		this.$html = this.$('html');
		this.$body = this.$('body');

		// global vars
		this.showLoading = true;

		// global modules
		this.controller = new ScrollMagic.Controller();

		// set up the global object
		window._c = this;

		// properties from custom classes
		this.support = new Support();
		this.browser = new Browser();
		this.utils   = new Utils();
		this.events  = new Events();

		// set up the global object, again
		window._c = this;

		if( document.readyState !== 'complete' ) {
			window.addEventListener('load', this.onLoad.bind(this));
		} else {
			this.onLoad();
		}
	}

	onLoad() {
		this.loaded = true;
	}
}
