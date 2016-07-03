
// Article.js
import React, { Component } from 'react'
import _ from 'lodash'
import config from '../../config'
import { withRouter } from 'react-router'

// Dispatcher
import AppDispatcher from '../../dispatcher/AppDispatcher'

// Components
import Block from '../Partials/Block'

export default class Article extends Component {

	componentWillMount() {
		window.postMessage('loading', window.location.origin);
		this.getPageData()
	}

	componentDidMount() {
    const data = this.props.data
    document.title = config.site.title + ' | ' + data.page.title
		window.postMessage('loaded', window.location.origin);
	}

	componentWillUnmount() {
		window.postMessage('unloaded', window.location.origin);
	}

	getPageData() {
		AppDispatcher.dispatch({
			action    : 'get-page-data',
			page_slug : 'articles',
			post_slug : this.props.params.slug
		})
	}

	render() {

		// console.log(this.props)
		const page = this.props.data.page

		// page vars
		const title = page.title
		// let content = page.content.replace(/\<img /g, '<img class="blog-figure"')
		let content = page.content

		// default
		let background = '/images/blog-sample.jpg'

		// meta fields
		const fields = page.metafield

		// background image
		if( fields.banner_image && fields.banner_image.value ) {
			background = fields.banner_image.imgix_url
		}
		const style = {
			backgroundImage : 'url(' + background + ')'
		}

		// leading paragraph
		if( fields.leading_paragraph && fields.leading_paragraph.value ) {
			content = ['<p class="article-lead">', fields.leading_paragraph.value, '</p>'].join('') + content
		}

		// links
		let buttons
		let links = []
		if( fields.links && fields.links.value ) {
			let linksArray = fields.links.value.split('\n')
			for(let i = 0; i < linksArray.length; i++) {
				const link = linksArray[i].split(':')
				const text = link.shift().trim()
				const url = link.join('').trim()

				links.push({
					text : text,
					url : url
				})
			}

			buttons = links.map(( link ) => {
				let icon = 'fa fa-' + link.text.toLowerCase()
				return (
					<li key={ 'key-' + link.text }>
						<a href={link.url} className="button button-blue"><i className={ icon }></i> {link.text}</a>
					</li>
				)
			})
		}

		let footer
		if( buttons ) {
			footer = <footer className="single-footer">
				<div className="single-footer-section section-row">
						<ul className="list list-inline flex-center single-buttons">
							{ buttons }
						</ul>
				</div>
			</footer>
		}

		return (
			<main className="main single" id="main">
				<section className="banner single-banner" style={ style }>
					<div className="wrap container-fluid">
						<div className="row">
							<div className="col-xs-12">
								<h2 className="banner-title single-title">{title}</h2>
							</div>
						</div>
					</div>
				</section>
		        <section className="page-content">
				<div className="wrap container-fluid">
					<div className="row single-row">
						<div className="col-xs-12">
							<article className="article single-article">
								<div className="row">
									<div className="col-xs-12 col-md-9 container-center article-content" dangerouslySetInnerHTML={{__html: content }} />
								</div>
							</article>
							{footer}
							{/*<footer className="single-footer">
								<div className="single-footer-section section-row">
									<p className="single-footer-lead">Stats:</p>
									<ul className="list list-inline flex-center single-buttons chart-buttons">
										<li><a href="#chart-commits" className="button active"><i className="fa fa-code"></i> Commits</a></li>
										<li><a href="#chart-frequency" className="button"><i className="fa fa-area-chart"></i> Code Frequency</a></li>
									</ul>
									<div className="single-chart single-chart-commits" id="chart-commits"></div>
									<div className="single-chart single-chart-frequency hidden" id="chart-frequency"></div>
								</div>
							</footer>*/}
						</div>
					</div>
				</div>
				</section>
			</main>
	    )
	}
}
