
require('jquery-validation');

export default class Form {
	// constructor
	constructor() {
		this.element = _c.$('form');
		if (! this.element.length) {
			return;
		}

		this.init();
		return this;
	}

	init() {
		this.defineProperties();
		this.defineElements();
		this.defineListeners();

		// append form classes
		this.setupForm();

		// setup form validation
		this.setupValidation();
	}

	defineProperties() {
		this.namespace = '.clique.form.' + _c.utils.uid();
		this.class = 'form';
		this.listClass = 'form-list';
		this.validationTrigger = '';
	}

	defineElements() {
		this.$list = this.element.find('> ul, > * > ul').first();
		this.$inputs = this.element.find('input:not([type="submit"]), select, textarea');
		this.$required = this.element.find('[required]');
		this.$submit = this.element.find('input[type="submit"]');
	}

	defineListeners() {
		this.element.on('submit', function(e) {
			e.preventDefault();
			e.stopPropagation();

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
		}).on('keyup blur', function() {
			let isValid = true;
			this.$inputs.each(function() {
				if (this.getAttribute('aria-invalid') === 'true' || this.getAttribute('aria-invalid') === null) {
					isValid = false;
					return false;
				}
			});
			if (isValid) {
				this.$submit.removeClass('disabled');
			} else {
				this.$submit.addClass('disabled');
			}
		}.bind(this));
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
		// var lastTriggered;

		// let didSubmit = false;
		const validator = this.element.validate({
			focusInvalid : false,
			onkeyup      : false,
			onfocusout(input, e) {
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
				} else {
					return false;
				}
			},
			onsubmit   : false,
			showErrors : function(_this) {
				return function(errorMap, errorList) {
					// didSubmit = true;
					// console.log(this);

					// show default errors
					this.defaultShowErrors();

					// trigger form event
					if (errorList.length) {
						_this.element.trigger('invalid', errorList);
					}

					// loop over errors
					let $target;
					for (let i = 0; i < errorList.length; i++) {
						let object = errorList[i],
							$input = _c.$(object.element);

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
						let screenTop = window.pageYOffset,
							top = $target.offset().top;

						// scroll of input is out of view
						if (top < window.pageYOffset || top > screenTop + window.innerHeight) {
							const distance = distance < 400 ? 400 : distance;
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
			success(label, input) {
				let $li = _c.$(input).closest('li'),
					$input = _c.$(input);

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
