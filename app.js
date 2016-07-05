// app.js
require('babel/register')
if(process.env.NODE_ENV === 'development') {
	require('./dev-app-server.js')
} else {
	require('./app-server.js')
}
