
// app-server.js
import React from 'react'
import { match, RoutingContext } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import hogan from 'hogan-express'

// Routes & Actions
import config from './config'
import routes from './routes'
import AppStore from './stores/AppStore'
import { getPageData } from './actions/actions'

// Express
const app = express()
app.engine('html', hogan)
app.set('views', __dirname + '/views')
app.use('/', express.static(__dirname + '/public/'))
app.set('port', (process.env.PORT || 3000))

app.get('*',(req, res) => {

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

		const slug_arr = req.url.split('/')
		let page_slug = slug_arr[1]
		let post_slug
		if(page_slug === 'articles') {
			post_slug = slug_arr[2]
		}
		getPageData(page_slug, post_slug)
		const page = AppStore.data.page
		res.locals.page = page
		res.locals.site = config.site

		// Get React markup
		const reactMarkup = ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps} />)
		res.locals.reactMarkup = reactMarkup

		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {

			// Success!
			res.status(200).render('index.html')
		} else {
			res.status(404).render('index.html')
		}
	})
})

app.listen(app.get('port'))

console.info('==> Server is listening in ' + process.env.NODE_ENV + ' mode')
console.info('==> Go to http://localhost:%s', app.get('port'))
