
import { h, Component } from 'preact'
import PropTypes from 'proptypes'
import { Link } from 'preact-router'
import style from './style.scss'
import { preloadImage, preloadDocument } from '../../lib/preload'

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
    Nav.propTypes = {
      id: PropTypes.string,
    }
    Nav.defaultProps = {
      id: 'nav',
    }
    super(props)
    this.preloaded = [window.location.href]
    this.onMouseOver = this._onMouseOver.bind(this)
  }

  componentDidMount() {
    const ele = document.getElementById('bg-image')
    const baseUrl = `${window.location.protocol}//${window.location.host}`
    const css = window.getComputedStyle(ele)
    const bg = css['background-image']
      .match(/\((.*?)\)/)[1]
      .replace(/"/g, '')
      .replace(baseUrl, '')
    this.preloaded.push(bg)
  }

  preload(type, src) {
    if (this.preloaded.indexOf(src) > -1) {
      return false
    }
    this.preloaded.push(src)

    if (type === 'image') {
      return preloadImage(src)
    }
    return preloadDocument(src)
  }

  _onMouseOver(e) {
    this.preload('document', e.target.href)

    const size = Nav.getImageSize(window.innerWidth)
    const realSrc = e.target.dataset.src.replace(/\.jpg$/, `-${size}.jpg`)
    this.preload('image', realSrc)
  }

  render() {
    const classes = [style.nav, 'nav']
    return (
      <nav className={classes.join(' ')} id={this.props.id}>
        <Link
          href="/"
          onMouseOver={this.onMouseOver}
          data-src="/assets/images/bg2.jpg"
        >Home</Link>
        <Link
          href="/about"
          onMouseOver={this.onMouseOver}
          data-src="/assets/images/bg3.jpg"
        >About Me</Link>
        <Link
          href="/portfolio"
          onMouseOver={this.onMouseOver}
          data-src="/assets/images/bg1.jpg"
        >Work</Link>
        <Link
          href="/contact"
          onMouseOver={this.onMouseOver}
          data-src="/assets/images/bg4.jpg"
        >Contact</Link>
      </nav>
    )
  }
}
