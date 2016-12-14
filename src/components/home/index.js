
import { h, Component } from 'preact';
import Grid from '../grid';
import BackgroundImage from '../background-image';
import style from './style.scss';

export default class Home extends Component {
	render() {
		return (
      <div className={style.page}>
        <BackgroundImage />
        <div className={style.home}>
          <div className={style.container}>
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
