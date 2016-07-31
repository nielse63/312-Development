

export default class BodyClass {

	// constructor
	constructor(ele) {
		this.element = _c.$(ele);

		this.init();
		return this;
	}

	static exec() {
		let classes = BodyClass.classes || [];
		_c.$body.each(function() {
			const ele = _c.$(this);
			if (ele.attr('class')) {
				classes = classes.concat(ele.attr('class').split(' '));
			}
			const obj = new BodyClass(ele);
			classes.push(obj.class);
			ele.data('bodyclass.clique.data', obj);
		});
		BodyClass.classes = classes;
	}

	static removeClasses() {
		if (! BodyClass.classes || ! BodyClass.classes.length) {
			return;
		}
		for (let i = 0; i < BodyClass.classes.length; i++) {
			_c.$body.removeClass(BodyClass.classes[i]);
		}
		BodyClass.classes = [];
	}

	init() {
		this.defineProperties();
		this.setClass();
	}

	defineProperties() {
		this.duration = 400;
		this.namespace = '.clique.bodyclass.' + _c.utils.uid();
		this.slug = _c.utils.makeSlug();
		this.class = 'page-' + (this.slug ? this.slug : 'home');
	}

	setClass() {
		BodyClass.removeClasses();
		this.element.addClass(this.class);
	}
}
