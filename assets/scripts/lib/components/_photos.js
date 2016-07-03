
import ScrollMagic from 'scrollmagic'

export default class Photos {

	constructor() {

		// get all elements
		this.$figures = $('.where-figure');
		if( ! this.$figures.length ) {
			return;
		}

		this.$container = $('.where-i-work');

		this.setDelay()
		this.setScene()

		return this
	}

	setDelay() {
		this.$figures.each(function(i) {
			let delay = i * 0.15;
			$(this).css({
				'transition-delay' : delay + 's'
			});
		});
	}

	showScene() {
		this.$container.addClass('active')
	}

	setScene() {
		const trigger = this.$container[0];
		const duration = trigger.clientHeight
		const _this = this
		let inview = false
		let timeout

		this.scene = new ScrollMagic.Scene({
			triggerElement : trigger,
			duration       : duration,
		})
		.on('enter', function() {
			inview = true

			if(timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			timeout = setTimeout(function() {
				clearTimeout(timeout)
				timeout = null
				if(inview) {
					_this.scene.remove()
					_this.showScene()
				}
			}, 250);
		})
		.on('leave', function() {
			inview = false

			clearTimeout(timeout)
			timeout = null
		})
		.addTo(_c.controller);
	}
}
