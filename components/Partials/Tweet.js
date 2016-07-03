// Tweet.js
import React, { Component } from 'react'

export default class Tweet extends Component {

	render() {

		const data = this.props.data
		const text = data.message
		const retweet = 'https://twitter.com/intent/retweet?tweet_id=' + data.id
		// const retweet = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&via=ErikKyleNielsen'
		// console.log(data)

		return (
			<div className="tweet">
				<p dangerouslySetInnerHTML={{__html: text }} />
				{/*<p>The WP Theme that’s winning over US Web Design Agencies <a href="https://t.co/NCwzb8mBIh" target="_blank" rel="nofollow">https://t.co/NCwzb8mBIh</a> <a href="https://twitter.com/CliqueChicago" target="_blank" rel="nofollow">.@CliqueChicago</a></p>*/}
				<footer className="tweet-footer">
					<div className="flex flex-space-between flex-middle">
						<div className="col">
							<time dangerouslySetInnerHTML={{__html: data.time }} />
						</div>
						<div className="col">
							<a href={retweet} className="button" data-retweet>Retweet</a>
						</div>
					</div>
				</footer>
			</div>
		)
	}
}
