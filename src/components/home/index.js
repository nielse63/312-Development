
import { h, Component } from 'preact'
import Grid from '../grid'
import style from './style.scss'

let isLoaded = false
let isOutOfView = false

function parallax(base) {
    const $home = $(base)
    const $figure = $home.find(`.${style['background-image']}`)
    const height = $home.find(`.${style.home}`).outerHeight()

    function onScroll() {
      const top = window.pageYOffset
      if(top > height) {
        return
      }
      const percentage = top / height * 0.15 * -100
      $figure.css('transform', `translateY(${percentage}%)`)
    }

    $(window).on('scroll.home.parallax', onScroll)
    onScroll()
}

// function titles(base) {
//     const $home = $(base)
//     const $h1 = $home.find('h1')
//     const $h2 = $home.find('h2')
//     const $h3 = $home.find('h3')
//     const offset = $h1.offset().top + $h1.outerHeight() * 0.75

//     function onScroll() {
//       const top = window.pageYOffset
//       if( !isLoaded && top < offset ) {
//         isLoaded = true
//         $home.addClass(`${style.inview}`)
//       } else if( isOutOfView && isLoaded && top < offset ) {
//         isOutOfView = false
//         $home.addClass(`${style.reenter}`)
//         $home.removeClass(`${style.outview}`)
//       } else if( top >= offset ) {
//         isOutOfView = true
//         $home.addClass(`${style.outview}`)
//       }

//       // if(top > offset) {
//       //   return
//       // }
//       // const percentage = top / height * 0.15 * -100
//       // $figure.css('transform', `translateY(${percentage}%)`)
//     }

//     $(window).on('scroll.home.parallax', onScroll)
//     onScroll()
// }

export default class Home extends Component {

  componentDidMount() {
    $(window).off('.home')

    parallax(this.base)
    // titles(this.base)
  }

  componentDidUnmount() {
    $(window).off('.home')
  }

  render() {
    return (
      <div class={style.page}>
        <figure class={style['background-image']} />
        <div class={style.home}>
          <div class={style.container}>
            <h1>My Name is <mark>Erik Nielsen</mark></h1>
            <h2>I'm a UI Software Engineer.</h2>
            <h3>I make the Internet prettier.</h3>
          </div>
        </div>
        <Grid />
      </div>
    );
  }
}
