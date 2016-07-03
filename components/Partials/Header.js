
// Header.js
import React, { Component } from 'react'
import { Link } from 'react-router'

// Components
import Nav from './Nav'

export default class Header extends Component {
	render() {

		return (
			<header className='header'>
				<div className="wrap container-fluid">
					<div className="flex flex-middle flex-space-between">
						<div className="col hidden-small">
							<Nav navItems={ this.props.navItems } cls="topnav" />
						</div>
						<div className='col logo-col'>
							<h1 className='logo'>
							 <Link to="/"><span className='icon'>312</span>Development</Link>
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
		)
	}
}
