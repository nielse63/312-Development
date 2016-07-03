
import ScrollMagic from 'scrollmagic';

export default class Services {

	constructor() {
		this.$services = $('.service');
		if (! this.$services.length) {
			return;
		}

		this.$container = $('.services');

		this.setDelay();
		this.setScene();

		return this;
	}

	setDelay() {
		this.$services.each(function() {
			const delay = Math.random();

			$(this).find('.service-figure, p').css({
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
