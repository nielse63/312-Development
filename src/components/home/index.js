
import { h, Component } from 'preact'
// import extend from 'lodash.assign'
import Grid from '../grid'
import BackgroundImage from '../background-image'
import Banner from '../banner'
import style from './style.scss'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.props = Object.assign(props, {
      description: 'The personal portfolio of Erik Nielsen - Chicago UI Software Engineer.',
    })
  }

  render() {
    return (
      <div className={style.page}>
        <BackgroundImage src="/assets/images/bg2.jpg" />
        <Banner position="left" internal={false}>
          <h1>My Name is <mark>Erik Nielsen</mark></h1>
          <h2>I&apos;m a UI Software Engineer.</h2>
          <h3>I make the Internet prettier.</h3>
        </Banner>
        <Grid />
      </div>
    )
  }
}
