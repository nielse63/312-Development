
import { h, Component } from 'preact'
import style from './style.scss'

export default class BackgroundImage extends Component {

  componentDidMount() {
    $(window).off('.backgroundImage')

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
      const percentage = top / height * 0.15 * -100
      $figure.css('transform', `translateY(${percentage}%)`)
    }

    $(window).on('scroll.backgroundImage', onScroll)
    $(window).on('resize.backgroundImage', onResize)
    onScroll()
  }

  componentWillUnmount() {
    $(window).off('.backgroundImage')
  }

  render() {
    const css = this.props.src
      ? { backgroundImage: `url(${this.props.src})` }
      : {}

    return (
      <figure className={style['background-image']} style={css} />
    )
  }
}
