
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import Nav from '../nav'
import Social from '../social'
import style from './style.scss'

export default class Footer extends Component {
  render() {
    return (
      <footer className={style.footer}>
        <div className={style.container}>
          <h1 className={style.logo}>
            <Link href="/">312 Development</Link>
          </h1>
          <nav>
            <Social />
          </nav>
        </div>
      </footer>
    )
  }
}
