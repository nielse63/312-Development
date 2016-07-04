
// TweetList.js
import React, { Component } from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';

// Store
import AppStore from '../../stores/AppStore';

// Components
import Tweet from './Tweet';

export default class TweetList extends Component {

	static get defaultProps() {
		return {
			tweets : [],
		};
	}

	render() {
		// console.log(this.props.tweets);
		const tweets = this.props.tweets.map((tweet) => {
			return (
				<div className="col-xs-12 col-md-6 flex" key={'key-' + tweet.id}>
					<Tweet data={tweet} />
				</div>
			);
		});

		return (
			<div className="tweets">
				<div className="row">
					{tweets}
				</div>
			</div>
		);
	}
}
