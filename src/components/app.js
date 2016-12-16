
import { h, Component } from 'preact'
import { Router } from 'preact-router'
import S from 'string'
import { getScript, getStyle, preloadImages } from '../lib/load-jquery'
import Header from './header'
import Footer from './footer'
import Home from './home'
import About from './about'
import Contact from './contact'
import Portfolio from './portfolio'
import ThankYou from './thank-you'
import NotFound from './404'
import config from '../config.json'

require('offline-plugin/runtime').install()

const { pushState } = history
history.pushState = (a, b, url) => {
  pushState.call(history, a, b, url)
  if (url.indexOf('#') < 0) scrollTo(0, 0)
}

class App extends Component {
  static setDefaultConfig() {
    if (config.SITE_TITLE) {
      return config
    }
    const titleArray = document.title.split('|')
    config.SITE_TITLE = titleArray[0] ? titleArray[0].trim() : ''
    config.SITE_DESCRIPTION = titleArray[1] ? titleArray[1].trim() : ''

    return config
  }

  constructor() {
    super()
    this.handleRoute = this._handleRoute.bind(this)
  }

  componentWillMount() {
    const width = window.innerWidth
    let size = 'small'
    if (width > 1920) {
      size = 'full'
    } else if (width > 1400) {
      size = 'xlarge'
    }  else if (width > 1080) {
      size = 'large'
    } else if (width > 480) {
      size = 'medium'
    }
    preloadImages(size)
  }

  componentDidMount() {
    getScript()
    getStyle()

    setTimeout(() => {
      this.base.classList.add(this.getClass('ready'))

      setTimeout(() => {
        this.base.classList.add(this.getClass('done'))
        document.body.removeAttribute('data-loading')
      }, 500)
    }, 1000)
  }

  getClass(cls) {
    return this.props.classes[cls]
  }

  setTitle() {
    const defaults = App.setDefaultConfig()

    let title = defaults.PAGE_TITLES[this.currentUrl] || S(this.currentUrl.replace(/\//, '')).capitalize().s
    if (!title) {
      title = `${defaults.SITE_TITLE} | ${defaults.SITE_DESCRIPTION}`
    } else {
      title = `${title} | ${defaults.SITE_TITLE}`
    }
    document.title = title
  }

  _handleRoute(e) {
    this.currentUrl = e.url
    this.setTitle()
    document.body.removeAttribute('class')
  }

  render() {
    return (
      <div id="app" className={this.getClass('default')}>
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <About path="/about/" />
          <Contact path="/contact/" />
          <Portfolio path="/portfolio/" />
          <ThankYou path="/thank-you/" />
          <NotFound default />
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App
