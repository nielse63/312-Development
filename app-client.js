
// app-client.js
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
// require('offline-plugin/runtime').install();

// Routes
import routes from './routes';

// const Routes = (
// 	<Router history={browserHistory}>
// 		{routes}
// 	</Router>
// );
function Routes() {
	return (
		<Router history={browserHistory}>
			{routes}
		</Router>
	);
}

render(React.createElement(Routes), document.getElementById('app'));
