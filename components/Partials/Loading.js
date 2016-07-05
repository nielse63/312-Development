
// Loading.js
import React, { Component } from 'react';

export default class Loading extends Component {
	render() {
		return (
			<div className="svg-container" id="container">
				<svg viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet">
					<circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
				</svg>
			</div>
		);
	}
}
