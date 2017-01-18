
import { h, Component } from 'preact'
import PropTypes from 'proptypes'
import style from './style.scss'

class BackgroundImage extends Component {
  constructor(props) {
    BackgroundImage.propTypes = {
      src: PropTypes.string.isRequired,
    }
    super(props)
  }

  componentWillMount() {
    this.getSource()
  }

  componentDidMount() {
    this.bindListeners()
  }

  getSizes() {
    return {
      small: this.props.src.replace(/\.jpg/, '-small.jpg'),
      medium: this.props.src.replace(/\.jpg/, '-medium.jpg'),
      large: this.props.src.replace(/\.jpg/, '-large.jpg'),
      xlarge: this.props.src.replace(/\.jpg/, '-xlarge.jpg'),
      full: this.props.src.replace(/\.jpg/, '-full.jpg'),
    }
  }

  getSource() {
    if (!this.props.src) {
      return
    }

    this.id = `style-${style['background-image']}`

    const sources = this.getSizes()
    const string = `
      .${style['background-image']} {
        background-image: url(${sources.small});
      }
      @media (min-width: 480px) {
        .${style['background-image']} {
          background-image: url(${sources.medium});
        }
      }
      @media (min-width: 1080px) {
        .${style['background-image']} {
          background-image: url(${sources.large});
        }
      }
      @media (min-width: 1400px) {
        .${style['background-image']} {
          background-image: url(${sources.xlarge});
        }
      }
      @media (min-width: 1920px) {
        .${style['background-image']} {
          background-image: url(${sources.full});
        }
      }
    `

    this.removeOldScript()
    this.createScript(string)
  }

  bindListeners() {
    const figure = this.base
    const next = figure.nextSibling
    let height = next.offsetHeight

    function onResize() {
      height = next.offsetHeight
    }

    function onScroll() {
      const top = window.pageYOffset
      if (top > height) {
        return
      }
      const percentage = (top / height) * (0.15 * -100)
      figure.style.transform = `translateY(${percentage}%)`
    }

    document.addEventListener('scrolling', onScroll, {
      passive: true,
    })
    window.addEventListener('resizeend', onResize, {
      passive: true,
    })
    onScroll()
  }

  createScript(string) {
    const css = document.createElement('style')
    css.id = this.id
    if (css.styleSheet) {
      css.styleSheet.cssText = string
    } else {
      css.appendChild(document.createTextNode(string))
    }
    document.head.appendChild(css)
  }

  removeOldScript() {
    const existing = document.getElementById(this.id)
    if (existing) {
      existing.remove()
    }
  }

  render() {
    return (
      <figure id="bg-image" className={style['background-image']} />
    )
  }
}

export default BackgroundImage
