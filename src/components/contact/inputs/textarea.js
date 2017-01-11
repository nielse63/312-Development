
import { h, Component } from 'preact'
import style from '../style.scss'

export default class TextArea extends Component {
  render() {
    return (
      <div className={style.full}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <textarea name={this.props.name} />
      </div>
    )
  }
}
