
// Footer.js
import React, { Component } from 'react'
import { Link } from 'react-router'

// Components
import Pattern from './Pattern'
import NavItem from './NavItem'

export default class Footer extends Component {

	static get propTypes() {
		return {
			navItems : React.PropTypes.array,
		}
	}

	static get defaultProps() {
		return {
			navItems : [],
		};
	}

	render() {

		const menuItems = this.props.navItems.map(function(item) {
			return (<NavItem key={`key-${item.key}`} url={item.value} text={item.label} />);
		});

		return (
			<footer className="footer">
				<Pattern />
				<div className="wrap container-fluid">
					<div className="flex flex-space-between">
						<div className="col col-left">
							<nav className="footer-nav">
								<ul>
									{menuItems}
								</ul>
							</nav>
						</div>
						<div className="col col-right">
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
}
