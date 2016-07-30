
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
							<nav className="footer-nav">
								<ul>
									<li><Link to="/">&copy; 2016 Erik Nielsen</Link></li>
									<li>
										<a href="https://twitter.com/erikkylenielsen/" target="_blank">
											<i className="fa fa-twitter" />
										</a>
									</li>
									<li>
										<a href="https://github.com/nielse63/" target="_blank">
											<i className="fa fa-github" />
										</a>
									</li>
									<li>
										<a href="https://www.linkedin.com/in/erikkylenielsen/" target="_blank">
											<i className="fa fa-linkedin" />
										</a>
									</li>
									<li>
										<a href="https://dribbble.com/ErikKyleNielsen/" target="_blank">
											<i className="fa fa-dribbble" />
										</a>
									</li>
									<li>
										<a href="https://github.com/nielse63/312-Development/" target="_blank">View Source Code</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}
