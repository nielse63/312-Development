
import { h, Component } from 'preact'
import style from '../style.scss'

export default class TextInput extends Component {
  render() {
    const type = this.props.type || 'text'

    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input type={type} name={this.props.name} />
      </div>
    )
  }
}
