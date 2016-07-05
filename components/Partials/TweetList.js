
// TweetList.js
import React, { Component } from 'react';
// import AppDispatcher from '../../dispatcher/AppDispatcher

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher';

// Store
// import AppStore from '../../stores/AppStore';

// Components
// import Tweet from './Tweet';

export default class TweetList extends Component {

	// static get defaultProps() {
	// 	return {
	// 		tweets : [],
	// 	};
	// }

	componentWillMount() {
		this.getTweets();
	}

	componentDidMount() {
		this.loadTweets();
	}

	getTweets() {
		AppDispatcher.dispatch({
			action : 'get-tweets',
		});
	}

	loadTweets() {
		AppDispatcher.dispatch({
			action : 'load-tweets',
		});
	}

	render() {
		// console.log(this.props.tweets);
		// const tweets = this.props.tweets.map((tweet) => {
		// 	return (
		// 		<div className="col-xs-12 col-md-6 flex" key={'key-' + tweet.id}>
		// 			<Tweet data={tweet} />
		// 		</div>
		// 	);
		// });

		return (
			<div className="row section-row">
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
