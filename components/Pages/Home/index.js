
// Home.js
import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../../config';

// Dispatcher
import AppDispatcher from '../../../dispatcher/AppDispatcher';
import AppStore from '../../../stores/AppStore';

// Components
import Block from '../../Partials/Block';

export default class Home extends Component {

	static get propTypes() {
		return {
			data: React.PropTypes.shape({
				posts: React.PropTypes.array,
			}),
		}
	}

	componentWillMount() {
		this.getPageData();
	}

	componentDidMount() {
		document.title = [(AppStore.data.page.title || config.site.description), config.site.title].join(' | ');
		window.postMessage('loaded', window.location.origin);
	}

	componentWillUnmount() {
		window.postMessage('unloaded', window.location.origin);
	}

	getPageData() {
		AppDispatcher.dispatch({
			action    : 'get-page-data',
			page_slug : '',
		});
	}

	render() {
		// const data = this.props.data;
		const posts = this.props.data.posts;
		let i = 1;
		const max = 10;

		const items = posts.map((post) => {
			if (i > max) {
				i = 1;
			}
			let background = '/images/photo' + i + '.jpg';
			i++;

			return (
				<Block key={post.id} data={post} background={background} />
			);
		});

		return (
			<section className="page-content">
				<div className="wrap container-fluid">
					<div className="row">
						<div className="col-xs-12">
							<article className="article" itemScope itemType="http://schema.org/Person">
								<h2 className="article-title">My name is <span itemProp="name">Erik Nielsen</span> &ndash; I'm a <span itemProp="jobTitle">Senior Engineer</span> at <a href="https://cliquestudios.com" target="_blank">Clique Studios</a> in Chicago. I primarily focus on JavaScript programming, front-end performance, and user-interface engineering.</h2>
								<h2 className="article-subtitle">Below you'll find some of my work and articles. Check them out and <Link to="contact">send me a message</Link> &ndash; I'd love to know what you think.</h2>
								<div className="work-section">
									<ul className="work-grid">
										{items}
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
