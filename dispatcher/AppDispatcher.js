// AppDispatcher.js
import { Dispatcher } from 'flux';
import { getTweets, loadTweets, getStore, getPostData, getPageData, didClickLink } from '../actions';

const AppDispatcher = new Dispatcher();

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {
	const action = payload.action;
	switch (action) {

	case 'get-app-store':
		getStore();
		break;

	case 'get-page-data':
		getPageData(payload.page_slug);
		break;

	case 'get-post-data':
		getPostData(payload.page_slug, payload.post_slug);
		break;

	case 'did-click-link':
		didClickLink();
		break;

	default:
		return true;
	}
	return true;
});

export default AppDispatcher;
