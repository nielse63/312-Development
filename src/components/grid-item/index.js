
import { h, Component } from 'preact';
import { Link } from 'preact-router';
import faker from 'faker'
import style from './style.scss';

// const icons = [
//   'medium',
//   'github',
// ]

export default class Grid extends Component {
  render() {
    const count = Math.floor(Math.random() * 4) + 2
    var title = faker.lorem.sentence(count)
    var preview = faker.lorem.paragraph()
    // const icon = faker.helpers.randomize(icons)

    return (
      <div class={style['grid-item']}>
        <div class={style['grid-item-wrapper']}>
          <Link href="/">
            <h4>{title}</h4>
            <div class={style['grid-item-content']}>
              {/*<p>
                <Link href="/">
                  <i className={`fa fa-${icon}`} ariaHidden="true" />
                </Link>
              </p>*/}
              <p>{preview}</p>
              <p class={style['read-more']}>Read More &rarr;</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
