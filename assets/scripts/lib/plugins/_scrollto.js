
export default class ScrollTo {

	constructor() {
		if (! window.$) {
			window.$ = window.jQuery;
		}

		this.setEasing();
		$.scrollTo = this.setPlugin;

		return this;
	}

	setEasing() {
		// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)
		var baseEasings = {};

		$.each(['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'], function(i, name) {
			baseEasings[name] = function(p) {
				return Math.pow(p, i + 2);
			};
		});

		$.extend(baseEasings, {
			Sine(p) {
				return 1 - Math.cos(p * Math.PI / 2);
			},
			Circ(p) {
				return 1 - Math.sqrt(1 - p * p);
			},
			Elastic(p) {
				return p === 0 || p === 1 ? p :
				-Math.pow(2, 8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);
			},
			Back(p) {
				return p * p * (3 * p - 2);
			},
			Bounce(p) {
				var pow2,
					bounce = 4;

				while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
				return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
			},
		});

		$.each(baseEasings, function(name, easeIn) {
			$.easing['easeIn' + name] = easeIn;
			$.easing['easeOut' + name] = function(p) {
				return 1 - easeIn(1 - p);
			};
			$.easing['easeInOut' + name] = function(p) {
				return p < 0.5 ?
				easeIn(p * 2) / 2 :
				1 - easeIn(p * -2 + 2) / 2;
			};
		});
	}

	setPlugin(position, options, callback) {
		var positionType = typeof position;
		if (positionType === 'undefined') {
			return;
		}

		// validate options
		if (typeof options == 'function') {
			options = { callback : options };
		} else if (options === undefined) {
			options = {};
		}

		// validate callback
		callback = callback || function() {};

		// merge options with default
		options = $.extend(true, {
			offset   : 0,
			easing   : 'easeInOutCubic',
			complete : callback,
		}, options);

		// set position
		var start = window.pageYOffset,
			to = start;
		if (positionType === 'number') {
			to = position;
		} else if ($(position).length) {
			to = $(position).offset().top;
		} else if (positionType === 'string') {
			if (! isNaN(parseFloat(position))) {
				to = start + parseFloat(position);
			} else {
				to = start;
			}
		}

		if (to === start) {
			return;
		}

		// normalize the 'to' value
		to += options.offset;
		to = Math.min(to, $('body').outerHeight() - window.innerHeight);
		delete options.offset;

		// animate
		$('body').stop(true).animate({
			scrollTop : to,
		}, options);

		// bind scroll listener to kill animation
		setTimeout(function() {
			$(window).one('mousewheel', function() {
				$('body').stop(true);
			});
		}, 0);
	}
}
