
// MobileNav.js
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class MobileNav extends Component {

	render() {
		const menuItems = this.props.navItems.map((item) => {
			return (
				<li key={'key-' + item.key}>
					<Link to={item.value} activeClassName="active">{item.label}</Link>
				</li>
			);
		});

		return (
			<nav className="mobile-nav">
				<ul className="nav-menu list">
					{menuItems}
					<li className="line"></li>
				</ul>
			</nav>
		);
	}
}
