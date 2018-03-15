
const url = process.env.CURRENT_URL || 'https://localhost:9999';

const me = {
  name: 'Erik Nielsen',
  title: 'UI/UX Software Engineer',
}

module.exports = {
  me,
  title: `${me.name} | ${me.title}`,
  description: 'I\'m Erik Nielsen, a UI/UX/JavaScript, and Full-Stack Software Engineer from Chicago, Illinois.',
  url,
  image: `${url}/static/img/og-homepage.jpg`,
  analytics: (process.env.IS_HEROKU && !process.env.STAGING_ENV) ? `<script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', 'UA-33505945-1', 'auto');
  ga('send', 'pageview');
</script>
<link rel="preload" href="https://www.google-analytics.com/analytics.js" as="script">
<script async src="https://www.google-analytics.com/analytics.js"></script>` : ''
}
