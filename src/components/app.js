
import { h, Component } from 'preact'
import { Router } from 'preact-router'
import S from 'string'
import Helmet from 'react-helmet'
import extend from 'lodash/assign'
import AppRouter from './router'
import { getScripts, getStyle, preloadImages } from '../lib/load-jquery'
import Header from './header'
import Footer from './footer'
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

  static getSize(width) {
    if (width > 1920) {
      return 'full'
    }
    if (width > 1400) {
      return 'xlarge'
    }
    if (width > 1080) {
      return 'large'
    }
    if (width > 480) {
      return 'medium'
    }
    return 'small'
  }

  static preload() {
    const scripts = []
    if (process.env.NODE_ENV === 'production') {
      scripts.push({
        src: 'https://cdn.ravenjs.com/3.9.1/raven.min.js',
        callback() {
          window.Raven.config('https://e375a4ff56f54d10bc63673d7fa53cb4@sentry.io/121634').install()
        },
      })
    }
    if (!window.jQuery) {
      scripts.push('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js')
    }
    getScripts(scripts)
    getStyle()
    preloadImages(
      App.getSize(window.innerWidth),
    )
  }

  static scrollListener() {
    let lastPosition = -1
    function loop() {
      if (lastPosition === window.pageYOffset) {
        requestAnimationFrame(loop)
        return false
      }
      lastPosition = window.pageYOffset
      document.dispatchEvent(
        new CustomEvent('scrolling'),
      )
      requestAnimationFrame(loop)
    }
    loop()
  }

  static resizeListener() {
    const throttle = function (type, name, obj = window) {
      let running = false
      let timer
      const func = function () {
        if (running) { return }
        running = true
        requestAnimationFrame(() => {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            timer = null
            obj.dispatchEvent(new CustomEvent(name))
          }, 250)
          running = false
        })
      }
      obj.addEventListener(type, func, {
        passive: true,
      })
    }
    throttle('resize', 'resizeend')
  }

  static setRAF() {
    window.requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) { window.setTimeout(callback, 1000 / 60) }
  }

  componentWillMount() {
    App.setRAF()
  }

  componentDidMount() {
    App.preload()

    setTimeout(() => {
      this.base.classList.add(this.getClass('ready'))

      setTimeout(() => {
        this.base.classList.add(this.getClass('done'))
        document.body.removeAttribute('data-loading')

        App.scrollListener()
        App.resizeListener()
      }, 500)
    }, 1000)
  }

  getClass(cls) {
    return this.props.classes[cls]
  }

  render() {
    return (
      <div id="app" className={this.getClass('default')}>
        <Header />
        <AppRouter />
        <Footer />
        <button data-menu />
      </div>
    )
  }
}

export default App
