
import ScrollMagic from 'scrollmagic';

export default class Footer {

	constructor() {
		this.$footer = _c.$('.footer');
		if (! this.$footer.length) {
			return;
		}

		this.setPaths();
		this.createScene();

		return this;
	}

	setPaths() {
		const offsetTop = this.$footer.offset().top;
		const offsetBottom = offsetTop + this.$footer.outerHeight();

		this.$footer.find('path').each(function() {
			const $path = $(this);

			// see if we even need to set object
			const rects = this.getBoundingClientRect();
			const top = rects.top;
			const bottom = top + rects.height;

			if (bottom < offsetTop || top > offsetBottom) {
				return;
			}

			const length = this.getTotalLength();
			$path.css({
				'stroke-dasharray': length,
				'stroke-dashoffset': length,
			});
		});
	}

	createScene() {
		if (! this.$footer.length) {
			return;
		}
		const footer = document.querySelector('.footer');

		this.scene = new ScrollMagic.Scene({
			triggerElement: footer,
			triggerHook: 'onEnter',
			offset: footer.clientHeight / 2,
		})
		.setClassToggle(footer, 'inview')
		.on('start', function() {
			this.remove();
		})
		.addTo(_c.controller);
	}
}
