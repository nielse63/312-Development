
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import BackgroundImage from '../background-image'
import Banner from '../banner'
import style from './style.scss'

export default class ThankYou extends Component {
  render() {
    return (
      <div className={style.page}>
        <BackgroundImage src="/assets/images/bg4.jpg" />
        <Banner position="left" internal>
          <h1>Message Received</h1>
          <h2>I&apos;ll be in touch <mark>shortly</mark></h2>
        </Banner>
      </div>
    )
  }
}
