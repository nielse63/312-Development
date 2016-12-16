
import { h, Component } from 'preact'
import style from './style.scss'

let $ = window.jQuery

class BackgroundImage extends Component {
  componentWillMount() {
    this.getSource()
  }

  componentDidMount() {
    if (!window.jQuery) {
      return
    }
    this.onJqueryLoad()
  }

  componentWillUnmount() {
    $(window).off('.backgroundImage')
  }

  onJqueryLoad() {
    $ = window.jQuery
    const $window = $(window)
    $window.off('.backgroundImage')

    const $figure = $(this.base)
    let height = $figure.next().outerHeight()

    function onResize() {
      height = $figure.next().outerHeight()
    }

    function onScroll() {
      const top = window.pageYOffset
      if (top > height) {
        return
      }
      const percentage = (top / height) * (0.15 * -100)
      $figure.css('transform', `translateY(${percentage}%)`)
    }

    $window.on('scroll.backgroundImage', onScroll)
    $window.on('resize.backgroundImage', onResize)
    onScroll()
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
    $('head').append(`<style id="${this.id}">${string}</style>`)
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
