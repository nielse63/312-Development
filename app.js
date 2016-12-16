
var express = require('express')
var path = require('path')
var sslRedirect = require('heroku-ssl-redirect')
var raven = require('raven')
var app = express()


// error handling
// function onError(err, req, res, next) {
//     // The error id is attached to `res.sentry` to be returned
//     // and optionally displayed to the user for support.
//     res.statusCode = 500;
//     res.end(res.sentry+'\n');
// }
app.use(raven.middleware.express.requestHandler('https://e375a4ff56f54d10bc63673d7fa53cb4:c7e89fcc134e4f629d5b3e71ccb6c320@sentry.io/121634'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.use(raven.middleware.express.errorHandler('https://e375a4ff56f54d10bc63673d7fa53cb4:c7e89fcc134e4f629d5b3e71ccb6c320@sentry.io/121634'));
// app.use(onError);

// app config
app.set('port', (process.env.PORT || 3000))
app.use(express.static('build'))
app.use(sslRedirect(['production'], 301))

app.listen(app.get('port'), function () {
  console.log('Viewable at http://localhost:%s', app.get('port'))
})
