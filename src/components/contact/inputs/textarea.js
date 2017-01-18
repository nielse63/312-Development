
import { h, Component } from 'preact'
import PropTypes from 'proptypes'
import style from '../style.scss'

export default class TextArea extends Component {
  constructor(props) {
    TextArea.propTypes = {
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }
    super(props)
  }

  render() {
    return (
      <div className={style.full}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <textarea name={this.props.name} />
      </div>
    )
  }
}
