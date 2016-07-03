
// actions.js
import config from '../config'
import Cosmic from 'cosmicjs'
import contentful from 'contentful'
import _ from 'lodash'

// AppStore
import AppStore from '../stores/AppStore'

export function getStore(callback) {

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

	Cosmic.getObjects(config, function(err, response) {

		let object = response.object
		let objects = response.objects
		let globals = AppStore.data.globals

		// nav
		globals.nav_items = object.nav.metafields

		// pages
		let pages = objects.type.pages
		AppStore.data.pages = pages

		// articles
		let articles = objects.type.articles
		AppStore.data.articles = _.sortBy(articles, 'created')

		AppStore.data.globals = globals

		// Emit change
		AppStore.data.ready = true
		AppStore.emitChange()

		// Trigger callback (from server)
		if(callback) {
			callback(false, AppStore)
		}
	})
}

export function getPageData(page_slug, post_slug) {

	if( ! page_slug ) {
		page_slug = 'home'
	}

	// Get page info
	const data = AppStore.data
	let items

	if( page_slug === 'articles' ) {
		page_slug = post_slug
		items = data.articles
	} else{
		items = data.pages
	}

	// get page data
	const page = _.findWhere(items, { slug: page_slug })
	const metafields = page.metafields

	// set meta fields
	page.fields = metafields

	// for( var i = 0; i < metafields.length; i++ ) {
	//   let metafield = metafields[i]
	//   let key = metafield.key
	//   let key = metafield.key
	//   page[]
	// }

	// if(metafields && metafields.length) {
	//   console.log(metafields);
	//   // const hero = _.findWhere(metafields, { key: 'banner_image' })
	//   // page.hero = config.bucket.media_url + '/' + hero.value

	//   // const headline = _.findWhere(metafields, { key: 'headline' })
	//   // page.headline = headline.value

	//   // const subheadline = _.findWhere(metafields, { key: 'subheadline' })
	//   // page.subheadline = subheadline.value
	// }
	// if(post_slug) {
	//   if(page_slug === 'home'){
	//     const articles = data.articles
	//     const article = _.findWhere(articles, { slug: post_slug })
	//     page.title = article.title
	//   }
	//   if(page_slug === 'work'){
	//     const work_items = data.work_items
	//     const work_item = _.findWhere(work_items, { slug: post_slug })
	//     page.title = work_item.title
	//   }
	// }
	AppStore.data.page = page
	AppStore.emitChange()
}

export function getMoreItems() {

	AppStore.data.loading = true
	AppStore.emitChange()

	setTimeout(function(){
		let item_num = AppStore.data.item_num
		let more_item_num = item_num + 5
		AppStore.data.item_num = more_item_num
		AppStore.data.loading = false
		AppStore.emitChange()
	}, 300)
}
