
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import Nav from '../nav'
import Social from '../social'
import Logo from '../logo'
import style from './style.scss'

export default class Footer extends Component {
  render() {
    return (
      <footer className={style.footer}>
        <div className={style.container}>
          <Logo />
          <nav>
            <Social />
          </nav>
        </div>
      </footer>
    )
  }
}
