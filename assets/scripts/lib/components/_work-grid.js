
import colorbrewer from '../utils/_colorbrew';
import tinycolor from 'tinycolor2';
import ScrollMagic from 'scrollmagic';

export default class WorkGrid {

	                    constructor() {
		                    this.$workBlocks = $('.work-block');
		                    if (! this.$workBlocks.length) {
			                    return;
		}

		                    this.section = document.querySelector('.work-section');
		// this.controller = new ScrollMagic.Controller();

		                    this.init();
	}

	                    init() {
		                    this.colorizeWorkBlocks();
		                    this.blockHover();
		                    this.scrollWorkGrid();
	}

	                    getRandomColor() {
		                    const keys = Object.keys(colorbrewer);
		                    const key = keys[Math.floor(Math.random() * keys.length)];
		// const key = 'PuRd'
		                  const array = [];
		                    for (const i in colorbrewer[key]) {
			                  const v = colorbrewer[key][i];
			                    array.push(v);
		}
		                    return array.pop();
	}

	                    colorizeWorkBlocks() {
		                    const colors = this.getRandomColor();
		                    let idx = 0;
		                    this.$workBlocks.each(function () {
			                  const $ele = $(this);
			                    if ($ele.data('colorset')) {
				                    return;
			}

			                    $ele.data('colorset', true);
			                    let color;
			                    if (! colors[idx]) {
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
				                    'background-image': gradient,
			});
			                    idx++;
		});
	}

	                    blockHover() {
		// bind work blocks scroll listener
		                    this.$workBlocks.each(function (i) {
			// let ele = this;
			                  const $ele = $(this);

			                    $ele.off('mouseenter mouseleave');
			                    $ele.on('mouseenter', function () {
				                    $(this).find('.work-block-figure').addClass('hovering');
			}).on('mouseleave', function () {
				                    $(this).find('.work-block-figure').removeClass('hovering');
			});
		});
	}

	                    scrollWorkGrid() {
		                    const section = this.section;
		                    let working = false;
		                    const $workBlocks = this.$workBlocks;

		                    this.scene = new ScrollMagic.Scene({
			                    triggerElement: section,
			                    duration: section.clientHeight,
		})
		.on('progress', function (e) {
			                    if (working) {
				                    return;
			}
			                    working = true;
			                    $workBlocks.filter(':not(.hovering)').each(function (i) {
				                  const $ele = $(this);
				// if( $ele.closest('.not-loaded').length ) {
				// 	return;
				// }
				                  const $figure = $ele.find('.work-block-figure');
				                    let diff = $figure.data('diff');
				                    if (! diff) {
					                    diff = $ele.outerHeight() - $figure.outerHeight();
					                    $figure.data('diff', diff);
				}
				                  const y = diff * e.progress * (i % 2 === 0 ? -1 : 1);
				                    $figure.css({
					                    transform: 'translateY(' + y + 'px)',
				});
			});
			                    working = false;
		})
		.addTo(_c.controller);
	}

	// initWorkSection() {

	// 	// var ele = document.querySelector('.load-more');
	// 	// if( ! ele ) {
	// 	// 	return;
	// 	// }

	// 	var ajax = '/ajax.json';
	// 	var working = false;
	// 	var sizes = ['small', 'medium', 'large'];
	// 	var count = sizes.length;
	// 	var scroll;
	// 	var now = _c.utils.now();
	// 	var posts = [];
	// 	var leftGrid = $('.work-grid').first();
	// 	var rightGrid = $('.work-grid').last();
	// 	var ids = [];
	// 	var offset = $('.footer').outerHeight();

	// 	function loadArticles() {
	// 		if( working ) {
	// 			return;
	// 		}
	// 		working = true;

	// 		$('[data-id]').map(function() {
	// 			ids.push($(this).data('id'));
	// 		});

	// 		fetch(ajax).then(function(response) {
	// 			var contentType = response.headers.get("content-type");
	// 			if(contentType && contentType.indexOf("application/json") !== -1) {
	// 				return response.json();
	// 			} else {
	// 				console.warn("Error retreiving JSON", response);
	// 			}
	// 		})
	// 		.then(function(array) {

	// 			for( var i = 0; i < array.length; i++ ) {
	// 				var object = array[i];
	// 				var id = object.id;
	// 				if( ids.indexOf(id) > -1 ) {
	// 					continue;
	// 				}

	// 				Sage.articleCount++;

	// 				// object vars
	// 				var url = object.url;
	// 				var image = object.image;
	// 				var tag = object.category;
	// 				var title = object.title;
	// 				var preview = object.preview;

	// 				// get size
	// 				var rand = Math.floor((Math.random() * count));
	// 				var size = sizes[rand];

	// 				// create html
	// 				var html = [
	// 					'<li class="work-block work-block-' + size + ' not-loaded" data-id="' + id + '">',
	// 						'<a href="' + url + '">',
	// 							'<figure class="work-block-figure" style="background-image: url(' + image + ');"></figure>',
	// 							'<div class="work-block-content">',
	// 								'<header class="work-block-header">',
	// 									'<p class="tag">' + tag + '</p>',
	// 									'<h3>' + title + '</h3>',
	// 								'</header>',
	// 								'<p class="preview">' + preview + '</p>',
	// 							'</div>',
	// 						'</a>',
	// 					'</li>'
	// 				].join('');
	// 				posts.push({
	// 					html : html,
	// 				});
	// 			}
	// 		});
	// 	}

	// 	function showArticles() {
	// 		var time = _c.utils.now();
	// 		if( time - now < 1500 ) {
	// 			return;
	// 		}
	// 		now = time;
	// 		var length = posts.length;
	// 		if( length > 10 ) {
	// 			length = 10;
	// 		}
	// 		for( var i = 0; i < length; i++ ) {
	// 			var post = posts.shift();
	// 			var html = post.html;

	// 			var grid = leftGrid;
	// 			if( i % 2 !== 0 ) {
	// 				grid = rightGrid;
	// 			}

	// 			// append html
	// 			grid.append( html );
	// 		}

	// 		function blockStarted(ele, e) {
	// 			var $ele = $(ele);
	// 			$ele
	// 				.removeClass('not-loaded');
	// 			e.target.remove();
	// 		}

	// 		setTimeout(function() {
	// 			if( !! scroll && ! posts.length ) {
	// 				scroll.remove();
	// 			}

	// 			init();

	// 			var triggerElements = document.querySelectorAll('.work-block.not-loaded');
	// 			for( var i = 0; i < triggerElements.length; i++ ) {
	// 				var ele = triggerElements[i];
	// 				var _scroll = new ScrollMagic.Scene({
	// 					triggerElement : ele,
	// 					triggerHook    : 'onEnter',
	// 					offset         : offset,
	// 				})
	// 				.on('start', blockStarted.bind(_scroll, ele))
	// 				.addTo(controller);
	// 			}
	// 		}, 100);
	// 	}

	// 	$(window).one('load', function() {
	// 		setTimeout(loadArticles, 1000);
	// 	});

	// 	this.scene = new ScrollMagic.Scene({
	// 		triggerElement : ele,
	// 		triggerHook    : 'onEnter',
	// 	})
	// 	.on('enter', showArticles)
	// 	.addTo(_c.controller);

	// 	init();
	// }

	// setWorkBlocks() {
	// 	var $blocks = $('.work-block');
	// 	if( ! $blocks.length ) {
	// 		return;
	// 	}

	// 	var blocks = [];
	// 	$blocks.each(function() {
	// 		blocks.push({
	// 			top : this.offsetTop,
	// 			ele : $(this)
	// 		});
	// 	});
	// 	blocks.sort(function(a, b) {
	// 		return a.top - b.top;
	// 	});
	// 	for(var i = 0; i < blocks.length; i++) {
	// 		if( i > 1 ) {
	// 			break;
	// 		}

	// 		var delay = (Math.random() * i) + 1;
	// 		var $block = blocks[i].ele;
	// 		$block.css({
	// 			'transition-delay' : delay + 's',
	// 		});
	// 	}
	// }

	// _c.$doc.on('ready loadready', colorizeWorkBlocks);
	// _c.$doc.on('ready loaded', setupWorkGrid);

}
