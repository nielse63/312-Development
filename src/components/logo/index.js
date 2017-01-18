
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import style from './style.scss'

export default class Logo extends Component {
  render() {
    return (
      <h1 className={style.logo} id="logo">
        <Link href="/">312 Development</Link>
      </h1>
    )
  }
}
