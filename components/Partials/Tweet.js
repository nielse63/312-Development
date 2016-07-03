// Tweet.js
import React, { Component } from 'react'

export default class Tweet extends Component {
	
	render() {

		return (
			<div className="tweet">
				<p>The WP Theme that’s winning over US Web Design Agencies <a href="https://t.co/NCwzb8mBIh" target="_blank" rel="nofollow">https://t.co/NCwzb8mBIh</a> <a href="https://twitter.com/CliqueChicago" target="_blank" rel="nofollow">.@CliqueChicago</a></p>
				<footer className="tweet-footer">
					<div className="flex flex-space-between flex-middle">
						<div className="col">
							<time>9 minutes ago</time>
						</div>
						<div className="col">
							<a href="#" className="button">Retweet</a>
						</div>
					</div>
				</footer>
			</div>
		)
	}
}