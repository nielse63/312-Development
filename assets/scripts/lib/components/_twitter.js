
export default class Twitter {

	constructor() {
		this.main = document.querySelector('.main');
		this.tweets = document.querySelector('.tweets');

		this.loaded = false
		this.getTweets();

		return this
	}

	getScript(callback) {

		if (this.loaded || window.twttr) {
			callback();
			return;
		}

		const self = this
		$.getScript('https://platform.twitter.com/widgets.js')
			.done(function() {
				self.loaded = true;
				callback();
			})
			.fail(function(jqxhr, settings, exception) {
				console.warn(jqxhr, settings, exception);
				callback();
			});
	}

	getTweets() {
		if (! window.twttr) {
			this.getScript(this.getTweets.bind(this))
			return;
		}

		if (! this.main || ! this.tweets) {
			return;
		}

		window.twttr.widgets.load(this.main);

		window.twttr.widgets.createTimeline({
			sourceType : 'profile',
			screenName : 'ErikKyleNielsen',
		}, this.tweets, {
			tweetLimit : 10,
		});
	}
}
