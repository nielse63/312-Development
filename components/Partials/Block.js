
// Block.js
import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

export default class Block extends Component {

	render() {
		const data = this.props.data;

		// single vars
		const id = data._id;
		const metafields = data.metafields;
		const category = _.findWhere(metafields, { key : 'category' }).value;
		const title = data.title;
		const slug = '/articles/' + data.slug;
		const background = this.props.background;
		const style = {
			backgroundImage : 'url(' + background + ')',
		};

		const previewObject = _.findWhere(metafields, { key : 'preview_text' });
		const preview = !! previewObject && previewObject.value ? previewObject.value : _.findWhere(metafields, { key : 'leading_paragraph' }).value;

		return (
		 <li className="work-block" data-id={id}>
			<Link to={slug}>
				<figure className="work-block-figure" style={style}></figure>
				<div className="work-block-content">
					<header className="work-block-header">
						<p className="tag">{category}</p>
						<h3>{title}</h3>
					</header>
					<p className="preview">{preview}</p>
				</div>
			</Link>
		</li>
		);
	}
}
