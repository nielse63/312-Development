var superstatic = require('superstatic')
var connect = require('connect');

var app = connect()
    .use(superstatic({
      config: './.superstatic.json'
    }));

app.listen(process.env.PORT || 3000, function() {
  console.log('Now listening on port 3000')
});
