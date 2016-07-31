
import ScrollMagic from 'scrollmagic';

export default class Homepage {

	constructor() {
		this.$title = _c.$('.article-title');
		if ( ! this.$title.length ) {
			return;
		}

		this.setScene();
	}

	setScene() {
		// const $container = this.$title.closest('.main');
		const container = document.querySelector('.main');

		this.scene = new ScrollMagic.Scene({
			triggerElement : this.$title[0],
			triggerHook    : 'onEnter',
		})
		.setClassToggle(container, 'loaded')
		.on('start', function() {
			this.remove();
		})
		.addTo(_c.controller);
	}
}
