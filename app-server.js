
// app-server.js
import React from 'react'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import express from 'express'
import hogan from 'hogan-express'
import config from './config'

// Actions
import { getStore, getPageData } from './actions/actions'

// Routes
import routes from './routes'

// Express
const app = express()
app.engine('html', hogan)
app.set('views', __dirname + '/views')
app.use('/', express.static(__dirname + '/public/'))
app.set('port', (process.env.PORT || 3000))

app.get('*', (req, res) => {

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {

			getStore(function(err, AppStore) {
				const slugArray = req.url.split('/')
				let pageSlug = slugArray[1]
				let postSlug
				if(pageSlug === 'articles') {
					postSlug = slugArray[2]
					getPostData(postSlug)
				}
				// getPageData(pageSlug, postSlug)
				const page = AppStore.data.page
				res.locals.page = page
				res.locals.site = config.site
				console.log(renderToString)

				// You can also check renderProps.components or renderProps.routes for
				// your "not found" component or route respectively, and send a 404 as
				// below, if you're using a catch-all route.
				res.status(200).send(renderToString(<RouterContext {...renderProps} />))
			});
		} else {
			res.status(404).send('Not found')
		}
	})
})

app.listen(app.get('port'))

console.info('==> ✅  Server is listening in ' + process.env.NODE_ENV + ' mode')
console.info('==> 🌎  Go to http://localhost:%s', app.get('port'))
