
// Footer.js
import React from 'react';
import { Link } from 'react-router';

// Components
import Pattern from './Pattern';

const Footer = function(props) {

	function makeNavItem(item) {
		return (
			<li key={`key-${item.key}`}>
				<Link to={item.value} activeClassName="active">{item.label}</Link>
			</li>
		);
	}

	const menuItems = props.data.globals.navItems.map(makeNavItem);

	return (
		<footer className="footer">
			<Pattern />
			<div className="wrap container-fluid">
				<div className="flex flex-space-between">
					<div className="col">
						<nav className="footer-nav">
							<ul>
								{menuItems}
							</ul>
						</nav>
					</div>
					<div className="col">
						<nav className="footer-nav footer-nav-right">
							<ul>
								<li><Link to="/">&copy; 2016 Erik Nielsen</Link></li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</footer>
	);
}

Footer.propTypes = {
	data: React.PropTypes.shape({
		globals: React.PropTypes.shape({
			navItems: React.PropTypes.array,
		}),
	}),
};

export default Footer
