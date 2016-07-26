
// Nav.js
import React, { Component } from 'react';
import { Link } from 'react-router';

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher';

export default class NavItem extends Component {

	static get propTypes() {
		return {
			items : React.PropTypes.array,
			url   : React.PropTypes.string,
			text  : React.PropTypes.string
		}
	}

	static get defaultProps() {
		return {
			items : [],
			url   : '',
			text  : ''
		};
	}

	onClick() {
		return AppDispatcher.dispatch({
			action : 'did-click-link',
		});
	}

	render() {
		return (
			<li>
				<Link to={this.props.url} activeClassName="active" onClick={this.onClick}>{this.props.text}</Link>
			</li>
		);
	}
}
