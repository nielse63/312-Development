
// app-client.js
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

// Routes
import routes from './routes';

function Routes() {
	return (
		<Router history={ browserHistory }>
			{routes}
		</Router>
	);
}

render(React.createElement(Routes), document.getElementById('app'));

// Offline
require('offline-plugin/runtime').install();

// UI
require('./assets/scripts/app');
