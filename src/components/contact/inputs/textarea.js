
import { h, Component } from 'preact'
import PropTypes from 'proptypes'

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
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <textarea name={this.props.name} />
      </div>
    )
  }
}
