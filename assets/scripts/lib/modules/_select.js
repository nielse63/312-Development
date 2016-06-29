
(function(_c, factory) {
	'use strict';

	if( _c.support.hasTouch ) {
		return;
	}

	if( ! _c ) {
		throw new Error('The Select module requires the Utility');
	}
	factory(_c);
})(window.Clique, function(_c) {
	'use strict';

	// constructor
	var Select = function(ele) {

		this.element = _c.$(ele);

		this.init();
		return this;
	};

	// private
	Select.prototype = {

		init : function() {
			this._initSelects();
		},

		_initSelects : function() {
			this.element.select2();
		},
	};

	// initialize immediately
	_c.$('select').each(function() {
		var ele = _c.$(this),
			data = ele.data('clique.data.select');
		if( ! data ) {
			ele.data('clique.data.select', new Select(ele));
		}
	});
});
