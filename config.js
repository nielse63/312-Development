
// config.js
module.exports = {
	site : {
		title       : '312 Development',
		description : 'Chicago-based JavaScript Engineer specializing in React and Angular development with a focus on performance and algorithm design.',
		url         : 'https://312development.com',
		twitter     : 'erikkylenielsen',
		version     : require('./package.json').version,
	},
	raygun : {
		apiKey : process.env.RAYGUN_APIKEY || '',
	},
	contentful : {
		accessToken : process.env.CONTENTFUL_TOKEN || '',
		space : process.env.CONTENTFUL_SPACE || '',
		host : process.env.CONTENTFUL_HOST || '',
		content_type : process.env.CONTENTFUL_CONTENT_TYPE || '',
	},
	mailgun : {
		user : process.env.MAILGUN_USER || '',
		pass : process.env.MAILGUN_PASS || '',
	},
};
