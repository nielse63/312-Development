// import 'lie';
// import 'isomorphic-fetch';
import { h, render } from 'preact'
import './style/index.scss'

let root
function init() {
  const App = require('./components/app').default
  root = render(<App />, document.body, root)
}

init()

if (module.hot) {
  module.hot.accept('./components/app', () => requestAnimationFrame(init))
}
