
import colorbrewer from '../utils/_colorbrew';
import tinycolor from 'tinycolor2';
import ScrollMagic from 'scrollmagic';
import SplitText from '../vendor/SplitText';

export default class WorkGrid {

	constructor() {
		this.$workBlocks = $('.work-block');
		// console.log(this.$workBlocks.length)
		if (! this.$workBlocks.length) {
			return;
		}

		this.section = document.querySelector('.work-section');
		this.scene = [];

		this.init();
	}

	init() {
		this.setPreviewText();
		this.colorizeWorkBlocks();
		this.blockHover();
		this.scrollWorkGrid();
	}

	setPreviewText() {
		this.$workBlocks.each(function() {
			const $preview = _c.$(this).find('.preview');
			const text = [];

			new SplitText($preview[0], {
				type : 'lines',
			}).lines.forEach(function(line, i) {
				if (! line.childNodes || ! line.childNodes.length) {
					return;
				}

				text.push(line.childNodes[0].nodeValue.trim());

				if (i > 2) {
					return false;
				}
			});

			$preview.html(text.join(' '));
		});
	}

	getRandomColor() {
		const keys = Object.keys(colorbrewer);
		const key = keys[Math.floor(Math.random() * keys.length)];
		const array = [];
		for (const i in colorbrewer[key]) {
			const v = colorbrewer[key][i];
			array.push(v);
		}
		return array.pop();
	}

	colorizeWorkBlocks() {
		let colors = this.getRandomColor();
		let idx = 0;
		this.$workBlocks.each(function() {
			const $ele = $(this);
			if ($ele.data('colorset')) {
				return;
			}

			$ele.data('colorset', true);
			let color;
			if (! colors[idx]) {
				colors = colors.reverse();
				idx = 0;
			}
			color = colors[idx];

			const tc = tinycolor(color);

			// create gradient
			const darker = tc.darken(35).toHexString();
			const gradient = 'linear-gradient(150deg, ' + darker + ', ' + color + ')';

			// get luma
			const rgb = tc.toRgb();
			const luma = (rgb.r * 0.3) + (rgb.g * 0.59) + (rgb.b * 0.11);
			if (luma > 215) {
				$ele.addClass('dark');
			}

			// set style
			$ele.css({
				'background-image' : gradient,
			});
			idx++;
		});
	}

	blockHover() {
		this.$workBlocks.each(function(i) {
			const $ele = $(this);

			$ele.off('mouseenter mouseleave');
			$ele.on('mouseenter', function() {
				$(this).find('.work-block-figure').addClass('hovering');
			}).on('mouseleave', function() {
				$(this).find('.work-block-figure').removeClass('hovering');
			});
		});
	}

	scrollWorkGrid() {
		const _this = this;

		this.$workBlocks.each(function(i) {
			const trigger = this;
			const $block = _c.$(this);
			const $figure = $block.find('.work-block-figure');
			const diff = $block.outerHeight() - $figure.outerHeight();

			if (i > 3) {
				$block.css({
					'transition-delay' : Math.random() + 's',
				});
			}

			const scene = new ScrollMagic.Scene({
				triggerElement : trigger,
				triggerHook    : 'onEnter',
				duration       : window.innerHeight + trigger.clientHeight,
			})
			.on('enter', function(block) {
				return function() {
					block.addClass('inview');
					this.off('enter');
				};
			}($block))
			.on('progress', function(_i, _figure, _diff) {
				return function(e) {
					const y = _diff * e.progress * (_i % 2 === 0 ? -1 : 1);
					_figure.css({
						transform : 'translateY(' + y + 'px)',
					});
				};
			}(i, $figure, diff))
			.addTo(_c.controller);

			_this.scene.push(scene);
		});
	}
}
