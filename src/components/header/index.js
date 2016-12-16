
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import Nav from '../nav'
import style from './style.scss'

let isDark = false
let didBind = false
let $ = window.jQuery

export default class Header extends Component {
  static bindMenuClick() {
    if (!('ontouchstart' in window || 'ontouchstart' in document.documentElement)) {
      return
    }
    const $button = $(`.${style.menu}`)
    const $body = $('body')
    const $nav = $(`.${style.header} nav`)

    // move nav outside header
    if ($nav.length) {
      $('#app').after($nav)
    }

    $button.off('click')
    $button.on('click', () => {
      $body.toggleClass(style['menu-open'])

      if (!$body.hasClass(style['menu-open'])) {
        return $nav.one('transitionend', () => {
          $body.removeClass(style.transitioning)
        })
      }

      $body.addClass(style.transitioning)

      return $nav.one('transitionend', () => {
        $body.on('click.secondary', e => {
          const isMenu = $(e.target).closest($nav).length
          if (!isMenu) {
            $body.off('.secondary')
            $button.trigger('click')
          }
        })
      })
    })
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

  onJqueryLoad() {
    if (didBind) {
      return
    }
    didBind = true
    $ = window.jQuery

    this.bindScroll()
    Header.bindMenuClick()
  }

  onResize() {
    const height = this.base.clientHeight
    return $('[data-midnight]').offset().top - (height / 2)
  }

  onScroll() {
    const top = window.scrollY
    const diff = top - this.offset
    if (!isDark && diff > 0) {
      isDark = true
      this.$header.addClass(`${style.dark}`)
    } else if (isDark && diff <= 0) {
      isDark = false
      this.$header.removeClass(`${style.dark}`)
    }
  }

  bindScroll() {
    const $window = $(window)
    $window.off('.header')

    if (!$('[data-midnight]').length) {
      return
    }

    this.$header = $(this.base)
    this.offset = this.onResize()

    $window.on('resize.header', this.onResize.bind(this))
    $window.on('scroll.header', this.onScroll.bind(this))
    this.onScroll()
  }

  render() {
    return (
      <header className={style.header}>
        <div className={style.container}>
          <h1 className={style.logo}>
            <Link href="/">312 Development</Link>
          </h1>
          <Nav />
          <button className={style.menu} />
        </div>
      </header>
    )
  }
}
