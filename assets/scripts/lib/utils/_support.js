
export default class Support {

	constructor() {
		// properties
		this.requestAnimationFrame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(callback) {
				setTimeout(callback, 1e3 / 60);
			};
		this.touch = 'ontouchstart' in window ||
			window.DocumentTouch &&
			document instanceof window.DocumentTouch ||
			window.navigator.msPointerEnabled &&
			window.navigator.msMaxTouchPoints > 0 ||
			window.navigator.pointerEnabled &&
			window.navigator.maxTouchPoints > 0 ||
			false;
		this.mutationobserver = window.MutationObserver || window.WebKitMutationObserver || null;
		this.hasTouch = !! this.touch;

		this.transition = (function() {
			const transitionEnd = (function() {
				const element = document.createElement('div');
				const transEndEventNames = {
					WebkitTransition : 'webkitTransitionEnd',
					MozTransition    : 'transitionend',
					OTransition      : 'oTransitionEnd otransitionend',
					transition       : 'transitionend',
				};

				const keys = Object.keys(transEndEventNames)
				for( let i = 0; i < keys.length; i++ ) {
					const k = keys[i];
					if (element.style[k] !== undefined) {
						return transEndEventNames[k];
					}
				}
				return transEndEventNames.transition;
			}());
			return transitionEnd && {
				end : transitionEnd,
			};
		}());

		this.animation = (function() {
			const animationEnd = (function() {
				const element = document.body || document.documentElement;
				const animEndEventNames = {
					animation       : 'animationend',
					WebkitAnimation : 'webkitAnimationEnd',
					MozAnimation    : 'animationend',
					OAnimation      : 'oAnimationEnd oanimationend',
				};

				const keys = Object.keys(animEndEventNames)
				for( let i = 0; i < keys.length; i++ ) {
					const k = keys[i];
					if (element.style[k] !== undefined) {
						return animEndEventNames[k];
					}
				}
				return animEndEventNames.animation;
			}());
			return animationEnd && {
				end : animationEnd,
			};
		}());

		return this;
	}
}
