
import { h, Component } from 'preact';
import { Link } from 'preact-router';
import preload from 'fg-loadcss'
import GridItem from '../grid-item'
import style from './style.scss';

const posts = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]

export default class Grid extends Component {
  componentWillMount() {
    preload.loadCSS('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css')
  }

  render() {
    return (
      <div class={style.grid} data-midnight>
        <div class={style.container}>
          { posts.map((post, i) => (
            <GridItem key={i} post={post} />
          )) }
        </div>
      </div>
    );
  }
}
