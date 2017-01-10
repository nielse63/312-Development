/* eslint-disable class-methods-use-this */

import { h, Component } from 'preact'
import { Router } from 'preact-router'
import S from 'string'
import extend from 'lodash.assign'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate'
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

export default class App extends Component {
  static setDefaultConfig() {
    if (config.SITE_TITLE) {
      return config
    }
    const titleArray = document.title.split('|')
    config.SITE_TITLE = titleArray[0] ? titleArray[0].trim() : ''
    config.SITE_DESCRIPTION = titleArray[1] ? titleArray[1].trim() : ''

    return config
  }

  // TODO: move preload functions to their own class
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
    getScripts(scripts)
    getStyle()
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
      return requestAnimationFrame(loop)
    }
    loop()
  }

  static resizeListener() {
    function throttle(type, name) {
      let running = false
      let timer
      function fn() {
        if (running) { return }
        running = true
        requestAnimationFrame(() => {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            timer = null
            window.dispatchEvent(new CustomEvent(name))
          }, 250)
          running = false
        })
      }
      window.addEventListener(type, fn, {
        passive: true,
      })
    }
    throttle('resize', 'resizeend')
  }

  static setRAF() {
    window.requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function raf(callback) { window.setTimeout(callback, 1000 / 60) }
  }

  componentWillMount() {
    App.setRAF()
  }

  componentDidMount() {
    this.listenToServiceWorker()
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

  // TODO: Move service worker functions to their own class
  listenToServiceWorker() {
    /* eslint-disable no-console */

    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost')
    ) {
      const registration = runtime.register()

      registerEvents(registration, {
        onInstalled: () => {
          console.log('[SW]: Installed')
        },
        onUpdateReady: () => {
          console.log('SW]: Update ready')
        },

        onUpdating: () => {
          console.log('SW]: Updating')
        },
        onUpdateFailed: () => {
          console.log('SW]: Update Failed')
        },
        onUpdated: () => {
          console.log('SW]: Updated')
        },
      })
    } else {
      console.log('[SW]: ServiceWorker not available')
    }
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
