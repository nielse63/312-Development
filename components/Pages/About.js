
// About.js
import React, { Component } from 'react';
import config from '../../config';

// Components
import TweetList from '../Partials/TweetList';
import Service from '../Partials/Service';

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppStore from '../../stores/AppStore';

export default class About extends Component {

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
			pageTitle : 'About',
		};
	}

	componentWillMount() {
		AppDispatcher.dispatch({
			action    : 'get-page-data',
			page_slug : 'about',
		});
	}

	componentDidMount() {
		document.title = [(AppStore.data.page.title || this.props.pageTitle), config.site.title].join(' | ');
		window.postMessage('loaded', window.location.origin);
	}

	getSlug() {
		return this.props.location.pathname.replace('/', '');
	}

	makeSlug(string) {
		let path = string.replace(/[\s|_|.]/g, '-');

		// remove leading slash
		if (path[0] === '/') {
			path = path.substr(1);
		}

		return path.replace(/\//g, '-')
		.toLowerCase()
		.split('.')[0];
	}

	render() {

		const services = [{
			title : 'JavaScript',
			class : 'service-javascript',
		}, {
			title : 'HTML5 Web APIs',
			class : 'service-html5 service-right',
		}, {
			title : 'React/Angular/Backbone',
			class : 'service-react',
		}, {
			title : 'jQuery Plugin Development',
			class : 'service-plugin service-right',
		}, {
			title : 'Node.js',
			class : 'service-node',
		}, {
			title : 'ES6/Harmony',
			class : 'service-es6 service-right',
		}];

		const serviceItems = services.map((service) => {
			const key = this.makeSlug(service.class);

			return (
				<Service key={key} class={service.class} title={service.title} />
			);
		});

		return (
			<div>
				<section className="banner about-banner">
					<div className="wrap container-fluid">
						<div className="row">
							<div className="col-xs-12">
								<h2 className="banner-title">I'm a front-end web developer, programmer, and JavaScript engineer with over seven years of agency experience, currently at <a href="https://cliquestudios.com" target="_blank">Clique Studios</a> in Chicago. I'm also a writer and regularly contribute to several industry blogs, and I love teaching others the craft of programming.</h2>
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
												<p>I'm a UIE (User-Interface Engineer), and as such I focus heavily on JavaScript programming with a concentration on algorithm design and performance enhancements.</p>
												<p>To see some of my work in action, check out my <a href="/" data-text="portfolio">portfolio</a>.</p>
											</aside>
										</div>
										<div className="col-xs-12 col-md-8">
											<div className="services">
												{serviceItems}
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
						<div className="row section-row">
							<div className="col-xs-12">
								<article className="article page-article">
									<div className="row flex-middle">
										<div className="col-xs-12 col-md-7">
											<div className="where-i-work">
												<figure className="where-figure where-figure-1">
													<img data-src="/images/work1.jpg" alt="After hours at Clique" />
												</figure>
												<figure className="where-figure where-figure-2">
													<img data-src="/images/work2.jpg" alt="Demonstrating some of our work" />
												</figure>
												<figure className="where-figure where-figure-3">
													<img data-src="/images/work3.jpg" alt="Our CTO, John Gile, leading a presentation" />
												</figure>
												<figure className="where-figure where-figure-4">
													<img data-src="/images/work4.jpg" alt="A view from our office" />
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
						<TweetList />
					</div>
				</section>
			</div>
		);
	}
}
