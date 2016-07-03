
// TweetList.js
import React, { Component } from 'react'

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher'

// Store
import AppStore from '../../stores/AppStore'

// Components
import Tweet from './Tweet'

export default class TweetList extends Component {

	// Add change listeners to stores
	componentWillMount() {
		const tweets = AppStore.data.tweets || []
		this.setState({
			tweets : tweets
		});
	}

	render() {

		if( ! this.state.tweets || ! this.state.tweets.length ) {
			return (
				<div />
			)
		}

		const tweets = this.state.tweets.map(( tweet ) => {
			return (
				<div className="col-xs-12 col-md-6 flex" key={ 'key-' + tweet.id }>
					<Tweet data={ tweet } />
				</div>
			)
		})

		return (
			<div className="tweets">
				<div className="row">
					{ tweets }
				</div>
			</div>
		)
	}
}
