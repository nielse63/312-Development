
// actions.js
import config from '../config';
import Cosmic from 'cosmicjs';
import contentful from 'contentful';
import _ from 'lodash';

// AppStore
import AppStore from '../stores/AppStore';

function makeSlug(string) {
	let path = string.replace(/[\s|_|.]/g, '-');

	// remove leading slash
	if (path[0] === '/') {
		path = path.substr(1);
	}

	return path.replace(/\//g, '-')
		.toLowerCase()
		.split('.')[0];
}

export function getTweets(callback) {
	// console.log(callback);
	const url = 'http://api.312development.dev/tweets.php';
	const opts = {
		method  : 'GET',
		headers : new Headers(),
		mode    : 'cors',
		cache   : 'default',
	};
	// console.log(url);

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
			AppStore.emitChange();
			// console.log(data);
			always();
		})
		.catch(always);
}

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
	// getTweets(function() {
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
			item.slug = makeSlug(item.title);
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
	// });
}

export function getPostData(pageSlug, postSlug) {
	// console.log(pageSlug, postSlug)
	// Get page info
	const data = AppStore.data;
	const pages = [];
	let slug = pageSlug;

	if (slug === 'articles') {
		slug = postSlug;
	}

	// const pages = data.pages
	// console.log(data.posts);
	const page = _.findWhere(data.posts, { slug });
	// console.log(page);

	AppStore.data.page = page;
	AppStore.emitChange();
}
