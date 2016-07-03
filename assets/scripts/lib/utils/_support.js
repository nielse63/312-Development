
export default class Support {

	                    constructor() {
		// properties
		                    this.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
			                    setTimeout(callback, 1e3 / 60);
		};
		                    this.touch = 'ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/) || window.DocumentTouch && document instanceof window.DocumentTouch || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0 || false;
		                    this.mutationobserver = window.MutationObserver || window.WebKitMutationObserver || null;
		                    this.hasTouch = !! this.touch;

		                    this.transition = function () {
			                  const transitionEnd = function () {
				                    let element = document.body || document.documentElement,
					                    transEndEventNames = {
						                    WebkitTransition: 'webkitTransitionEnd',
						                    MozTransition: 'transitionend',
						                    OTransition: 'oTransitionEnd otransitionend',
						                    transition: 'transitionend',
					};

				                    for (const name in transEndEventNames) {
					                    if (element.style[name] !== undefined) {
						                    return transEndEventNames[name];
					}
				}
			}();
			                    return transitionEnd && {
				                    end: transitionEnd,
			};
		}();

		                    this.animation = function () {
			                  const animationEnd = function () {
				                    let element = document.body || document.documentElement,
					                    animEndEventNames = {
						                    animation: 'animationend',
						                    WebkitAnimation: 'webkitAnimationEnd',
						                    MozAnimation: 'animationend',
						                    OAnimation: 'oAnimationEnd oanimationend',
					};

				                    for (const name in animEndEventNames) {
					                    if (element.style[name] !== undefined) {
						                    return animEndEventNames[name];
					}
				}
			}();
			                    return animationEnd && {
				                    end: animationEnd,
			};
		}();

		                    return this;
	}
}
