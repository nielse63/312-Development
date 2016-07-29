
import ScrollMagic from 'scrollmagic';

export default class Footer {

	constructor() {
		this.$footer = _c.$('.footer');
		this.$paths  = this.$footer.length && this.$footer.find('path');
		if (! this.$footer.length || ! this.$paths.length) {
			return;
		}

		this.setPaths();
		this.createScene();
	}

	setPaths() {
		const offsetTop = this.$footer.offset().top;
		const offsetBottom = offsetTop + this.$footer.outerHeight();

		this.$paths.each(function() {
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
				'stroke-dasharray'  : length,
				'stroke-dashoffset' : length,
			}).data({
				'length' : length,
			});
		});
	}

	createScene() {
		if (! this.$footer.length) {
			return;
		}
		const footer   = document.querySelector('.footer');
		// const $paths   = this.$paths;

		this.scene = new ScrollMagic.Scene({
			triggerElement : footer,
			triggerHook    : 'onEnter',
			offset         : footer.clientHeight / 2,
		})
		.on('start', function() {
			this.remove();
		})
		// .on('enter', function() {
		// 	$paths.css({
		// 		'stroke-dashoffset' : 0,
		// 	});
		// })
		// .on('leave', function() {
		// 	$paths.each(function() {
		// 		const $path  = $(this);
		// 		const length = $path.data('length');
		// 		$path.css({
		// 			'stroke-dashoffset' : length,
		// 		});
		// 	})
		// })
		.addTo(_c.controller);
	}
}
