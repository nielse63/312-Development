
export default class Article {

	constructor() {

		this.$article = _c.$('.article-content')
		if( ! this.$article.length ) {
			return;
		}

		this.createFigure()

		return this
	}

	createFigure() {
		this.$article.find('img').each(function() {
			let $img = _c.$(this)

			if( $img.parent().is('p') ) {
				$img.unwrap()
			}

			let html = [
				'<figure class="blog-figure">',
					'<img src="' + $img + '">',
				'</figure>',
			].join('')


		});
	}
}
