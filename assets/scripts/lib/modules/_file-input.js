
(function(_c, factory) {
	'use strict';

	if( ! _c ) {
		throw new Error('The FileInput module requires the Utility');
	}

	factory(_c);
})(window.Clique, function(_c) {
	'use strict';

	// constructor
	var FileInput = function(ele) {

		this.element = _c.$(ele);

		this.init();
		return this;
	};

	// private
	FileInput.prototype = {

		init : function() {
			this._defineElements();
			this._defineProperties();
			this._defineListeners();
		},

		_defineElements: function() {
			this.$form = this.element.closest('form');
		},

		_defineProperties : function() {
			this.namespace = '.clique.fileinput.' + _c.utils.uid();
			this.action    = this.$form.attr('action') || _c.url.current;
			this.method    = this.$form.attr('method') || 'POST';
		},

		_defineListeners : function() {
			this.element.off(this.namespace);

			// bind file upload input listeners
			this.element.on('change' + this.namespace, this._change.bind(this));
		},

		_change : function(e) {
			var input    = e.target,
				files    = input.files;

			// dispatch event with file information
			this._selected(files);
		},

		_selected : function(filelist) {
			if( filelist.length === 1 ) {
				filelist = filelist.item(0);
			}

			// trigger event
			this.element.trigger('selected', filelist);
		},
	};

	// initialize immediately
	_c.$('input[type="file"]').each(function() {
		var ele = _c.$(this),
			data = ele.data('clique.data.fileinput');
		if( ! data ) {
			ele.data('clique.data.fileinput', new FileInput(ele));
		}
	});
});
