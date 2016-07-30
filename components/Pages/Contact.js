
// Contact.js
import React, { Component } from 'react';
import config from '../../config';

// Components
import TweetList from '../Partials/TweetList';

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppStore from '../../stores/AppStore';

export default class Contact extends Component {

	static get propTypes() {
		return {
			pageTitle: React.PropTypes.string,
			location: React.PropTypes.shape({
				pathname: React.PropTypes.string,
			}),
		}
	}

	static get defaultProps() {
		return {
			pageTitle : 'Contact Me',
		};
	}

	componentWillMount() {
		this.getPageData();
	}

	componentDidMount() {
		document.title = [(AppStore.data.page.title || this.props.pageTitle), config.site.title].join(' | ');
		window.postMessage('loaded', window.location.origin);
	}

	getPageData() {
		AppDispatcher.dispatch({
			action    : 'get-page-data',
			page_slug : 'contact',
		});
	}

	getSlug() {
		return this.props.location.pathname.replace('/', '');
	}

	render() {
		// const data = this.props.data;

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
										<p>Whether it's because you found a bug in my code, have an app or resource you want me to check out, or think we should partner together on a project, send me a message.</p>
									</aside>
								</div>
								<div className="col-xs-12 col-md-6">
									<form action="submit" method="post" className="form">
										<ul className="list">
											<li>
												<div className="input-wrapper">
													<input type="text" name="name" placeholder="Name" required />
												</div>
											</li>
											<li>
												<div className="input-wrapper">
													<input type="email" name="email" placeholder="Email Address" required />
												</div>
											</li>
											<li>
												<div className="input-wrapper">
													<input type="url" name="url" placeholder="Website" />
												</div>
											</li>
											<li>
												<div className="input-wrapper">
													<textarea name="message" placeholder="Message" required></textarea>
												</div>
											</li>
										</ul>
										<footer className="form-footer">
											<ul className="list list-inline">
												<li>
													<input type="submit" className="button" value="Submit" />
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
