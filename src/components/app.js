
import { h, Component } from 'preact'
import { Router } from 'preact-router'
import Header from './header'
import Footer from './footer'
import Home from './home'
import About from './about'
import Contact from './contact'
import Portfolio from './portfolio'
import config from '../config'
import S from 'string'
import store from '../store'

require('offline-plugin/runtime').install()

const { pushState } = history
history.pushState = (a, b, url) => {
  pushState.call(history, a, b, url)
  if (url.indexOf('#') < 0) scrollTo(0, 0)
}

export default class App extends Component {

  setTitle() {
    console.log(this)
    let title = config.PAGE_TITLES[this.currentUrl] || S(this.currentUrl.replace(/\//, '')).capitalize().s
    if (!title) {
      title = `${config.SITE_TITLE} | ${config.SITE_DESCRIPTION}`
    } else {
      title = `${title} | ${config.SITE_TITLE}`
    }
    document.title = title
  }

  handleRoute = e => {
    this.currentUrl = e.url
    this.setTitle()
  }

  render() {
    return (
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <About path="/about/" />
          <Contact path="/contact/" />
          <Portfolio path="/portfolio/" />
        </Router>
        <Footer />
      </div>
    )
  }
}
