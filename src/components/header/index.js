
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import style from './style.scss'

let isDark = false

export default class Header extends Component {

  componentDidMount() {
    // console.log(this.context.store.getState())
    $(window).off('.header')

    const base = this.base
    const $header = $(base)
    let height = base.clientHeight
    let offset = $('[data-midnight]').offset().top - height / 2

    function onResize() {
      height = base.clientHeight
      offset = $('[data-midnight]').offset().top - height / 2
    }

    function onScroll() {
      const top = window.scrollY
      const diff = top - offset
      if (!isDark && diff > 0) {
        isDark = true
        $header.addClass(`${style.dark}`)
      } else if (isDark && diff <= 0) {
        isDark = false
        $header.removeClass(`${style.dark}`)
      }
    }

    $(window).on('resize.header', onResize)
    $(window).on('scroll.header', onScroll)
    onScroll()
  }

  componentWillUnmount() {
    $(window).off('.header')
  }

  render() {
    return (
      <header className={style.header}>
        <div className={style.container}>
          <h1 className={style.logo}>
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
    )
  }
}
