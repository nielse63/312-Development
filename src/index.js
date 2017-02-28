
import 'babel-register' // eslint-disable-line import/no-extraneous-dependencies
import { h, render } from 'preact'
import style from './style/index.scss'

const App = require('./components/app').default

let appRoot = null
function init() {
  appRoot = render(
    <App
      classes={{
        default: style.main,
        internal: style.internal,
        ready: style.ready,
        done: style.complete,
        loading: style.loading,
      }}
    />,
    document.body, appRoot
  )
}

init()

if (process.env.NODE_ENV !== 'production') {
  require('preact/devtools') // eslint-disable-line global-require
}

if (module.hot) {
  module.hot.accept('./components/app', () => requestAnimationFrame(init))
}
