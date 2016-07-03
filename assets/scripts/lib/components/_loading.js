
import TweenMax from 'gsap'
import DrawSVGPlugin from '../vendor/DrawSVGPlugin'

export default class Loading {
	constructor() {

		var container = document.getElementById('container');
		var loader = document.getElementById('loader');
		var circleL = document.getElementById('circleL');
		var circleR = document.getElementById('circleR');
		var jump = document.getElementById('jump');
		var jumpRef = jump.cloneNode();

		loader.appendChild(jumpRef);

		// TweenMax.set([container, loader], {
		// 	position: 'absolute',
		// 	top:'50%',
		// 	left: '50%',
		// 	xPercent: -50,
		// 	yPercent: -50
		// })

		TweenMax.set(jumpRef, {
			transformOrigin: '50% 110%',
			scaleY: -1,
			alpha: 0.05
		})

		var tl = new TimelineMax({
			repeat: -1,
			yoyo: false
		});

		tl.timeScale(3);

		tl.set([jump, jumpRef], {
			drawSVG: '0% 0%'
		})
		.set([circleL, circleR], {
			attr: {
				rx: 0,
				ry: 0,
			}
		})
		.to([jump, jumpRef], 0.4, {
			drawSVG: '0% 30%',
			ease: Linear.easeNone
		})
		.to(circleL, 2, {
			attr: {
				rx: '+=30',
				ry: '+=10'
			},
			alpha: 0,
			ease: Power1.easeOut
		}, '-=0.1')
		.to([jump, jumpRef], 1, {
			drawSVG: '50% 80%',
			ease: Linear.easeNone
		}, '-=1.9')
		.to([jump, jumpRef], 0.7, {
			drawSVG: '100% 100%',
			ease: Linear.easeNone
		}, '-=0.9')
		.to(circleR, 2, {
			attr: {
				rx: '+=30',
				ry: '+=10'
			},
			alpha: 0,
			ease: Power1.easeOut
		}, '-=.5')

		return this
	}
}
