
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

  getSource() {
    if (!this.props.src) {
      return
    }
    const id = `style-${style['background-image']}`
    const existing = document.getElementById(id)

    const small = this.props.src.replace(/\.jpg/, '-small.jpg')
    const medium = this.props.src.replace(/\.jpg/, '-medium.jpg')
    const large = this.props.src.replace(/\.jpg/, '-large.jpg')
    const xlarge = this.props.src.replace(/\.jpg/, '-xlarge.jpg')
    const full = this.props.src.replace(/\.jpg/, '-full.jpg')
    const string = `
      .${style['background-image']} {
        background-image: url(${small});
      }
      @media (min-width: 480px) {
        .${style['background-image']} {
          background-image: url(${medium});
        }
      }
      @media (min-width: 1080px) {
        .${style['background-image']} {
          background-image: url(${large});
        }
      }
      @media (min-width: 1400px) {
        .${style['background-image']} {
          background-image: url(${xlarge});
        }
      }
      @media (min-width: 1920px) {
        .${style['background-image']} {
          background-image: url(${full});
        }
      }
    `
    $('head').append(`<style id="${id}">${string}</style>`)
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
