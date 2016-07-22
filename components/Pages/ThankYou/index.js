
// ThankYou.js
import React, { Component } from 'react';
import config from '../../../config';
import AppStore from '../../../stores/AppStore'

export default class ThankYou extends Component {

	static get propTypes() {
		return {
			pageTitle: React.PropTypes.string,
		}
	}

	static get defaultProps() {
		return {
			pageTitle : 'Submission Received',
		};
	}

	componentDidMount() {
		document.title = config.site.title + ' | ' + (AppStore.data.page.title || this.props.pageTitle);
		window.postMessage('loaded', window.location.origin);
	}

	componentWillUnmount() {
		window.postMessage('unloaded', window.location.origin);
	}

	render() {
		return (
			<div>
				<section className="banner contact-banner">
					<div className="wrap container-fluid">
						<div className="row">
							<div className="col-xs-12">
								<h2 className="banner-title contact-title">{this.props.pageTitle}</h2>
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
										<div className="col-xs-12 col-md-9 container-center article-content">
											<p className="article-lead">Your submission has been sent &ndash; I'll get in touch with you shortly.</p>
										</div>
									</div>
								</article>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
