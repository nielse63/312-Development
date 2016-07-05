
// Article.js
import React, { Component } from 'react';
import config from '../../config';
// import { withRouter } from 'react-router';

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher';

// Components
// import Block from '../Partials/Block';

export default class Article extends Component {

	componentWillMount() {
		// window.postMessage('loading', window.location.origin);
		this.getPostData();
	}

	componentDidMount() {
		document.title = config.site.title + ' | ' + this.props.data.page.title;
		window.postMessage('loaded', window.location.origin);
	}

	componentWillUnmount() {
		window.postMessage('unloaded', window.location.origin);
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
		const background = '/images/photo' + Math.floor(Math.random() * 10) + '.jpg';
		// const style = {
		// 	backgroundImage : 'url(' + background + ')',
		// };

		// links
		let buttons = '';
		const links = [];
		if (page.links && page.links.length) {
			// const linksArray = page.links.value.split('\n');
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
				return (
					<li key={'key-' + link.text}>
					<a href={link.url} className="button button-blue">{link.text}</a>
					</li>
					);
			});
		}

		// share links
		const url = window.location.origin + '/articles/' + this.props.routeParams.slug;
		const shareText = 'Check out ' + title + ' on 312 Development at ' + url;
		const encodedText = encodeURIComponent(shareText);
		const encodedURL = encodeURIComponent(url);

		// urls
		const facebook_url = url;
		const twitter_url = 'https://twitter.com/intent/tweet?text=' + encodedText + '&amp;via=cliquechicago&amp;url=' + encodedURL;
		const googleplus_url = url;
		const linkedin_url = 'http://www.linkedin.com/shareArticle?mini=true&amp;url=' + url + '&amp;title=' + encodedText + '&amp;summary=' + encodedText + encodedURL + '&amp;source=http://312development.com';

		let footer;
		if (buttons) {
			footer = (<footer className="single-footer">
				<div className="single-footer-section section-row">
				<ul className="list list-inline flex-center single-buttons">
				{buttons}
				</ul>
				</div>
				</footer>);
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
			<li><a href={twitter_url} data-share="twitter" className="button button-twitter"><i className="fa fa-twitter"></i> Tweet</a></li>
			<li><a href={linkedin_url} data-share="linkedin" className="button button-linkedin"><i className="fa fa-linkedin"></i> Share</a></li>
			<li><a href={facebook_url} data-share="facebook" className="button button-facebook"><i className="fa fa-facebook"></i> Post</a></li>
			<li><a href={googleplus_url} data-share="googleplus" className="button button-googleplus"><i className="fa fa-googleplus"></i> Send</a></li>
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
