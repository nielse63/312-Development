
export default class Contact {

	constructor() {
		this.$form = $('.form');
		if (! this.$form.length) {
			return;
		}

		this.onSubmit();

		return this;
	}

	onSubmit() {
		this.$form.on('submit', function(e) {
			e.preventDefault()
			e.stopPropagation()
			console.log(this)
			console.log(e)
		});
	}
}
