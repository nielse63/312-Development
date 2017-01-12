/* eslint-disable class-methods-use-this */

import { h, Component } from 'preact'
import { Router } from 'preact-router'
import AppRouter from './router'
import { getScripts, getStyle } from '../lib/preload'
import { listener } from '../lib/sw-listener'
import Header from './header'
import Footer from './footer'
import config from '../config.json'

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
    listener()
    getStyle()

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
