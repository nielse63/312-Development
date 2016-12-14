
import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.scss';

export default class Footer extends Component {

  render() {
    return (
      <footer class={style.footer}>
        <div class={style.container}>
          <h1 class={style.logo}>
            <Link href="/">312 Development</Link>
          </h1>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/about">Me</Link>
            <Link href="/portfolio">My Work</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    );
  }
}
