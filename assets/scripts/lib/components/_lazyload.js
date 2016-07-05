
import 'whatwg-fetch'

export default class LazyLoad {

	constructor() {
		this.$images = document.querySelectorAll('[data-src]');
		if (! this.$images.length) {
			return;
		}

		this.$images = Array.from(this.$images)
		this.loadAll();

		return this;
	}

	callback() {
		if( this.$images.length ) {
			this.loadAll()
		}
	}

	loadAll() {
		const img = this.$images.shift()
		const src = img.getAttribute('data-src')
		// console.log(window.fetch)

		fetch(src).then(function(response) {
			return response.blob()
		}).then((blob) => {
			const _src = URL.createObjectURL(blob);
			if( img.nodeName.toLowerCase() === 'img' ) {
				img.src = _src
			} else {
				_c.$(img).css({
					'background-image' : 'url(' + _src + ')'
				})
			}
			img.removeAttribute('data-src')
			this.callback()
		})
		.catch(this.callback);

		// // console.log(src, $img)
		// if( $img.is('img') ) {
		// 	$img.attr('src', src)
		// } else {
		// 	$img.css({
		// 		'background-image' : 'url(' + src + ')'
		// 	})
		// }
	}
}
