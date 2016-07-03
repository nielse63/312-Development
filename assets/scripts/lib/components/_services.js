
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
		                    this.$services.each(function () {
			                  const delay = Math.random();

			                    $(this).find('.service-figure, p').css({
				                    'transition-delay': delay + 's',
			});
		});
	}

	                    setScene() {
		                    const trigger = this.$container[0];

		                    this.scene = new ScrollMagic.Scene({
			                    triggerElement: trigger,
		})
		.setClassToggle(trigger, 'active')
		.on('start', function () {
			                    this.remove();
		})
		.addTo(_c.controller);
	}

	// showScene() {
	// 	this.$container.addClass('active')
	// }

	// setScene() {
	// 	const trigger = this.$container[0];
	// 	const duration = trigger.clientHeight
	// 	const _this = this
	// 	let inview = false
	// 	let timeout

	// 	this.scene = new ScrollMagic.Scene({
	// 		triggerElement : trigger,
	// 		duration       : duration,
	// 	})
	// 	.on('enter', function() {
	// 		inview = true

	// 		if(timeout) {
	// 			clearTimeout(timeout)
	// 			timeout = null
	// 		}
	// 		timeout = setTimeout(function() {
	// 			clearTimeout(timeout)
	// 			timeout = null
	// 			if(inview) {
	// 				_this.scene.remove()
	// 				_this.showScene()
	// 			}
	// 		}, 250);
	// 	})
	// 	.on('leave', function() {
	// 		inview = false

	// 		clearTimeout(timeout)
	// 		timeout = null
	// 	})
	// 	.addTo(_c.controller);
	// }
}
