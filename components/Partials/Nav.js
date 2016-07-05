
// Nav.js
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Nav extends Component {

	render() {
		const menuItems = this.props.navItems.map((item) => {
			return (
				<li key={'key-' + item.key}>
					<Link to={item.value} activeClassName="active">{item.label}</Link>
				</li>
			);
		});

		return (
			<nav className={this.props.cls}>
				<ul className="nav-menu list-inline">
					{menuItems}
					<li className="line"></li>
				</ul>
			</nav>
		);
	}
}
