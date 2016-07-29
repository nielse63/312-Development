
var pckage = require('./package.json');

// config.js
module.exports = {
	site : {
		title       : '312 Development',
		description : 'Front-End Developer and JavaScript Engineer',
		url         : 'https://312development.com',
		version     : pckage.version,
	},
	raygun : {
		apiKey : process.env.RAYGUN_APIKEY,
	},
	contentful : {
		accessToken : process.env.CONTENTFUL_TOKEN,
		space : process.env.CONTENTFUL_SPACE,
		host : process.env.CONTENTFUL_HOST,
		content_type : process.env.CONTENTFUL_CONTENT_TYPE
	},
	mailgun : {
		user : process.env.MAILGUN_USER,
		pass : process.env.MAILGUN_PASS,
	},
};
