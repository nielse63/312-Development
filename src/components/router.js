
import { h, Component } from 'preact'
import { Router } from 'preact-router'
import extend from 'lodash.assign'
import Home from './home'
import About from './about'
import Contact from './contact'
import Portfolio from './portfolio'
import ThankYou from './thank-you'
import NotFound from './404'
import config from '../config.json'

export default class AppRouter extends Component {

  constructor() {
    super()
    this.handleRoute = this._handleRoute.bind(this)
  }

  _handleRoute(e) {
    this.updateDocument(e.url)
  }

  updateDocument(url) {
    document.dispatchEvent(new CustomEvent('routed'))
    document.body.removeAttribute('class')
    document.title = this.createTitle(url)
  }

  getMeta(url) {
    this.meta = config.META[url] || config.META['404']
    return extend({}, config.META.default, this.meta)
  }

  createTitle(url) {
    const data = this.getMeta(url)
    const title = data.title || data.defaultTitle
    const description = data.description || data.backupTitle
    return `${title} | ${description}`
  }

  render() {
    return (
      <Router onChange={this.handleRoute}>
        <Home path="/" />
        <About path="/about/" />
        <Contact path="/contact/" />
        <Portfolio path="/portfolio/" />
        <ThankYou path="/thank-you/" />
        <NotFound default />
      </Router>
    )
  }
}
