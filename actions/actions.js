
// actions.js
import config from '../config';
import Cosmic from 'cosmicjs';
// import contentful from 'contentful';
import _ from 'lodash';

// AppStore
import AppStore from '../stores/AppStore';

function getTweets( callback ) {
	const url = 'http://api.312development.dev/tweets.php';
	const opts = {
		method : 'GET',
		headers: new Headers(),
		mode   : 'cors',
		cache  : 'default',
	};
	fetch( url, opts )
	.then( ( response ) => {
		if ( ! response.ok ) {
			throw new Error( `Error getting tweets: ${response}` );
		}
		return response.json();
	} )
	.then( ( data ) => {
		// set data
		AppStore.data.tweets = data;

		// Emit change
		AppStore.data.ready = true;
		AppStore.emitChange();

		// Trigger callback (from server)
		if ( callback ) {
			callback( false, AppStore );
		}
	} );
}

export function getStore( checkTweets = true, callback ) {
	let cb = callback;
	let ct = checkTweets;
	if ( typeof checkTweets === 'function' ) {
		cb = checkTweets;
		ct = true;
	}

	// const client = contentful.createClient({
	// 	space: 'o4irotzruet8',
	// 	accessToken: 'f4a44d21a363ca93576e4e881fd762f88bd38dc912c2c37eba9f359d6ea0a0cb',
	// 	host: 'preview.contentful.com'
	// })

	// client.getEntries()
	// 	.then(function(_entries) {
	// 		const obj = _entries.toPlainObject();
	// 		let content = obj.items;
	// 		console.log(entries)
	// 	}
	// );

	Cosmic.getObjects( config, ( err, response ) => {
		const object = response.object;
		const objects = response.objects;
		const globals = AppStore.data.globals;

		// nav
		globals.nav_items = object.nav.metafields;

		// pages
		const pages = objects.type.pages;
		AppStore.data.pages = pages;

		// articles
		const articles = objects.type.articles;
		AppStore.data.articles = _.sortBy( articles, 'created' );

		AppStore.data.globals = globals;

		// get tweets
		if ( ct ) {
			getTweets( cb );
		} else {
			// Emit change
			AppStore.data.ready = true;
			AppStore.emitChange();

			// Trigger callback (from server)
			if ( cb ) {
				cb( false, AppStore );
			}
		}
	} );
}

export function getPageData( pageSlug = 'home', postSlug ) {
	function setPageData() {
		const data = AppStore.data;

		let items;
		let slug = pageSlug;

		if ( slug === 'articles' ) {
			slug = postSlug;
			items = data.articles;
		} else {
			items = data.pages;
		}

		// get page data
		const page = _.findWhere( items, {
			slug,
		} );
		const metafields = page.metafields;

		// set meta fields
		page.fields = metafields;

		AppStore.data.page = page;
		AppStore.emitChange();
	}

	// Get page info
	if ( ! AppStore.data.pages.length ) {
		getStore( false, setPageData );
	} else {
		setPageData();
	}
}

export function getMoreItems() {
	AppStore.data.loading = true;
	AppStore.emitChange();

	setTimeout( function() {
		const itemNum = AppStore.data.itemNum;
		const moreItemNum = itemNum + 5;
		AppStore.data.itemNum = moreItemNum;
		AppStore.data.loading = false;
		AppStore.emitChange();
	}, 300 );
}
