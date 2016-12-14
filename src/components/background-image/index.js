
import { h, Component } from 'preact';
import style from './style.scss';

let $ = window.jQuery;

export default class BackgroundImage extends Component {

	onJqueryLoad() {
		$ = window.jQuery;
		const $window = $(window);
		$window.off('.backgroundImage');

		const $figure = $(this.base);
		let height = $figure.next().outerHeight();

		function onResize() {
			height = $figure.next().outerHeight();
		}

		function onScroll() {
			const top = window.pageYOffset;
			if (top > height) {
				return;
			}
			const percentage = top / height * 0.15 * -100;
			$figure.css('transform', `translateY(${percentage}%)`);
		}

		$window.on('scroll.backgroundImage', onScroll);
		$window.on('resize.backgroundImage', onResize);
		onScroll();
	}

	componentDidMount() {
		if ( ! window.jQuery ) {
			return;
		}
		this.onJqueryLoad();
	}

	componentWillUnmount() {
		$(window).off('.backgroundImage');
	}

	render() {
		const css = this.props.src
      ? { backgroundImage: `url(${this.props.src.replace(/\.jpg/, '-large.jpg')})` }
      : {};

		return (
      <figure id="bg-image" className={style['background-image']} style={css} />
		);
	}
}
