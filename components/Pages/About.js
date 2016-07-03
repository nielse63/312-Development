
// About.js
import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import _ from 'lodash';

// Components
import TweetList from '../Partials/TweetList';

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher';

export default class About extends Component {

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
				<section className="banner about-banner">
					<div className="wrap container-fluid">
						<div className="row">
							<div className="col-xs-12">
								<h2 className="banner-title">I'm a front-end web developer, programmer, and JavaScript engineer with over seven years of agency experience at, currently at <a href="https://cliquestudios.com" target="_blank">Clique Studios</a> in Chicago. I'm also a writer and regularly contribute to several industry blogs, and I love teaching others the craft of programming.</h2>
							</div>
						</div>
					</div>
				</section>
				<section className="page-content">
					<div className="wrap container-fluid">
						<div className="row section-row">
							<div className="col-xs-12">
								<article className="article page-article">
									<div className="row flex-middle">
										<div className="col-xs-12 col-md-4">
											<aside className="aside">
												<h2 className="aside-title">What I do</h2>
												<p>I'm a UIE (User-Interface Engineer), and as such I focus heavily on JavaScript programming with a focus on algorithm design and performance enhancements.</p>
												<p>To see some of my work in action, check out my <a href="/" data-text="portfolio">portfolio</a>.</p>
											</aside>
										</div>
										<div className="col-xs-12 col-md-8">
											<div className="services">
												<div className="service service-javascript">
													<figure className="service-figure">
														<span className="service-circle"></span>
														<p>JavaScript</p>
													</figure>
												</div>
												<div className="service service-html5 service-right">
													<figure className="service-figure">
														<span className="service-circle"></span>
														<p>HTML5 Web APIs</p>
													</figure>
												</div>
												<div className="service service-react">
													<figure className="service-figure">
														<span className="service-circle"></span>
														<p>React/Angular/Backbone</p>
													</figure>
												</div>
												<div className="service service-plugin service-right">
													<figure className="service-figure">
														<span className="service-circle"></span>
														<p>jQuery Plugin Development</p>
													</figure>
												</div>
												<div className="service service-node">
													<figure className="service-figure">
														<span className="service-circle"></span>
														<p>Node.js</p>
													</figure>
												</div>
												<div className="service service-es6 service-right">
													<figure className="service-figure">
														<span className="service-circle"></span>
														<p>ES6/Harmony</p>
													</figure>
												</div>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
						<div className="row section-row">
							<div className="col-xs-12">
								<article className="article about-article">
									<div className="row flex-middle">
										<div className="col-xs-12 col-md-7">
											<div className="where-i-work">
												<figure className="where-figure where-figure-1">
													<img src="/images/work1.jpg" />
												</figure>
												<figure className="where-figure where-figure-2">
													<img src="/images/work2.jpg" />
												</figure>
												<figure className="where-figure where-figure-3">
													<img src="/images/work3.jpg" />
												</figure>
												<figure className="where-figure where-figure-4">
													<img src="/images/work4.jpg" />
												</figure>
											</div>
										</div>
										<div className="col-xs-12 col-md-5">
											<aside className="aside">
												<h2 className="aside-title">Where I Work</h2>
												<p>Clique Studios is an award-winning design and engineering agency. We create digital experiences for high-growth organizations. From day one, our philosophy has been simple: <strong>Build Something</strong></p>
												<p>View our <a href="https://cliquestudios.com" target="_blank" data-text="website">website</a>. I made it.</p>
											</aside>
										</div>
									</div>
								</article>
							</div>
						</div>
						<div className="row section-row">
							<div className="col-xs-12">
								<article className="article about-article">
									<div className="row flex-middle">
										<div className="col-xs-12 col-md-5">
											<aside className="aside">
												<h2 className="aside-title">Let's Keep in Touch</h2>
												<p>I'm very active on Twitter, and try to contribute to as many Open-Source projects as time will allow. If you'd like to stay abreast with my work, follow me!</p>
												<ul className="list list-inline flex-center social-links">
													<li><a href="https://github.com/nielse63" target="_blank"><i className="fa fa-github"></i> GitHub</a></li>
													<li><a href="https://twitter.com/ErikKyleNielsen" target="_blank"><i className="fa fa-twitter"></i> Twitter</a></li>
												</ul>
											</aside>
										</div>
										<div className="col-xs-12 col-md-7">
											<TweetList />
										</div>
									</div>
								</article>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}