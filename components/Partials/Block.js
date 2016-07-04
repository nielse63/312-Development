
// Block.js
import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

export default class Block extends Component {

	makeSlug(string) {
		// string = string || window.location.href;

		// var a = document.createElement('a');
		// a.href = string.replace(/[\s|_|.]/g, '-');

		// var path = a.pathname;
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
		// const metafields = data.metafields;
		const category = data.category;
		const title = data.title;
		const excerpt = data.excerpt;
		// console.log(title)
		const slug = '/articles/' + this.makeSlug(title);
		// console.log(slug)
		// return (
		// 	<div />
		// );
		const background = this.props.background;
		const style = {
			backgroundImage : 'url(' + background + ')',
		};

		// const previewObject = _.findWhere(metafields, { key : 'preview_text' });
		// const preview = !! previewObject && previewObject.value ? previewObject.value : _.findWhere(metafields, { key : 'leading_paragraph' }).value;

		return (
			 <li className="work-block" data-id={id}>
				<Link to={slug}>
					<figure className="work-block-figure" style={style}></figure>
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
