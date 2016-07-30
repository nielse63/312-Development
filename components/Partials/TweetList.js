
// TweetList.js
import React, { Component } from 'react';

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher';

export default class TweetList extends Component {

	render() {
		return (
			<div className="row section-row tweet-list">
				<div className="col-xs-12">
					<article className="article page-article">
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
								<div className="tweets" />
							</div>
						</div>
					</article>
				</div>
			</div>
		);
	}
}
