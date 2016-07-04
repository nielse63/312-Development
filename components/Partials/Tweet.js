// Tweet.js
import React, { Component } from 'react';

class Tweet extends Component {

	static get propTypes() {
		return {
			data : React.PropTypes.object,
		};
	}

	render() {
		const data = this.props.data;
		const text = data.message;
		const retweet = `https://twitter.com/intent/retweet?tweet_id= ${data.id}!`;

		return (
			<div className="tweet">
				<p dangerouslySetInnerHTML={{ __html : text }} />
				<footer className="tweet-footer">
					<div className="flex flex-space-between flex-middle">
						<div className="col">
							<time dangerouslySetInnerHTML={{ __html : data.time }} />
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

export default Tweet;

