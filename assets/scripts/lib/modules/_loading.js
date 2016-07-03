
export default class Loading {

	constructor() {

		this.$element = _c.$('.loader');
		_c.$body.removeClass('hidden');

		// guards
		if( _c.showLoading === false || ! this.$element.length ) {
			// console.log(this.$element);
			_c.$html.addClass('loaded');
			this.hide(true);
			return;
		}

		// init
		this.init();

		return this;
	}

	init() {
		this.defineListeners();

		// set timeout fallback
		this.setTimeout();
	}

	defineListeners() {
		_c.$win.on('load', function(_this) {
			return function() {
				if( _this.timeout ) {
					clearTimeout(_this.timeout);
					_this.timeout = false;
				}
				setTimeout(_this.hide.bind(_this), 0);
			};
		}(this));

		_c.$win.on('beforeunload', this.show.bind(this));
	}

	setTimeout() {
		this.timeout = setTimeout(this.hide.bind(this), 2000);
	}

	show() {
		console.log('here');
		this.$element.removeClass('hidden');
		_c.$html.addClass('loaded');
		// _c.$body.removeClass('hidden');
	}

	hide(immediate) {
		immediate = immediate || false;

		if( immediate ) {
			this.$element.addClass('hidden');
		} else {
			this.$element.one(_c.support.transition.end, function() {
				_c.$(this).addClass('hidden');
			});
		}
	}

	// _c.$html.data('clique.data.loading', new Loading());
}
