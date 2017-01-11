
import { h, Component } from 'preact'
import style from '../style.scss'

export default class TextArea extends Component {
  render() {
    return (
      <div className={style.full}>
        <button type="submit">{this.props.label}</button>
      </div>
    )
  }
}
