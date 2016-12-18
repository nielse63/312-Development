
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import Nav from '../nav'
import style from './style.scss'

let isDark = false

export default class Header extends Component {
  static bindMenuClick() {
    if (!('ontouchstart' in window || 'ontouchstart' in document.documentElement)) {
      return
    }

    const nav = document.querySelector(`.${style.header} nav`)

    if (nav) {
      document.getElementById('app').insertAdjacentHTML('afterend', nav.outerHTML)
      nav.remove()
    }

    document.querySelector('[data-menu]').addEventListener('click', () => {
      document.body.classList.toggle(style['menu-open'])
    }, {
      passive: true,
    })
  }

  constructor() {
    super()
    this.offsetTop = 0
  }

  componentWillMount() {
    document.addEventListener('routed', e => {
      setTimeout(() => {
        this.setProps()
      }, 0)
    }, {
      passive: true,
    })
  }

  componentDidMount() {
    this.setProps()
    this.bindListeners()
  }

  onScroll() {
    const diff = (window.pageYOffset - this.offsetTop) + (this.height / 2)
    const cls = `${style.dark}`

    this.setWillChangeClass(diff)

    if (!isDark && diff > 0) {
      isDark = true
      this.base.classList.add(cls)
    } else if (isDark && diff < 0) {
      isDark = false
      this.base.classList.remove(cls)
    }
  }

  setWillChangeClass(diff) {
    const changecls = `${style['will-change']}`
    if (Math.abs(diff) < 200) {
      this.base.classList.add(changecls)
    } else if (this.base.classList.contains(changecls)) {
      this.base.classList.remove(changecls)
    }
  }

  setProps() {
    this.nextEle = document.querySelector('[data-midnight]')
    if (!this.nextEle || this.offsetTop === this.nextEle.offsetTop) {
      return
    }

    this.offsetTop = this.nextEle.offsetTop
    this.height = this.base.clientHeight
  }

  bindListeners() {
    this.bindScroll()
    Header.bindMenuClick()
  }

  bindScroll() {
    document.addEventListener('scrolling', this.onScroll.bind(this), {
      passive: true,
    })
    this.onScroll()
  }

  render() {
    return (
      <header className={style.header} data-header>
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
