/* eslint-disable global-require */

import { h, render } from 'preact'
import style from './style/index.scss'

let root
function init() {
  const App = require('./components/app').default
  root = render(
    <App
      classes={{
        default: style.main,
        internal: style.internal,
        ready: style.ready,
        done: style.complete,
        loading: style.loading,
      }}
    />,
    document.body, root,
  )
}

init()

if (module.hot) {
  require('preact/devtools')
  module.hot.accept('./components/app', () => requestAnimationFrame(init))
}
