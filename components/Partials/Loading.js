
// Loading.js
import React, { Component } from 'react'

export default class Loading extends Component {
	render() {
		return (
			<div className="svg-container" id="container">
				<svg id="loader" width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
					<path id="jump" fill="none" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M47.5,94.3c0-23.5,19.9-42.5,44.5-42.5s44.5,19,44.5,42.5" />
					<g strokeWidth="1">
						<ellipse id="circleL" strokeMiterlimit="10" cx="47.2" cy="95.6" rx="10.7" ry="2.7" />
						<ellipse id="circleR" strokeMiterlimit="10" cx="136.2" cy="95.6" rx="10.7" ry="2.7" />
					</g>
				</svg>
			</div>
		)
	}
}
