
// MobileNav.js
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class MobileNav extends Component {

	render() {
		const navItems = this.props.navItems;
		const menuItems = navItems.map(( item ) => {
			return (
				<li key={'key-' + item.key}>
					<Link to={item.value} activeClassName="active">{item.title}</Link>
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
