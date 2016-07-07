// App.js
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import withStyles from './withStyles.js';
// require('./App.scss')
// import { default as styles } from './App.scss';

// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';

// Store
import AppStore from '../stores/AppStore';

// Components
import MobileNav from './Partials/MobileNav';
import Header from './Partials/Header';
import Footer from './Partials/Footer';
import Loading from './Partials/Loading';

class App extends Component {

	static get propTypes() {
		return {
			children: React.PropTypes.element,
			location: React.PropTypes.shape({
				pathname: React.PropTypes.string,
			}),
		}
	}

	// Add change listeners to stores
	componentDidMount() {
		AppStore.addChangeListener(this.stateDidChange.bind(this));
	}

	// Remove change listeners from stores
	componentWillUnmount() {
		AppStore.removeChangeListener(this.stateDidChange.bind(this));
	}

	getStore() {
		AppDispatcher.dispatch({
			action : 'get-app-store',
		});
	}

	getSlug() {
		const path = this.props.location.pathname.replace('/', '').replace(/\//g, '-');
		return !! path ? path : 'home';
	}

	stateDidChange() {
		this.setState(AppStore);
	}

	render() {
		// const css = [];
		// this.context = { insertCss: (styles) => css.push(styles._getCss()) };
		// console.log(withStyles);
		// return (
		// 	<div />
		// );
		console.log(styles);
		const data = AppStore.data;

		// Show loading for browser
		if (! data.ready) {
			if (typeof document !== 'undefined') {
				document.title = 'Loading';
			}

			this.getStore();

			return (
				<div>
				<Loading />
				</div>
				);
		}

		// Server first
		const Routes = React.cloneElement(this.props.children, {
			key : this.props.location.pathname,
			data,
		});

		// props
		const navItems = data.globals.navItems;
		const transitionDuration = 1200;

		// s._insertCss();
		return (
			<div>
				<MobileNav navItems={navItems} />
				{/*<div className={styles.root}>*/}
				<div className="body-wrap transition-appear">
					<Header navItems={navItems} />
					<main className={'main ' + this.getSlug()} id="main">
						<ReactCSSTransitionGroup component="div" className="transition-group" transitionName="transition" transitionEnterTimeout={transitionDuration} transitionLeaveTimeout={transitionDuration}>
							{Routes}
						</ReactCSSTransitionGroup>
					</main>
					<Footer data={data} />
				</div>
			</div>
		);
	}
}
export default App
