
// actions.js
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

let loaded = false;

function loadTwitterScript(callback) {
	if (loaded || window.twttr) {
		callback();
		return;
	}

	$.getScript('https://platform.twitter.com/widgets.js')
		.done(function() {
			loaded = true;
			callback();
		})
		.fail(function(jqxhr, settings, exception) {
			console.warn(jqxhr, settings, exception);
			callback();
		});
}

export function getTweets(callback = function() {}) {
	loadTwitterScript(callback);
}

export function loadTweets() {
	if (! window.twttr) {
		getTweets(loadTweets);
		return;
	}

	const main = document.querySelector('.main');
	const tweets = document.querySelector('.tweets');
	if (! main || ! tweets) {
		return;
	}

	window.twttr.widgets.load(main);

	window.twttr.widgets.createTimeline({
		sourceType : 'profile',
		screenName : 'ErikKyleNielsen',
	}, tweets, {
		tweetLimit : 10,
	});
}

export function getStore(callback) {

	// global vars
	const storage    = window.localStorage;
	const checkedKey = 'LastChecked312Feed';
	const feedKey    = '312Feed';
	const navKey     = '312Nav';

	// callback
	function always() {

		// trigger change even
		AppStore.data.ready = true;
		AppStore.emitChange();

		if (callback) {
			callback(false, AppStore);
		}
	}

	function getCachedDate() {

		// return bool
		let hasData = false;

		// check localstorage first
		const lastChecked = storage.getItem(checkedKey);
		const feed        = storage.getItem(feedKey);
		const nav         = storage.getItem(navKey);
		if( lastChecked && feed && nav ) {
			const diff = (Date.now() - Date.parse( lastChecked )) / 1000;
			const oneDay = 60 * 60 * 24;
			if( diff < oneDay ) {

				// set data
				AppStore.data.posts = JSON.parse(feed);
				AppStore.data.globals.navItems = JSON.parse(nav);
				hasData = true;
			}
		}

		return hasData;
	}

	if( ! getCachedDate() ) {

		// update local storage last checked
		storage.setItem(checkedKey, String(new Date()));

		// set globals
		const client = contentful.createClient({
			space       : 'o4irotzruet8',
			accessToken : 'f4a44d21a363ca93576e4e881fd762f88bd38dc912c2c37eba9f359d6ea0a0cb',
			host        : 'preview.contentful.com',
		});
		let complete = false;

		// get posts
		client.getEntries({
			content_type : '47g12FQ9BKOiU0A2OwYIkA',
		}).then((entries) => {
			const json = entries.toPlainObject();
			const items = json.items;
			const posts = [];

			items.forEach(function(object) {
				const item = object.fields;
				item.id    = object.sys.id;
				item.slug  = makeSlug(item.title);
				posts.push(item);
			});

			// cache on local storage
			storage.setItem(feedKey, JSON.stringify(posts));

			// set data
			AppStore.data.posts = posts;

			// trigger complete
			if (complete) {
				always();
			} else {
				complete = true;
			}
		});

		// get pages (as nav items)
		client.getEntries({
			content_type : 'navItems',
		}).then((entries) => {
			const json = entries.toPlainObject();
			const items = json.items;
			const navItems = [];

			items.forEach(function(object) {
				navItems.push({
					key   : object.sys.id,
					value : object.fields.path,
					title : object.fields.title,
					label : object.fields.navLable,
				});
			});

			// cache on local storage
			storage.setItem(navKey, JSON.stringify(navItems));

			// set data
			AppStore.data.globals.navItems = navItems;

			// trigger complete
			if (complete) {
				always();
			} else {
				complete = true;
			}
		});
	} else {
		always();
	}
}

export function getPostData(pageSlug, postSlug) {
	// Get page info
	const data = AppStore.data;
	let slug = pageSlug;

	if (slug === 'articles') {
		slug = postSlug;
	}

	const page = _.findWhere(data.posts, {
		slug,
	});

	AppStore.data.page = page;
	AppStore.emitChange();
}

export function getPageData(pageSlug) {

	// Get page info
	const slug = `/${pageSlug}`;
	const items = AppStore.data.globals.navItems;
	const page = _.findWhere(items, {
		value : slug,
	});

	AppStore.data.page = page;
	AppStore.emitChange();
}

export function didClickLink() {
	window.postMessage('unloaded', window.location.origin);
}
