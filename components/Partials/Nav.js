
// Nav.js
import React from 'react';
import { Link } from 'react-router';

const Nav = function(props) {

	function makeNavItem(item) {
		return (
			<li key={`key-${item.key}`}>
				<Link to={item.value} activeClassName="active">{item.label}</Link>
			</li>
		);
	}

	const menuItems = props.navItems.map(makeNavItem);

	return (
		<nav className={props.cls}>
			<ul className="nav-menu list-inline">
				{menuItems}
				<li className="line"></li>
			</ul>
		</nav>
	);
}

Nav.propTypes = {
	navItems: React.PropTypes.array,
	cls: React.PropTypes.string
};

export default Nav
