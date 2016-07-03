// Tweet.js
import React, { Component } from 'react';

export default class Tweet extends Component {

	render() {
		const data = this.props.data;
		const text = data.message;
		const retweet = 'https://twitter.com/intent/retweet?tweet_id=' + data.id;

		return (
			<div className="tweet">
				<p dangerouslySetInnerHTML={{ __html: text }} />
				<footer className="tweet-footer">
					<div className="flex flex-space-between flex-middle">
						<div className="col">
							<time dangerouslySetInnerHTML={{ __html: data.time }} />
						</div>
						<div className="col">
							<a href={retweet} className="button" data-retweet>Retweet</a>
						</div>
					</div>
				</footer>
			</div>
		);
	}
}
