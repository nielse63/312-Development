
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import faker from 'faker'
import style from './style.scss'
// const splittext = require('../../lib/splittext')
// import SplitText from '../../lib/splittext'

export default class Grid extends Component {
  componentDidMount() {
    // console.log(SplitText)
    // const title = $(this.base).find('h4')
    // const split = SplitText(title)
    // console.log(split)
  }

  render() {
    const count = Math.floor(Math.random() * 4) + 2
    const title = faker.lorem.sentence(count)
    const preview = faker.lorem.paragraph()

    return (
      <div className={style['grid-item']}>
        <div className={style['grid-item-wrapper']}>
          <Link href="/">
            <h4>{title}</h4>
            <div className={style['grid-item-content']}>
              {/* <p>
                <Link href="/">
                  <i className={`fa fa-${icon}`} ariaHidden="true" />
                </Link>
              </p>*/}
              <p>{preview}</p>
              <p className={style['read-more']}>Read More &rarr;</p>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}
