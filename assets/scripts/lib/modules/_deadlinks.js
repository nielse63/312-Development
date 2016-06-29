
(function (_c, factory) {
	'use strict';

	if( ! _c ) {
		throw new Error('The Form module requires the Utility module');
	}

	factory(_c);
})(window.Clique, function (_c) {
	'use strict';

	// constructor
	var DeadLinks = function(ele) {

		this.element = _c.$(ele);

		this.init();
		return this;
	};

	// public
	DeadLinks.duration = 400;

	// private
	DeadLinks.prototype = {

		init: function() {

			this._defineProperties();
			this._defineListeners();
		},

		_defineProperties: function() {
			this.namespace = '.clique.deadlinks.' + _c.utils.uid();
		},

		_defineListeners: function() {
			this.element.off(this.namespace);

			this.element.on('click' + this.namespace, this._click.bind(this));
		},

		_click: function(e) {
			e.preventDefault();
		}
	};

	// initialize immediately
	_c.$('a[href="#"]').each(function () {
		var ele = _c.$(this),
		    data = ele.data('deadlinks.clique.data');

		if (!data) {
			ele.data('deadlinks.clique.data', new DeadLinks(ele));
		}
	});
});
