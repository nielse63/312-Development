
// TweetList.js
import React, { Component } from 'react'

// Components
import Tweet from './Tweet'

export default class TweetList extends Component {

	render() {

		return (
			<div className="tweets">
				<div className="row">
					<div className="col-xs-12 col-md-6 flex">
						<Tweet />
					</div>
					<div className="col-xs-12 col-md-6 flex">
						<Tweet />
					</div>
					<div className="col-xs-12 col-md-6 flex">
						<Tweet />
					</div>
					<div className="col-xs-12 col-md-6 flex">
						<Tweet />
					</div>
				</div>
			</div>
		)
	}
}
