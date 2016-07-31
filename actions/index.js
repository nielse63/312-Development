
// actions.js
import contentful from 'contentful'
import _ from 'lodash'
// import memjs from 'memjs'

// AppStore
import AppStore from '../stores/AppStore'

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

export function getStore(callback) {

	function always() {
		// trigger change even
		AppStore.data.ready = true;
		AppStore.emitChange();
		if(callback) {
			callback(false, AppStore);
		}
	}

	if( ! process.env.CONTENTFUL_TOKEN ) {
		console.warn('Access token not found');
		always();
		return;
	}

	// set globals
	const client = contentful.createClient({
		space       : process.env.CONTENTFUL_SPACE,
		accessToken : process.env.CONTENTFUL_TOKEN,
		host        : process.env.CONTENTFUL_HOST,
	});
	let complete = false;

	// get posts
	client.getEntries({
		content_type : process.env.CONTENTFUL_CONTENT_TYPE,
	}).then((entries) => {
		const json = entries.toPlainObject();
		const items = json.items;
		const posts = [];

		items.forEach(function(object) {
			const item = object.fields;
			item.id = object.sys.id;
			item.slug = makeSlug(item.title);
			posts.push(item);
		});

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
				desc  : object.fields.description,
			});
		});

		// set data
		AppStore.data.globals.navItems = navItems;

		// trigger complete
		if (complete) {
			always();
		} else {
			complete = true;
		}
	});
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

	if( ! page.desc ) {
		page.desc = page.content
			.replace(/<(?:.|\n)*?>/gm, '')
			.substring(0, 160) + '...';
	}

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
