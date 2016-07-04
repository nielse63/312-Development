
// app-server.js
// import { match, history, RouterContext } from 'react-router'

import React from 'react'
import { match, RoutingContext, Route, IndexRoute } from 'react-router'
// import ReactDOMServer from 'react-dom/server'
import { renderToString } from 'react-dom/server'
import express from 'express'
import hogan from 'hogan-express'
import config from './config'

// Actions
import { getStore, getPostData } from './actions/actions'

// Routes
import routes from './routes'

// Express
const app = express()
app.engine('html', hogan)
app.set('views', __dirname + '/views')
app.use('/', express.static(__dirname + '/public/'))
app.set('port', (process.env.PORT || 3030))

app.get('*',(req, res) => {
	// console.log('app get complete')
	getStore(function(err, AppStore) {
		// console.log('getStore complete')
		if(err){
			return res.status(500).end('error')
		}
		// console.log('no errors')
		match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
			// console.log('match complete');

			const slugArray = req.url.split('/')
			const pageSlug = slugArray[1]
			let postSlug
			if(pageSlug === 'articles') {
				postSlug = slugArray[2]
				getPostData(postSlug)
				res.locals.page = AppStore.data.page
			}
			// getPageData(pageSlug, postSlug)

			// Get page data for template
			// const slug_arr = req.url.split('/')

			// let page_slug = slug_arr[1]
			// let post_slug
			// if(page_slug === 'blog' || page_slug === 'work')
			// 	post_slug = slug_arr[2]
			// getPageData(page_slug, post_slug)
			// const page = AppStore.data.page
			// console.log(page);
			// res.locals.page = page
			res.locals.site = config.site

			// Get React markup
			// try {
			// console.log(renderProps);
				const reactMarkup = renderToString(<RoutingContext {...renderProps} />)
				res.locals.reactMarkup = reactMarkup
			// } catch(e) {
			// 	throw new Error(e);
			// }
			// console.log('render complete');

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
})

// app.engine('html', hogan)
// app.set('views', __dirname + '/views')
// app.use('/', express.static(__dirname + '/public/'))
// app.set('port', (process.env.PORT || 3030))

// app.get('*', (req, res) => {

// 	match({ history, routes }, (error, redirectLocation, renderProps) => {
// 		console.log(error, redirectLocation, renderProps);
// 		// render(<Router {...renderProps} />, mountNode)
// 	})

// 	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

// 		if (error) {
// 			res.status(500).send(error.message)
// 		} else if (redirectLocation) {
// 			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
// 		} else if (renderProps) {

// 			getStore(function(err, AppStore) {
// 				const slugArray = req.url.split('/')
// 				let pageSlug = slugArray[1]
// 				let postSlug
// 				if(pageSlug === 'articles') {
// 					postSlug = slugArray[2]
// 					getPostData(postSlug)
// 					res.locals.page = AppStore.data.page
// 				}
// 				// getPageData(pageSlug, postSlug)
// 				res.locals.site = config.site

// 				// You can also check renderProps.components or renderProps.routes for
// 				// your "not found" component or route respectively, and send a 404 as
// 				// below, if you're using a catch-all route.
// 				res.status(200).send(renderToString(<RouterContext {...renderProps} />))
// 			});
// 		} else {
// 			res.status(404).send('Not found')
// 		}
// 	})
// })

app.listen(app.get('port'))

console.info('==> ✅  Server is listening in ' + process.env.NODE_ENV + ' mode')
console.info('==> 🌎  Go to http://localhost:%s', app.get('port'))
