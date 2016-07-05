
// app-server.js
// import { match, history, RouterContext } from 'react-router'

import React from 'react'
import { match, RouterContext, Route, IndexRoute } from 'react-router'
// import ReactDOMServer from 'react-dom/server'
import { renderToStaticMarkup } from 'react-dom/server'
import express from 'express'
import hogan from 'hogan-express'
import config from './config'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'


// Actions
import { getStore, getPostData, getPageData } from './actions/actions'

// Routes
import routes from './routes'

// Express
const app = express()
app.engine('html', hogan)
app.set('views', __dirname + '/views')
app.use('/', express.static(__dirname + '/public/'))
app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
	var transporter = nodemailer.createTransport({
		host: 'smtp.mailgun.org',
		port: 465,
		secure: true,
		auth: {
			user: 'postmaster@312development.com',
			pass: '62479f8b7f91ade480f7eb80ef52002e'
		}
	});

	// verify connection configuration
	transporter.verify(function(error, success) {
		if (error) {
			console.log(error);
		} else {
			console.log('Server is ready to take our messages');
		}
	});

	var output = [];
	for(var k in req.body) {
		var v = req.body[k];
		output.push(`<p><strong>${k}:</strong> ${v}</p>`);
	}

	// send mail with defined transport object
	transporter.sendMail({
		from: '"312 Development " <contact@312development.com>',
		to: 'erik@312development.com',
		subject: 'New Contact Form Submission',
		html: output.join('')
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
		match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

			const slugArray = req.url.split('/')
			const pageSlug = slugArray[1]
			if(pageSlug === 'articles') {
				getPostData(slugArray[2])
			} else {
				getPageData(pageSlug)
			}

			res.locals.page = AppStore.data.page
			res.locals.site = config.site

			// Get React markup
			const reactMarkup = renderToStaticMarkup(<RouterContext {...renderProps} />)
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
})

app.listen(app.get('port'), function() {
	console.info('==> ✅  Server is listening in ' + process.env.NODE_ENV + ' mode')
	console.info('==> 🌎  Go to http://localhost:%s', app.get('port'))
});
