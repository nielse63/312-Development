
// app-client.js
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';

// Routes
import routes from './routes';

const Routes = (
	<Router history={browserHistory}>
		{routes}
	</Router>
);

render(Routes, document.getElementById('app'));
