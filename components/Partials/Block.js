
// Block.js
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Block extends Component {

	makeSlug(string) {
		let path = string.replace(/[\s|_|.]/g, '-');

		// remove leading slash
		if (path[0] === '/') {
			path = path.substr(1);
		}

		return path.replace(/\//g, '-')
		.toLowerCase()
		.split('.')[0];
	}

	render() {
		const data = this.props.data;


		// single vars
		const id = data.id;
		const category = data.category;
		const title = data.title;
		const excerpt = data.excerpt;
		const slug = '/articles/' + this.makeSlug(title);
		const background = this.props.background;
		// const style = {
		// 	backgroundImage : 'url(' + background + ')',
		// };

		return (
			<li className="work-block" data-id={id}>
			<Link to={slug}>
			<figure className="work-block-figure" data-src={background} />
			<div className="work-block-content">
			<header className="work-block-header">
			<p className="tag">{category}</p>
			<h3>{title}</h3>
			</header>
			<p className="preview" dangerouslySetInnerHTML={{ __html : excerpt }} />
			</div>
			</Link>
			</li>
			);
	}
}
