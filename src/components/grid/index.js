
import { h, Component } from 'preact';
import { Link } from 'preact-router';
import GridItem from '../grid-item';
import style from './style.scss';

const posts = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {}
];

export default class Grid extends Component {
	render() {
		return (
      <div className={style.grid} data-midnight>
        <div className={style.container}>
          { posts.map((post, i) => (
            <GridItem key={i} post={post} />
          )) }
        </div>
      </div>
		);
	}
}
