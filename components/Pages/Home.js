
// Home.js
import React, { Component } from 'react';
import config from '../../config';

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher';

// Components
import Block from '../Partials/Block';

export default class Home extends Component {

	componentWillMount() {
		window.postMessage('loading', window.location.origin);
		this.getPageData();
	}

	componentDidMount() {
		document.title = config.site.title + ' | ' + config.site.description;
		window.postMessage('loaded', window.location.origin);
	}

	componentWillUnmount() {
		window.postMessage('unloaded', window.location.origin);
	}

	getPageData() {
		AppDispatcher.dispatch({
			action    : 'get-page-data',
			page_slug : 'home',
		});
	}

	render() {
		const data = this.props.data;
		const articles = data.articles;
		let i = 1;
		const max = 10;

		const homepage_items = articles.map((article) => {
			if (i > max) {
				i = 1;
			}
			let background = '/images/photo' + i + '.jpg';
			i++;
			return (
				<Block key={article._id} data={article} background={background} />
				);
		});

		return (
			<section className="page-content">
				<div className="wrap container-fluid">
					<div className="row">
						<div className="col-xs-12">
							<article className="article">
								<div dangerouslySetInnerHTML={{ __html : data.page.content }} />
								<div className="work-section">
									<ul className="work-grid">
										{homepage_items}
									</ul>
								</div>
							</article>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
