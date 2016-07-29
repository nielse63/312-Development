
// app-server.js
import React from 'react'
import { match, RouterContext } from 'react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import express from 'express'
import hogan from 'hogan-express'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'
import compression from 'compression'
import raygun from 'raygun'
import config from './config'
import sslRedirect from 'heroku-ssl-redirect';

// Actions
import { getStore, getPostData, getPageData } from './actions/actions'

// Routes
import routes from './routes'

// raygun
const raygunClient = new raygun.Client().init({
	apiKey: config.raygun.apiKey,
	enablePulse : true,
	enableCrashReporting : false
});

// Express
const app = express()
app.engine('html', hogan)
app.set('views', `${__dirname}/views`)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public/`))
if( process.env.ON_LOCAL !== 'true' ) {
	app.use(sslRedirect(['production']))
}

app.set('port', (process.env.PORT || 5000))

app.post('/submit', (req, res) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.mailgun.org',
		port: 465,
		secure: true,
		auth: {
			user: 'postmaster@312development.com',
			pass: '62479f8b7f91ade480f7eb80ef52002e'
		}
	});

	let output = [];
	if( typeof req.body === 'object' ) {
		Object.keys(req.body).forEach(function(k) {
			const v = req.body[k];
			output.push(`<p><strong>${k}:</strong> ${v}</p>`);
		});
	}

	// send mail with defined transport object
	transporter.sendMail({
		from    : '"312 Development " <contact@312development.com>',
		to      : 'erik@312development.com',
		subject : 'New Contact Form Submission',
		html    : output.join('')
	}, function(error, info) {
		if(error){
			console.warn([error, info])
		}
		res.redirect(302, '/submission-received')
	});
});

app.get('*', (req, res) => {

	getStore(function(err, AppStore) {
		if(err) {
			return res.status(500).end('error')
		}
		return match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

			const slugArray = req.url.split('/')
			const pageSlug = slugArray[1]

			if(pageSlug === 'articles') {
				getPostData(slugArray[2])
			} else {
				getPageData(pageSlug)
			}

			res.locals.page = AppStore.data.page // eslint-disable-line no-param-reassign
			res.locals.site = config.site // eslint-disable-line no-param-reassign

			// Get React markup
			const reactMarkup = renderToStaticMarkup(<RouterContext {...renderProps} />)
			res.locals.reactMarkup = reactMarkup // eslint-disable-line no-param-reassign

			if (error) {
				raygunClient.send(error)
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

// bind raygun
app.use(raygunClient.expressHandler)

// listen to server
app.listen(app.get('port'), function() {
	console.info('==> ✅  Server is listening in ' + process.env.NODE_ENV + ' mode')
	console.info('==> 🌎  Go to http://localhost:%s', app.get('port'))
})

