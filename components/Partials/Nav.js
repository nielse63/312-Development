
// Nav.js
import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Nav extends Component {

	render() {

		const navItems = this.props.navItems
		const menuItems = navItems.map(( item ) => {
			return (
				<li key={ 'key-' + item.key }>
					<Link to={ item.value } activeClassName="active">{ item.title }</Link>
				</li>
			)
		})

		return (
			<nav className={this.props.cls}>
				<ul className="nav-menu list-inline">
					{ menuItems }
					<li className="line"></li>
				</ul>
			</nav>
		)
	}
}
