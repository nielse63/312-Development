
import { h, Component } from 'preact'
import Grid from '../grid'
import BackgroundImage from '../background-image'
import style from './style.scss'

export default class Portfolio extends Component {
  render() {
    return (
      <div className={style.page}>
        <BackgroundImage src="/assets/images/bg1.jpg" />
        <div className={style['page-content']}>
          <div className={style.container}>
            <h1>Check out</h1>
            <h2>my <mark>work</mark></h2>
          </div>
        </div>
        <Grid />
      </div>
    )
  }
}
