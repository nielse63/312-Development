
(function(_c, factory) {
	'use strict';

	if( ! _c ) {
		throw new Error('The Form module requires the Utility');
	}

	factory(_c);
})(window.Clique, function(_c) {
	'use strict';

	// constructor
	var Form = function(ele) {

		this.element = _c.$(ele);

		this.init();
		return this;
	};

	// private
	Form.prototype = {

		init : function() {
			this._defineProperties();
			this._defineElements();
			this._defineListeners();

			// append form classes
			this._setupForm();

			// setup form validation
			this._setupValidation();
		},

		_defineProperties : function() {
			this.namespace         = '.clique.form.' + _c.utils.uid();
			this.class             = 'form';
			this.listClass         = 'form-list';
			this.validationTrigger = '';
		},

		_defineElements : function() {
			this.$list        = this.element.find('> ul, > * > ul').first();
			this.$inputs      = this.element.find('input:not([submit]), select, textarea');
			this.$required    = this.element.find('[required]');
		},

		_defineListeners : function() {
			// ...
		},

		_setupForm: function() {
			this._setClass();
			this._setNames();
		},

		_setClass : function() {
			this.element.addClass( this.class );

			if( this.$list.length ) {
				this.$list.addClass( this.listClass );
			}
		},

		_setNames : function() {
			this.$inputs.not('[name]').each(function(i) {
				_c.$(this).attr('name', 'form-input-' + i);
			});
		},

		_setupValidation: function() {
			this._setRequiredClass();
			this._initValidation();
		},

		_setRequiredClass: function() {
			this.$required.not('.required').each(function(){
				_c.$(this).addClass('required');
			});
		},

		_initValidation: function() {
			// var lastTriggered;

			var didSubmit = false;
			var validator = this.element.validate({
				focusInvalid : false,
				onkeyup      : false,
				onfocusout: function(input, e) {
					if( didSubmit ) {
						var isValid = validator.element(input);
						if( _c.$(input).data('formerror') && isValid ) {
							return true;
						} else {
							return false;
						}
					}
					return false;
				},
				onsubmit: function() {
					return true;
				},
				showErrors: function(_this) {
					return function(errorMap, errorList) {
						didSubmit = true;
						// console.log(this);

						// show default errors
						this.defaultShowErrors();

						// trigger form event
						if( errorList.length ) {
							_this.element.trigger('invalid', errorList);
						}

						// loop over errors
						var $target;
						for( var i = 0; i < errorList.length; i++ ) {
							var object = errorList[i],
								$input = _c.$(object.element);

							if( i === 0 ) {
								$target = $input;
							}

							// set li classes
							$input.closest('li')
								.removeClass('form-valid')
								.addClass('form-error');

							// trigger input event
							$input
								.data('formerror', true)
								.trigger('invalid');
						}

						// scroll to first invalid element
						if( $target && $target.length ) {
							var screenTop = window.pageYOffset,
								top = $target.offset().top;

							// scroll of input is out of view
							if( top < window.pageYOffset || top > screenTop + window.innerHeight) {
								var distance  = distance < 400 ? 400 : distance;
								_c.$.scrollTo($target, {
									offset   : -50,
									duration : distance,
								}, function() {
									$target.focus();
								});
							}
						}
					};
				}(this),
				success: function(label, input) {

					var $li    = _c.$(input).closest('li'),
						$input = _c.$(input);

					// trigger input event
					if( $input.hasClass('error') ) {
						$input
							.removeData('formerror')
							.trigger('valid');

						// remove error class from li
						$li.removeClass('form-error');
					}

					$li.addClass('form-valid');
				},
			});
		},
	};

	// initialize immediately
	_c.$('form').each(function() {
		var ele = _c.$(this),
			data = ele.data('clique.data.form');
		if( ! data ) {
			ele.data('clique.data.form', new Form(ele));
		}
	});
});
