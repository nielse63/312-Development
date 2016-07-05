
// Header.js
import React from 'react';
import { Link } from 'react-router';

// Components
import Nav from './Nav';

const Header = function(props) {
	return (
		<header className="header">
			<div className="wrap container-fluid">
				<div className="flex flex-middle flex-space-between">
					<div className="col hidden-small">
						<Nav navItems={props.navItems} cls="topnav" />
					</div>
					<div className="col logo-col">
						<h1 className="logo">
							<Link to="/"><span className="icon">312</span>Development</Link>
						</h1>
						<button className="hamburger hamburger--spin js-hamburger">
							<div className="hamburger-box">
								<div className="hamburger-inner"></div>
							</div>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}

Header.propTypes = {
	navItems: React.PropTypes.array,
};

export default Header
