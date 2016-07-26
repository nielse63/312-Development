
// third-party modules
import NProgress from 'nprogress';
import ScrollMagic from 'scrollmagic';

// core
import Clique from './lib/utils/_core';
window._c = new Clique();

// modules
import Nav from './lib/components/_nav';
import Banner from './lib/components/_banner';

// modules
import BodyClass from './lib/modules/_body-class';
import Form from './lib/modules/_form';

import MobileButton from './lib/vendor/hamburger';

import LazyLoad from './lib/components/_lazyload';
import Links from './lib/components/_links';
import Homepage from './lib/components/_homepage';
import WorkGrid from './lib/components/_work-grid';
import Photos from './lib/components/_photos';
import Services from './lib/components/_services';
import Share from './lib/components/_share';
import Footer from './lib/components/_footer';

class AppUI {

	constructor() {

		// properties
		this.modules = [
			{
				preload : false,
				Cls     : MobileButton,
				val     : null,
			}, {
				preload : false,
				Cls     : Banner,
				val     : null,
			}, {
				once    : true,
				preload : true,
				Cls     : Nav,
				val     : null,
			}, {
				preload : false,
				Cls     : Homepage,
				val     : null,
			}, {
				preload : true,
				Cls     : WorkGrid,
				val     : null,
			}, {
				preload : false,
				Cls     : Services,
				val     : null,
			}, {
				preload : false,
				Cls     : Photos,
				val     : null,
			}, {
				preload : true,
				Cls     : Links,
				val     : null,
			}, {
				preload : false,
				Cls     : Form,
				val     : null,
			}, {
				preload : false,
				Cls     : LazyLoad,
				val     : null,
			}, {
				preload : false,
				Cls     : Footer,
				val     : null,
			}, {
				preload : false,
				Cls     : Share,
				val     : null,
			},
		];
		this.scenes = [];
		this.didInitialLoad = false;

		// init
		this.onFirstLoad();

		return this;
	}

	defineProperties() {
		this.namespace = '.clique.appui.' + _c.utils.uid();
	}

	onFirstLoad() {
		NProgress.start();
		this.registerServiceWorker()
	}

	bindListeners() {
		_c.$win.off(this.namespace);
		_c.$win.on('resizeend' + this.namespace, _c.controller.update);
	}

	initModules(preload = false) {

		// re-init all modules
		for (let i = 0; i < this.modules.length; i++) {
			const Module = this.modules[i];

			// guards
			if (Module.preload !== preload || (Module.once && Module.val)) {
				continue;
			}

			// destroy scroll scene
			if (Module.val && Module.val.scene) {
				this.scenes.push(Module.val.scene);
			}

			// create new class
			Module.val = new Module.Cls();
		}
	}

	preMount() {
		BodyClass.exec();
		this.initModules(true);
	}

	enterPage() {
		this.preMount();

		const delay = this.didInitialLoad ? 700 : 0;
		const self = this;

		let t = setTimeout(function() {
			clearTimeout(t);
			t = null;

			if (! delay) {
				_c.$html.addClass('app-ready');
			}

			_c.controller.update();
			self.initModules();
			self.didInitialLoad = true;
		}, delay);
	}

	pageDidLoad() {

		this.bindListeners();
		this.enterPage();

		setTimeout(function() {
			NProgress.done();
		}, 500);
	}

	onMessage(e) {
		if (e.data === 'loaded') {

			const fn = this.pageDidLoad.bind(this);
			if( ! _c.loaded ) {
				let interval = setInterval(function() {
					if( _c.loaded ) {
						clearInterval(interval);
						interval = null;
						fn();
					}
				}, 100);
			} else {
				if( window.pageYOffset ) {
					window.scroll(0, 0);
				}
				setTimeout(fn, 0);
			}
		} else if(e.data === 'unloaded') {
			this.onUnload();
		}
	}

	killScenes(array) {
		array = array || this.scenes;

		if( ! array || ! _c.utils.isArray( array ) || ! array.length ) {
			return;
		}
		for (let i = 0; i < array.length; i++) {
			const scene = array[i];
			if ( _c.utils.isArray( scene ) ) {
				this.killScenes( scene );
			} else {
				scene.destroy(true);
			}
		}
	}

	onUnload() {

		// kill all scenes
		if( this.scenes && this.scenes.length ) {
			this.killScenes( this.scenes );
			this.scenes = [];
		}

		// destroy the controller
		_c.controller.destroy();

		// reset scrolling controller and scenes
		_c.controller = new ScrollMagic.Controller();
		this.scenes = [];
	}

	registerServiceWorker() {
		var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
			window.location.hostname === '[::1]' ||
			window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
		);
		if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || isLocalhost) ) {
			navigator.serviceWorker.register('/sw.js', {
				scope: '/'
			});
		}
	}
}

const ui = new AppUI();
window.addEventListener('message', ui.onMessage.bind(ui), false);
