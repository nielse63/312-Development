
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import Nav from '../nav'
import style from './style.scss'

let isDark = false
let didBind = false

export default class Header extends Component {

  onJqueryLoad() {
    if (didBind) {
      return
    }
    didBind = true
    $ = window.jQuery
    const $window = $(window)
    $window.off('.header')

    if (!$('[data-midnight]').length) {
      return
    }

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

    $window.on('resize.header', onResize)
    $window.on('scroll.header', onScroll)
    onScroll()
  }

  componentDidMount() {
    if (!window.jQuery) {
      return
    }
    this.onJqueryLoad()
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
          <Nav />
        </div>
      </header>
    )
  }
}
