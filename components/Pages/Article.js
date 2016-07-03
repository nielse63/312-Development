
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
		console.log(this.props.data)

		// page vars
		const title = page.title
		// let content = page.content.replace(/\<img /g, '<img class="blog-figure"')
		let content = page.content

		// default
		let background = window.location.origin + '/images/blog-sample.jpg'

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

		// share links
		const url = window.location.origin + '/articles/' + this.props.routeParams.slug
		const shareText = 'Check out ' + title + ' on 312 Development at ' + url
		const image = background
		const encodedText = encodeURIComponent(shareText)
		const encodedURL = encodeURIComponent(url)
		// console.log(url)
		// $short_url = get_post_meta( $post->ID, '_shortened_url', true );
		// if( ! $short_url ) {
		// 	$short_url = shorten_url( $url );
		// 	update_post_meta( $post->ID, '_shortened_url', $short_url );
		// }

		// urls
		const facebook_url   = url
		const twitter_url    = 'https://twitter.com/intent/tweet?text=' + encodedText + '&amp;via=cliquechicago&amp;url=' + encodedURL
		const googleplus_url = url
		const linkedin_url   = 'http://www.linkedin.com/shareArticle?mini=true&amp;url=' + url + '&amp;title=' + encodedText + '&amp;summary=' + encodedText + encodedURL + '&amp;source=http://312development.com'

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
							<footer className="single-footer">
								<div className="single-footer-section section-row">
									<p className="article-lead">Share:</p>
									<ul className="list list-inline flex-center single-buttons chart-buttons">
										<li><a href={twitter_url} data-share="twitter" className="button button-twitter"><i className="fa fa-twitter"></i> Tweet</a></li>
										<li><a href={linkedin_url} data-share="linkedin" className="button button-linkedin"><i className="fa fa-linkedin"></i> Share</a></li>
										<li><a href={facebook_url} data-share="facebook" className="button button-facebook"><i className="fa fa-facebook"></i> Post</a></li>
										<li><a href={googleplus_url} data-share="googleplus" className="button button-googleplus"><i className="fa fa-googleplus"></i> Send</a></li>
									</ul>
								</div>
							</footer>
						</div>
					</div>
				</div>
				</section>
			</main>
	    )
	}
}
