
import { h, Component } from 'preact'
import { Router } from 'preact-router'
import Home from './home'
import About from './about'
import Contact from './contact'
import Portfolio from './portfolio'
import ThankYou from './thank-you'
import NotFound from './404'

export default class AppRouter extends Component {

  constructor() {
    super()
    this.handleRoute = this._handleRoute.bind(this)
  }

  _handleRoute(e) {
    this.currentUrl = e.url
    document.dispatchEvent(new CustomEvent('routed'))
    document.body.removeAttribute('class')
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
