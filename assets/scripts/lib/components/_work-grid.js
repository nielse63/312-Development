
import colorbrewer from '../utils/_colorbrew';
import tinycolor from 'tinycolor2';
import ScrollMagic from 'scrollmagic';
import SplitText from '../vendor/SplitText';

export default class WorkGrid {

	constructor() {
		this.$workBlocks = $('.work-block');
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
			}).lines.slice(0, 3).forEach(function(line) {
				if (! line.childNodes || ! line.childNodes.length) {
					return;
				}

				text.push(line.childNodes[0].nodeValue.trim());
			});

			$preview.html(text.join(' '));
		});
	}

	getRandomColor() {
		const keys = Object.keys(colorbrewer);
		const key = keys[Math.floor(Math.random() * keys.length)];
		const object = colorbrewer[key]
		return object[Math.max.apply( null,  Object.keys(object) )];
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
			if (! colors[idx]) {
				colors = colors.reverse();
				idx = 0;
			}
			const color = colors[idx];
			$ele.css({
				'background-color' : color,
			});

			const tc = tinycolor(color);

			// get luma
			const rgb = tc.toRgb();
			const luma = (rgb.r * 0.3) + (rgb.g * 0.59) + (rgb.b * 0.11);
			if (luma > 215) {
				$ele.addClass('dark');
			}
			idx++;
		});
	}

	blockHover() {
		this.$workBlocks.each(function() {
			const $ele = _c.$(this);

			$ele.off('mouseenter mouseleave');
			$ele.on('mouseenter', function() {
				_c.$(this).find('.work-block-figure').addClass('hovering');
			}).on('mouseleave', function() {
				_c.$(this).find('.work-block-figure').removeClass('hovering');
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
			.on('enter', (function(block) {
				return function() {
					block.addClass('inview');
					this.off('enter');
				};
			}($block)))
			.on('progress', (function(_i, _figure, _diff) {
				return function(e) {
					const y = _diff * e.progress * (_i % 2 === 0 ? -1 : 1);
					_figure.css({
						transform : 'translateY(' + y + 'px)',
					});
				};
			}(i, $figure, diff)))
			.addTo(_c.controller);

			_this.scene.push(scene);
		});
	}
}
