// AppDispatcher.js
import { Dispatcher } from 'flux';
import { getTweets, getStore } from '../actions/actions';

const AppDispatcher = new Dispatcher();

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {
	const action = payload.action;
	switch (action) {

	case 'get-Tweets':
		getTweets();
		break;

	case 'get-app-store':
		getStore();
		break;

	case 'get-page-data':
		getPageData(payload.page_slug);
		break;

	// case 'get-page-data':
	// 	getPageData(payload.page_slug, payload.post_slug);
	// 	break;

	// case 'get-more-items':
	// 	getMoreItems();
	// 	break;

	default:
		return true;
	}
	return true;
});

export default AppDispatcher;
