
(function (_c, factory) {
	'use strict';

	if( ! _c ) {
		throw new Error('The Loader module requires the Utility module');
	}

	factory(_c);
})(window.Clique, function (_c) {
	'use strict';

	var Loading = function() {

		if( _c.showLoading === false ) {
			this.hide(true);
			return;
		}

		this.element = _c.$('.loader');

		// init
		this.init();

		return this;
	};

	Loading.prototype = {
		init : function() {
			this._defineListeners();

			// set timeout fallback
			this._setTimeout();
		},

		_defineListeners: function() {
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
		},

		_setTimeout: function() {
			this.timeout = setTimeout(this.hide.bind(this), 2000);
		},

		show: function() {
			this.element.removeClass('hidden');
			_c.$html.addClass('loaded');
		},

		hide : function(immediate) {
			immediate = immediate || false;
			_c.$html.addClass('loaded');

			if( immediate ) {
				this.element.addClass('hidden');
			} else {
				this.element.one(_c.support.transition.end, function() {
					_c.$(this).addClass('hidden');
				});
			}
		},
	};

	_c.$html.data('clique.data.loading', new Loading());
});
