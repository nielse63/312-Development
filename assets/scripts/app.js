
// third-party modules
import NProgress from 'nprogress';
import ScrollMagic from 'scrollmagic';

// core
import Clique from './utils/_core';
window._c = new Clique();

// modules
import Nav from './components/_nav';
import Banner from './components/_banner';
import BodyClass from './modules/_body-class';
import Form from './modules/_form';
import MobileButton from './vendor/hamburger';
import LazyLoad from './components/_lazyload';
import Links from './components/_links';
import Homepage from './components/_homepage';
import WorkGrid from './components/_work-grid';
import Photos from './components/_photos';
import Services from './components/_services';
import Twitter from './components/_twitter';
import Share from './components/_share';
import Footer from './components/_footer';

// config vars
import config from '../../config'

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
			}, {
				preload : false,
				Cls     : Twitter,
				val     : null,
			},
		];
		this.scenes = [];
		this.didInitialLoad = false;
		this.raygunUserKey = '312RaygunUser';

		// init
		this.onFirstLoad();

		return this;
	}

	defineProperties() {
		this.namespace = '.clique.appui.' + _c.utils.uid();
	}

	onFirstLoad() {
		this.loadRaygun();

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
		if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || isLocalhost)) {
			navigator.serviceWorker.register('/sw.js', {
				scope: '/'
			});
		}
	}

	loadRaygun() {
		const self = this;
		(function(window, document, ele, src, id, ...args) {
			/* eslint-disable no-param-reassign */
			window.RaygunObject = id;
			window[id] = window[id] || function() {
				(window[id].o = window[id].o || []).push(args)
			};
			/* eslint-enable no-param-reassign */
			const script = document.createElement(ele);
			const parent = document.getElementsByTagName(ele)[0];
			script.async = 1;
			script.src = src;
			parent.parentNode.insertBefore(script, parent);
			script.onload = function() {
				self.setupRaygun();
			};

		}(window, document, "script", "//cdn.raygun.io/raygun4js/raygun.min.js", "rg4js"));
	}

	setupRaygun() {
		window.rg4js('apiKey', config.raygun.apiKey);
		window.rg4js('enablePulse', true);
		window.rg4js('enableCrashReporting', true);
		window.rg4js('options', {
			debugMode : window.location.host === 'localhost',
			excludedHostnames : ['localhost'],
			ignore3rdPartyErrors : true
		});
		window.rg4js('saveIfOffline', true);

		// set user tracking
		window.rg4js('setUser', {
			identifier  : this.getRayGunUser(),
			isAnonymous : false,
		});
	}

	getRayGunUser() {
		let raygunUser = localStorage.getItem(this.raygunUserKey);
		if( ! raygunUser ) {
			raygunUser = _c.utils.stringGen();
			localStorage.setItem(this.raygunUserKey, raygunUser);
		}
		return raygunUser;
	}
}

const ui = new AppUI();
window.addEventListener('message', ui.onMessage.bind(ui), false);
