
import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.scss';
let isDark = false

export default class Header extends Component {

  componentDidMount() {
    const $header = $(this.base)
    const height = this.base.clientHeight
    const offset = $('[data-midnight]').offset().top - height / 2

    function callback() {
      const top = window.scrollY
      const diff = top - offset
      if( ! isDark && diff > 0 ) {
        isDark = true
        $header.addClass(`${style.dark}`)
      } else if( isDark && diff <= 0 ) {
        isDark = false
        $header.removeClass(`${style.dark}`)
      }
    }

    $(window).on('scroll', callback)
    callback()
  }

  render() {
    return (
      <header class={style.header}>
        <div class={style.container}>
          <h1 class={style.logo}>
            <Link href="/">312 Development</Link>
          </h1>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/about">Me</Link>
            <Link href="/portfolio">My Work</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>
    );
  }
}
