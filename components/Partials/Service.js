
// About.js
import React, { Component } from 'react';

export default class About extends Component {

	static get propTypes() {
		return {
			pageTitle: React.PropTypes.string,
		}
	}

	static get defaultProps() {
		return {
			title : 'JavaScript',
		};
	}

	render() {
		const cls = `service ${this.props.class}`;

		return (
			<div className={cls}>
				<figure className="service-figure">
					<span className="service-circle"></span>
					<p>{this.props.title}</p>
				</figure>
			</div>
		);
	}
}
