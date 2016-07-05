
// MobileNav.js
import React from 'react';
import { Link } from 'react-router';

const MobileNav = function(props) {

	function makeNavItem(item) {
		return (
			<li key={`key-${item.key}`}>
				<Link to={item.value} activeClassName="active">{item.label}</Link>
			</li>
		);
	}

	const menuItems = props.navItems.map(makeNavItem);

	return (
		<nav className="mobile-nav">
			<ul className="nav-menu list">
				{menuItems}
			</ul>
		</nav>
	);
}

MobileNav.propTypes = {
	navItems: React.PropTypes.array,
	cls: React.PropTypes.string
};

export default MobileNav
