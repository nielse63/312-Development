
export default class Loading {

	constructor() {

		this.$element = _c.$('.loader');
		_c.$body.removeClass('hidden');

		// guards
		if( _c.showLoading === false || ! this.$element.length ) {
			_c.$html.addClass('loaded');
			this.hide(true);
			return;
		}

		// init
		this.init();
	}

	init() {
		this.defineListeners();

		// set timeout fallback
		this.setTimeout();
	}

	onLoad() {
		if( this.timeout ) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
		setTimeout(this.hide.bind(this), 0);
	}

	defineListeners() {
		_c.$win.on('load', this.onLoad.bind(this));

		_c.$win.on('beforeunload', this.show.bind(this));
	}

	setTimeout() {
		this.timeout = setTimeout(this.hide.bind(this), 2000);
	}

	show() {
		// console.log('here');
		this.$element.removeClass('hidden');
		_c.$html.addClass('loaded');
	}

	hide(immediate) {
		if( immediate || false ) {
			this.$element.addClass('hidden');
		} else {
			this.$element.one(_c.support.transition.end, function() {
				_c.$(this).addClass('hidden');
			});
		}
	}
}
