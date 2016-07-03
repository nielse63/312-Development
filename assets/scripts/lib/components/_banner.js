
import ScrollMagic from 'scrollmagic';
import { TweenMax } from 'gsap';

export default class Banner {

	                    constructor() {
		                    this.$banner = _c.$('.banner');
		                    if (! this.$banner.length) {
			                    return;
		}

		                    this.$title = this.$banner.find('.banner-title');
		                    this.offset = this.$banner[0].offsetTop;

		// bind banner scroll listener
		                    if (_c.controller.scrollPos() <= this.offset) {
			                    this.bindTrigger();
		}

		// set loaded class
		                    this.$banner.addClass('loaded');

		                    return this;
	}

	                    bindTrigger() {
		                    this.$title.one(_c.support.transition.end, this.bindScroll.bind(this));
	}

	                    bindScroll(e) {
		                    const $title = this.$title;
		                    const offset = this.offset;
		                    const duration = $title.offset().top + $title.outerHeight() - offset;

		                    this.scene = new ScrollMagic.Scene({
			                  duration,
			                  offset,
		})
		.on('enter', function () {
			                    $title.addClass('no-trans');
			                    this.off('enter');
		})
		.on('progress', function (e) {
			                  const p = e.progress;
			                  const y = -50 * p;
			                  const o = 1 - p;

			                    TweenMax.to($title[0], 0.5, {
				                  y,
				                    opacity: o,
			});
		})
		.addTo(_c.controller);
	}
}
