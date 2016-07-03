// App.js
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';

// Store
import AppStore from '../stores/AppStore';

// Components
import MobileNav from './Partials/MobileNav';
import Header from './Partials/Header';
import Footer from './Partials/Footer';

export default class App extends Component {

	// Add change listeners to stores
	componentDidMount() {
		AppStore.addChangeListener(this.onChange.bind(this));
	}

	// Remove change listeners from stores
	componentWillUnmount() {
		AppStore.removeChangeListener(this.onChange.bind(this));
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

	onChange() {
		this.setState(AppStore);
	}

	render() {
		const data = AppStore.data;

		// Show loading for browser
		if (! data.ready) {
			if (document) {
				document.title = 'Loading';
			}

			this.getStore();

			const style = {
				marginTop : 120,
			};
			return (
				<div />
				);
		}

		// Server first
		const Routes = React.cloneElement(this.props.children, {
			key : this.props.location.pathname,
			data,
		});

		// props
		const navItems = data.globals.nav_items;
		const transitionDuration = 1000;

		return (
			<div>
				<MobileNav navItems={navItems} />
				<div className="body-wrap transition-appear">
					<Header navItems={navItems} />
					<main className={'main ' + this.getSlug()} id="main">
						<ReactCSSTransitionGroup
  component="div"
  className="transition-group"
  transitionName="transition"
  transitionEnterTimeout={transitionDuration}
  transitionLeaveTimeout={transitionDuration}
      >
							{Routes}
						</ReactCSSTransitionGroup>
					</main>
					<Footer data={data} />
				</div>
			</div>
		);
	}
}
