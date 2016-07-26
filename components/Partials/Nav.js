
// Nav.js
import React, { Component } from 'react'
import { Link } from 'react-router'

// Components
import NavItem from './NavItem'

export default class Nav extends Component {

	static get propTypes() {
		return {
			navItems : React.PropTypes.array,
			cls      : React.PropTypes.string
		}
	}

	render() {

		const menuItems = this.props.navItems.map(function(item) {
			return (<NavItem key={`key-${item.key}`} url={item.value} text={item.label} />);
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
