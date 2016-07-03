
import Utils from './_utils';
import Support from './_support';
import Browser from './_browser';
import Events from './_events';
import URL from './_url';
import ScrollMagic from 'scrollmagic';

export default class Clique {

	constructor() {
		// cache jquery & dom objects
		this.$ = $;
		this.$win = this.$(window);
		this.$doc = this.$(document);
		this.$html = this.$('html');
		this.$body = this.$('body');

		// global vars
		this.showLoading = true;

		// global modules
		this.controller = new ScrollMagic.Controller();

		// set on the global object
		window._c = this;

		// properties from custom classes
		this.support = new Support();
		this.browser = new Browser();
		this.utils = new Utils();
		this.events = new Events();

		return this;
	}
}
