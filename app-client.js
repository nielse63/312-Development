// app-client.js
import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
// const history = createBrowserHistory()
// import { hashHistory } from 'react-router'
import { browserHistory } from 'react-router'

// Routes
import routes from './routes'

const Routes = (
  <Router history={ browserHistory }>
    { routes }
  </Router>
)

const app = document.getElementById('app')
render(Routes, app)
