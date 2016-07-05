
export default class Nav {

	constructor() {
		this.$line = _c.$('.body-wrap').last().find('.nav-menu .line');

		// guards
		if (! this.$line.is(':visible')) {
			return;
		}

		// properties
		this.$parent = this.$line.closest('.nav-menu');
		this.$items = this.$line.prevAll('li').find('a');
		this.$active = this.$items.filter('.active').last();
		this.hovering = false;
		this.delay = 500;
		this.top = 10;

		// bind listeners
		if (! this.$line.hasClass('active')) {
			_c.$('.transition-appear').one(_c.support.animation.end, (function(_this) {
				return function() {
					_this.initActiveLine();
					setTimeout(function() {
						_this.$line.addClass('active');
					}, 100);
				};
			}(this)));
		} else {
			this.setActiveLine(this.$active);
		}
	}

	setActiveLine($link) {
		const $ele = $link.parent('li');
		const left = $ele.position().left + parseFloat($ele.css('margin-left')) + parseFloat($ele.css('padding-left'));
		const width = $ele.width();

		this.$line.css({
			transform : 'translate(' + left + 'px, 0)',
			width,
		});
	}

	onClick(e) {
		this.$active = $(e.target);
		this.$items.removeClass('active');
		this.$active.addClass('active');
		this.setActiveLine(this.$active);
	}

	onMouseenter(e) {
		this.hovering = true;

		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		const $target = $(e.target);
		const _this = this;
		let t = setTimeout(function() {
			if (! _this.hovering) {
				clearTimeout(t);
				t = null;
				return;
			}

			_this.setActiveLine($target);
		}, 100);
	}

	onMouseleave() {
		this.hovering = false;
		const _this = this;
		this.timeout = setTimeout(function() {
			_this.setActiveLine(_this.$active);
		}, this.delay);
	}

	initActiveLine() {
		this.setActiveLine(this.$active);
		const _this = this;

		this.$items.each(function() {
			const $ele = $(this);
			$ele.off('.nav');
			$ele
				.on('click.nav', _this.onClick.bind(_this))
				.on('mouseenter.nav', _this.onMouseenter.bind(_this))
				.on('mouseleave.nav', _this.onMouseleave.bind(_this));
		});
	}
}
