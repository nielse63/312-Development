
import ScrollMagic from 'scrollmagic';

export default class Homepage {

	constructor() {
		if (! _c.$('.main.home').length) {
			return;
		}

		this.setScene();

		return this;
	}

	setScene() {
		const $trigger = _c.$('.article-title');
		const $container = $trigger.closest('.wrap');

		this.scene = new ScrollMagic.Scene({
			triggerElement : $trigger[0],
			triggerHook    : 'onEnter',
		})
		.setClassToggle($container[0], 'loaded')
		.on('start', function() {
			this.remove();
		})
		.addTo(_c.controller);
	}
}
