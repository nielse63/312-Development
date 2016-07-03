
// NoMatch.js
import React, { Component } from 'react';
import config from '../../config';

export default class NoMatch extends Component {

	componentWillMount() {
		window.postMessage('loading', window.location.origin);
	}

	componentDidMount() {
		document.title = config.site.title + ' | Page Not Found';
		window.postMessage('loaded', window.location.origin);
	}

	componentWillUnmount() {
		window.postMessage('unloaded', window.location.origin);
	}

	render() {
		const data = this.props.data;
		const page = data.page;

		return (
			<section className="page-content page-404">
				<figure className="page-404-background"></figure>
				<div>
					<h1>Page Not Found</h1>
				</div>
			</section>
		);
	}
}
