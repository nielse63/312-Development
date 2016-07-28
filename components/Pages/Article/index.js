
// Article.js
import React, { Component } from 'react';
import config from '../../../config';

// Dispatcher
import AppDispatcher from '../../../dispatcher/AppDispatcher';

export default class Article extends Component {

	static get propTypes() {
		return {
			data: React.PropTypes.shape({
				page: React.PropTypes.shape({
					title: React.PropTypes.string,
				}),
			}),
			params: React.PropTypes.shape({
				slug: React.PropTypes.string,
			}),
			routeParams: React.PropTypes.shape({
				slug: React.PropTypes.string,
			}),
		}
	}

	componentWillMount() {
		this.getPostData();
	}

	componentDidMount() {
		document.title = config.site.title + ' | ' + this.props.data.page.title;
		window.postMessage('loaded', window.location.origin);
	}

	getPostData() {
		AppDispatcher.dispatch({
			action    : 'get-post-data',
			page_slug : 'articles',
			post_slug : this.props.params.slug,
		});
	}

	render() {
		const page = this.props.data.page;

		// page vars
		const title = page.title;
		const content = page.content;

		// banner image
		const background = '/images/photo' + (Math.floor(Math.random() * 10) + 1) + '.jpg';

		// links
		let buttons = '';
		const links = [];
		if (page.links && page.links.length) {
			for (let i = 0; i < page.links.length; i++) {
				const link = page.links[i].split(':');
				const text = link.shift().trim();
				const url = link.join('').trim();

				links.push({
					text,
					url,
				});
			}

			buttons = links.map((link) => {
				let url = link.url.replace(/^http(.*?)\/\//, 'http$1://');
				const text = link.text;

				return (
					<li key={`key-${text}`}>
						<a href={url} className="button button-blue" target="_blank">{text}</a>
					</li>
				);
			});
		}

		// share links
		const url = window.location.origin + '/articles/' + this.props.routeParams.slug;
		const shareText = 'Check out "' + title + '" on 312 Development.';
		// const shareText = 'Check out "' + title + '" on 312 Development at ' + url;
		const encodedText = encodeURIComponent(shareText);
		const encodedURL = encodeURIComponent(url);

		// urls
		const facebookUrl = url;
		const twitterUrl = 'https://twitter.com/intent/tweet?text=' + encodedText + '&amp;via=erikkylenielsen&amp;url=' + encodedURL;
		const googleplusUrl = url;
		const linkedinUrl = 'http://www.linkedin.com/shareArticle?mini=true&amp;url=' + url + '&amp;title=' + encodedText + '&amp;summary=' + encodedText + encodedURL + '&amp;source=https://312development.com';

		let footer;
		if (buttons) {
			footer = (
				<footer className="single-footer">
					<div className="single-footer-section section-row">
						<ul className="list list-inline flex-center single-buttons">
							{buttons}
						</ul>
					</div>
				</footer>
			);
		}

		return (
			<main className="main single" id="main">
				<section className="banner single-banner" data-src={background}>
					<div className="wrap container-fluid">
						<div className="row">
							<div className="col-xs-12">
								<h2 className="banner-title single-title">{title}</h2>
							</div>
						</div>
					</div>
				</section>
				<section className="page-content">
					<div className="wrap container-fluid">
						<div className="row single-row">
							<div className="col-xs-12">
								<article className="article single-article">
									<div className="row">
										<div className="col-xs-12 col-md-9 container-center article-content" dangerouslySetInnerHTML={{ __html : content }} />
									</div>
								</article>
								{footer}
								<footer className="single-footer">
									<div className="single-footer-section section-row">
										<p className="article-lead">Share:</p>
										<ul className="list list-inline flex-center single-buttons chart-buttons">
											<li><a href={twitterUrl} data-share="twitter" className="button button-twitter"><i className="fa fa-twitter"></i> Tweet</a></li>
											<li><a href={linkedinUrl} data-share="linkedin" className="button button-linkedin"><i className="fa fa-linkedin"></i> Share</a></li>
											<li><a href={facebookUrl} data-share="facebook" className="button button-facebook"><i className="fa fa-facebook"></i> Post</a></li>
											<li><a href={googleplusUrl} data-share="googleplus" className="button button-googleplus"><i className="fa fa-googleplus"></i> Send</a></li>
										</ul>
									</div>
								</footer>
							</div>
						</div>
					</div>
				</section>
			</main>
		);
	}
}
