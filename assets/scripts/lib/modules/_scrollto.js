
(function (_c, factory) {
	'use strict';

	if( ! _c ) {
		throw new Error('The ScrollTo module requires the Utility module');
	}

	factory(_c);
})(window.Clique, function (_c) {
	'use strict';

	// constructor

	var ScrollTo = function(ele) {

		this.element = _c.$(ele);
		this.target = _c.url.getHash(this.element[0].href);
		if (!this.target) {
			return;
		}

		this.init();
		return this;
	};

	// private
	ScrollTo.prototype = {

		init: function() {
			this._defineElements();

			if (!this.$target.length) {
				return;
			}

			this._defineProperties();
			this._defineListeners();
		},

		_defineProperties: function() {
			this.duration  = ScrollTo.duration;
			this.namespace = '.clique.scrollto.' + _c.utils.uid();
			this.offset    = 50;
			this.top       = this.$target.offset().top - this.offset;
		},

		_defineElements: function() {
			this.$target = _c.$(this.target);
		},

		_defineListeners: function() {
			_c.$win.off(this.namespace);
			this.element.off(this.namespace);

			this.element.on('click' + this.namespace, this._click.bind(this));
			_c.$win.on('resizeend' + this.namespace, function (_this) {
				return function () {
					_this.top = _this.$target.offset().top;
				};
			}(this));
		},

		_click: function(e) {
			e.preventDefault();
			e.stopPropagation();

			// get the distance
			var distance = Math.abs( window.pageYOffset - this.top );
			distance = distance < 400 ? 400 : distance;

			_c.$.scrollTo(this.$target, {
				duration : distance,
			}, this._updateHistory.bind(this));
		},

		_updateHistory: function() {
			window.history.pushState(null, null, _c.url.currentBase + this.target);
		}
	};

	// initialize immediately
	_c.$('a[href*="#"]:not([href="#"])').each(function () {
		var ele = _c.$(this),
		    data = ele.data('scrollto.clique.data');

		if (!data) {
			ele.data('scrollto.clique.data', new ScrollTo(ele));
		}
	});
});
