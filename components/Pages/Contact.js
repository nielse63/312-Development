
// Contact.js
import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import _ from 'lodash';

// Components
import TweetList from '../Partials/TweetList';

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher';

export default class Contact extends Component {

	componentWillMount() {
		window.postMessage('loading', window.location.origin);
		this.getPageData();
	}

	componentDidMount() {
		window.postMessage('loaded', window.location.origin);
	}

	componentDidUpdate() {
		const data = this.props.data;
		document.title = config.site.title + ' | ' + data.page.title;
	}

	componentWillUnmount() {
		window.postMessage('unloaded', window.location.origin);
	}

	getSlug() {
		return this.props.location.pathname.replace('/', '');
	}

	getPageData() {
		const page_slug = this.getSlug();
		AppDispatcher.dispatch({
			action: 'get-page-data',
			page_slug,
		});
	}

	render() {
		const slug = this.getSlug();
		const data = this.props.data;
		const page = data.page;
		// const tweets = data.tweets

		const metafields = page.metafields;

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
						<div className="row flex-middle section-row">
							<div className="col-xs-12 col-md-7">
								<TweetList />
							</div>
							<div className="col-xs-12 col-md-5">
								<aside className="aside">
									<h2 className="aside-title">Stay in Touch</h2>
									<p>I'm very active on Twitter, and try to contribute to as many Open-Source projects as time will allow. If you'd like to stay abreast with my work, follow me!</p>
									<ul className="list list-inline flex-center social-links">
										<li><a href="https://github.com/nielse63" target="_blank"><i className="fa fa-github"></i> GitHub</a></li>
										<li><a href="https://twitter.com/ErikKyleNielsen" target="_blank"><i className="fa fa-twitter"></i> Twitter</a></li>
									</ul>
								</aside>
							</div>
						</div>
					</article>
				</div>
				</section>
			</div>
		);
	}
}
