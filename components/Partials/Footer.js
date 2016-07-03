
// Footer.js
import React, { Component } from 'react';
import { Link } from 'react-router';

// Components
import Pattern from './Pattern';

export default class Footer extends Component {

	render() {
		const data = this.props.data;
		const navItems = data.globals.navItems;

		const menuItems = navItems.map( ( nav_item ) => {
			return (
				<li key={'key-' + nav_item.key}>
					<Link to={nav_item.value} activeClassName="active">{nav_item.title}</Link>
				</li>
			);
		} );

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
									<li><Link to="/">Credits, Code, &amp; Styleguide</Link></li>
									<li><Link to="/">&copy; 2016 Erik Nielsen</Link></li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}
