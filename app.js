
var express = require('express')
var path = require('path')
var app = express()

// app config
app.set('port', (process.env.PORT || 3000))
app.use(express.static('build'))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(app.get('port'), function () {
  console.log('Viewable at http://localhost:%s', app.get('port'))
})
