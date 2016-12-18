
import { h, Component } from 'preact'
import { extend } from 'lodash'
import Grid from '../grid'
import BackgroundImage from '../background-image'
import Banner from '../banner'
import style from './style.scss'

export default class Portfolio extends Component {
  render() {
    return (
      <div className={style.page}>
        <BackgroundImage src="/assets/images/bg1.jpg" />
        <Banner position="right" internal>
          <h1>Check out</h1>
          <h2>my <mark>work</mark></h2>
        </Banner>
        <Grid />
      </div>
    )
  }
}
