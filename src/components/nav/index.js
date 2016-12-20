
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import style from './style.scss'
import { preloadImage, preloadDocument } from '../../lib/load-jquery'

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
    this.preloaded = {
      images: [],
      urls: [
        window.location.href
      ]
    }
    this.onMouseOver = this._onMouseOver.bind(this)
  }

  componentDidMount() {
    const ele = document.getElementById('bg-image')
    const baseUrl = window.location.protocol + '//' + window.location.host
    const css = window.getComputedStyle(ele)
    const bg = css['background-image']
      .match(/\((.*?)\)/)[1]
      .replace(/"/g, '')
      .replace(baseUrl, '')
    this.preloaded.images.push(bg)
  }

  _onMouseOver(e) {
    const src = e.target.dataset.src
    const href = e.target.href
    if( this.preloaded.urls.indexOf(href) < 0 ) {
      this.preloaded.urls.push(href)
      preloadDocument(href)
    }

    const size = Nav.getImageSize(window.innerWidth)
    const realSrc = src.replace(/\.jpg$/, `-${size}.jpg`)
    if (this.preloaded.images.indexOf(realSrc) < 0) {
      this.preloaded.images.push(realSrc)
      preloadImage(realSrc)
    }
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
