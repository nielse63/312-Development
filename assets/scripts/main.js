
/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function ($, _c, undefined) {
	'use strict';

	var colors = [];

	function initWorkSection() {
		var ele = document.querySelector('.load-more');
		if( ! ele ) {
			return;
		}

		// init items
		function init() {
			Sage.home.init();
			Sage.home.finalize();
		}

		var ajax = '/ajax.json';
		var working = false;
		var sizes = ['small', 'medium', 'large'];
		var count = sizes.length;
		var scroll;
		var now = _c.utils.now();
		var posts = [];
		var leftGrid = $('.work-grid').first();
		var rightGrid = $('.work-grid').last();
		var ids = [];

		function loadArticles() {
			if( working ) {
				return;
			}
			working = true;

			$('[data-id]').map(function() {
				ids.push($(this).data('id'));
			});

			fetch(ajax).then(function(response) {
				var contentType = response.headers.get("content-type");
				if(contentType && contentType.indexOf("application/json") !== -1) {
					return response.json();
				} else {
					console.warn("Error retreiving JSON", response);
				}
			})
			.then(function(array) {

				for( var i = 0; i < array.length; i++ ) {
					var object = array[i];
					var id = object.id;
					if( ids.indexOf(id) > -1 ) {
						continue;
					}

					Sage.articleCount++;

					// object vars
					var url = object.url;
					var image = object.image;
					var tag = object.category;
					var title = object.title;
					var preview = object.preview;

					// get size
					var rand = Math.floor((Math.random() * count));
					var size = sizes[rand];

					// create html
					var html = [
						'<li class="work-block work-block-' + size + ' not-loaded" data-id="' + id + '">',
							'<a href="' + url + '">',
								'<figure class="work-block-figure inview" style="background-image: url(' + image + ');"></figure>',
								'<div class="work-block-content">',
									'<header class="work-block-header">',
										'<p class="tag">' + tag + '</p>',
										'<h3>' + title + '</h3>',
									'</header>',
									'<p class="preview">' + preview + '</p>',
								'</div>',
							'</a>',
						'</li>'
					].join('');
					posts.push({
						html : html,
					});
				}
			});
		}

		function showArticles() {
			var time = _c.utils.now();
			if( time - now < 1500 ) {
				return;
			}
			now = time;
			var length = posts.length;
			if( length > 10 ) {
				length = 10;
			}
			for( var i = 0; i < length; i++ ) {
				var post = posts.shift();
				var html = post.html;

				var grid = leftGrid;
				if( i % 2 !== 0 ) {
					grid = rightGrid;
				}

				// append html
				grid.append( html );
			}

			function blockStarted(ele, e) {
				$(ele).removeClass('not-loaded');
				e.target.remove();
			}

			setTimeout(function() {
				if( ! posts.length ) {
					scroll.remove();
				}

				init();

				var triggerElements = document.querySelectorAll('.work-block.not-loaded');
				for( var i = 0; i < triggerElements.length; i++ ) {
					var ele = triggerElements[i];
					var _scroll = new ScrollMagic.Scene({
						triggerElement : ele
					})
					.on('start', blockStarted.bind(_scroll, ele))
					.addTo(Sage.controller);
				}

			}, 100);
		}

		$(window).one('load', function() {
			setTimeout(loadArticles, 1000);
		});

		scroll = new ScrollMagic.Scene({
			triggerElement : ele,
			triggerHook    : 'onEnter',
		})
		.on('enter', showArticles)
		.addTo(Sage.controller);

		init();
	}

	function setWorkBlocks() {
		var $blocks = $('.work-block');
		if( ! $blocks.length ) {
			return;
		}

		var blocks = [];
		$blocks.each(function() {
			blocks.push({
				top : this.offsetTop,
				ele : $(this)
			});
		});
		blocks.sort(function(a, b) {
			return a.top - b.top;
		});
		for(var i = 0; i < blocks.length; i++) {
			if( i > 1 ) {
				break;
			}

			var delay = (Math.random() * i) + 1;
			var $block = blocks[i].ele;
			$block.css({
				'transition-delay' : delay + 's',
			});
		}
	}

	function initActiveLine() {
		var $line = _c.$('.body-wrap').last().find('.nav-menu .line');

		// guards
		if( ! $line.is(':visible') ) {
			return;
		}

		var $items  = $line.prevAll('li');
		var $active = $items.filter('.active');
		var timeout;
		var hovering = false;

		function setActiveLine($ele) {
			var left  = $ele.position().left + parseFloat( $ele.css('margin-left') ) + parseFloat( $ele.css('padding-left') );
			var width = $ele.width();

			$line.css({
				transform : 'translate(' + left + 'px, 0)',
				width : width
			});
		}

		setActiveLine( $active );
		$items.each(function() {
			$(this).on('mouseenter', function() {
				hovering = true;

				if( timeout ) {
					clearTimeout(timeout);
					timeout = null;
				}

				var $this = $(this);
				var t = setTimeout(function() {
					if( ! hovering ) {
						clearTimeout(t);
						t = null;
						return;
					}

					setActiveLine( $this );
				}, 150);
			}).on('mouseleave', function() {
				hovering = false;
				timeout = setTimeout(function() {
					setActiveLine( $active );
				}, 1000);
			});
		});
	}

	function bannerScroll() {
		var $banner = $('.banner');
		if( ! $banner.length ) {
			return;
		}

		var $title = $('.banner-title');
		var offset = $banner[0].offsetTop;
		var duration = $title.offset().top + $title.outerHeight() - offset;

		new ScrollMagic.Scene({
			duration : duration,
			offset : offset,
		})
		.on('enter', function() {
			$title.addClass('no-trans');
			this.off('enter');
		})
		.setTween($title[0], {
			y       : '-50vh',
			opacity : 0,
		})
		.addTo(Sage.controller);
	}

	function setTweetStyle() {
		var diff = 15;
		$('.tweet').each(function() {
			var x = Math.floor(Math.random() * ((diff * 2) + 1)) - diff;
			var y = Math.floor(Math.random() * ((diff * 2) + 1)) - diff;
			$(this).css({
				transform : 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)'
			});
		});
	}

	function bindTweetScroll() {
		$('.tweet').each(function() {
			var target = this;

			new ScrollMagic.Scene({
				triggerElement : target,
			})
			.on('enter', function() {
				_c.$(target).removeAttr('style');
				this.remove();
			})
			.addTo(Sage.controller);
		});
	}

	function setMobileHeader() {
		var $header = $('.header');
		$('.mobile-nav').after($header);
	}

	// Use this variable to set up the common and page specific functions. If you
	// rename this variable, you will also need to rename the namespace below.

	var Sage = {

		//properties
		elements : {
			workBlocks : null,
			services   : null,
			charts     : null,
			inputs     : null
		},
		controller : null,
		supportsTouch : !! _c.support.touch,

		// All pages
		'common': {
			init: function() {
				if( Sage.supportsTouch ) {
					_c.$html.addClass('touch');
					setMobileHeader();
				} else {
					_c.$html.addClass('no-touch');
				}

				// create scroll controller
				Sage.controller = new ScrollMagic.Controller();

				// set work block transition delay
				setWorkBlocks();

				// set active line
				initActiveLine();

				// bind banner scroll listener
				_c.$('.banner-title').each(function() {
					_c.$(this).one(_c.support.transition.end, function() {
						bannerScroll();
					});
				});

				// set load item
				initWorkSection();

			},
			finalize: function() {
				// JavaScript to be fired on all pages, after page specific JS is fired

				// setup tweet styles
				if( ! Sage.supportsTouch ) {
					setTweetStyle();
					bindTweetScroll();
				}
			}
		},

		// Home page
		'home': {
			init: function() {

				// get all elements
				Sage.elements.workBlocks = $('.work-block');

				// bind work blocks scroll listener
				Sage.elements.workBlocks.each(function(i) {
					var ele = this;
					var $ele = $(ele);
					if( $ele.data('scroll') ) {
						return;
					}
					var $figure = $ele.find('.work-block-figure');
					var diff = $ele.outerHeight() - $figure.outerHeight();

					$ele.on('mouseenter', function() {
						$(this).find('.work-block-figure').addClass('hovering');
					}).on('mouseleave', function() {
						$(this).find('.work-block-figure').removeClass('hovering');
					});

					var scroll = new ScrollMagic.Scene({
						triggerElement : ele,
						duration       : window.innerHeight,
					})
					.on('progress', function(_figure) {
						return function(e) {
							if( _figure.hasClass('hovering') ) {
								return;
							}
							var y = e.progress * diff;
							_figure.data('y', y);
						};
					}($figure))
					.setClassToggle($figure[0], "inview")
					.addTo(Sage.controller);

					$ele.data('scroll', scroll);
				});

				var now = _c.utils.now();
				var cutoff = 250;
				function tweenWorkGrid() {

					var time = _c.utils.now();
					if( time - now < cutoff ) {
						return;
					}
					now = time;

					var array = [];
					var selector = '.inview:not(.hovering)';
					$(selector).each(function() {
						array.push( $(this).data('y') );
					});
					TweenMax.staggerTo(selector, 0.8, {
						cycle : {
							y : array
						},
					}, 0.1);
				}

				$(document).on('scrolling', tweenWorkGrid);
			},
			finalize: function() {

				// print colors
				// var count = Sage.elements.workBlocks.length;
				var count = 25;
				var gradient = window.tinygradient([
					'#095D6D', '#12AF35'
				]);
				var colorsRgb = gradient.rgb(count);
				colors = colorsRgb.map(function(t) {
					return t.toHexString();
				});
				var blocks = [];
				Sage.elements.workBlocks.each(function() {
					blocks.push({
						top : $(this).offset().top,
						ele : $(this),
					});
				});
				blocks.sort(function(a, b) {
					return a.top - b.top;
				});
				for(var i = 0; i < blocks.length; i++) {
					var block = blocks[i];
					var $ele = block.ele;
					var color = colors[i];

					if( $ele.data('setcolor') ) {
						continue;
					}

					$ele.css({
						'background-color' : color
					}).data('setcolor', true);
				}
			}
		},

		// About us page, note the change from about-us to about_us.
		'about': {
			init: function() {

				// get all elements
				Sage.elements.services = $('.service-circle');

				// services transition delay
				$('.service').each(function() {
					var trigger = this;
					var ele = $(this);
					var elements = ele.find('.service-figure, p');
					var delay = Math.random();

					elements.css({
						'transition-delay' : delay + 's'
					});

					var scroll = new ScrollMagic.Scene({
						triggerElement : trigger
					})
					.setClassToggle(trigger, 'active')
					.on('start', function() {
						this.remove();
					})
					.addTo(Sage.controller);
				});

				// 'where i work' transition delay
				$('.where-figure').each(function(i) {
					var delay = i * 0.15;
					$(this).css({
						'transition-delay' : delay + 's'
					});
				});

				// where i work scroll listener
				var container = document.querySelector('.where-i-work');
				var scroll = new ScrollMagic.Scene({
					triggerElement : container,
				})
				.setClassToggle(container, 'active')
				.on('start', function() {
					this.remove();
				})
				.addTo(Sage.controller);
			},
			finalize: function() {

				// ...
			}
		},

		'single' : {
			init : function() {
				var $commits   = $('.single-chart-commits');
				var $frequency = $('.single-chart-frequency');
				var $chartButtons = $('.chart-buttons .button');

				Highcharts.setOptions({
					title: {
						text: false
					},
					subtitle: {
						text: false
					},
					credits : {
						enabled : false
					},
					legend: {
						enabled: false
					},
					exporting : {
						enabled : false,
					},
				});

				function commitsChart() {
					$(function () {
						$commits.highcharts({
							chart: {
								type: 'column'
							},
							xAxis: {
								type: 'category',
							},
							yAxis: {
								min: 0,
								title: {
									text: 'Population (millions)'
								}
							},
							series: [{
								name: 'Population',
								data: [
								['Shanghai', 23.7],
								['Lagos', 16.1],
								['Istanbul', 14.2],
								['Karachi', 14.0],
								['Mumbai', 12.5],
								['Moscow', 12.1],
								['São Paulo', 11.8],
								['Beijing', 11.7],
								['Guangzhou', 11.1],
								['Delhi', 11.1],
								['Shenzhen', 10.5],
								['Seoul', 10.4],
								['Jakarta', 10.0],
								['Kinshasa', 9.3],
								['Tianjin', 9.3],
								['Tokyo', 9.0],
								['Cairo', 8.9],
								['Dhaka', 8.9],
								['Mexico City', 8.9],
								['Lima', 8.9]
								],
							}]
						});
					});
				}

				function frequencyChart() {
					$(function () {
						$frequency.highcharts({
							chart: {
								type: 'area'
							},
							xAxis: {
								categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
							},
							series: [{
								name: 'John',
								data: [5, 3, 4, 7, 2]
							}, {
								name: 'Jane',
								data: [2, -2, -3, 2, 1]
							}]
						});
					});
				}

				function initCharts() {
					if( $commits.length && $commits.is(':visible') && ! $commits.find('> *').length ) {
						commitsChart();
					}
					if( $frequency.length && $frequency.is(':visible') && ! $frequency.find('> *').length ) {
						frequencyChart();
					}
				}

				$chartButtons.on('click', function(e) {
					e.preventDefault();

					var $ele = $(this);
					if( $ele.hasClass('active') ) {
						return;
					}
					$('.chart-buttons .button.active').removeClass('active');
					$ele.addClass('active');
					var id = $ele.attr('href');
					$('.single-chart').addClass('hidden');
					$(id).removeClass('hidden');

					setTimeout(function() {
						initCharts();
					}, 0);
				});

				// services scroll listener
				// var container = document.querySelector('.single-chart');
				// var scroll = new ScrollMagic.Scene({
				// 	triggerElement : container
				// })
				// .on('start', function() {
				// 	initCharts();
				// 	this.remove();
				// })
				// .addTo(Sage.controller);
				initCharts();
			},
			finalize : function() {
			},
		},

		'single_blog' : {
			init : function() {
				$(window).one('load', function() {
					Prism.highlightAll(false, function() {
						var $code = $(this);
						var $pre = $code.parent('pre');
						var $syntax = $pre.prev('.prism-show-language');
						if( $syntax.length ) {
							$pre = $pre.add($syntax);
						}
						$pre.wrapAll('<div class="single-blog-code" />');
					});
				});
			},
			finalize : function() {
				Sage.home.init();
				Sage.home.finalize();
			},
		},

		'work' : {
			init : function() {
				// ...
			},
			finalize : function() {
				// ...
			},
		},

		contact : {
			init : function() {
				Sage.elements.inputs = $('input:not([type="submit"]), textarea', '.form');
				Sage.elements.inputs.each(function() {

					var $input = $(this);
					var $parent = $input.parent('.input-wrapper');

					$input.on('focus', function() {
						$parent.addClass('focus');
					}).on('blur', function() {
						if( ! $(this).val() ) {
							$parent.removeClass('focus');
						}
					});
				});
			},
			finalize : function() {
				// ...
			},
		}
	};

	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	var UTIL = {
		fire: function(func, funcname, args) {
			var fire;
			var namespace = Sage;
			funcname = funcname === undefined ? 'init' : funcname;
			fire = func !== '';
			fire = fire && namespace[func];
			fire = fire && typeof namespace[func][funcname] === 'function';

			if (fire) {
				namespace[func][funcname](args);
			}
		},
		loadEvents: function() {

			// Fire common init JS
			UTIL.fire('common');

			// Fire page-specific init JS, and then finalize JS
			$.each(document.body.className.replace(/-/g, '_').replace(/page_/g, '').split(/\s+/), function (i, classnm) {
				// console.log(classnm);
				UTIL.fire(classnm);
				UTIL.fire(classnm, 'finalize');
			});

			// Fire common finalize JS
			UTIL.fire('common', 'finalize');
		}
	};

	// Load Events
	// console.log(_c);
	_c.$doc.on('ready loaded', UTIL.loadEvents);

	Sage.UTIL = UTIL;
	window.Sage = Sage;
})(window.jQuery, window.Clique); // Fully reference jQuery after this point.
