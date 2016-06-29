
(function(_c, factory) {
	'use strict';

	if( ! _c ) {
		throw new Error('The Radio module requires the Utility module');
	}

	factory(_c);

})(window.Clique, function(_c) {
	'use strict';

	// constructor
	var Radio = function(ele) {

		this.element = _c.$(ele);

		this.init();
		return this;
	};

	// private
	Radio.prototype = {

		init : function() {
			this.namespace = '.clique.radio.' + _c.utils.uid();

			this._defineProperties();
			this._defineElements();
			this._defineListeners();

			// append radio classes
			this._setClass();
		},

		_defineProperties : function() {
			this.checked  = this.element.is(':checked') || this.element.prop('checked');
			this.disabled = this.element.is(':disabled') || this.element.prop('disabled');
		},

		_defineElements : function() {
			this.element.wrap('<label class="radio" />');

			this.$wrapper = this.element.parent('.radio');
		},

		_defineListeners : function() {
			this.$wrapper.off(this.namespace);

			// bind file  input listeners
			this.$wrapper.on('click' + this.namespace, this._click.bind(this));
		},

		_setClass : function() {
			var classes = ['radio'];

			if( this.checked ) {
				classes.push('checked');
			}
			if( this.disabled ) {
				classes.push('disabled');
			}

			if( this.$wrapper.attr('class') === classes.join(' ') ) {
				return;
			}

			this.$wrapper.removeClass('checked disabled').addClass(classes.join(' '));
		},

		_click : function() {
			this._defineProperties();

			if( this.disabled ) {
				return;
			}

			// set wrapper classes
			this._setClass();

			// dispatch custom event
			this._dispatchEvent();
		},

		_dispatchEvent: function() {
			var evtName = this.checked ? 'chosen' : 'unchosen';
			this.element.trigger(evtName);
		}
	};

	// initialize immediately
	_c.$('input[type="radio"]').each(function() {
		var ele = _c.$(this),
			data = ele.data('clique.data.radio');
		if( ! data ) {
			ele.data('clique.data.radio', new Radio(ele));
		}
	});
});
