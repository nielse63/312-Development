
export default class Form {

	// constructor
	constructor() {
		if (! _c.$('form').length) {
			return;
		}
		this.init();
	}

	init() {

		this.checked = 0;
		if( ! _c.$.fn.validate ) {
			if( this.checked < 10 ) {
				this.checked++;
				return this.getScript();
			} else {
				console.warn('Couldn\'t load validation script');
				return;
			}
		}

		this.defineProperties();
		this.defineElements();
		this.defineListeners();

		// append form classes
		this.setupForm();

		// setup form validation
		this.setupValidation();
	}

	getScript() {
		const self = this;
		_c.$.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.1/jquery.validate.min.js')
			.done(function() {
				[_c.$, $, window.jQuery, window.$].forEach(function(obj) {
					if( 'validate' in obj.fn ) {
						_c.$ = obj;
						return false;
					}
				});
				setTimeout(self.init(), 250);
			})
			.fail(function(xhr) {
				console.warn(xhr.responseText);
			});
	}

	defineProperties() {
		this.namespace         = '.clique.form.' + _c.utils.uid();
		this.class             = 'form';
		this.listClass         = 'form-list';
		this.validationTrigger = '';
	}

	defineElements() {
		this.element = _c.$('form');
		this.$list = this.element.find('> ul, > * > ul').first();
		this.$inputs = this.element.find('input:not([type="submit"]), select, textarea');
		this.$required = this.element.find('[required]');
		this.$submit = this.element.find('input[type="submit"]');
	}

	defineListeners() {
		this.element.on('submit', function(e) {
			e.preventDefault();
			e.stopPropagation();

			// console.log(_c.$.fn.validate);
			// console.log(_c.$.fn.valid);
			const $form = _c.$(this);
			if ($form.valid()) {
				$form.off('submit');
				$form.trigger('submit');
			}
		});

		this.$inputs.on('focus', function() {
			_c.$(this).closest('.input-wrapper').addClass('focus');
		}).on('blur', function() {
			_c.$(this).closest('.input-wrapper').removeClass('focus');
		});
	}

	setupForm() {
		this.setClass();
		this.setNames();
	}

	setClass() {
		this.element.addClass(this.class);

		if (this.$list.length) {
			this.$list.addClass(this.listClass);
		}
	}

	setNames() {
		this.$inputs.each(function(i) {
			if (this.getAttribute('name')) {
				return;
			}
			_c.$(this).attr('name', 'input-' + i);
		});
	}

	setupValidation() {
		this.setRequiredClass();
		this.initValidation();
	}

	setRequiredClass() {
		this.$required.not('.required').addClass('required');
	}

	initValidation() {
		const self = this;
		const validator = this.element.validate({
			focusInvalid : false,
			onkeyup      : false,
			onfocusout(input) {
				const isValid = validator.element(input);
				const $input = _c.$(input);

				if (! input.hasAttribute('required')) {
					const $li = $input.closest('li');

					// alter class
					if (isValid) {
						$li.removeClass('form-error');

						if (! $input.val()) {
							$li.removeClass('form-valid');
						} else {
							$li.addClass('form-valid');
						}
					}
				}

				if ($input.data('formerror') && isValid) {
					return true;
				}
				return false;
			},
			onsubmit   : false,
			showErrors : function(errorMap, errorList) {

				// show default errors
				// console.log(arguments);
				this.defaultShowErrors();

				// trigger form event
				if (errorList.length) {
					self.element.trigger('invalid', errorList);
				}

				// loop over errors
				let $target;
				for (let i = 0; i < errorList.length; i++) {
					// let object = errorList[i];
					const $input = _c.$(errorList[i].element);

					if (i === 0) {
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
				if ($target && $target.length) {
					const screenTop = window.pageYOffset;
					const top = $target.offset().top;

					// scroll of input is out of view
					if (top < screenTop || top > screenTop + window.innerHeight) {
						const d = top - screenTop;
						const duration = d < 400 ? 400 : d;
						_c.$body.stop().animate({
							scrollTop : top - 50,
						}, duration, function() {
							$target.focus();
						});
					}
				}
			},
			success(label, input) {
				const $li = _c.$(input).closest('li');
				const $input = _c.$(input);

				// trigger input event
				if ($input.hasClass('error')) {
					$input
						.removeData('formerror')
						.trigger('valid');

					// remove error class from li
					$li.removeClass('form-error');
				}

				$li.addClass('form-valid');
			},
		});
	}
}
