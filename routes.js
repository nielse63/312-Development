// routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Store
import AppStore from './stores/AppStore';

// Main component
import App from './components/App';

// Pages
import Home from './components/Pages/Home';
import Article from './components/Pages/Article';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import ThankYou from './components/Pages/ThankYou';
import NoMatch from './components/Pages/NoMatch';

export default (
	<Route path="/" data={AppStore.data} component={App}>
		<IndexRoute component={Home} />
		<Route path="/articles/:slug" component={Article} />
		<Route path="about" component={About} />
		<Route path="contact" component={Contact} />
		<Route path="submission-received" component={ThankYou} />
		<Route path="*" component={NoMatch} />
	</Route>
);
