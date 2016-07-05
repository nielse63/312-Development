
// Contact.js
import React, { Component } from 'react';
import config from '../../config';

// Components
import TweetList from '../Partials/TweetList';

// Dispatcher
// import AppDispatcher from '../../dispatcher/AppDispatcher';

export default class Contact extends Component {

	static get defaultProps() {
		return {
			pageTitle : 'Contact Me',
		};
	}

	// componentWillMount() {
	// 	// window.postMessage('loading', window.location.origin);
	// 	// this.getPageData();
	// 	this.getTweets();
	// }

	componentDidMount() {
		window.postMessage('loaded', window.location.origin);
	}

	componentDidUpdate() {
		document.title = config.site.title + ' | ' + this.props.pageTitle;
	}

	componentWillUnmount() {
		window.postMessage('unloaded', window.location.origin);
	}

	getSlug() {
		return this.props.location.pathname.replace('/', '');
	}

	// getPageData() {
	// 	const pageSlug = this.getSlug();
	// 	AppDispatcher.dispatch({
	// 		action : 'get-page-data',
	// 		pageSlug,
	// 	});
	// }

	// getTweets() {
	// 	AppDispatcher.dispatch({
	// 		action : 'get-tweets',
	// 	});
	// }

	render() {
		const data = this.props.data;
		const page = data.page;

		return (
			<div>
				<section className="banner contact-banner">
					<div className="wrap container-fluid">
						<div className="row">
							<div className="col-xs-12">
								<h2 className="banner-title contact-title">Holla at me.</h2>
							</div>
						</div>
					</div>
				</section>
				<section className="page-content">
				<div className="wrap container-fluid">
					<article className="article page-article contact-article">
						<div className="row flex-middle section-row">
							<div className="col-xs-12 col-md-6">
								<aside className="aside">
									<h2 className="aside-title">Shoot me a message</h2>
									<p>Whether it's because you found a bug in my code, have an app or resource you want me to check out, or think we should partner together on a project just send me a message. I always respond.</p>
								</aside>
							</div>
							<div className="col-xs-12 col-md-6">
								<form className="form">
									<ul className="list">
										<li>
											<div className="input-wrapper">
												<input type="text" placeholder="Name" required />
											</div>
										</li>
										<li>
											<div className="input-wrapper">
												<input type="email" placeholder="Email Address" required />
											</div>
										</li>
										<li>
											<div className="input-wrapper">
												<input type="tel" placeholder="Phone Nuber" />
											</div>
										</li>
										<li>
											<div className="input-wrapper">
												<input type="url" placeholder="Website" />
											</div>
										</li>
										<li>
											<div className="input-wrapper">
												<textarea placeholder="Message" required></textarea>
											</div>
										</li>
									</ul>
									<footer className="form-footer">
										<ul className="list list-inline">
											<li>
												<input type="submit" className="button disabled" value="Submit" />
											</li>
										</ul>
									</footer>
								</form>
							</div>
						</div>
						<TweetList />
					</article>
				</div>
				</section>
			</div>
		);
	}
}
