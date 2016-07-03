
import ScrollMagic from 'scrollmagic'

export default class Homepage {

	constructor() {

		if( ! _c.$('.main.home').length ) {
			return;
		}

		this.setScene()

		return this
	}

	setScene() {
		const trigger = document.querySelector('.article-title');
		const container = $(trigger).closest('.wrap')[0];

		this.scene = new ScrollMagic.Scene({
			triggerElement : trigger
		})
		.setClassToggle(container, 'loaded')
		.on('start', function() {
			this.remove();
		})
		.addTo(_c.controller);
	}
}
