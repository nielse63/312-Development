
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import style from './style.scss'
import { preloadImage } from '../../lib/load-jquery'

export default class Nav extends Component {
  static getImageSize(width) {
    if (width > 1920) {
      return 'full'
    }
    if (width > 1400) {
      return 'xlarge'
    }
    if (width > 1080) {
      return 'large'
    }
    if (width > 480) {
      return 'medium'
    }
    return 'small'
  }

  constructor(props) {
    super(props)
    this.preloaded = []
    this.onMouseOver = this._onMouseOver.bind(this)
  }

  _onMouseOver(e) {
    const src = e.target.dataset.src
    const size = Nav.getImageSize(window.innerWidth)
    const realSrc = src.replace(/\.jpg$/, `-${size}.jpg`)
    if (this.preloaded.indexOf(realSrc) > -1) {
      return
    }
    this.preloaded.push(realSrc)
    preloadImage(realSrc)
  }

  render() {
    return (
      <nav className={style.nav}>
        <Link href="/" onMouseOver={this.onMouseOver} data-src="/assets/images/bg2.jpg">Home</Link>
        <Link href="/about" onMouseOver={this.onMouseOver} data-src="/assets/images/bg3.jpg">About Me</Link>
        <Link href="/portfolio" onMouseOver={this.onMouseOver} data-src="/assets/images/bg1.jpg">Work</Link>
        <Link href="/contact" onMouseOver={this.onMouseOver} data-src="/assets/images/bg4.jpg">Contact</Link>
      </nav>
    )
  }
}
