
(function(_c, factory) {
	'use strict';

	if( ! _c ) {
		throw new Error('The Checkbox module requires the Utility module');
	}

	factory(_c);

})(window.Clique, function(_c) {
	'use strict';

	// constructor
	var Checkbox = function(ele) {

		this.element = _c.$(ele);

		this.init();
		return this;
	};

	// private
	Checkbox.prototype = {

		init : function() {
			this.namespace = '.clique.checkbox.' + _c.utils.uid();

			this._defineProperties();
			this._defineElements();
			this._defineListeners();

			// append checkbox classes
			this._setClass();
		},

		_defineProperties : function() {
			this.checked  = this.element.is(':checked') || this.element.prop('checked');
			this.disabled = this.element.is(':disabled') || this.element.prop('disabled');
		},

		_defineElements : function() {
			this.element.wrap('<label class="checkbox" />');

			this.$wrapper = this.element.parent('.checkbox');
		},

		_defineListeners : function() {
			this.$wrapper.off(this.namespace);

			// bind file  input listeners
			this.$wrapper.on('click' + this.namespace, this._click.bind(this));
		},

		_setClass : function() {
			var classes = ['checkbox'];

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
			var evtName = this.checked ? 'checked' : 'unchecked';
			this.element.trigger(evtName);
		}
	};

	// initialize immediately
	_c.$('input[type="checkbox"]').each(function() {
		var ele = _c.$(this),
		data = ele.data('clique.data.checkbox');
		if( ! data ) {
			ele.data('clique.data.checkbox', new Checkbox(ele));
		}
	});
});
