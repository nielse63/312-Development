
import { h, Component } from 'preact';
import { Link } from 'preact-router';

export default class Nav extends Component {
	render() {
		return (
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About Me</Link>
        <Link href="/portfolio">My Work</Link>
        <Link href="/contact">Contact</Link>
      </nav>
		);
	}
}
