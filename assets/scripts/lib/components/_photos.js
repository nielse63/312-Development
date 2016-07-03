
import ScrollMagic from 'scrollmagic';

export default class Photos {

	constructor() {
		this.$figures = $('.where-figure');
		if (! this.$figures.length) {
			return;
		}

		this.$container = $('.where-i-work');

		this.setDelay();
		this.setScene();

		return this;
	}

	setDelay() {
		this.$figures.each(function(i) {
			const delay = i * 0.15;
			$(this).css({
				'transition-delay' : delay + 's',
			});
		});
	}

	setScene() {
		const trigger = this.$container[0];

		this.scene = new ScrollMagic.Scene({
			triggerElement : trigger,
		})
		.setClassToggle(trigger, 'active')
		.on('start', function() {
			this.remove();
		})
		.addTo(_c.controller);
	}
}
