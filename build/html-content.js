
var url = process.env.NODE_ENV === 'production' ? 'https://312development.com' : 'https://localhost:9999';
if(process.env.STAGING_ENV) {
  url = 'https://staging312.herokuapp.com';
}

module.exports = {
  title: 'Erik Nielsen | UI/UX Software Engineer',
  description: 'I’m Erik Nielsen, a User-Interface and Full-Stack Software Engineer from Chicago, Illinois. I’ve been in the industry for over 8 years, and work with the fine folks at Enova International.',
  url,
  image: `${url}/static/img/og-homepage.jpg`
}
