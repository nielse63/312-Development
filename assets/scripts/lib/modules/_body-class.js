
(function(_c, factory) {
	'use strict';

	if( ! _c ) {
		throw new Error('The Body Class module requires the Utility module');
	}

	factory(_c);

})(window.Clique, function(_c) {
	'use strict';

	// constructor
	var BodyClass = function(ele) {

		this.element = _c.$(ele);

		this.init();

		return this;
	};

	BodyClass.exec = function() {
		var classes = BodyClass.classes || [];
		_c.$('body').each(function () {
			var ele  = _c.$(this);
			if( ele.attr('class') ) {
				classes = classes.concat(ele.attr('class').split(' '));
			}
			var obj = new BodyClass( ele );
			classes.push(obj.class);
			ele.data('bodyclass.clique.data', obj);
		});
		BodyClass.classes = classes;
	};

	BodyClass.removeClasses = function() {
		if( ! BodyClass.classes || ! BodyClass.classes.length ) {
			return;
		}
		// console.log(BodyClass.classes);
		for(var i = 0; i < BodyClass.classes.length; i++) {
			_c.$body.removeClass(BodyClass.classes[i]);
		}
		BodyClass.classes = [];
	};

	// public methods
	BodyClass.prototype = {

		init: function() {
			this.defineProperties();
			this.setClass();
		},

		defineProperties: function() {
			this.duration  = 400;
			this.namespace = '.clique.bodyclass.' + _c.utils.uid();
			this.slug      = _c.utils.makeSlug();
			this.class     = 'page-' + (this.slug ? this.slug : 'home');
		},

		setClass: function() {
			BodyClass.removeClasses();
			this.element.addClass(this.class);
		}
	};

	// initialize immediately
	BodyClass.exec();

	window.BodyClass = BodyClass;
});
