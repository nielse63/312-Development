
// actions.js
import config from '../config';
import Cosmic from 'cosmicjs';
import contentful from 'contentful';
import _ from 'lodash';

// AppStore
import AppStore from '../stores/AppStore';

export function getTweets(callback) {
	const url = 'http://api.312development.dev/tweets.php';
	const opts = {
		method  : 'GET',
		headers : new Headers(),
		mode    : 'cors',
		cache   : 'default',
	};

	function always() {
		if (callback) {
			callback();
		}
	}

	fetch(url, opts)
		.then((response) => {
			if (! response.ok) {
				throw new Error(`Error getting tweets: ${response}`);
			}
			return response.json();
		})
		.then((data) => {
			AppStore.data.tweets = data;
			always();
		})
		.catch(always);
}

// function getFromContentful() {
// }

export function getStore(callback) {
	const globals = AppStore.data.globals;
	globals.navItems = [{
		key   : 'homepage',
		value : '/',
		title : 'Work',
	}, {
		key   : 'about',
		value : '/about',
		title : 'About',
	}, {
		key   : 'contact',
		value : '/contact',
		title : 'Contact',
	}];

	// set globals

	getTweets(function() {
		const client = contentful.createClient({
			space       : 'o4irotzruet8',
			accessToken : 'f4a44d21a363ca93576e4e881fd762f88bd38dc912c2c37eba9f359d6ea0a0cb',
			host        : 'preview.contentful.com',
		});

		client.getEntries({
			'content_type' : '47g12FQ9BKOiU0A2OwYIkA',
		}).then(function(_entries) {
			const entries = _entries.toPlainObject();
			const items = entries.items;
			const posts = [];

			items.forEach(function(object) {
				const item = object.fields;
				item.id = object.sys.id;
				posts.push(item);
			});

			// set data
			AppStore.data.posts = posts;
			AppStore.data.globals = globals;

			// trigger change even
			AppStore.data.ready = true;
			AppStore.emitChange();

			if (callback) {
				callback(false, AppStore);
			}
		});
	});
}

export function getPostData(id) {
	console.log(id);

	// Get page info
	// const data = AppStore.data;
	// let pages = [];
	// let slug = pageSlug;

	// if (slug === 'articles') {
	// 	slug = postSlug;
	// 	pages = data.articles;
	// } else {
	// 	pages = data.pages;
	// }

	// // const pages = data.pages
	// const page = _.findWhere(pages, { slug });

	// AppStore.data.page = page;
	// AppStore.emitChange();
}

// export function getPageData(pageSlug, postSlug) {
// 	if (! pageSlug) {
// 		pageSlug = 'home';
// 	}

// 	// Get page info
// 	const data = AppStore.data;
// 	let pages = [];
// 	let slug = pageSlug;

// 	if (slug === 'articles') {
// 		slug = postSlug;
// 		pages = data.articles;
// 	} else {
// 		pages = data.pages;
// 	}

// 	// const pages = data.pages
// 	const page = _.findWhere(pages, { slug });

// 	AppStore.data.page = page;
// 	AppStore.emitChange();
// }

// export function getMoreItems() {
// 	AppStore.data.loading = true;
// 	AppStore.emitChange();

// 	setTimeout(function() {
// 		const itemNum = AppStore.data.itemNum;
// 		const moreItemNum = itemNum + 5;
// 		AppStore.data.itemNum = moreItemNum;
// 		AppStore.data.loading = false;
// 		AppStore.emitChange();
// 	}, 300);
// }
