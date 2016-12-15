
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import style from './style.scss'

export default class Nav extends Component {
  render() {
    return (
      <nav className={style.nav}>
        <Link href="/">Home</Link>
        <Link href="/about">About Me</Link>
        <Link href="/portfolio">Work</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    )
  }
}
