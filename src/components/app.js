
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { getScript, getStyle, preloadImages } from '../lib/load-jquery';
import Header from './header';
import Footer from './footer';
import Home from './home';
import About from './about';
import Contact from './contact';
import Portfolio from './portfolio';
import config from '../config';
import S from 'string';

require('offline-plugin/runtime').install();

const { pushState } = history;
history.pushState = (a, b, url) => {
	pushState.call(history, a, b, url);
	if (url.indexOf('#') < 0) scrollTo(0, 0);
};

export default class App extends Component {
	componentDidMount() {
		getScript();
		getStyle();
		preloadImages();

		setTimeout(() => {
			app.classList.add(this.props.readyclass);

			setTimeout(() => {
				app.classList.add(this.props.doneclass);
				document.body.removeAttribute('data-loading');
			}, 500);
		}, 1000);
	}

	setDefaultConfig() {
		if ( config.SITE_TITLE ) {
			return config;
		}
		const titleArray = document.title.split('|');
		config.SITE_TITLE = !! titleArray[0] ? titleArray[0].trim() : '';
		config.SITE_DESCRIPTION = !! titleArray[1] ? titleArray[1].trim() : '';

		return config;
	}

	setTitle() {
		const defaults = this.setDefaultConfig();

		let title = defaults.PAGE_TITLES[this.currentUrl] || S(this.currentUrl.replace(/\//, '')).capitalize().s;
		if (!title) {
			title = `${defaults.SITE_TITLE} | ${defaults.SITE_DESCRIPTION}`;
		} else {
			title = `${title} | ${defaults.SITE_TITLE}`;
		}
		document.title = title;
	}

	handleRoute = e => {
		this.currentUrl = e.url;
		this.setTitle();
	}

	render() {
		return (
      <div id="app" className={this.props.cssclass}>
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <About path="/about/" />
          <Contact path="/contact/" />
          <Portfolio path="/portfolio/" />
        </Router>
        <Footer />
      </div>
		);
	}
}
