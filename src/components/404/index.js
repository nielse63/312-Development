
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import BackgroundImage from '../background-image'
import Banner from '../banner'
import style from './style.scss'

export default class NotFound extends Component {
  render() {
    return (
      <div className={style.page}>
        <BackgroundImage src="/assets/images/bg1.jpg" />
        <Banner position="left" internal>
          <h1>404 Error</h1>
          <h2>Page <mark>not found</mark></h2>
        </Banner>
      </div>
    )
  }
}
